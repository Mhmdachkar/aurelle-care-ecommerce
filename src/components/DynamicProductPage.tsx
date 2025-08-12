import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProfileButton } from '@/components/ProfileButton';
import { ShoppingCart } from '@/components/ShoppingCart';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Sparkles, Heart, Eye, ShieldCheck, Sun, Cpu, ActivitySquare, Zap } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

// Consistent theme colors with homepage
const THEME_PRIMARY = '#A4193D'; // deep rose
const THEME_ACCENT = '#FFDFB9'; // peach
const THEME_GOLD = '#D4AF37'; // luxury gold

// Product data structure
interface ProductData {
  id: string;
  name: string;
  description: string;
  price: {
    current: string;
    original: string;
    currency?: string;
  };
  images: Array<{
    src: string;
    alt: string;
    fallback?: string;
  }>;
  variants?: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
  features: Array<{
    icon: any;
    label: string;
  }>;
  stats: {
    recommendations: string;
    browsing: string;
    reviews: string;
  };
  video?: {
    src: string;
    poster: string;
    title: string;
  };
  clinicalResults?: Array<{
    mode: string;
    icon: string;
    color: string;
    results: Array<{
      label: string;
      value: string;
      type: 'increase' | 'decrease';
    }>;
  }>;
  accordionSections: Array<{
    id: string;
    title: string;
    icon: string;
    content: any; // Can be JSX or string
  }>;
  madeIn: string;
  officialBadge?: string;
}

interface DynamicProductPageProps {
  productData: ProductData;
}

