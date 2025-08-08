import { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductPage from '@/components/ProductPage';
import BoosterProPage from '@/components/BoosterProPage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, Heart, Award, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

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
  { slug: 'champagne-beaute-lift', name: 'Champagne Beaute Lift', price: '$22.99', image: '/products/product-1-champagne-beaute/rose-variant.png', badge: 'Best Seller' },
  { slug: 'booster-pro', name: 'AGE-R Booster Pro', price: '14.799,00 TL', image: '/products/product-2-booster-pro/Screenshot 2025-08-08 041752.png', badge: 'New' },
  { slug: 'vanilla-velvet-balm', name: 'Vanilla Velvet Balm', price: '$26.50', image: '/products/product-1-champagne-beaute/almond-variant.png' },
  { slug: 'truffle-glow-serum', name: 'Truffle Glow Serum', price: '$39.00', image: '/products/before-after/after-1.png', badge: 'New' },
  { slug: 'caviar-firming-lotion', name: 'Caviar Firming Lotion', price: '$34.90', image: '/products/before-after/before-1.png' },
  { slug: 'gold-peptide-elixir', name: 'Gold Peptide Elixir', price: '$49.00', image: '/products/product-2-booster-pro/gallery-4.png' },
  { slug: 'pink-pepper-tonic', name: 'Pink Pepper Tonic', price: '$21.99', image: '/products/homepage-cards/card-3.png' },
  { slug: 'grape-callus-essence', name: 'Grape Callus Essence', price: '$27.50', image: '/products/homepage-cards/card-4.png' },
  { slug: 'silk-body-butter', name: 'Silk Body Butter', price: '$24.99', image: '/products/homepage-cards/card-5.png' },
];

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const productSlug = useMemo(() => new URLSearchParams(location.search).get('product'), [location.search]);
  const isViewingProduct = Boolean(productSlug);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (isViewingProduct) {
    // For now route 'champagne-beaute-lift' to existing detailed page, and 'booster-pro' to the new page
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
        {productSlug === 'booster-pro' ? <BoosterProPage /> : <ProductPage />}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
      background: `linear-gradient(135deg, ${THEME_ACCENT}08 0%, #ffffff 30%, ${THEME_PRIMARY}05 100%)`,
      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10 animate-pulse"
          style={{ background: `radial-gradient(circle, ${THEME_GOLD}, transparent)` }}
        />
        <div 
          className="absolute top-1/3 -left-16 w-32 h-32 rounded-full opacity-5 animate-bounce"
          style={{ background: `radial-gradient(circle, ${THEME_PRIMARY}, transparent)`, animationDuration: '3s' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, ${THEME_ACCENT}, transparent)`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-20 backdrop-blur-md border-b border-white/20" style={{ background: `${THEME_ACCENT}10` }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)` }}>
              <Sparkles className="w-5 h-5" style={{ color: THEME_ACCENT }} />
            </div>
            <div>
              <h2 className="font-bold text-lg tracking-wide" style={{ color: THEME_PRIMARY }}>AURELLE</h2>
              <p className="text-xs opacity-70" style={{ color: THEME_PRIMARY }}>LUXURY BEAUTY</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>
              Beauty Guide
            </Button>
            <Button variant="ghost" className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>
              Reviews
            </Button>
            <Button 
              className="px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl" 
              style={{ 
                background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                color: THEME_ACCENT
              }}
            >
              Account
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Image Header */}
      <header className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[32/9]">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero-image.png"
            alt="Aurelle Luxury Beauty Collection"
          />
          {/* Enhanced Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${THEME_PRIMARY}e6 0%, ${THEME_PRIMARY}aa 35%, transparent 65%), 
                          radial-gradient(ellipse at bottom right, ${THEME_GOLD}22, transparent 50%)`,
            }}
          />
          {/* Floating Beauty Icons */}
          <div className="absolute top-8 right-8 opacity-30">
            <div className="flex flex-col gap-4">
              <Sparkles className="w-8 h-8 animate-pulse" style={{ color: THEME_ACCENT }} />
              <Heart className="w-6 h-6" style={{ color: THEME_ACCENT, animationDelay: '1s' }} />
            </div>
          </div>
          {/* Enhanced Headline */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className={`max-w-2xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="mb-4">
                  <Badge 
                    className="mb-4 px-4 py-2 text-sm font-medium tracking-wide shadow-lg backdrop-blur-sm" 
                    style={{ 
                      background: `${THEME_ACCENT}ee`,
                      color: THEME_PRIMARY,
                      border: `1px solid ${THEME_GOLD}40`
                    }}
                  >
                    ✨ LUXURY BEAUTY COLLECTION ✨
                  </Badge>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight" 
                    style={{ 
                      color: THEME_ACCENT,
                      textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(212,175,55,0.3)',
                      fontFamily: '"Playfair Display", Georgia, serif'
                    }}>
                  Radiant Beauty.<br />
                  <span style={{ color: THEME_GOLD }}>Visible Results.</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl opacity-95 mb-8 font-light leading-relaxed" style={{ color: '#FFEED7' }}>
                  Experience luxury skincare that transforms your confidence. Advanced formulas for firming, hydration, and that coveted glass-skin glow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                      color: THEME_PRIMARY,
                      border: `2px solid ${THEME_GOLD}60`
                    }}
                    onClick={() => {
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Discover Collection
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 text-lg font-semibold rounded-full border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    style={{ 
                      borderColor: THEME_ACCENT, 
                      color: THEME_ACCENT,
                      background: `${THEME_ACCENT}10`
                    }}
                  >
                    Watch Results
                    <Star className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Before/After Results Gallery - Conversion Focused */}
      <section className="py-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${THEME_ACCENT}08, #ffffff)` }}>
        <div className="container mx-auto px-4">
          {/* Compelling Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 px-6 py-3 text-base tracking-wider animate-pulse" style={{ 
              background: `${THEME_GOLD}25`, 
              color: THEME_PRIMARY, 
              border: `2px solid ${THEME_GOLD}60` 
            }}>
              🔥 REAL RESULTS FROM REAL CUSTOMERS 🔥
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ 
              color: THEME_PRIMARY,
              fontFamily: '"Playfair Display", Georgia, serif'
            }}>
              See the <span style={{ color: THEME_GOLD }}>Transformation</span> Others Achieved
            </h2>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto font-medium" style={{ color: '#7f2039' }}>
              <strong>Join 50,000+ customers who transformed their skin in just 4 weeks.</strong><br />
              <span className="text-lg opacity-90">Your radiant skin journey starts with one click.</span>
            </p>
            
            {/* Urgency & Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${THEME_PRIMARY}10` }}>
                <Sparkles className="w-5 h-5" style={{ color: THEME_GOLD }} />
                <span className="font-semibold text-sm" style={{ color: THEME_PRIMARY }}>2,847 sold this week</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${THEME_GOLD}15` }}>
                <Star className="w-5 h-5 fill-current" style={{ color: THEME_GOLD }} />
                <span className="font-semibold text-sm" style={{ color: THEME_PRIMARY }}>4.9/5 ★ (12,643 reviews)</span>
              </div>
            </div>
          </div>

          {/* Interactive Before/After Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                beforeImg: '/products/before-after/before-1.png',
                afterImg: '/products/before-after/after-1.png',
                concern: 'Fine Lines & Wrinkles',
                timeframe: '6 weeks',
                testimonial: '"I can\'t believe the difference! My colleagues keep asking about my skincare routine."',
                name: 'Sarah M.',
                age: '34'
              },
              { 
                beforeImg: '/products/product-1-champagne-beaute/vanilla-variant.png',
                afterImg: '/products/before-after/after-2.png',
                concern: 'Dull & Uneven Skin',
                timeframe: '4 weeks',
                testimonial: '"The glow is real! My skin has never looked this radiant and healthy."',
                name: 'Emma L.',
                age: '28'
              },
              { 
                beforeImg: '/products/product-1-champagne-beaute/almond-variant.png',
                afterImg: '/products/before-after/after-3.png',
                concern: 'Acne & Texture',
                timeframe: '8 weeks',
                testimonial: '"Finally found products that work! My confidence is through the roof."',
                name: 'Jessica R.',
                age: '31'
              }
            ].map((result, i) => (
              <div key={i} 
                   className={`group transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                   style={{ transitionDelay: `${i * 200 + 400}ms` }}>
                {/* Before/After Image Container */}
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                     style={{ background: `linear-gradient(135deg, ${THEME_ACCENT}20, ${THEME_PRIMARY}10)` }}>
                  <div className="relative aspect-square">
                    {/* Before Image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img 
                        src={result.beforeImg} 
                        alt="Before transformation"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="px-3 py-1 text-sm font-bold" style={{ 
                          background: 'rgba(0,0,0,0.7)', 
                          color: '#ffffff' 
                        }}>
                          BEFORE
                        </Badge>
                      </div>
                    </div>
                    
                    {/* After Image Overlay */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700"
                         style={{ background: `linear-gradient(45deg, transparent 45%, ${THEME_GOLD}40 50%, transparent 55%)` }}>
                      <img 
                        src={result.afterImg} 
                        alt="After transformation"
                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="px-3 py-1 text-sm font-bold animate-pulse" style={{ 
                          background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`, 
                          color: '#ffffff' 
                        }}>
                          AFTER {result.timeframe}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Hover Instruction */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
                        <p className="text-sm font-semibold" style={{ color: THEME_PRIMARY }}>
                          Hover to see results!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result Details */}
                <div className="text-center">
                  <h4 className="font-bold text-lg mb-2" style={{ color: THEME_PRIMARY }}>
                    {result.concern}
                  </h4>
                  <p className="text-sm italic mb-3 opacity-90" style={{ color: '#7f2039' }}>
                    {result.testimonial}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium" style={{ color: THEME_PRIMARY }}>
                      - {result.name}, {result.age}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" style={{ color: THEME_GOLD }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call-to-Action Section */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto p-8 rounded-3xl shadow-2xl" style={{ 
              background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)` 
            }}>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: THEME_ACCENT }}>
                Ready for Your Transformation?
              </h3>
              <p className="text-lg mb-6 opacity-95" style={{ color: '#FFEED7' }}>
                <strong>Limited Time:</strong> Get the same results with our exclusive starter kit. 
                <br className="hidden sm:block" />
                <span className="text-xl font-bold" style={{ color: THEME_GOLD }}>FREE shipping + 30-day money-back guarantee!</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 animate-glow-pulse"
                  style={{ 
                    background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                    color: THEME_PRIMARY,
                    border: `3px solid ${THEME_GOLD}`
                  }}
                  onClick={() => {
                    const el = document.getElementById('products');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start My Transformation ✨
                </Button>
                
                <div className="flex items-center gap-2 text-sm" style={{ color: THEME_ACCENT }}>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Risk-free • 30-day guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main id="products" className="container mx-auto px-4 py-16">
        <div className={`mb-12 text-center transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
          <Badge className="mb-4 px-4 py-2 text-sm tracking-wider" style={{ background: `${THEME_GOLD}20`, color: THEME_PRIMARY, border: `1px solid ${THEME_GOLD}40` }}>
            ✨ SIGNATURE COLLECTION ✨
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight" style={{ 
            color: THEME_PRIMARY,
            fontFamily: '"Playfair Display", Georgia, serif'
          }}>
            Discover Your <span style={{ color: THEME_GOLD }}>Perfect Match</span>
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-80" style={{ color: '#7f2039' }}>
            Curated luxury formulas for radiance, firmness, and that coveted glass-skin glow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p, idx) => (
            <Card 
              key={p.slug} 
              className={`group overflow-hidden transition-all duration-500 hover:shadow-2xl ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ 
                borderColor: `${THEME_PRIMARY}20`,
                borderWidth: '2px',
                transitionDelay: `${idx * 100 + 800}ms`,
                background: hoveredCard === idx ? `linear-gradient(135deg, ${THEME_ACCENT}08, #ffffff)` : '#ffffff'
              }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110"
                />
                {p.badge && (
                  <Badge
                    className="absolute top-4 left-4 px-3 py-1 text-xs font-bold shadow-lg"
                    style={{ 
                      background: p.badge === 'Best Seller' 
                        ? `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)` 
                        : `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`,
                      color: THEME_ACCENT 
                    }}
                  >
                    {p.badge}
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Effects */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl">
                    <Sparkles className="w-6 h-6" style={{ color: THEME_PRIMARY }} />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-opacity-80 transition-all" style={{ color: THEME_PRIMARY }}>
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: THEME_GOLD }} />
                    ))}
                    <span className="text-sm opacity-70" style={{ color: THEME_PRIMARY }}>(4.9)</span>
                  </div>
                  <p className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>{p.price}</p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    className="flex-1 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                      color: THEME_ACCENT 
                    }}
                    onClick={() => navigate({ pathname: '/', search: `?product=${p.slug}` })}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110"
                    style={{ borderColor: THEME_PRIMARY, color: THEME_PRIMARY }}
                    title="Add to favorites"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Beauty Promise Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(135deg, ${THEME_ACCENT}15, ${THEME_PRIMARY}05)` 
        }} />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { icon: Sparkles, title: 'Visible Results', desc: 'See the difference in just 4 weeks' },
                { icon: Heart, title: 'Gentle Luxury', desc: 'Safe for all skin types & concerns' },
                { icon: Award, title: 'Expert Approved', desc: 'Dermatologist tested & recommended' }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110" 
                       style={{ background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)` }}>
                    <item.icon className="w-10 h-10" style={{ color: THEME_PRIMARY }} />
                  </div>
                  <h4 className="font-bold text-lg mb-2" style={{ color: THEME_PRIMARY }}>{item.title}</h4>
                  <p className="text-sm opacity-75" style={{ color: THEME_PRIMARY }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)` }}>
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: THEME_ACCENT }}>
            Join the Radiance Club
          </h3>
          <p className="text-lg mb-8 opacity-90" style={{ color: '#FFEED7' }}>
            Get exclusive beauty tips, early access to new launches, and special member offers.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-full border-2 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: THEME_ACCENT,
                background: `${THEME_ACCENT}ee`,
                color: THEME_PRIMARY
              }}
            />
            <Button 
              className="px-6 py-3 rounded-full font-semibold shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                color: THEME_PRIMARY 
              }}
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
