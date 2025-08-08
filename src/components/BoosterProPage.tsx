import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from '@/components/ShoppingCart';
import { ProfileButton } from '@/components/ProfileButton';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Sparkles, Heart, Cpu, ActivitySquare, Zap, Sun, AppWindow, ShieldCheck } from 'lucide-react';

const PRIMARY = '#A4193D';
const ACCENT = '#FFDFB9';

// Booster Pro images
// Pink variant (homepage and default) -> Screenshot 041752
// Black variant -> Screenshot 041939
// Remaining screenshots become gallery images
const boosterImages = [
  '/products/product-2-booster-pro/pink.png', // Pink
  '/products/product-2-booster-pro/black.png', // Black
  '/products/product-2-booster-pro/g1.png',
  '/products/product-2-booster-pro/pink.png',
  '/products/product-2-booster-pro/g2.png',
  '/products/product-2-booster-pro/g3.png',
].map((src) => ({ src, fallback: '/placeholder.svg' }));

export default function BoosterProPage() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { trackViewContent } = useMetaPixel();

  const [color, setColor] = useState<'Pink' | 'Black'>('Pink');
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  // Align animations with Product 1 page
  const productGallery = useScrollAnimation({ threshold: 0.2 });
  const productDetails = useScrollAnimation({ threshold: 0.1 });
  const pricingSection = useScrollAnimation({ threshold: 0.3 });
  const variantSection = useScrollAnimation({ threshold: 0.2 });
  const featuresSection = useScrollAnimation({ threshold: 0.1 });
  const videoSection = useScrollAnimation({ threshold: 0.2 });
  const clinicalSection = useScrollAnimation({ threshold: 0.4 });

  const price = useMemo(() => ({ current: '14.799,00 TL', original: '29.599,00 TL' }), []);

  useEffect(() => {
    // Pixel tracking for this product
    trackViewContent('AGE-R Booster Pro', 'Beauty Device', 14799);
  }, []);

  const imageUrlByVariant: Record<string, string> = {
    Pink: '/products/product-2-booster-pro/pink.png',
    Black: '/products/product-2-booster-pro/black.png',
  };

  const handleAddToCart = async () => {
    await addToCart({
      product_name: 'AGE-R Booster Pro',
      variant: color,
      quantity: qty,
      price: '14799.00',
      currency: 'TRY',
      image_url: imageUrlByVariant[color] || boosterImages[0]?.src || '/placeholder.svg',
    });
  };

  const safeImg = (src?: string) => src || '/placeholder.svg';

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${ACCENT}11, #fff)` }}>
      {/* Top bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfileButton />
          <ShoppingCart />
        </div>
        <div className="font-semibold" style={{ color: PRIMARY }}>Made in Korea</div>
      </div>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-2 gap-8 items-start">
        {/* Gallery */}
        <div ref={productGallery.ref as any} className={`space-y-4 scroll-slide-left ${productGallery.isVisible ? 'visible' : ''}`}>
          <Card className="overflow-hidden hover-lift luxury-border bg-gradient-to-br from-cream via-background to-rose-muted" style={{ borderColor: `${PRIMARY}22` }}>
            <img
              src={safeImg(boosterImages[selectedImage]?.src)}
              onError={(e) => ((e.target as HTMLImageElement).src = boosterImages[selectedImage]?.fallback || '/placeholder.svg')}
              alt="AGE-R Booster Pro"
              className="w-full h-[420px] object-contain bg-white"
            />
          </Card>
          <div className="grid grid-cols-5 gap-2">
            {boosterImages.map((img, i) => (
              <Card
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`p-1 cursor-pointer border hover-lift animate-fade-in-up ${selectedImage === i ? 'ring-2 ring-rose-500' : ''}`}
                style={{animationDelay: `${i * 0.05}s`}}
              >
                <img
                  src={safeImg(img.src)}
                  onError={(e) => ((e.target as HTMLImageElement).src = img.fallback)}
                  alt={`Booster image ${i + 1}`}
                  className="w-full h-20 object-cover"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Details */}
        <div ref={productDetails.ref as any} className={`space-y-6 scroll-slide-right ${productDetails.isVisible ? 'visible' : ''}`}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <Star className="h-5 w-5" style={{ color: PRIMARY }} />
              <span className="uppercase tracking-wider text-xs font-semibold" style={{ color: PRIMARY }}>BOOSTER PRO</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: PRIMARY }}>AGE-R Booster Pro</h1>
            <p className="text-sm opacity-80 max-w-xl" style={{ color: '#7f2039' }}>
              Achieve your glass-skin goals with 6-in-1 professional beauty technology. Enhanced absorption, radiance, elasticity, pore care, and LED personalization—no conductive gel required.
            </p>
          </div>

          {/* Price */}
          <Card ref={pricingSection.ref as any} className={`p-5 border-2 animate-fade-in-up scroll-slide-up ${pricingSection.isVisible ? 'visible' : ''}`} style={{ borderColor: `${PRIMARY}33`, background: `linear-gradient(90deg, ${ACCENT}44, #fff)` }}>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-3xl font-extrabold" style={{ color: PRIMARY }}>{price.current}</div>
              <div className="line-through opacity-70" style={{ color: '#7f2039' }}>{price.original}</div>
              <Badge className="font-bold" style={{ backgroundColor: PRIMARY, color: ACCENT }}>-50%</Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: '#7f2039' }}>
              <ShieldCheck className="h-4 w-4" /> Official — Made in Korea
            </div>
          </Card>

          {/* Colors */}
          <div ref={variantSection.ref as any} className={`space-y-2 animate-fade-in-up scroll-slide-up ${variantSection.isVisible ? 'visible' : ''}`}>
            <div className="font-semibold" style={{ color: PRIMARY }}>Colour</div>
            <div className="flex gap-3">
              {(['Pink', 'Black'] as const).map((c) => (
                <Button
                  key={c}
                  variant={color === c ? 'default' : 'outline'}
                  onClick={() => setColor(c)}
                  className={`px-5 ${color === c ? '' : 'border-2'}`}
                  style={color === c ? { backgroundColor: PRIMARY, color: ACCENT } : { borderColor: PRIMARY, color: PRIMARY }}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity and CTA */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: `${PRIMARY}55` }}>
              <Button variant="ghost" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</Button>
              <div className="px-4 font-semibold" style={{ color: PRIMARY }}>{qty}</div>
              <Button variant="ghost" onClick={() => setQty((q) => q + 1)}>+</Button>
            </div>
            <Button onClick={handleAddToCart} className="flex-1" style={{ backgroundColor: PRIMARY, color: ACCENT }}>Add to cart</Button>
            <Button variant="outline" className="flex-1 border-2" style={{ borderColor: PRIMARY, color: PRIMARY }}>Buy now</Button>
          </div>

          {/* Highlights */}
          <div ref={featuresSection.ref as any} className={`grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in-up scroll-slide-up ${featuresSection.isVisible ? 'visible' : ''}`}>
            {[
              { icon: Sparkles, label: 'Glass Glow' },
              { icon: ActivitySquare, label: 'Microcurrent' },
              { icon: Cpu, label: 'Electroporation' },
              { icon: Zap, label: 'EMS Lift' },
            ].map((it, i) => (
              <Card key={i} className="p-3 text-center border hover-lift" style={{ borderColor: `${PRIMARY}22`, animationDelay: `${i * 0.1}s` }}>
                <it.icon className="mx-auto mb-2" style={{ color: PRIMARY }} />
                <div className="text-sm font-semibold" style={{ color: PRIMARY }}>{it.label}</div>
              </Card>
            ))}
          </div>

          {/* Video & Clinical Results Side by Side */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Section */}
            <div ref={videoSection.ref as any} className={`animate-fade-in-up scroll-slide-left ${videoSection.isVisible ? 'visible' : ''}`} style={{animationDelay: '0.3s'}}>
              <Card className="overflow-hidden hover-lift luxury-border bg-gradient-to-br from-cream via-background to-rose-muted h-full">
                <div className="p-4 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-rose flex items-center justify-center">
                        <span className="text-white text-xs font-bold">▶️</span>
                      </div>
                      <h3 className="text-lg font-bold gradient-text">How It Works</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Watch the 4 revolutionary modes in action
                    </p>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border-2 flex-1" style={{ borderColor: `${PRIMARY}33` }}>
                    <video controls preload="metadata" className="w-full h-full min-h-[250px] max-h-[350px] object-cover" poster="/products/product-2-booster-pro/pink.png">
                      <source src="/videos/Screen Recording 2025-08-08 042534.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-rose text-white px-3 py-1 text-xs font-bold shadow-luxury">
                        ✨ DEMO VIDEO
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Clinical Test Results Section */}
            <div
              ref={clinicalSection.ref as any}
              className={`animate-fade-in-up scroll-slide-right ${clinicalSection.isVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              <Card className="overflow-hidden hover-lift luxury-border bg-gradient-to-br from-amber-50 via-background to-rose-muted h-full">
                <div className="p-4 space-y-4 h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">📊</span>
                      </div>
                      <h3 className="text-lg font-bold gradient-text">Clinical Results</h3>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🧪</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: PRIMARY }}>
                      Scientifically Proven Results
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Clinical study excerpt - Results may vary
                    </p>
                  </div>

                  {/* Compact Results Grid */}
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* Booster Mode */}
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-3 rounded-lg border border-rose-200/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-rose flex items-center justify-center">
                          <span className="text-white text-xs">⚡</span>
                        </div>
                        <h4 className="text-sm font-bold" style={{ color: PRIMARY }}>Booster</h4>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Absorption:</span>
                          <span className="font-bold text-green-600">785%↑</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">2-week use:</span>
                          <span className="font-bold text-green-600">11.4%↑</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Radiance:</span>
                          <span className="font-bold text-green-600">1.73%↑</span>
                        </div>
                      </div>
                    </div>

                    {/* MC Mode */}
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-200/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                          <span className="text-white text-xs">💪</span>
                        </div>
                        <h4 className="text-sm font-bold" style={{ color: PRIMARY }}>MC Mode</h4>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Firmness:</span>
                          <span className="font-bold text-green-600">35.9%↑</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Elasticity:</span>
                          <span className="font-bold text-green-600">16.1%↑</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lift effect:</span>
                          <span className="font-bold text-green-600">11.8%↑</span>
                        </div>
                      </div>
                    </div>

                    {/* Derma Shot Mode */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3 rounded-lg border border-purple-200/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                          <span className="text-white text-xs">🎯</span>
                        </div>
                        <h4 className="text-sm font-bold" style={{ color: PRIMARY }}>Derma Shot</h4>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sagging:</span>
                          <span className="font-bold text-blue-600">15.3%↓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fine lines:</span>
                          <span className="font-bold text-blue-600">5.31%↓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Muscle tone:</span>
                          <span className="font-bold text-green-600">4.89%↑</span>
                        </div>
                      </div>
                    </div>

                    {/* Air Shot Mode */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-200/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <span className="text-white text-xs">💎</span>
                        </div>
                        <h4 className="text-sm font-bold" style={{ color: PRIMARY }}>Air Shot</h4>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pore elasticity:</span>
                          <span className="font-bold text-green-600">791%↑</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pore size:</span>
                          <span className="font-bold text-blue-600">34.5%↓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Texture:</span>
                          <span className="font-bold text-blue-600">21.9%↓</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Badge */}
                  <div className="text-center mt-auto">
                    <Badge className="px-3 py-1 text-xs font-bold" style={{ 
                      background: `linear-gradient(135deg, ${PRIMARY}, #722033)`, 
                      color: ACCENT 
                    }}>
                      📊 Clinically Proven 🧬
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Enhanced Info Sections */}
          <div className="mt-8 space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold gradient-text mb-2">Product Information</h2>
              <div className="w-20 h-1 mx-auto bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full"></div>
            </div>
            
            <Accordion type="multiple" className="space-y-3">
              <AccordionItem value="what" className="border-2 rounded-xl overflow-hidden" style={{ borderColor: `${PRIMARY}22` }}>
                <AccordionTrigger className="px-6 py-4 hover:bg-rose-50 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center">
                      <span className="text-white text-sm">🔬</span>
                    </div>
                    <span className="font-semibold text-lg" style={{ color: PRIMARY }}>What is the product?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 bg-gradient-to-br from-rose-50/30 to-transparent">
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold text-lg" style={{ color: PRIMARY }}>6-in-1 Korean Glass Glow Device</p>
                    <p>The phrase "glass skin" means flawless, healthy, and glowing skin. Our Booster Pro device gives your skin a GLASS-GLASS-GLASS look.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                      {['Electroporation', 'Microcurrents', 'EMS', 'Electric micro-needles', 'LED', 'Sonic vibration'].map((tech, i) => (
                        <div key={i} className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-center border border-rose-200/50">
                          {tech}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm italic">Compatible with all skin types and designed for professional-level results at home.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="why-special" className="border-2 rounded-xl overflow-hidden" style={{ borderColor: `${PRIMARY}22` }}>
                <AccordionTrigger className="px-6 py-4 hover:bg-amber-50 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                      <span className="text-white text-sm">✨</span>
                    </div>
                    <span className="font-semibold text-lg" style={{ color: PRIMARY }}>Why is it so special?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 bg-gradient-to-br from-amber-50/30 to-transparent">
                  <div className="space-y-4">
                    {[
                      { icon: '🎯', title: '6 in 1 Glass Glow Device', desc: 'Achieve your skin goals with innovative technology for clear, crystal-clear skin.' },
                      { icon: '💧', title: 'No conductive gel required', desc: 'Use only with your own skincare products! Booster Pro will be a game-changer in your routine.' },
                      { icon: '🛡️', title: 'Skin contact sensor', desc: 'Equipped with a sensor that emits LED light only when it comes into contact with the skin.' },
                      { icon: '📱', title: 'AGE-R application', desc: 'Use your device more effectively with personalized care through the AGE-R app.' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <h4 className="font-semibold mb-1" style={{ color: PRIMARY }}>{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="modes" className="border-2 rounded-xl overflow-hidden" style={{ borderColor: `${PRIMARY}22` }}>
                <AccordionTrigger className="px-6 py-4 hover:bg-purple-50 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-sm">⚙️</span>
                    </div>
                    <span className="font-semibold text-lg" style={{ color: PRIMARY }}>4 Modes / How it works</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 bg-gradient-to-br from-purple-50/30 to-transparent">
                  <div className="space-y-4">
                    {[
                      { icon: '⚡', title: 'Booster Mode: Electroporation', desc: 'Enhances absorption of active ingredients and delivers them to the skin, promoting radiance. Creates temporary micro-holes for maximum absorption.' },
                      { icon: '💪', title: 'MC Mode: Microcurrent', desc: 'Helps plump facial features, targeting the eye area, laugh lines, and areas around the mouth with gentle electrical stimulation.' },
                      { icon: '🎯', title: 'Derma Shot Mode: EMS', desc: 'Stimulates sagging skin, helping to tighten facial features. Medium-frequency EMS supports contour maintenance by activating facial muscles.' },
                      { icon: '💎', title: 'Air Shot Mode: Electric Needles', desc: 'Increases pore elasticity by creating micro-passages on the skin\'s surface without damaging it. Supports comprehensive pore structure.' }
                    ].map((mode, i) => (
                      <div key={i} className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-2xl">{mode.icon}</div>
                          <h4 className="font-semibold" style={{ color: PRIMARY }}>{mode.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 ml-11">{mode.desc}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="app" className="border-2 rounded-xl overflow-hidden" style={{ borderColor: `${PRIMARY}22` }}>
                <AccordionTrigger className="px-6 py-4 hover:bg-emerald-50 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <span className="font-semibold text-lg" style={{ color: PRIMARY }}>AGE-R Application</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 bg-gradient-to-br from-emerald-50/30 to-transparent">
                  <div className="space-y-4">
                    <p className="font-semibold mb-4" style={{ color: PRIMARY }}>Use your device more efficiently with the AGE-R app</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: '🎥', title: 'Customized Guide Video', desc: 'Follow safely at home with personalized video guidance' },
                        { icon: '📅', title: 'My Calendar', desc: 'Professionally designed calendar that increases AGE-R device effectiveness' },
                        { icon: '📊', title: 'Skin Tracking', desc: 'Easy tracking to visualize your skin development over time' },
                        { icon: '🤖', title: 'Smart AGE-R Control', desc: 'Automatic reports from controlled modes, steps, volume, vibration and LED color' }
                      ].map((feature, i) => (
                        <div key={i} className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-emerald-200/50">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{feature.icon}</span>
                            <h4 className="font-semibold text-sm" style={{ color: PRIMARY }}>{feature.title}</h4>
                          </div>
                          <p className="text-xs text-gray-600">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-6">
                      <Badge className="px-4 py-2 text-sm font-bold animate-pulse" style={{ 
                        background: `linear-gradient(135deg, ${PRIMARY}, #722033)`, 
                        color: ACCENT 
                      }}>
                        📱 DOWNLOAD NOW! Get expert skincare tips! 📱
                      </Badge>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* LED Colors Banner */}
          <Card className="p-4 text-center border-2" style={{ borderColor: `${PRIMARY}33` }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sun style={{ color: PRIMARY }} />
              <h3 className="font-bold" style={{ color: PRIMARY }}>Five LED Colors</h3>
            </div>
            <p className="text-sm" style={{ color: '#7f2039' }}>Personalize your routine with multi-color LED care tailored to your goals.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}


