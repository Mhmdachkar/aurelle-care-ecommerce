import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, ShieldCheck, Crown } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const THEME_PRIMARY = '#A4193D';
const THEME_ACCENT = '#FFDFB9';
const THEME_GOLD = '#D4AF37';

interface TransformationSectionProps {
  scrollY: number;
  onCTAClick: () => void;
}

export default function TransformationSection({ scrollY, onCTAClick }: TransformationSectionProps) {
  const beforeAfterAnim = useScrollAnimation({ threshold: 0.15 });
  const { ref: beforeAfterGridRef, visibleItems: beforeAfterVisible } = useStaggeredAnimation(3, 200);

  return (
    <section 
      id="transformation"
      ref={beforeAfterAnim.ref as any}
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${beforeAfterAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} 
      style={{ 
        background: `linear-gradient(135deg, ${THEME_ACCENT}12, #ffffff, ${THEME_PRIMARY}08)`,
        transform: `translateY(${scrollY * 0.08}px)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, ${THEME_GOLD}, transparent)`,
            animation: 'float 12s ease-in-out infinite',
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.03}px)`
          }}
        />
        <div 
          className="absolute top-1/2 -left-32 w-64 h-64 rounded-full opacity-8"
          style={{ 
            background: `radial-gradient(circle, ${THEME_PRIMARY}40, transparent)`,
            animation: 'float 8s ease-in-out infinite reverse',
            transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.06}px)`
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${beforeAfterAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <Badge className="mb-6 px-8 py-4 text-lg font-bold tracking-wider animate-pulse shadow-2xl" style={{ 
            background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`, 
            color: '#ffffff',
            borderRadius: '50px',
            border: `3px solid ${THEME_GOLD}60`,
            boxShadow: `0 10px 30px ${THEME_GOLD}30`
          }}>
            🔥 REAL TRANSFORMATIONS • REAL RESULTS 🔥
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight" style={{ 
            color: THEME_PRIMARY,
            fontFamily: '"Playfair Display", Georgia, serif',
            textShadow: '0 4px 20px rgba(164, 25, 61, 0.2)'
          }}>
            See the <span style={{ 
              color: THEME_GOLD,
              background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Magic</span> Happen
          </h2>
          <p className="text-xl sm:text-2xl mb-12 max-w-4xl mx-auto font-medium leading-relaxed" style={{ color: '#7f2039' }}>
            <strong className="text-2xl" style={{ color: THEME_PRIMARY }}>Join 50,000+ customers who transformed their skin in just 4 weeks.</strong><br />
            <span className="text-lg opacity-90 block mt-3">Your radiant skin journey starts with one click below.</span>
          </p>
        </div>

        {/* Enhanced Transformation Cards Grid */}
        <div className="max-w-7xl mx-auto">
          <div ref={beforeAfterGridRef as any} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                beforeImg: '/products/before-after/before-1.png',
                afterImg: '/products/before-after/after-1.png',
                concern: 'Fine Lines & Wrinkles',
                timeframe: '6 weeks',
                testimonial: '"I can\'t believe the difference! My colleagues keep asking about my skincare routine."',
                name: 'Sarah M.',
                age: '34',
                improvement: '89%'
              },
              { 
                beforeImg: '/products/before-after/before-2.png',
                afterImg: '/products/before-after/after-2.png',
                concern: 'Dull & Uneven Skin',
                timeframe: '4 weeks',
                testimonial: '"The glow is real! My skin has never looked this radiant and healthy."',
                name: 'Emma L.',
                age: '28',
                improvement: '92%'
              },
              { 
                beforeImg: '/products/before-after/before-1.png',
                afterImg: '/products/before-after/after-1.png',
                concern: 'Firmness & Texture',
                timeframe: '8 weeks',
                testimonial: '"Finally found products that work! My confidence is through the roof."',
                name: 'Jessica R.',
                age: '31',
                improvement: '86%'
              }
            ].map((result, i) => (
              <div key={i} 
                   className={`group relative transition-all duration-1000 hover:scale-105 cursor-pointer ${beforeAfterVisible[i] ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                   style={{ 
                     transitionDelay: `${i * 250 + 400}ms`,
                     transform: `translateY(${scrollY * 0.02}px)`
                   }}>
                
                {/* Professional Card Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 bg-white"
                     style={{ 
                       background: `linear-gradient(135deg, #ffffff, ${THEME_ACCENT}08, #ffffff)`,
                       border: `3px solid ${THEME_GOLD}20`,
                       boxShadow: `0 20px 60px rgba(164, 25, 61, 0.15), 0 0 40px ${THEME_GOLD}15`
                     }}>
                  
                  {/* Improvement Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="px-4 py-2 text-sm font-bold animate-pulse shadow-xl" style={{ 
                      background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`, 
                      color: '#ffffff',
                      borderRadius: '20px',
                      boxShadow: `0 8px 25px ${THEME_GOLD}40`
                    }}>
                      {result.improvement} BETTER
                    </Badge>
                  </div>

                  {/* Before/After Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    {/* Before Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={result.beforeImg} 
                        alt="Before transformation"
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute bottom-4 left-4">
                        <Badge className="px-3 py-2 text-sm font-bold backdrop-blur-sm" style={{ 
                          background: 'rgba(0,0,0,0.8)', 
                          color: '#ffffff',
                          borderRadius: '15px'
                        }}>
                          BEFORE
                        </Badge>
                      </div>
                    </div>
                    
                    {/* After Image Overlay with Split Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000"
                      style={{ 
                        clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                        background: `linear-gradient(45deg, transparent 45%, ${THEME_GOLD}30 50%, transparent 55%)`
                      }}
                    >
                      <img 
                        src={result.afterImg} 
                        alt="After transformation"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 right-4">
                        <Badge className="px-3 py-2 text-sm font-bold animate-pulse shadow-xl" style={{ 
                          background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`, 
                          color: '#ffffff',
                          borderRadius: '15px'
                        }}>
                          AFTER {result.timeframe}
                        </Badge>
                      </div>
                    </div>

                    {/* Interactive Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Hover Instructions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-2xl transform scale-95 group-hover:scale-100 transition-transform duration-300">
                        <p className="text-base font-bold text-center" style={{ color: THEME_PRIMARY }}>
                          ✨ Hover to see results! ✨
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-6 bg-gradient-to-t from-white via-white to-transparent">
                    <div className="text-center space-y-4">
                      <h4 className="font-bold text-xl mb-3" style={{ color: THEME_PRIMARY }}>
                        {result.concern}
                      </h4>
                      
                      {/* Quote */}
                      <div className="relative">
                        <div className="absolute -top-2 -left-2 text-3xl opacity-30" style={{ color: THEME_GOLD }}>
                          "
                        </div>
                        <p className="text-sm italic mb-4 px-4 leading-relaxed" style={{ color: '#7f2039' }}>
                          {result.testimonial}
                        </p>
                        <div className="absolute -bottom-2 -right-2 text-3xl opacity-30" style={{ color: THEME_GOLD }}>
                          "
                        </div>
                      </div>
                      
                      {/* Customer Info */}
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <span className="text-sm font-semibold" style={{ color: THEME_PRIMARY }}>
                          — {result.name}, {result.age}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current animate-pulse" style={{ 
                              color: THEME_GOLD,
                              animationDelay: `${i * 0.1}s`
                            }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                       style={{
                         background: `linear-gradient(45deg, transparent, ${THEME_GOLD}40, transparent, ${THEME_PRIMARY}40, transparent)`,
                         backgroundSize: '400% 400%',
                         animation: 'shimmer 3s ease-in-out infinite',
                         mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                         maskComposite: 'exclude',
                         padding: '2px'
                       }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center relative">
            <div className="max-w-5xl mx-auto p-10 rounded-3xl shadow-2xl relative overflow-hidden" style={{ 
              background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033, ${THEME_PRIMARY})`,
              border: `3px solid ${THEME_GOLD}40`
            }}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${THEME_GOLD}, transparent)`,
                      width: `${40 + i * 20}px`,
                      height: `${40 + i * 20}px`,
                      left: `${20 + (i * 15)}%`,
                      top: `${10 + (i * 12)}%`,
                      animation: `float ${5 + i * 0.8}s ease-in-out infinite`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6" style={{ 
                  color: THEME_ACCENT,
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                  Ready for Your Transformation?
                </h3>
                <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed" style={{ color: '#FFEED7' }}>
                  <strong className="text-2xl block mb-2" style={{ color: THEME_GOLD }}>Limited Time Offer!</strong>
                  Get the same results with our exclusive starter kit.<br />
                  <span className="text-xl font-bold inline-block mt-2 px-4 py-2 rounded-full" style={{ 
                    color: THEME_PRIMARY,
                    background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`
                  }}>
                    FREE shipping + 30-day money-back guarantee!
                  </span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    size="lg"
                    className="px-10 py-5 text-xl font-bold rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-1 animate-glow-pulse transform"
                    style={{ 
                      background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                      color: THEME_PRIMARY,
                      border: `4px solid ${THEME_GOLD}`,
                      boxShadow: `0 15px 40px rgba(212, 175, 55, 0.4)`
                    }}
                    onClick={onCTAClick}
                  >
                    <Sparkles className="mr-3 w-6 h-6" />
                    Start My Transformation ✨
                    <Crown className="ml-3 w-6 h-6" />
                  </Button>
                  
                  <div className="flex items-center gap-3 text-lg" style={{ color: THEME_ACCENT }}>
                    <ShieldCheck className="w-6 h-6" />
                    <span className="font-semibold">Risk-free • 30-day guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
