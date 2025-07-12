import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CheckoutButtonProps {
  currency?: string;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
}

export const CheckoutButton = ({ 
  currency = 'USD', 
  className = '',
  variant = 'default' 
}: CheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { cartItems, cartCount, updateTrigger } = useCart();
  const { user } = useAuth();
  const { trackInitiateCheckout } = useMetaPixel();

  console.log('💳 CheckoutButton render:', { cartCount, updateTrigger });

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Add items to your cart before checking out",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Calculate total value for Meta Pixel tracking
      const totalValue = cartItems.reduce((total, item) => 
        total + (parseFloat(item.price) * item.quantity), 0
      );
      const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

      // Track Meta Pixel InitiateCheckout event
      trackInitiateCheckout(totalValue, currency, totalItems);

      let authHeaders = {};
      
      if (user) {
        // Get current session token for logged-in users
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          authHeaders = {
            Authorization: `Bearer ${session.access_token}`,
          };
        }
      }
      // For guest users, we proceed without auth headers

      // Call Supabase Edge Function to create checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          cartItems,
          currency,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/`,
          isGuest: !user, // Flag to indicate guest checkout
        },
        headers: authHeaders,
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const getCurrencySymbol = (curr: string) => {
    switch (curr) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return curr;
    }
  };

  return (
    <Button
      key={`checkout-${updateTrigger}-${cartCount}`}
      onClick={handleCheckout}
      disabled={loading || cartItems.length === 0}
      variant={variant}
      className={`relative overflow-hidden group ${className}`}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && <CreditCard className="mr-2 h-4 w-4" />}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <span className="relative z-10">
        {loading ? 'Processing...' : 
          cartItems.length > 0 
            ? `Secure Checkout - ${getCurrencySymbol(currency)}${getTotalAmount().toFixed(2)} (${cartCount} items)`
            : 'Secure Checkout'
        }
      </span>
    </Button>
  );
}; 