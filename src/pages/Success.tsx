import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight, Download, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  currency: string;
  status: string;
  customer_email: string;
  customer_name?: string;
  created_at: string;
  is_guest?: boolean;
  order_items: Array<{
    product_name: string;
    variant: string;
    quantity: number;
    unit_price: number;
    image_url: string;
  }>;
}

const Success = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // For guest orders, we don't need authentication
        // We can fetch orders directly using the stripe_session_id
        const { data: orderData, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .eq('stripe_session_id', sessionId)
          .single();

        if (error) {
          console.error('Error fetching order:', error);
        } else {
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  const getCurrencySymbol = (currency: string) => {
    switch (currency.toUpperCase()) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return currency;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-rose-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (!sessionId || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cream to-rose-muted flex items-center justify-center">
        <Card className="max-w-md mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your order details. Please check your email for confirmation.
          </p>
          <Link to="/">
            <Button className="bg-gradient-luxury hover:bg-gradient-hero">
              Return to Store
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cream to-rose-muted">
      {/* Header */}
      <div className="bg-gradient-luxury py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-3">
            <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <div className="text-gold text-xl font-bold">A</div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">AURELLE</h1>
          <p className="text-gold text-lg font-light tracking-widest">— CARE —</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your order. We're preparing your luxury skincare products.
            </p>
            {order.is_guest && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Guest Order:</strong> Save this page! Your order details are available here.
                  {order.customer_email && ` We've also sent a confirmation to ${order.customer_email}`}
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <Card className="mb-8 overflow-hidden luxury-border">
            <div className="bg-gradient-to-r from-cream to-gold-light p-6 border-b border-gold/30">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Order Confirmation</h2>
                  <p className="text-primary/80">Order #{order.order_number}</p>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {order.is_guest && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Guest Order
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold gradient-text">
                    {getCurrencySymbol(order.currency)}{order.total_amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">
                    {order.currency}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.order_items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-cream rounded-lg border border-gold/30">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary">{item.product_name}</h4>
                      <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {getCurrencySymbol(order.currency)}{item.unit_price.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center hover-lift">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gold" />
              <h3 className="text-lg font-bold text-primary mb-2">Confirmation Email</h3>
              <p className="text-sm text-muted-foreground">
                {order.customer_email ? 
                  `Order details sent to ${order.customer_email}` :
                  'Please save this page for your records'
                }
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-lift">
              <Package className="h-12 w-12 mx-auto mb-4 text-rose" />
              <h3 className="text-lg font-bold text-primary mb-2">Processing</h3>
              <p className="text-sm text-muted-foreground">
                Your order is being prepared and will ship within 1-2 business days
              </p>
            </Card>
            
            <Card className="p-6 text-center hover-lift">
              <Download className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-bold text-primary mb-2">Tracking Info</h3>
              <p className="text-sm text-muted-foreground">
                You'll receive tracking details via email once your order ships
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-gradient-luxury hover:bg-gradient-hero">
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-gold text-primary hover:bg-gold hover:text-white"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success; 