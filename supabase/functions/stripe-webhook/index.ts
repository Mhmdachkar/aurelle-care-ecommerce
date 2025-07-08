import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();
  
  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log('Processing completed checkout session:', session.id);
        console.log('Customer details:', session.customer_details);
        console.log('Shipping details:', session.shipping_details);
        
        // Extract comprehensive customer information
        const customerData = {
          status: 'completed',
          stripe_payment_intent_id: session.payment_intent as string,
          customer_name: session.customer_details?.name || null,
          customer_email: session.customer_details?.email || 
                         session.customer_email || 
                         null,
          customer_phone: session.customer_details?.phone || null,
          shipping_address: session.shipping_details?.address ? {
            name: session.shipping_details.name,
            line1: session.shipping_details.address.line1,
            line2: session.shipping_details.address.line2,
            city: session.shipping_details.address.city,
            state: session.shipping_details.address.state,
            postal_code: session.shipping_details.address.postal_code,
            country: session.shipping_details.address.country,
          } : null,
          billing_address: session.customer_details?.address ? {
            line1: session.customer_details.address.line1,
            line2: session.customer_details.address.line2,
            city: session.customer_details.address.city,
            state: session.customer_details.address.state,
            postal_code: session.customer_details.address.postal_code,
            country: session.customer_details.address.country,
          } : null,
        };

        console.log('Extracted customer data:', customerData);
        
        // Update order with complete customer information
        const { data: updatedOrder, error: orderError } = await supabaseClient
          .from('orders')
          .update(customerData)
          .eq('stripe_session_id', session.id)
          .select('id, order_number')
          .single();

        if (orderError) {
          console.error('Error updating order:', orderError);
          throw new Error('Failed to update order');
        }

        console.log('Order updated successfully:', updatedOrder);

        // Create payment record
        if (session.payment_intent && updatedOrder) {
          const { error: paymentError } = await supabaseClient
            .from('payments')
            .insert({
              order_id: updatedOrder.id,
              stripe_payment_intent_id: session.payment_intent as string,
              amount: (session.amount_total || 0) / 100,
              currency: session.currency || 'usd',
              status: 'succeeded',
              payment_method_type: 'card',
            });

          if (paymentError) {
            console.error('Error creating payment record:', paymentError);
          }
        }

        // Clear user's cart after successful payment
        if (session.metadata?.user_id) {
          const { error: cartError } = await supabaseClient
            .from('cart_items')
            .delete()
            .eq('user_id', session.metadata.user_id);

          if (cartError) {
            console.error('Error clearing cart:', cartError);
          }
        }

        // Send email notification
        if (updatedOrder) {
          try {
            console.log('Sending order notification email...');
            const notificationResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-order-notification`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: updatedOrder.id
              }),
            });

            if (!notificationResponse.ok) {
              const errorText = await notificationResponse.text();
              console.error('Failed to send notification email:', errorText);
            } else {
              console.log('Order notification email sent successfully');
            }
          } catch (emailError) {
            console.error('Error sending notification email:', emailError);
            // Don't throw here as the order is already completed successfully
          }
        }

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Update order status to failed
        const { error } = await supabaseClient
          .from('orders')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        if (error) {
          console.error('Error updating failed order:', error);
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
}); 