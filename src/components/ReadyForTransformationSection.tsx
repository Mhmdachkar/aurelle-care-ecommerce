import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Crown, Star, Heart, ShieldCheck } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const THEME_PRIMARY = '#A4193D';
const THEME_ACCENT = '#FFDFB9';
const THEME_GOLD = '#D4AF37';

interface ReadyForTransformationSectionProps {
  scrollY: number;
  onCTAClick: () => void;
}

export default function ReadyForTransformationSection({ scrollY, onCTAClick }: ReadyForTransformationSectionProps) {
  const sectionAnim = useScrollAnimation({ threshold: 0.15 });

  return (
    <section 
      id="ready-transformation"
      ref={sectionAnim.ref as any}
      className={`py-16 sm:py-20 relative overflow-hidden transition-all duration-1000 ${sectionAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} 
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
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-20"
              style={{
                background: i % 3 === 0 ? THEME_GOLD : i % 3 === 1 ? THEME_ACCENT : THEME_PRIMARY,
                left: `${15 + (i * 10)}%`,
                top: `${20 + (i * 8)}%`,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                transform: `translateY(${scrollY * (0.02 + i * 0.01)}px)`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header */}
          <div className={`mb-8 sm:mb-12 transition-all duration-700 ${sectionAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <Badge className="mb-4 sm:mb-6 px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg font-bold tracking-wider animate-pulse shadow-2xl" style={{ 
              background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`, 
              color: '#ffffff',
              borderRadius: '50px',
              border: `3px solid ${THEME_GOLD}60`,
              boxShadow: `0 10px 30px ${THEME_GOLD}30`
            }}>
              ✨ TRANSFORM YOUR SKIN TODAY ✨
            </Badge>
            
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-6 sm:mb-8 leading-tight px-2" style={{ 
              color: THEME_PRIMARY,
              fontFamily: '"Playfair Display", Georgia, serif',
              textShadow: '0 4px 20px rgba(164, 25, 61, 0.2)'
            }}>
              Ready for Your <span style={{ 
                color: THEME_GOLD,
                background: `linear-gradient(135deg, ${THEME_GOLD}, #B8941F)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Transformation</span>?
            </h2>
            
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-6 xs:mb-8 sm:mb-12 max-w-4xl mx-auto font-medium leading-relaxed px-4" style={{ color: '#7f2039' }}>
              <strong className="text-lg xs:text-xl sm:text-2xl" style={{ color: THEME_PRIMARY }}>Join thousands of customers who achieved their dream skin.</strong><br />
              <span className="text-sm xs:text-base sm:text-lg opacity-90 block mt-1 xs:mt-2 sm:mt-3">Your radiant transformation starts with one click below.</span>
            </p>
          </div>

          {/* Features Preview Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 transition-all duration-700 ${sectionAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            {[
              { icon: Sparkles, title: 'Visible Results', desc: 'In just 4 weeks', color: THEME_GOLD },
              { icon: Heart, title: 'Safe & Gentle', desc: 'All skin types', color: THEME_PRIMARY },
              { icon: ShieldCheck, title: '30-Day Guarantee', desc: 'Risk-free trial', color: THEME_GOLD }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2"
                style={{ 
                  borderColor: `${feature.color}30`,
                  background: `linear-gradient(135deg, #ffffff, ${THEME_ACCENT}08)`
                }}
              >
                <feature.icon 
                  className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 animate-pulse" 
                  style={{ color: feature.color }}
                />
                <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: THEME_PRIMARY }}>
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base opacity-80" style={{ color: '#7f2039' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-700 ${sectionAnim.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <div className="relative inline-block">
              {/* Glow effect behind button */}
              <div 
                className="absolute inset-0 rounded-full blur-xl opacity-40 animate-pulse"
                style={{ 
                  background: `linear-gradient(135deg, ${THEME_GOLD}, ${THEME_PRIMARY})`,
                  transform: 'scale(1.2)'
                }}
              />
              
              <Button
                size="lg"
                className="relative px-6 xs:px-8 sm:px-12 py-3 xs:py-4 sm:py-6 text-lg xs:text-xl sm:text-2xl font-bold rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-1 animate-glow-pulse group overflow-hidden w-full xs:w-auto max-w-md xs:max-w-none"
                style={{ 
                  background: `linear-gradient(135deg, ${THEME_ACCENT}, #FFE5A3)`,
                  color: THEME_PRIMARY,
                  border: `4px solid ${THEME_GOLD}`,
                  boxShadow: `0 15px 40px rgba(212, 175, 55, 0.4)`
                }}
                onClick={onCTAClick}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 xs:gap-3">
                  <Sparkles className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="hidden xs:inline">Start My Transformation</span>
                  <span className="xs:hidden">Start Now</span>
                  <Crown className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />
                </span>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-8 mt-4 xs:mt-6 sm:mt-8 text-xs xs:text-sm sm:text-base px-4" style={{ color: THEME_PRIMARY }}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0" />
                <span className="font-semibold text-center xs:text-left">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 xs:w-5 xs:h-5 fill-current flex-shrink-0" style={{ color: THEME_GOLD }} />
                <span className="font-semibold text-center xs:text-left">4.9/5 from 50,000+ customers</span>
              </div>
            </div>
            
            {/* Special offer banner */}
            <div className="mt-4 xs:mt-6 sm:mt-8 px-4">
              <Badge 
                className="px-3 xs:px-4 sm:px-6 py-2 xs:py-2 sm:py-3 text-sm xs:text-base sm:text-lg font-bold animate-bounce shadow-lg block text-center"
                style={{ 
                  background: `linear-gradient(135deg, ${THEME_PRIMARY}, #722033)`,
                  color: THEME_ACCENT,
                  borderRadius: '25px'
                }}
              >
                <span className="block xs:hidden">🎉 FREE Shipping + 50% OFF! 🎉</span>
                <span className="hidden xs:block">🎉 FREE Shipping + 50% OFF Limited Time! 🎉</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
