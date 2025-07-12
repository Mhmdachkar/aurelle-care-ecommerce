import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gift } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDiscounts } from '@/hooks/useDiscounts';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const GiftSystem = () => {
  const { user } = useAuth();
  const { discountData, updateDiscountData } = useDiscounts();
  const [showGift, setShowGift] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    if (!user) return;

    // Show gift every 5 seconds
    const interval = setInterval(() => {
      setShowGift(true);
      setTimeout(() => setShowGift(false), 3000); // Hide after 3 seconds
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const handleGiftClick = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to claim rewards",
        variant: "destructive"
      });
      return;
    }
    setShowDialog(true);
  };

  const handleClaimGiftDiscount = async () => {
    if (!user || !discountData) return;

    if (discountData.gift_discount_used) {
      toast({
        title: "Already claimed",
        description: "You have already claimed your gift discount!",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('user_discounts')
      .update({ 
        gift_discount_used: true,
        total_discount: discountData.total_discount + 10
      })
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to claim discount",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success! 🎉",
        description: "You got 10% discount! It will be applied at checkout.",
        variant: "default"
      });
      updateDiscountData({ 
        gift_discount_used: true,
        total_discount: (discountData?.total_discount || 10) + 10
      });
    }
  };

  const handlePromoCode = async () => {
    if (!user || !discountData) return;

    if (promoCode.toLowerCase().trim() !== 'aurelle') {
      toast({
        title: "Invalid code",
        description: "Please enter the correct promo code",
        variant: "destructive"
      });
      return;
    }

    if (discountData.code_discount_used) {
      toast({
        title: "Already used",
        description: "You have already used this promo code!",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('user_discounts')
      .update({ 
        code_discount_used: true,
        total_discount: discountData.total_discount + 10
      })
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to apply promo code",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success! 🎉",
        description: "Promo code applied! Additional 10% discount added.",
        variant: "default"
      });
      updateDiscountData({ 
        code_discount_used: true,
        total_discount: (discountData?.total_discount || 10) + 10
      });
      setPromoCode('');
    }
  };

  return (
    <>
      {/* Floating Gift Icon */}
      <div 
        className={`fixed left-2 sm:left-4 top-1/2 z-50 transition-all duration-500 ${
          showGift ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`}
      >
        <Button
          onClick={handleGiftClick}
          className="bg-gradient-rose hover:bg-gradient-hero text-white rounded-full p-2 sm:p-4 shadow-luxury animate-bounce hover:scale-110 transition-all"
        >
          <Gift className="h-6 w-6 sm:h-8 sm:w-8 animate-spin" />
        </Button>
      </div>

      {/* Gift Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md max-w-[95vw] bg-background border-gold">
          <DialogHeader>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold gradient-text flex items-center justify-center gap-2">
              <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-gold animate-pulse" />
              Special Rewards!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 py-4">
            {/* Current Discount Display */}
            {discountData && discountData.total_discount > 0 && (
              <div className="text-center p-3 sm:p-4 bg-gradient-gold rounded-lg border border-gold">
                <p className="text-base sm:text-lg font-bold text-primary">
                  Current Discount: {discountData.total_discount}% OFF
                </p>
              </div>
            )}

            {/* Gift Discount */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-primary text-sm sm:text-base">🎁 Free Gift Discount</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Claim your 10% discount just for being logged in!
              </p>
              <Button
                onClick={handleClaimGiftDiscount}
                disabled={discountData?.gift_discount_used}
                className="w-full bg-gradient-luxury hover:bg-gradient-hero text-sm sm:text-base"
              >
                {discountData?.gift_discount_used ? '✅ Already Claimed' : '🎁 Claim 10% OFF'}
              </Button>
            </div>

            {/* Promo Code */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-primary text-sm sm:text-base">🎯 Promo Code</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Enter our page name for an additional 10% discount!
              </p>
              <div className="space-y-2">
                <Label htmlFor="promoCode" className="text-xs sm:text-sm">Promo Code</Label>
                <Input
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code..."
                  className="border-gold focus:border-primary text-sm"
                  disabled={discountData?.code_discount_used}
                />
              </div>
              <Button
                onClick={handlePromoCode}
                disabled={!promoCode || discountData?.code_discount_used}
                className="w-full bg-gradient-rose hover:bg-gradient-hero text-sm sm:text-base"
              >
                {discountData?.code_discount_used ? '✅ Code Used' : '🎯 Apply Code'}
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              <p>💡 Hint: The promo code is "AURELLE"!</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};