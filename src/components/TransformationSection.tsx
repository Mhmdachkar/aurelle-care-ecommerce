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
      id="transformation-results"
      ref={beforeAfterAnim.ref as any}
      className={`py-10 xs:py-14 sm:py-20 relative overflow-hidden transition-all duration-1000 ${beforeAfterAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} 
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

      <div className="container mx-auto px-4 sm:px-6">
        {/* Enhanced Header - Mobile Responsive */}
        <div className={`text-center mb-8 xs:mb-10 sm:mb-16 transition-all duration-700 ${beforeAfterAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <Badge className="mb-4 sm:mb-6 px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg font-bold tracking-wider animate-pulse shadow-2xl" style={{ 
            background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`, 
            color: '#ffffff',
            borderRadius: '50px',
            border: `3px solid ${THEME_GOLD}60`,
            boxShadow: `0 10px 30px ${THEME_GOLD}30`
          }}>
            🔥 REAL TRANSFORMATIONS • REAL RESULTS 🔥
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-6 sm:mb-8 leading-tight" style={{ 
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
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-6 xs:mb-8 sm:mb-12 max-w-4xl mx-auto font-medium leading-relaxed px-4" style={{ color: '#7f2039' }}>
            <strong className="text-xl sm:text-2xl" style={{ color: THEME_PRIMARY }}>Join 50,000+ customers who transformed their skin in just 4 weeks.</strong><br />
            <span className="text-base sm:text-lg opacity-90 block mt-2 sm:mt-3">Your radiant skin journey starts with one click below.</span>
          </p>
        </div>

        {/* Enhanced Transformation Cards Grid - Mobile Responsive */}
        <div className="max-w-7xl mx-auto">
          <div ref={beforeAfterGridRef as any} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
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
                  
                  {/* Improvement Badge - Mobile Responsive */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                    <Badge className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold animate-pulse shadow-xl" style={{ 
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
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                        <Badge className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-bold backdrop-blur-sm" style={{ 
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
                      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                        <Badge className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-bold animate-pulse shadow-xl" style={{ 
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

                  {/* Enhanced Content Section - Mobile Responsive */}
                  <div className="p-4 sm:p-6 bg-gradient-to-t from-white via-white to-transparent">
                    <div className="text-center space-y-3 sm:space-y-4">
                      <h4 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3" style={{ color: THEME_PRIMARY }}>
                        {result.concern}
                      </h4>
                      
                      {/* Quote - Mobile Responsive */}
                      <div className="relative">
                        <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 text-2xl sm:text-3xl opacity-30" style={{ color: THEME_GOLD }}>
                          "
                        </div>
                        <p className="text-sm sm:text-sm italic mb-3 sm:mb-4 px-3 sm:px-4 leading-relaxed" style={{ color: '#7f2039' }}>
                          {result.testimonial}
                        </p>
                        <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 text-2xl sm:text-3xl opacity-30" style={{ color: THEME_GOLD }}>
                          "
                        </div>
                      </div>
                      
                      {/* Customer Info - Mobile Responsive */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                        <span className="text-sm font-semibold" style={{ color: THEME_PRIMARY }}>
                          — {result.name}, {result.age}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current animate-pulse" style={{ 
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


        </div>
      </div>
    </section>
  );
}
