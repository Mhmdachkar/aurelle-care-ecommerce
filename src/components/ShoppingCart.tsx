import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart as CartIcon, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { CheckoutButton } from '@/components/CheckoutButton';

interface ShoppingCartProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ShoppingCart = ({ isOpen, onOpenChange }: ShoppingCartProps) => {
  const { cartItems, removeFromCart, updateQuantity, loading, cartCount, updateTrigger } = useCart();
  const { user } = useAuth();

  // Only log when cart count or update trigger actually changes (reduced logging)
  // console.log('🛒 ShoppingCart render:', { cartCount, updateTrigger });

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return currency;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button 
          id="global-cart-button"
          variant="outline" 
          className="relative h-12 w-12 bg-cream hover:bg-gold hover:text-primary border-gold transition-luxury hover:shadow-gold"
        >
          <CartIcon className="h-6 w-6" />
          {cartCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-gradient-rose text-white text-xs animate-pulse-glow"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-96 bg-background border-gold">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 gradient-text">
            <CartIcon className="h-5 w-5" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-8">
              <CartIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Your cart is empty</p>
              {!user && (
                <p className="text-xs text-gold-dark mt-2">
                  💫 Sign in to get 10% off your order!
                </p>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-cream rounded-lg border border-gold">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-primary truncate">
                        {item.product_name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Variant: {item.variant}
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {getCurrencySymbol(item.currency)} {item.price}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 hover:bg-gold hover:text-primary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 hover:bg-gold hover:text-primary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gold space-y-3">
                {!user && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg border border-blue-200">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-blue-800">💡 Quick Checkout Available!</p>
                      <p className="text-xs text-blue-600">Continue as guest or sign in for member benefits</p>
                    </div>
                  </div>
                )}
                <CheckoutButton 
                  className="w-full bg-gradient-luxury hover:bg-gradient-hero text-primary-foreground py-3"
                  currency="USD"
                />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};