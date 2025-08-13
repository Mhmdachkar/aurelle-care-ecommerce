import { useMemo, useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DynamicProductPage from '@/components/DynamicProductPage';
import TransformationSection from '@/components/TransformationSection';
import ReadyForTransformationSection from '@/components/ReadyForTransformationSection';
import { PRODUCT_DATA, type ProductId } from '@/data/productData.tsx';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, Heart, Award, ShieldCheck, Truck, RotateCcw, Zap, Crown, Gift } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { useAuth } from '@/hooks/useAuth';
import { ProfileButton } from '@/components/ProfileButton';
import { ShoppingCart } from '@/components/ShoppingCart';

const THEME_PRIMARY = '#A4193D'; // deep rose
const THEME_ACCENT = '#FFDFB9'; // peach
const THEME_GOLD = '#D4AF37'; // luxury gold

const PRODUCTS: Array<{
  slug: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}> = [
  { slug: 'champagne-beaute-lift', name: 'Champagne Beaute Lift', price: '$22.99', image: '/products/product-1/product1_rose.webp', badge: 'Best Seller' },
  { slug: 'booster-pro', name: 'AGE-R Booster Pro', price: '14.799,00 TL', image: '/products/product-2-booster-pro/pink.png', badge: 'New' },
  { slug: 'vanilla-velvet-balm', name: 'Vanilla Velvet Balm', price: '$26.50', image: '/products/product-1-champagne-beaute/almond-variant.png' },
  { slug: 'truffle-glow-serum', name: 'Truffle Glow Serum', price: '$39.00', image: '/products/before-after/after-1.png', badge: 'New' },
  { slug: 'caviar-firming-lotion', name: 'Caviar Firming Lotion', price: '$34.90', image: '/products/before-after/before-1.png' },
  { slug: 'gold-peptide-elixir', name: 'Gold Peptide Elixir', price: '$49.00', image: '/products/product-2-booster-pro/gallery-4.png' },
  { slug: 'pink-pepper-tonic', name: 'Pink Pepper Tonic', price: '$21.99', image: '/products/homepage-cards/card-3.png' },
  { slug: 'grape-callus-essence', name: 'Grape Callus Essence', price: '$27.50', image: '/products/homepage-cards/card-4.png' },
  { slug: 'silk-body-butter', name: 'Silk Body Butter', price: '$24.99', image: '/products/homepage-cards/card-5.png' },
  { slug: 'pdrn-pink-collagen-capsule-cream', name: 'PDRN Pink Collagen Capsule Cream', price: '$20.00', image: '/products/product-3-template/product-3.jpg', badge: 'New' },
  { slug: 'intensive-vitamin-c-capsule-cream', name: 'Intensive Vitamin C Capsule Cream', price: '1.599,00 TL', image: '/products/product-4-template/product-4.jpg', badge: 'New' },
  { slug: 'txa-niacinamide-capsule-cream', name: 'TXA Niacinamide Capsule Cream', price: '$39.00', image: '/products/product-5-template/product-5.jpg', badge: 'New' },
  { slug: 'collagen-night-care-mask', name: 'Collagen Night Care Mask', price: '1.799,00 TL', image: '/products/product-6-template/product-6.jpg', badge: 'New' },
];

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSection, setVisibleSection] = useState('hero');
  
  // Animation refs
  const heroAnim = useScrollAnimation({ threshold: 0.1 });
  const readyTransformationAnim = useScrollAnimation({ threshold: 0.15 });
  const productsHeaderAnim = useScrollAnimation({ threshold: 0.15 });
  const transformationResultsAnim = useScrollAnimation({ threshold: 0.15 });
  const promiseAnim = useScrollAnimation({ threshold: 0.2 });
  const newsletterAnim = useScrollAnimation({ threshold: 0.3 });
  const { ref: productGridRef, visibleItems: productVisible } = useStaggeredAnimation(PRODUCTS.length, 120);
  const { ref: promiseGridRef, visibleItems: promiseVisible } = useStaggeredAnimation(3, 150);

  const productSlug = useMemo(() => new URLSearchParams(location.search).get('product'), [location.search]);
  const isViewingProduct = Boolean(productSlug);

  // Parallax scroll effect
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // Mouse tracking for interactive elements
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Section visibility tracking
  const updateVisibleSection = useCallback(() => {
    const sections = ['hero', 'ready-transformation', 'products', 'transformation-results', 'promise', 'newsletter'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      }
      return false;
    });
    if (currentSection) setVisibleSection(currentSection);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    
    // Add scroll listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateVisibleSection);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateVisibleSection);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, updateVisibleSection, handleMouseMove]);

  if (isViewingProduct) {
    // Use dynamic product page with product data
    const productData = PRODUCT_DATA[productSlug as ProductId];
    
    if (!productData) {
      // Fallback for unknown products
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
            <Button onClick={() => navigate({ pathname: '/', search: '' })}>
              ← Back to Home
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="outline"
            onClick={() => navigate({ pathname: '/', search: '' })}
            className="mb-4 border-2"
            style={{ borderColor: THEME_PRIMARY, color: THEME_PRIMARY }}
          >
            ← Back to Home
          </Button>
        </div>
        <DynamicProductPage productData={productData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
      background: `linear-gradient(135deg, ${THEME_ACCENT}08 0%, #ffffff 30%, ${THEME_PRIMARY}05 100%)`,
      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Enhanced Floating Elements with Parallax */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10 animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${THEME_GOLD}, transparent)`,
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)`
          }}
        />
        <div 
          className="absolute top-1/3 -left-16 w-32 h-32 rounded-full opacity-5 animate-bounce"
          style={{ 
            background: `radial-gradient(circle, ${THEME_PRIMARY}, transparent)`, 
            animationDuration: '3s',
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, ${THEME_ACCENT}, transparent)`,
            animation: 'float 6s ease-in-out infinite',
            transform: `translate(${scrollY * 0.06}px, ${scrollY * -0.04}px)`
          }}
        />
        
        {/* Additional floating beauty elements */}
        <div 
          className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full opacity-8"
          style={{ 
            background: `radial-gradient(circle, ${THEME_GOLD}40, transparent)`,
            animation: 'float 8s ease-in-out infinite reverse',
            transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.08}px)`
          }}
        />
        <div 
          className="absolute top-3/4 right-1/3 w-24 h-24 rounded-full opacity-6"
          style={{ 
            background: `radial-gradient(circle, ${THEME_PRIMARY}30, transparent)`,
            animation: 'float 10s ease-in-out infinite',
            transform: `translate(${scrollY * 0.07}px, ${scrollY * -0.06}px)`
          }}
        />
      </div>

      {/* Interactive Mouse Cursor Effect */}
      <div 
        className="fixed pointer-events-none z-50 opacity-20"
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y - 25,
          width: '50px',
          height: '50px',
          background: `radial-gradient(circle, ${THEME_GOLD}60, transparent)`,
          borderRadius: '50%',
          transition: 'all 0.1s ease-out',
          filter: 'blur(15px)'
        }}
      />

      {/* Enhanced Navigation Bar with Scroll Effects - Mobile Responsive */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-20 backdrop-blur-md border-b border-white/20 transition-all duration-500 ${
          scrollY > 50 ? 'shadow-xl' : ''
        }`} 
        style={{ 
          background: `${THEME_ACCENT}${scrollY > 50 ? '20' : '10'}`,
          transform: `translateY(${scrollY > 100 ? '0' : '0'}px)`
        }}
      >
        <div className="container mx-auto px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 transform transition-all duration-300 hover:scale-105">
            <div 
              className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center animate-pulse"
              style={{ 
                background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                boxShadow: scrollY > 50 ? `0 0 20px ${THEME_GOLD}40` : 'none'
              }}
            >
              <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 animate-spin" style={{ color: THEME_ACCENT, animationDuration: '4s' }} />
            </div>
            <div>
              <h2 className="font-bold text-sm xs:text-base sm:text-lg tracking-wide transition-all duration-300 hover:text-opacity-80" style={{ color: THEME_PRIMARY }}>AURELLE</h2>
              <p className="text-xs opacity-70 hidden xs:block" style={{ color: THEME_PRIMARY }}>LUXURY BEAUTY</p>
            </div>
          </div>
          
          {/* Section Progress Indicator */}
          <div className="hidden lg:flex items-center gap-2">
            {['hero', 'ready-transformation', 'products', 'transformation-results', 'promise', 'newsletter'].map((section, idx) => (
              <div
                key={section}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  visibleSection === section ? 'opacity-100 scale-125' : 'opacity-40'
                }`}
                style={{ 
                  background: visibleSection === section ? THEME_GOLD : THEME_PRIMARY,
                  boxShadow: visibleSection === section ? `0 0 10px ${THEME_GOLD}60` : 'none'
                }}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-4">
            <Button variant="ghost" className="hidden lg:flex text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10 px-2 sm:px-3 py-1 sm:py-2" style={{ color: THEME_PRIMARY }}>
              Beauty Guide
            </Button>
            <Button variant="ghost" className="hidden lg:flex text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white/10 px-2 sm:px-3 py-1 sm:py-2" style={{ color: THEME_PRIMARY }}>
              Reviews
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <ShoppingCart />
              <ProfileButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section with Parallax */}
      <header 
        id="hero"
        ref={heroAnim.ref as any} 
        className={`relative w-full overflow-hidden mt-16 sm:mt-20 ${heroAnim.isVisible ? 'visible' : ''}`}
      >
        <div 
          className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[32/9] animate-fade-in-up"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-1000"
            src="/hero-image.png"
            alt="Aurelle Luxury Beauty Collection"
            style={{
              transform: `scale(${1.1 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`,
            }}
          />
          {/* Enhanced Overlay with Animation */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: `linear-gradient(135deg, ${THEME_PRIMARY}e6 0%, ${THEME_PRIMARY}aa 35%, transparent 65%), 
                          radial-gradient(ellipse at bottom right, ${THEME_GOLD}22, transparent 50%)`,
              animation: 'shimmer 8s ease-in-out infinite'
            }}
          />
          
          {/* Animated Beauty Icons - Mobile Responsive */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-40">
            <div className="flex flex-col gap-2 sm:gap-4">
              <Sparkles 
                className="w-5 h-5 sm:w-8 sm:h-8 animate-pulse transition-all duration-300 hover:scale-125" 
                style={{ 
                  color: THEME_ACCENT,
                  filter: `drop-shadow(0 0 10px ${THEME_GOLD}60)`,
                  animation: 'float 3s ease-in-out infinite'
                }} 
              />
              <Heart 
                className="w-4 h-4 sm:w-6 sm:h-6 transition-all duration-300 hover:scale-125" 
                style={{ 
                  color: THEME_ACCENT, 
                  animationDelay: '1s',
                  animation: 'float 4s ease-in-out infinite reverse'
                }} 
              />
              <Zap 
                className="w-5 h-5 sm:w-7 sm:h-7 transition-all duration-300 hover:scale-125" 
                style={{ 
                  color: THEME_GOLD, 
                  animationDelay: '2s',
                  animation: 'float 5s ease-in-out infinite'
                }} 
              />
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-30"
                style={{
                  background: i % 3 === 0 ? THEME_GOLD : i % 3 === 1 ? THEME_ACCENT : THEME_PRIMARY,
                  left: `${10 + (i * 8)}%`,
                  top: `${20 + (i * 5)}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  transform: `translateY(${scrollY * (0.02 + i * 0.01)}px)`
                }}
              />
            ))}
          </div>
          {/* Enhanced Headline - Mobile Responsive */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6">
              <div className={`max-w-2xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="mb-3 sm:mb-4">
                  <Badge 
                    className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wide shadow-lg backdrop-blur-sm" 
                    style={{ 
                      background: `${THEME_ACCENT}ee`,
                      color: THEME_PRIMARY,
                      border: `1px solid ${THEME_GOLD}40`
                    }}
                  >
                    ✨ LUXURY BEAUTY COLLECTION ✨
                  </Badge>
                </div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-3 xs:mb-4 sm:mb-6 tracking-tight px-2" 
                    style={{ 
                      color: THEME_ACCENT,
                      textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(212,175,55,0.3)',
                      fontFamily: '"Playfair Display", Georgia, serif'
                    }}>
                  <span className="block xs:inline">Radiant Beauty.</span><br className="hidden xs:block" />
                  <span style={{ color: THEME_GOLD }}>Visible Results.</span>
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl opacity-95 mb-4 xs:mb-6 sm:mb-8 font-light leading-relaxed px-4" style={{ color: '#FFEED7' }}>
                  Experience luxury skincare that transforms your confidence. Advanced formulas for firming, hydration, and that coveted glass-skin glow.
                </p>
                <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 px-4">
                  <Button
                    size="lg"
                    className="px-4 xs:px-6 sm:px-10 py-3 xs:py-3 sm:py-5 text-base xs:text-lg sm:text-xl font-bold rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-1 animate-glow-pulse group relative overflow-hidden w-full xs:flex-1 sm:w-auto"
                    style={{ 
                      background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                      color: THEME_PRIMARY,
                      border: `3px solid ${THEME_GOLD}`
                    }}
                    onClick={() => {
                      const el = document.getElementById('ready-transformation');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center justify-center gap-1 xs:gap-2 sm:gap-3">
                      <Crown className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                      <span className="hidden xs:inline sm:hidden">Discover</span>
                      <span className="hidden sm:inline">Discover Collection</span>
                      <span className="xs:hidden">Start</span>
                      <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 animate-spin" style={{ animationDuration: '3s' }} />
                    </span>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-4 xs:px-6 sm:px-10 py-3 xs:py-3 sm:py-5 text-base xs:text-lg sm:text-xl font-bold rounded-full border-3 backdrop-blur-md transition-all duration-500 hover:scale-110 hover:shadow-2xl group w-full xs:flex-1 sm:w-auto"
                    style={{ 
                      borderColor: THEME_GOLD, 
                      color: THEME_ACCENT,
                      background: `${THEME_ACCENT}15`,
                      boxShadow: `0 10px 30px ${THEME_GOLD}20`
                    }}
                    onClick={() => {
                      const el = document.getElementById('ready-transformation');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3">
                      <Star className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 fill-current group-hover:animate-pulse" />
                      <span className="hidden xs:inline">See Results</span>
                      <span className="xs:hidden">Results</span>
                      <Award className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ready for Transformation Section */}
      <ReadyForTransformationSection 
        scrollY={scrollY}
        onCTAClick={() => {
          const el = document.getElementById('products');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Grid - Mobile Responsive */}
      <main id="products" className="container mx-auto px-3 xs:px-4 sm:px-6 py-8 xs:py-12 sm:py-16">
        <div ref={productsHeaderAnim.ref as any} className={`mb-6 xs:mb-8 sm:mb-12 text-center transition-all duration-700 ${productsHeaderAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <Badge className="mb-2 xs:mb-3 sm:mb-4 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs sm:text-sm tracking-wider" style={{ background: `${THEME_GOLD}20`, color: THEME_PRIMARY, border: `1px solid ${THEME_GOLD}40` }}>
            ✨ SIGNATURE COLLECTION ✨
          </Badge>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 tracking-tight px-2" style={{ 
            color: THEME_PRIMARY,
            fontFamily: '"Playfair Display", Georgia, serif'
          }}>
            Discover Your <span style={{ color: THEME_GOLD }}>Perfect Match</span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-80 px-4" style={{ color: '#7f2039' }}>
            Curated luxury formulas for radiance, firmness, and that coveted glass-skin glow
          </p>
        </div>

        <div ref={productGridRef as any} className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {PRODUCTS.map((p, idx) => (
            <Card 
              key={p.slug} 
              className={`group overflow-hidden transition-all duration-1000 hover:shadow-2xl cursor-pointer rounded-3xl hover-lift ${productVisible[idx] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ 
                border: `3px solid ${hoveredCard === idx ? THEME_GOLD : `${THEME_PRIMARY}20`}`,
                transitionDelay: `${idx * 120 + 300}ms`,
                background: hoveredCard === idx 
                  ? `linear-gradient(135deg, ${THEME_ACCENT}20, #ffffff, ${THEME_PRIMARY}12, #ffffff)` 
                  : `linear-gradient(135deg, #ffffff, ${THEME_ACCENT}08, #ffffff)`,
                boxShadow: hoveredCard === idx 
                  ? `0 25px 60px rgba(164, 25, 61, 0.25), 0 0 50px ${THEME_GOLD}30, inset 0 1px 0 rgba(255,255,255,0.8)` 
                  : '0 12px 40px rgba(164, 25, 61, 0.12)',
                transform: hoveredCard === idx ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                navigate({ pathname: '/', search: `?product=${p.slug}` });
                // Scroll to top when viewing product
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-all duration-1000 group-hover:scale-115 group-hover:rotate-1"
                />
                {p.badge && (
                  <Badge
                    className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold shadow-2xl animate-pulse border-2 border-white/30"
                    style={{ 
                      background: p.badge === 'Best Seller' 
                        ? `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)` 
                        : `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`,
                      color: THEME_ACCENT,
                      borderRadius: '25px',
                      boxShadow: `0 8px 25px rgba(0,0,0,0.3)`
                    }}
                  >
                    {p.badge}
                  </Badge>
                )}
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Professional Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="bg-white/95 backdrop-blur-md rounded-full p-4 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Sparkles className="w-8 h-8 animate-spin" style={{ color: THEME_PRIMARY, animationDuration: '3s' }} />
                  </div>
                </div>

                {/* Animated Border Shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                     style={{
                       background: `linear-gradient(45deg, transparent 30%, ${THEME_GOLD}40 50%, transparent 70%)`,
                       backgroundSize: '200% 200%',
                       animation: 'shimmer 2s ease-in-out infinite',
                       mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       maskComposite: 'exclude',
                       padding: '2px'
                     }}
                />
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-white via-white/95 to-transparent relative">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5" style={{ 
                  backgroundImage: `radial-gradient(circle at 2px 2px, ${THEME_GOLD} 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
                
                <div className="relative z-10 mb-4 sm:mb-6">
                  <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-opacity-80 transition-all leading-tight" style={{ color: THEME_PRIMARY }}>
                    {p.name}
                  </h3>
                  
                  {/* Enhanced Rating - Mobile Responsive */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse" style={{ 
                          color: THEME_GOLD, 
                          animationDelay: `${i * 0.15}s`,
                          filter: `drop-shadow(0 2px 4px ${THEME_GOLD}40)`
                        }} />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold" style={{ color: THEME_PRIMARY }}>(4.9) • 2,847 reviews</span>
                  </div>
                  
                  {/* Enhanced Pricing - Mobile Responsive */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <p className="text-2xl sm:text-3xl font-bold" style={{ 
                      color: THEME_PRIMARY,
                      background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>{p.price}</p>
                    <div className="text-left sm:text-right">
                      <span className="inline-block text-xs sm:text-sm text-green-600 font-bold px-2 sm:px-3 py-1 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                        ✨ Free shipping
                      </span>
                    </div>
                  </div>

                  {/* Trust Indicators - Mobile Responsive */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs opacity-75" style={{ color: THEME_PRIMARY }}>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      30-day guarantee
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Fast delivery
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Buttons - Mobile Responsive */}
                <div className="flex gap-3 sm:gap-4 relative z-10">
                  <Button
                    className="flex-1 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all duration-700 hover:scale-105 shadow-lg hover:shadow-2xl group relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                      color: THEME_ACCENT,
                      border: `2px solid ${THEME_GOLD}40`
                    }}
                    onClick={() => {
                navigate({ pathname: '/', search: `?product=${p.slug}` });
                // Scroll to top when viewing product
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                    <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">Details</span>
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 transition-all duration-700 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-2xl group"
                    style={{ 
                      borderColor: THEME_GOLD, 
                      color: THEME_PRIMARY,
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9), ${THEME_ACCENT}20)`
                    }}
                    title="Add to favorites"
                  >
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:fill-current transition-all duration-500 group-hover:animate-pulse" style={{ color: THEME_PRIMARY }} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Real Transformation Results Section */}
      <TransformationSection 
        scrollY={scrollY}
        onCTAClick={() => {
          const el = document.getElementById('promise');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Enhanced Beauty Promise Section */}
      <section 
        id="promise"
        ref={promiseAnim.ref as any}
        className={`py-10 xs:py-14 sm:py-20 relative overflow-hidden transition-all duration-1000 ${promiseAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        style={{
          transform: `translateY(${scrollY * 0.08}px)`
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(135deg, ${THEME_ACCENT}15, ${THEME_PRIMARY}05)`,
            animation: 'shimmer 10s ease-in-out infinite'
          }} 
        />
        <div className="container mx-auto px-4 relative">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${promiseAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <Badge className="mb-6 px-6 py-3 text-base tracking-wider" style={{ 
              background: `${THEME_GOLD}25`, 
              color: THEME_PRIMARY, 
              border: `2px solid ${THEME_GOLD}40` 
            }}>
              ✨ THE AURELLE PROMISE ✨
            </Badge>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ 
              color: THEME_PRIMARY,
              fontFamily: '"Playfair Display", Georgia, serif'
            }}>
              Beauty You Can <span style={{ color: THEME_GOLD }}>Feel, See & Trust</span>
            </h3>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-85" style={{ color: '#7f2039' }}>
              Sensory-rich textures meet science-backed results. Every formula is thoughtfully crafted for your skin's unique journey to radiance.
            </p>
            
            <div ref={promiseGridRef as any} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: Sparkles, title: 'Visible Results', desc: 'See the difference in just 4 weeks' },
                { icon: Heart, title: 'Gentle Luxury', desc: 'Safe for all skin types & concerns' },
                { icon: Award, title: 'Expert Approved', desc: 'Dermatologist tested & recommended' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`text-center group transition-all duration-700 hover:scale-105 ${promiseVisible[i] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                  style={{ 
                    transitionDelay: `${i * 150 + 500}ms`,
                    transform: `translateY(${scrollY * 0.015}px)`
                  }}
                >
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 animate-glow-pulse" 
                    style={{ 
                      background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                      boxShadow: `0 10px 30px ${THEME_GOLD}20`
                    }}
                  >
                    <item.icon 
                      className="w-10 h-10 transition-all duration-300 group-hover:scale-110" 
                      style={{ 
                        color: THEME_PRIMARY,
                        filter: `drop-shadow(0 2px 4px ${THEME_PRIMARY}40)`
                      }} 
                    />
                  </div>
                  <h4 className="font-bold text-lg mb-2 transition-all duration-300 group-hover:text-opacity-80" style={{ color: THEME_PRIMARY }}>{item.title}</h4>
                  <p className="text-sm opacity-75 transition-all duration-300" style={{ color: THEME_PRIMARY }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section 
        id="newsletter"
        ref={newsletterAnim.ref as any}
        className={`py-16 relative overflow-hidden transition-all duration-1000 ${newsletterAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} 
        style={{ 
          background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, ${THEME_GOLD}, transparent)`,
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                left: `${10 + (i * 12)}%`,
                top: `${15 + (i * 8)}%`,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className={`transition-all duration-700 ${newsletterAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 transition-all duration-300 hover:scale-105" style={{ color: THEME_ACCENT }}>
              <Gift className="inline-block w-8 h-8 mr-3 animate-bounce" />
              Join the Radiance Club
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-lg mx-auto" style={{ color: '#FFEED7' }}>
              Get exclusive beauty tips, early access to new launches, and special member offers. 
              <span className="font-bold text-xl block mt-2" style={{ color: THEME_GOLD }}>✨ First order 20% OFF ✨</span>
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-full border-2 focus:outline-none focus:ring-2 transition-all duration-300 focus:scale-105"
                style={{ 
                  borderColor: THEME_ACCENT,
                  background: `${THEME_ACCENT}ee`,
                  color: THEME_PRIMARY
                }}
              />
              <Button 
                className="px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-glow-pulse"
                style={{ 
                  background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                  color: THEME_PRIMARY 
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
