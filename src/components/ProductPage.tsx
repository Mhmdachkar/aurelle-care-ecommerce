import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ImageGallery } from '@/components/ImageGallery';
import { CurrencySelector } from '@/components/CurrencySelector';
import { ProductInfo } from '@/components/ProductInfo';
import { TrustBadges } from '@/components/TrustBadges';
import { BeforeAfterResults } from '@/components/BeforeAfterResults';
import { ProfileButton } from '@/components/ProfileButton';
import { ShoppingCart } from '@/components/ShoppingCart';
import { GiftSystem } from '@/components/GiftSystem';
import { Heart, ShoppingCart as CartIcon, Eye, Star, Shield, Truck, RotateCcw, Clock, Zap, Award } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useDiscounts } from '@/hooks/useDiscounts';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const ProductPage = () => {
  const [selectedVariant, setSelectedVariant] = useState('Rose');
  const [quantity, setQuantity] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { getTotalDiscount } = useDiscounts();
  const { trackViewContent } = useMetaPixel();

  // Track ViewContent event when component mounts
  useEffect(() => {
    trackViewContent(
      'Champagne Beaute Lift Firming Body Crème',
      'Skincare',
      22.99
    );
  }, [trackViewContent]);

  // Scroll animations
  const productGallery = useScrollAnimation({ threshold: 0.2 });
  const productDetails = useScrollAnimation({ threshold: 0.1 });
  const pricingSection = useScrollAnimation({ threshold: 0.3 });
  const variantSection = useScrollAnimation({ threshold: 0.2 });
  const featuresSection = useScrollAnimation({ threshold: 0.1 });
  const videoSection = useScrollAnimation({ threshold: 0.2 });
  const { ref: statsRef, visibleItems: statsVisible } = useStaggeredAnimation(2, 200);

  const basePrices = {
    USD: { current: '22.99', original: '39.90' },
    GBP: { current: '18.49', original: '31.70' },
    EUR: { current: '21.59', original: '37.40' }
  };

  // Calculate prices with actual discounts from gift system
  const totalDiscount = getTotalDiscount();
  const discountMultiplier = (100 - totalDiscount) / 100;
  
  const prices = user ? {
    USD: { 
      current: (parseFloat(basePrices.USD.current) * discountMultiplier).toFixed(2), 
      original: basePrices.USD.original,
      beforeDiscount: basePrices.USD.current,
      totalDiscount
    },
    GBP: { 
      current: (parseFloat(basePrices.GBP.current) * discountMultiplier).toFixed(2), 
      original: basePrices.GBP.original,
      beforeDiscount: basePrices.GBP.current,
      totalDiscount
    },
    EUR: { 
      current: (parseFloat(basePrices.EUR.current) * discountMultiplier).toFixed(2), 
      original: basePrices.EUR.original,
      beforeDiscount: basePrices.EUR.current,
      totalDiscount
    }
  } : basePrices;

  const variants = ['Rose', 'Vanilla', 'Sweet Almond Coconut'];

  const handleAddToCart = async () => {
    const variantImages = {
      'Rose': '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png',
      'Vanilla': '/lovable-uploads/cb6c6690-1cbb-4768-b0be-65ccae0fb4d6.png',
      'Sweet Almond Coconut': '/lovable-uploads/72e5fa9a-1957-4804-aeb8-9ba74a901107.png'
    };

    await addToCart({
      product_name: 'Champagne Beaute Lift Firming Body Crème',
      variant: selectedVariant,
      quantity,
      price: prices[selectedCurrency as keyof typeof prices].current,
      currency: selectedCurrency,
      image_url: variantImages[selectedVariant as keyof typeof variantImages] || variantImages['Rose']
    });

    // Scroll to cart icon smoothly and open the cart
    const cartButton = document.querySelector('[data-cart-trigger]');
    if (cartButton) {
      cartButton.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
      
      // Small delay to ensure scrolling completes before opening cart
      setTimeout(() => {
        setIsCartOpen(true);
      }, 800);
    } else {
      // If cart button not found, just open the cart immediately
      setIsCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cream to-rose-muted">
      {/* Header with Brand Logo and Navigation */}
      <div className="bg-gradient-luxury py-0 animate-fade-in-up">
        <div className="container mx-auto px-4">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-4 py-2">
            <div className="flex items-center gap-3">
              <ProfileButton />
              <div data-cart-trigger>
                <ShoppingCart isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
              </div>
            </div>
            <div className="text-xs text-primary-foreground/80">
              {user && `Welcome, ${user.email?.split('@')[0]}!`}
            </div>
          </div>
          
          {/* Brand Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-3 animate-float">
              <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center animate-glow">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <div className="text-gold text-xl font-bold">A</div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1 animate-slide-in-right">
              AURELLE
            </h1>
            <p className="text-gold text-lg font-light tracking-widest animate-slide-in-right">
              — CARE —
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Product Images Section */}
          <div 
            ref={productGallery.ref as any}
            className={`space-y-4 scroll-slide-left ${productGallery.isVisible ? 'visible' : ''}`}
          >
            <ImageGallery selectedVariant={selectedVariant} />
            
            {/* Quick Stats */}
            <div ref={statsRef as any} className="grid grid-cols-2 gap-3">
              <Card className={`p-3 hover-lift animate-fade-in-up animate-card-float bg-gradient-to-r from-rose-muted to-cream border-none transform-3d perspective-500 scroll-scale ${statsVisible[0] ? 'visible' : ''}`}>
                <div className="flex items-center space-x-2">
                  <Heart className="text-rose h-4 w-4 animate-bounce-3d" />
                  <div>
                    <div className="text-base font-bold text-primary">12.5K</div>
                    <div className="text-xs text-muted-foreground">Recommendations</div>
                  </div>
                </div>
              </Card>
              
              <Card className={`p-3 hover-lift animate-fade-in-up animate-card-float bg-gradient-to-r from-cream to-gold-light border-none transform-3d perspective-500 scroll-scale ${statsVisible[1] ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-2">
                  <Eye className="text-gold-dark h-4 w-4 animate-rotate-glow" />
                  <div>
                    <div className="text-base font-bold text-primary">2.0K</div>
                    <div className="text-xs text-muted-foreground">Browsing Now</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Product Results Video */}
            <div 
              ref={videoSection.ref as any}
              className={`mt-6 animate-fade-in-up scroll-slide-up ${videoSection.isVisible ? 'visible' : ''}`}
              style={{animationDelay: '0.4s'}}
            >
              <Card className="overflow-hidden hover-lift luxury-border bg-gradient-to-br from-cream via-background to-rose-muted">
                  <div className="p-3 sm:p-4 space-y-3">
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-gold fill-gold" />
                        <h3 className="text-base sm:text-lg font-bold gradient-text">Real Results Video</h3>
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-gold fill-gold" />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        See the transformation in action
                      </p>
                    </div>
                    
                    <div className="relative rounded-xl overflow-hidden border-2 border-gold/30 shadow-luxury">
                      <video 
                        controls 
                        preload="metadata"
                        className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-cover"
                        poster="/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png"
                      >
                        <source src="/videos/Screen Recording 2025-07-07 172049.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Video overlay badge */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                        <Badge className="bg-gradient-rose text-white px-2 sm:px-3 py-1 text-xs font-bold shadow-luxury">
                          ✨ REAL RESULTS
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        💫 Watch how our premium formula delivers visible results
                      </p>
                    </div>
                  </div>
              </Card>
            </div>
          </div>

          {/* Product Details Section */}
          <div 
            ref={productDetails.ref as any}
            className={`space-y-6 scroll-slide-right ${productDetails.isVisible ? 'visible' : ''}`}
          >
            {/* Product Title & Rating */}
            <div className="space-y-4 animate-slide-in-right">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight tracking-wide">
                  Champagne Beaute Lift Firming Body Crème
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-gold text-gold drop-shadow-sm" />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">(2,847 reviews)</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-base sm:text-lg font-semibold text-primary">8 fl.oz.</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">237 mL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div 
              ref={pricingSection.ref as any}
              className={`space-y-6 animate-fade-in-up scroll-slide-up ${pricingSection.isVisible ? 'visible' : ''}`}
            >
              <div className="bg-gradient-to-br from-cream via-background to-rose-muted p-6 rounded-2xl border-2 border-gold/30 shadow-luxury">
                <div className="space-y-4">
                  {/* Currency Selector */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">Currency:</span>
                    <CurrencySelector 
                      selectedCurrency={selectedCurrency}
                      onCurrencyChange={setSelectedCurrency}
                    />
                  </div>
                  
                  {/* Main Price Display */}
                  <div className="text-center space-y-3">
                    <div className="flex items-baseline justify-center space-x-2 sm:space-x-4">
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text animate-pulse-glow tracking-tight">
                        {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'GBP' ? '£' : '€'} 
                        {prices[selectedCurrency as keyof typeof prices].current}
                      </span>
                      {user && totalDiscount > 0 && (
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg font-bold animate-pulse transform rotate-12">
                          {totalDiscount}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    {/* Original Prices */}
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 flex-wrap gap-1 sm:gap-0">
                      {user && (
                        <span className="text-base sm:text-xl text-muted-foreground line-through opacity-75 font-medium">
                          {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'GBP' ? '£' : '€'} 
                          {(prices[selectedCurrency as keyof typeof prices] as any).beforeDiscount}
                        </span>
                      )}
                      <span className="text-base sm:text-xl text-muted-foreground line-through opacity-75 font-medium">
                        {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'GBP' ? '£' : '€'} 
                        {prices[selectedCurrency as keyof typeof prices].original}
                      </span>
                      <Badge className="bg-gradient-rose text-white px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-bold animate-pulse-glow transform hover:scale-110 transition-transform shadow-luxury">
                        Save 43%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Member Bonus Banner */}
              {!user && (
                <div className="bg-gradient-to-r from-gold/20 via-gold-light/30 to-gold/20 p-3 sm:p-4 rounded-xl border-2 border-gold border-dashed animate-bounce-3d">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl sm:text-2xl">💫</span>
                      <span className="text-sm sm:text-lg font-bold text-primary">EXCLUSIVE MEMBER BONUS</span>
                      <span className="text-xl sm:text-2xl">💫</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-primary">
                      Sign in to unlock <span className="font-bold text-gold-dark">UP TO 30% OFF</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Base 10% + Gift 10% + Promo Code "AURELLE" 10%
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Style Selection */}
            <div 
              ref={variantSection.ref as any}
              className={`space-y-4 animate-fade-in-up scroll-slide-up ${variantSection.isVisible ? 'visible' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-primary tracking-wide">Style</h3>
                <div className="h-px bg-gradient-to-r from-gold to-rose-300 flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {variants.map((variant, index) => (
                  <Button
                    key={variant}
                    variant={selectedVariant === variant ? "default" : "outline"}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-4 h-auto text-left transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      selectedVariant === variant 
                        ? "bg-gradient-rose text-white shadow-luxury border-rose-400 ring-2 ring-rose-300/50" 
                        : "border-2 border-rose-200 text-primary hover:border-rose-300 hover:bg-gradient-to-br hover:from-rose-50 hover:to-gold-light/20"
                    } scroll-scale ${variantSection.isVisible ? 'visible' : ''}`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold text-base">{variant}</div>
                      <div className="text-xs opacity-75">
                        {variant === 'Rose' && 'Floral & Elegant'}
                        {variant === 'Vanilla' && 'Warm & Comforting'}
                        {variant === 'Sweet Almond Coconut' && 'Tropical & Nourishing'}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-5 animate-fade-in-up">
              <div className="bg-gradient-to-r from-cream via-background to-rose-muted p-4 rounded-xl border border-gold/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-primary tracking-wide">Quantity</h3>
                  <div className="flex items-center bg-white border-2 border-gold rounded-xl shadow-lg">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-lg font-bold hover:bg-gold hover:text-white transition-all duration-300 rounded-l-xl"
                    >
                      −
                    </Button>
                    <div className="px-6 py-2 font-bold text-lg min-w-[3rem] text-center bg-gradient-to-r from-gold/10 to-rose/10 text-primary">
                      {quantity}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-lg font-bold hover:bg-gold hover:text-white transition-all duration-300 rounded-r-xl"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="w-full bg-gradient-luxury hover:bg-gradient-hero text-primary-foreground py-4 text-lg font-bold shadow-luxury animate-pulse-glow transition-all duration-500 hover:scale-105 hover:shadow-2xl transform-gpu relative overflow-hidden group"
                style={{
                  transform: 'perspective(1000px) rotateX(-2deg)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 40px rgba(260, 45%, 35%, 0.4)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <CartIcon className="mr-3 h-6 w-6 animate-bounce" />
                <span className="relative z-10">
                  ✨ ADD TO CART - {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'GBP' ? '£' : '€'} 
                  {prices[selectedCurrency as keyof typeof prices].current} {user && totalDiscount > 0 ? `(${totalDiscount}% OFF)` : ''} ✨
                </span>
              </Button>
            </div>

            {/* Trust Badges */}
            <TrustBadges />
          </div>
        </div>

        {/* Product Information Sections */}
        <div className="mt-12 space-y-12">
          <ProductInfo />
          <BeforeAfterResults />
          
          {/* Additional Features */}
          <div 
            ref={featuresSection.ref as any}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 scroll-slide-up ${featuresSection.isVisible ? 'visible' : ''}`}
          >
            {[
              { icon: Zap, title: "Visible Results", desc: "In just 4 weeks", color: "text-gold" },
              { icon: Shield, title: "100% Safe", desc: "All skin types", color: "text-rose" },
              { icon: Award, title: "Luxury Formula", desc: "Premium ingredients", color: "text-primary" },
              { icon: Truck, title: "Fast Shipping", desc: "Priority delivery", color: "text-gold-dark" }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className={`p-4 text-center hover-lift animate-fade-in-up luxury-border animate-tilt transform-3d perspective-1000 scroll-scale ${featuresSection.isVisible ? 'visible' : ''}`}
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <feature.icon className={`h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-3 ${feature.color} animate-bounce-3d`} style={{animationDelay: `${index * 0.3}s`}} />
                <h3 className="text-sm sm:text-base font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gift System */}
      <GiftSystem />
    </div>
  );
};

export default ProductPage;