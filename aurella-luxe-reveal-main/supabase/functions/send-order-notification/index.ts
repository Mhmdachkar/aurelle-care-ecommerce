import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  id: string;
  order_number: string;
  total_amount: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: any;
  billing_address: any;
  created_at: string;
  order_items: Array<{
    product_name: string;
    variant: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

const sendEmail = async (orderData: OrderData) => {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'Aurellecare28@gmail.com';
  
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not found in environment variables');
    throw new Error('RESEND_API_KEY not configured - email sending disabled');
  }

  const formatAddress = (address: any) => {
    if (!address) return 'Not provided';
    return `${address.line1 || ''}${address.line2 ? ', ' + address.line2 : ''}
${address.city || ''}, ${address.state || ''} ${address.postal_code || ''}
${address.country || ''}`.trim();
  };

  const orderItemsHtml = orderData.order_items.map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px; border-right: 1px solid #eee;">${item.product_name} - ${item.variant}</td>
      <td style="padding: 10px; text-align: center; border-right: 1px solid #eee;">${item.quantity}</td>
      <td style="padding: 10px; text-align: right; border-right: 1px solid #eee;">${orderData.currency.toUpperCase()} ${item.unit_price.toFixed(2)}</td>
      <td style="padding: 10px; text-align: right;">${orderData.currency.toUpperCase()} ${item.total_price.toFixed(2)}</td>
    </tr>
  `).join('');

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Aurelle Order - ${orderData.order_number}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4af37, #b8860b); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
        .section { background: #f9f9f9; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #d4af37; }
        .customer-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .order-items table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .order-items th { background: #d4af37; color: white; padding: 12px; text-align: left; }
        .total { font-size: 18px; font-weight: bold; color: #d4af37; text-align: right; margin-top: 10px; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🛍️ New Order Received - AURELLE</h1>
        <p>Order #${orderData.order_number}</p>
      </div>

      <div class="section">
        <h2>💰 Order Summary</h2>
        <p><strong>Order ID:</strong> ${orderData.order_number}</p>
        <p><strong>Date:</strong> ${new Date(orderData.created_at).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ${orderData.currency.toUpperCase()} ${orderData.total_amount.toFixed(2)}</p>
      </div>

      <div class="section">
        <h2>👤 Customer Information</h2>
        <div class="customer-info">
          <div>
            <p><strong>Name:</strong> ${orderData.customer_name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${orderData.customer_email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${orderData.customer_phone || 'Not provided'}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>📍 Addresses</h2>
        <div class="customer-info">
          <div>
            <h3>Shipping Address:</h3>
            <p style="white-space: pre-line;">${formatAddress(orderData.shipping_address)}</p>
          </div>
          <div>
            <h3>Billing Address:</h3>
            <p style="white-space: pre-line;">${formatAddress(orderData.billing_address)}</p>
          </div>
        </div>
      </div>

      <div class="section order-items">
        <h2>🛒 Order Items</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItemsHtml}
          </tbody>
        </table>
        <div class="total">
          Total: ${orderData.currency.toUpperCase()} ${orderData.total_amount.toFixed(2)}
        </div>
      </div>

      <div class="footer">
        <p>This order notification was automatically generated by your Aurelle e-commerce system.</p>
        <p>Please process this order promptly to ensure customer satisfaction.</p>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Aurelle Orders <orders@resend.dev>',
        to: [adminEmail],
        subject: `🎉 New Aurelle Order - ${orderData.order_number} - ${orderData.currency.toUpperCase()} ${orderData.total_amount.toFixed(2)}`,
        html: emailHtml,
        reply_to: 'Aurellecare28@gmail.com',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send email:', errorText);
      throw new Error(`Email sending failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();
    
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    // Get Supabase environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch order data with items
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error(`Failed to fetch order: ${orderError?.message}`);
    }

    // Send email notification
    await sendEmail(order as OrderData);

    // Mark email as sent
    const { error: updateError } = await supabase
      .from('orders')
      .update({ notification_sent: true })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update notification status:', updateError);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email notification sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Notification error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
}); 