export default function DynamicProductPage({ productData }: DynamicProductPageProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { trackViewContent } = useMetaPixel();



  const [selectedVariant, setSelectedVariant] = useState(productData.variants?.[0]?.name || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  // Update main image when variant changes for products with variant-specific images
  useEffect(() => {
    if (productData.variants && productData.variants.length > 0) {
      // For products like Booster Pro, set main image based on variant
      const variantIndex = productData.variants.findIndex(v => v.name === selectedVariant);
      if (variantIndex !== -1) {
        setSelectedImage(variantIndex);
      }
    }
  }, [selectedVariant, productData.variants]);

  // Debug variant data
  useEffect(() => {
    console.log('🎨 Variant debug:', {
      hasVariants: !!productData.variants,
      variantCount: productData.variants?.length || 0,
      variants: productData.variants,
      productName: productData.name
    });
    
    if (productData.variants && productData.variants.length > 0) {
      console.log('🔀 Mapping variants:', productData.variants);
      productData.variants.forEach((variant, index) => {
        console.log('🎨 Variant available:', variant.name, variant.description, index);
      });
    }
  }, [productData.variants, productData.name]);

  // Animation hooks
  const productGallery = useScrollAnimation({ threshold: 0.2 });
  const productDetails = useScrollAnimation({ threshold: 0.1 });
  const pricingSection = useScrollAnimation({ threshold: 0.3 });
  const featuresSection = useScrollAnimation({ threshold: 0.1 });
  const videoSection = useScrollAnimation({ threshold: 0.2 });
  const clinicalSection = useScrollAnimation({ threshold: 0.4 });
  const { ref: statsRef, visibleItems: statsVisible } = useStaggeredAnimation(2, 200);

  const safeImg = (src?: string) => src || '/placeholder.svg';

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Autoplay/pause video when the video section enters/leaves view
  useEffect(() => {
    if (!productData.video) return;
    const el = videoRef.current;
    if (!el) return;
    if (videoSection.isVisible) {
      const tryPlay = async () => {
        try {
          await el.play();
        } catch {
          // Ignore autoplay errors
        }
      };
      tryPlay();
    } else {
      el.pause();
    }
  }, [videoSection.isVisible, productData.video]);

  useEffect(() => {
    const trackViewContentWithDelay = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        trackViewContent(productData.name, 'Skincare', parseFloat(productData.price.current.replace(/[^0-9.]/g, '')));
      } else {
        setTimeout(trackViewContentWithDelay, 1000);
      }
    };
    setTimeout(trackViewContentWithDelay, 500);
  }, [productData.name, productData.price.current, trackViewContent]);

  const handleAddToCart = async () => {
    const currentImage = productData.images[selectedImage]?.src || productData.images[0]?.src;
    
    await addToCart({
      product_name: productData.name,
      variant: selectedVariant || 'Default',
      quantity: qty,
      price: productData.price.current,
      currency: productData.price.currency || 'USD',
      image_url: currentImage
    });
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
                <div>
                  <ShoppingCart />
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
            {/* Main Product Image */}
            <Card className="overflow-hidden hover-lift luxury-border bg-gradient-to-br from-cream via-background to-rose-muted">
              <img
                src={safeImg(productData.images[selectedImage]?.src)}
                onError={(e) => ((e.target as HTMLImageElement).src = productData.images[selectedImage]?.fallback || '/placeholder.svg')}
                alt={productData.images[selectedImage]?.alt || productData.name}
                className="w-full h-[420px] object-contain bg-white"
              />
            </Card>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {productData.images.map((img, i) => (
                <Card
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`p-1 cursor-pointer border hover-lift animate-fade-in-up transition-all duration-300 ${
                    selectedImage === i ? 'ring-2 ring-rose-500 shadow-lg' : 'hover:shadow-md'
                  }`}
                  style={{animationDelay: `${i * 0.05}s`}}
                >
                  <img
                    src={safeImg(img.src)}
                    onError={(e) => ((e.target as HTMLImageElement).src = img.fallback || '/placeholder.svg')}
                    alt={img.alt || `${productData.name} image ${i + 1}`}
                    className="w-full h-20 object-cover rounded"
                  />
                </Card>
              ))}
            </div>
            
            {/* Quick Stats */}
            <div ref={statsRef as any} className="grid grid-cols-2 gap-3">
              <Card className={`p-3 hover-lift animate-fade-in-up animate-card-float bg-gradient-to-r from-rose-muted to-cream border-none transform-3d perspective-500 scroll-scale ${statsVisible[0] ? 'visible' : ''}`}>
                <div className="flex items-center space-x-2">
                  <Heart className="text-rose h-4 w-4 animate-bounce-3d" />
                  <div>
                    <div className="text-base font-bold text-primary">{productData.stats.recommendations}</div>
                    <div className="text-xs text-muted-foreground">Recommendations</div>
                  </div>
                </div>
              </Card>
              
              <Card className={`p-3 hover-lift animate-fade-in-up animate-card-float bg-gradient-to-r from-cream to-gold-light border-none transform-3d perspective-500 scroll-scale ${statsVisible[1] ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-2">
                  <Eye className="text-gold-dark h-4 w-4 animate-rotate-glow" />
                  <div>
                    <div className="text-base font-bold text-primary">{productData.stats.browsing}</div>
                    <div className="text-xs text-muted-foreground">Browsing Now</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Video Section (if available) */}
            {productData.video && (
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
                        <h3 className="text-base sm:text-lg font-bold gradient-text">{productData.video.title}</h3>
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-gold fill-gold" />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        See the transformation in action
                      </p>
                    </div>
                    
                    <div className="relative rounded-xl overflow-hidden border-2 border-gold/30 shadow-luxury">
                      <video 
                        ref={videoRef}
                        controls 
                        preload="metadata"
                        muted
                        playsInline
                        autoPlay={videoSection.isVisible}
                        width="1920"
                        height="1080"
                        className="w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] object-contain bg-black/5 hover:scale-[1.02] transition-transform duration-300"
                        poster={productData.video.poster}
                        style={{
                          aspectRatio: '16/9',
                          filter: 'contrast(1.1) saturate(1.1) brightness(1.02)'
                        }}
                      >
                        <source src={productData.video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      
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
            )}
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
                  {productData.name}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-gold text-gold drop-shadow-sm" />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">({productData.stats.reviews} reviews)</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-base sm:text-lg font-semibold text-primary">{productData.officialBadge || 'Premium'}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{productData.madeIn}</p>
                  </div>
                </div>
                <p className="text-sm opacity-80 max-w-xl text-muted-foreground">
                  {productData.description}
                </p>
              </div>
            </div>

            {/* Pricing Section */}
            <div 
              ref={pricingSection.ref as any}
              className={`space-y-6 animate-fade-in-up scroll-slide-up ${pricingSection.isVisible ? 'visible' : ''}`}
            >
              <div className="p-6 rounded-2xl border-2 shadow-luxury" style={{
                background: `linear-gradient(135deg, ${THEME_ACCENT}08, #ffffff, ${THEME_PRIMARY}05)`,
                borderColor: `${THEME_GOLD}40`
              }}>
                <div className="space-y-4">
                  {/* Main Price Display */}
                  <div className="text-center space-y-3">
                    <div className="flex items-baseline justify-center space-x-2 sm:space-x-4">
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{
                        color: THEME_PRIMARY,
                        background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {productData.price.current}
                      </span>
                      <Badge className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg font-bold animate-pulse transform rotate-12" style={{
                        background: 'linear-gradient(135deg, #16a34a, #15803d)',
                        color: 'white'
                      }}>
                        50% OFF
                      </Badge>
                    </div>
                    
                    {/* Original Prices */}
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 flex-wrap gap-1 sm:gap-0">
                      <span className="text-base sm:text-xl line-through opacity-75 font-medium" style={{ color: `${THEME_PRIMARY}60` }}>
                        {productData.price.original}
                      </span>
                      <Badge className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-lg font-bold transform hover:scale-110 transition-transform shadow-luxury" style={{
                        background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                        color: THEME_ACCENT
                      }}>
                        Save 50%
                      </Badge>
                    </div>
                    
                    {/* Official Badge */}
                    <div className="flex items-center justify-center gap-2 text-sm" style={{ color: `${THEME_PRIMARY}70` }}>
                      <ShieldCheck className="h-4 w-4" /> Official — {productData.madeIn}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variant Selection (if available) */}
            {productData.variants && productData.variants.length > 0 ? (
              <div 
                className="space-y-4 animate-fade-in-up p-6 rounded-2xl border-2 shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${THEME_ACCENT}08, #ffffff, ${THEME_PRIMARY}05)`,
                  borderColor: `${THEME_GOLD}40`,
                  minHeight: '120px' // Force minimum height to make it visible
                }}
              >

                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-bold tracking-wide" style={{ color: THEME_PRIMARY }}>Style</h3>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${THEME_GOLD}, ${THEME_PRIMARY}40)` }}></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productData.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant.name)}
                      className="p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg text-left"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        ...(selectedVariant === variant.name 
                          ? {
                              background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                              color: THEME_ACCENT,
                              border: `2px solid ${THEME_GOLD}`,
                              boxShadow: `0 10px 30px ${THEME_PRIMARY}30, 0 0 20px ${THEME_GOLD}30`
                            }
                          : {
                              border: `2px solid ${THEME_PRIMARY}30`,
                              color: THEME_PRIMARY,
                              background: `linear-gradient(135deg, #ffffff, ${THEME_ACCENT}08)`
                            })
                      }}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-base">{variant.name}</div>
                        <div className="text-xs opacity-75">{variant.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Quantity & Add to Cart */}
            <div className="space-y-5 animate-fade-in-up">
              <div className="p-4 rounded-xl border-2 shadow-lg" style={{ 
                background: `linear-gradient(135deg, ${THEME_ACCENT}08, #ffffff, ${THEME_PRIMARY}05)`,
                borderColor: `${THEME_GOLD}40`
              }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold tracking-wide" style={{ color: THEME_PRIMARY }}>Quantity</h3>
                  <div className="flex items-center bg-white rounded-xl shadow-lg" style={{ border: `2px solid ${THEME_GOLD}` }}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-2 text-lg font-bold transition-all duration-300 rounded-l-xl"
                      style={{ 
                        color: THEME_PRIMARY,
                        // Hover styles handled by CSS classes
                      }}
                    >
                      −
                    </Button>
                    <div className="px-6 py-2 text-lg font-bold min-w-[50px] text-center" style={{ 
                      color: THEME_PRIMARY,
                      background: `linear-gradient(135deg, ${THEME_ACCENT}20, ${THEME_GOLD}10)`
                    }}>
                      {qty}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setQty(qty + 1)}
                      className="px-4 py-2 text-lg font-bold transition-all duration-300 rounded-r-xl"
                      style={{ 
                        color: THEME_PRIMARY,
                        // Hover styles handled by CSS classes
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="space-y-3">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                    color: THEME_ACCENT,
                    border: `2px solid ${THEME_GOLD}40`
                  }}
                  size="lg"
                >
                  <span className="mr-2">🛍️</span>
                  Add to Cart — {productData.price.current}
                </Button>
              </div>
            </div>

            {/* Feature Highlights */}
            <div ref={featuresSection.ref as any} className={`grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in-up scroll-slide-up ${featuresSection.isVisible ? 'visible' : ''}`}>
              {productData.features.map((feature, i) => (
                <Card key={i} className="p-3 text-center border hover-lift" style={{ borderColor: `${THEME_PRIMARY}22`, animationDelay: `${i * 0.1}s` }}>
                  <feature.icon className="mx-auto mb-2" style={{ color: THEME_PRIMARY }} />
                  <div className="text-sm font-semibold" style={{ color: THEME_PRIMARY }}>{feature.label}</div>
                </Card>
              ))}
            </div>

            {/* Clinical Results & Video Side by Side (if clinical results available) */}
            {productData.clinicalResults && (
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Clinical Results Section */}
                <div
                  ref={clinicalSection.ref as any}
                  className={`animate-fade-in-up scroll-slide-right ${clinicalSection.isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: '0.5s' }}
                >
                  <Card className="overflow-hidden hover-lift h-full border-2" style={{
                    background: `linear-gradient(135deg, ${THEME_ACCENT}08, #ffffff, ${THEME_PRIMARY}05)`,
                    borderColor: `${THEME_GOLD}40`
                  }}>
                    <div className="p-4 space-y-4 h-full flex flex-col">
                      {/* Header */}
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{
                            background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`
                          }}>
                            <span className="text-white text-xs font-bold">📊</span>
                          </div>
                          <h3 className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>Clinical Results</h3>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: THEME_PRIMARY }}>
                          Scientifically Proven Results
                        </p>
                        <p className="text-xs" style={{ color: `${THEME_PRIMARY}60` }}>
                          Clinical study excerpt - Results may vary
                        </p>
                      </div>

                      {/* Compact Results Grid */}
                      <div className="grid grid-cols-2 gap-3 flex-1">
                        {productData.clinicalResults.map((result, i) => (
                          <div key={i} className={`bg-gradient-to-br ${result.color} p-3 rounded-lg border border-gray-200/50 hover:shadow-md transition-all duration-300`}>
                            <div className="flex items-center gap-1 mb-2">
                              <div className="w-4 h-4 rounded-full bg-gradient-rose flex items-center justify-center">
                                <span className="text-white text-xs">{result.icon}</span>
                              </div>
                              <h4 className="text-sm font-bold" style={{ color: THEME_PRIMARY }}>{result.mode}</h4>
                            </div>
                            <div className="space-y-1 text-xs">
                              {result.results.map((res, j) => (
                                <div key={j} className="flex justify-between">
                                  <span className="text-gray-600">{res.label}:</span>
                                  <span className={`font-bold ${res.type === 'increase' ? 'text-green-600' : 'text-blue-600'}`}>
                                    {res.value}{res.type === 'increase' ? '↑' : '↓'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Badge */}
                      <div className="text-center mt-auto">
                        <Badge className="px-3 py-1 text-xs font-bold" style={{ 
                          background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`, 
                          color: THEME_ACCENT 
                        }}>
                          📊 Clinically Proven 🧬
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Enhanced Info Sections */}
            <div className="mt-8 space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold gradient-text mb-2">Product Information</h2>
                <div className="w-20 h-1 mx-auto bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full"></div>
              </div>
              
              <Accordion type="multiple" className="space-y-3">
                {productData.accordionSections.map((section, index) => (
                  <AccordionItem key={section.id} value={section.id} className="border-2 rounded-xl overflow-hidden" style={{ borderColor: `${THEME_PRIMARY}22` }}>
                    <AccordionTrigger className="px-6 py-4 hover:bg-rose-50 transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center">
                          <span className="text-white text-sm">{section.icon}</span>
                        </div>
                        <span className="font-semibold text-lg" style={{ color: THEME_PRIMARY }}>{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 bg-gradient-to-br from-rose-50/30 to-transparent">
                      {typeof section.content === 'string' ? (
                        <p className="text-gray-700">{section.content}</p>
                      ) : (
                        section.content
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* LED Colors Banner (optional) */}
            <Card className="mt-6 p-4 text-center border-2" style={{ borderColor: `${THEME_PRIMARY}33` }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sun style={{ color: THEME_PRIMARY }} />
                <h3 className="font-bold" style={{ color: THEME_PRIMARY }}>Premium Quality</h3>
              </div>
              <p className="text-sm" style={{ color: '#7f2039' }}>Experience luxury skincare with professional-grade results.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
