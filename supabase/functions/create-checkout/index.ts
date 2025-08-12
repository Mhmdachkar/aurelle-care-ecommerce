import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('=== Checkout function started ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Reading request body...');
    const requestBody = await req.json();
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const { cartItems, currency = 'USD', successUrl, cancelUrl, isGuest = false } = requestBody;
    
    console.log('Parsed request data:');
    console.log('- cartItems length:', cartItems?.length);
    console.log('- currency:', currency);
    console.log('- isGuest:', isGuest);
    console.log('- successUrl:', successUrl);
    console.log('- cancelUrl:', cancelUrl);
    
    // Get Stripe secret key from environment
    console.log('Getting Stripe secret key...');
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY not found in environment variables');
      throw new Error('STRIPE_SECRET_KEY not found in environment variables');
    }
    console.log('Stripe secret key found:', stripeSecretKey ? 'Yes' : 'No');

    console.log('Initializing Stripe...');
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    console.log('Getting Supabase environment variables...');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Missing');
    console.log('Supabase Anon Key:', supabaseAnonKey ? 'Found' : 'Missing');
    console.log('Supabase Service Key:', supabaseServiceKey ? 'Found' : 'Missing');

    // Initialize Supabase client with anon key for auth operations
    console.log('Initializing Supabase auth client...');
    const supabaseAuth = createClient(
      supabaseUrl ?? '',
      supabaseAnonKey ?? ''
    );

    // Initialize Supabase client with service role key for database operations
    console.log('Initializing Supabase admin client...');
    const supabaseAdmin = createClient(
      supabaseUrl ?? '',
      supabaseServiceKey ?? ''
    );

    let user: any = null;
    let customerEmail: string | null = null;

    // Handle authentication for logged-in users
    if (!isGuest) {
      console.log('Processing authenticated user...');
      const authHeader = req.headers.get('Authorization');
      console.log('Auth header present:', authHeader ? 'Yes' : 'No');
      
      if (authHeader) {
        // Create authenticated Supabase client with the auth header
        const supabaseAuthenticatedClient = createClient(
          supabaseUrl ?? '',
          supabaseAnonKey ?? '',
          {
            global: {
              headers: {
                Authorization: authHeader,
              },
            },
          }
        );
        
        console.log('Getting user from auth...');
        const { data: { user: authUser }, error: authError } = await supabaseAuthenticatedClient.auth.getUser();
        if (authError) {
          console.error('Auth error:', authError);
        } else {
          console.log('User found:', authUser ? 'Yes' : 'No');
          user = authUser;
          customerEmail = authUser?.email || null;
        }
      }
    } else {
      console.log('Processing guest user...');
    }

    // Validate required data
    console.log('Validating cart data...');
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.error('Invalid cart items:', cartItems);
      throw new Error('Invalid cart items provided');
    }

    // Helper function to parse price strings like "$22.99" or "14.799,00 TL" to a numeric value
    const parsePriceToNumber = (rawPrice: string | number): number => {
      if (typeof rawPrice === 'number') return rawPrice;
      if (!rawPrice) return 0;
      const trimmed = String(rawPrice).trim();
      // If it contains a comma as decimal separator (e.g., 14.799,00), convert to standard format
      const hasCommaDecimal = /\d,\d{1,2}$/.test(trimmed) || (trimmed.includes(',') && trimmed.split(',').pop()?.length === 2);
      let normalized = trimmed
        .replace(/[^0-9,.-]/g, ''); // keep digits and separators
      if (hasCommaDecimal) {
        // Remove thousand separators (.) and convert comma to dot
        normalized = normalized.replace(/\./g, '').replace(',', '.');
      } else {
        // Remove thousand separators (,) if any remain
        const parts = normalized.split('.');
        if (parts.length > 2) normalized = normalized.replace(/,/g, '');
      }
      const numeric = parseFloat(normalized);
      return Number.isFinite(numeric) ? numeric : 0;
    };

    // Calculate total amount
    console.log('Calculating total amount...');
    const totalAmount = cartItems.reduce((total: number, item: any) => {
      const itemPrice = parsePriceToNumber(item.price);
      console.log(`Item: ${item.product_name}, Price: ${item.price} -> Parsed: ${itemPrice}`);
      return total + (itemPrice * item.quantity);
    }, 0);
    console.log('Total amount:', totalAmount);

    // Create line items for Stripe
    console.log('Creating Stripe line items...');
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: `${item.product_name} - ${item.variant}`,
          images: item.image_url ? [item.image_url.startsWith('http') ? item.image_url : `${successUrl?.split('/').slice(0, 3).join('/')}${item.image_url}`] : [],
        },
        unit_amount: Math.round(parsePriceToNumber(item.price) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));
    console.log('Line items created:', lineItems.length);

    // Generate a unique order number with random component to avoid collisions
    const generateUniqueOrderNumber = () => {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
      const time = Date.now().toString().slice(-6); // Last 6 digits of timestamp
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3 random digits
      return `AU-${date}-${time}${random}`;
    };

    // Store order in database first (pending status) so we can reference it in metadata
    console.log('Creating order in database...');
    const orderData: any = {
      order_number: generateUniqueOrderNumber(),
      total_amount: totalAmount,
      currency: currency,
      status: 'pending',
      customer_email: customerEmail,
      is_guest: isGuest,
    };

    // Add user_id only for authenticated users
    if (user?.id) {
      console.log('Adding user_id to order...');
      orderData.user_id = user.id;
    }

    // Use admin client for database operations to bypass RLS
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }
    console.log('Order created successfully:', order.id);

    // Store order items
    console.log('Creating order items...');
    const orderItems = cartItems.map((item: any) => {
      const unitPrice = parsePriceToNumber(item.price);
      return {
        order_id: order.id,
        product_name: item.product_name,
        variant: item.variant,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: unitPrice * item.quantity,
        image_url: item.image_url,
      };
    });

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw new Error(`Failed to create order items: ${itemsError.message}`);
    }
    console.log('Order items created successfully');

    // Create Stripe checkout session
    console.log('Creating Stripe checkout session...');
    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/`,
      metadata: {
        order_id: order.id,
        currency: currency,
        is_guest: isGuest.toString(),
        total_amount: totalAmount.toString(),
        items_count: cartItems.length.toString(),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'AU', 'NZ', 'NL', 'BE', 'CH', 'AT', 'DK', 'FI', 'IE', 'LU', 'NO', 'PL', 'PT', 'SE', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'EG', 'MA', 'TN', 'DZ', 'IQ', 'LY', 'YE', 'SD', 'PS'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      customer_creation: 'always',
    };

    // Add customer email if available (for logged-in users)
    if (customerEmail && user) {
      console.log('Adding customer email to session...');
      sessionConfig.customer_email = customerEmail;
      sessionConfig.metadata.user_id = user.id;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log('Stripe session created:', session.id);

    // Update order with stripe session ID
    console.log('Updating order with Stripe session ID...');
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id);

    if (updateError) {
      console.error('Error updating order with session ID:', updateError);
      // Don't throw here as the order and session are already created
    }

    console.log('Returning success response...');
    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('=== CHECKOUT ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
}); 