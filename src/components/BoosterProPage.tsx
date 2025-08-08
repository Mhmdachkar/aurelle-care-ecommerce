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

          {/* Video Section */}
          <div ref={videoSection.ref as any} className={`mt-6 animate-fade-in-up scroll-slide-up ${videoSection.isVisible ? 'visible' : ''}`} style={{animationDelay: '0.3s'}}>
            <Card className="overflow-hidden hover-lift luxury-border bg-gradient-to-br from-cream via-background to-rose-muted">
              <div className="p-4">
                <div className="text-center mb-2">
                  <h3 className="text-base font-bold" style={{ color: PRIMARY }}>How It Works</h3>
                </div>
                <div className="relative rounded-xl overflow-hidden border-2" style={{ borderColor: `${PRIMARY}33` }}>
                  <video controls preload="metadata" className="w-full h-auto max-h-[420px] object-cover" poster="/products/product-2-booster-pro/pink.png">
                    <source src="/videos/Screen Recording 2025-08-08 042534.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </Card>
          </div>

          {/* Info Sections */}
          <Accordion type="multiple" className="space-y-2">
            <AccordionItem value="what">
              <AccordionTrigger>
                <span className="font-semibold" style={{ color: PRIMARY }}>What is the product?</span>
              </AccordionTrigger>
              <AccordionContent>
                6-in-1 Korean Glass Glow device combining Electroporation, Microcurrents, EMS, Electric micro-needles, LED, and Sonic vibration. Compatible with all skin types and designed for professional-level results at home.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="why-special">
              <AccordionTrigger>
                <span className="font-semibold" style={{ color: PRIMARY }}>Why is it so special?</span>
              </AccordionTrigger>
              <AccordionContent>
                1) All-in-one glass-skin device. 2) No conductive gel required—use with your own skincare. 3) Skin-contact LED sensor for safe use. 4) Personalized care with the AGE-R app.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="modes">
              <AccordionTrigger>
                <span className="font-semibold" style={{ color: PRIMARY }}>4 Modes / How it works</span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li><b>Booster (Electroporation):</b> Enhances absorption and glow by creating temporary micro-channels.</li>
                  <li><b>MC (Microcurrent):</b> Helps plump features—great for eyes, smile lines, and mouth area.</li>
                  <li><b>Derma Shot (EMS):</b> Medium-frequency EMS supports contour and elasticity.</li>
                  <li><b>Air Shot (Electric Needles):</b> Creates micro-passages to support pore care and elasticity.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="app">
              <AccordionTrigger>
                <span className="font-semibold" style={{ color: PRIMARY }}>AGE-R App</span>
              </AccordionTrigger>
              <AccordionContent>
                Use the app for customized guide videos, calendar planning, skin tracking, and smart care records to maximize results.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Clinical Test Results Section */}
          <div
            ref={clinicalSection.ref as any}
            className={`mt-6 animate-fade-in-up scroll-slide-up ${clinicalSection.isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            <Card className="overflow-hidden hover-lift luxury-border bg-gradient-to-br from-cream via-background to-rose-muted">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📊</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold gradient-text">Clinical Test Results</h3>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🧪</span>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-semibold" style={{ color: PRIMARY }}>
                    Skin Care Powered by Clinical Test Results
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    This is an excerpt from a clinical test report conducted with the Booster Pro device's 4 modes. Results may vary from person to person.
                  </p>
                </div>

                {/* Clinical Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Booster Mode */}
                  <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl border-2 border-rose-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-rose flex items-center justify-center">
                        <span className="text-white text-xs font-bold">⚡</span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: PRIMARY }}>Booster Mode</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Absorption Enhancement:</span>
                        <span className="font-bold text-green-600">785% increase</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">2 weeks use:</span>
                        <span className="font-bold text-green-600">11.4% increase</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">4 weeks improvement:</span>
                        <span className="font-bold text-green-600">1.98%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Skin texture:</span>
                        <span className="font-bold text-green-600">1.8% improvement</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">2 weeks radiance:</span>
                        <span className="font-bold text-green-600">1.73% increase</span>
                      </div>
                    </div>
                  </div>

                  {/* MC Mode */}
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border-2 border-amber-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💪</span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: PRIMARY }}>MC Mode (Microcurrent)</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">2 weeks improvement:</span>
                        <span className="font-bold text-green-600">35.9%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Firmness boost:</span>
                        <span className="font-bold text-green-600">24.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Elasticity:</span>
                        <span className="font-bold text-green-600">16.1%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Contour definition:</span>
                        <span className="font-bold text-green-600">12.6%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Lift effect:</span>
                        <span className="font-bold text-green-600">11.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Muscle activation:</span>
                        <span className="font-bold text-green-600">5.46% increase</span>
                      </div>
                    </div>
                  </div>

                  {/* Derma Shot Mode */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border-2 border-purple-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🎯</span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: PRIMARY }}>Derma Shot Mode (EMS)</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Sagging reduction:</span>
                        <span className="font-bold text-blue-600">15.3% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Fine lines:</span>
                        <span className="font-bold text-blue-600">5.31% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Wrinkle depth:</span>
                        <span className="font-bold text-blue-600">4.49% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Puffiness:</span>
                        <span className="font-bold text-blue-600">4.24% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Muscle tone:</span>
                        <span className="font-bold text-green-600">4.89% increase</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Volume reduction:</span>
                        <span className="font-bold text-blue-600">1.21 cc decrease</span>
                      </div>
                    </div>
                  </div>

                  {/* Air Shot Mode */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border-2 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">💎</span>
                      </div>
                      <h4 className="text-lg font-bold" style={{ color: PRIMARY }}>Air Shot Mode (Electric Micro Needles)</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pore elasticity:</span>
                        <span className="font-bold text-green-600">791% increase</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pore size:</span>
                        <span className="font-bold text-blue-600">34.5% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Blackheads:</span>
                        <span className="font-bold text-blue-600">27.4% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">1 week texture:</span>
                        <span className="font-bold text-blue-600">21.9% reduction</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Roughness (1 week):</span>
                        <span className="font-bold text-blue-600">14.1% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pore depth:</span>
                        <span className="font-bold text-blue-600">16.1% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Surface irregularities:</span>
                        <span className="font-bold text-blue-600">9.04% decrease</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Skin bumps:</span>
                        <span className="font-bold text-blue-600">6.68% decrease</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-muted-foreground mb-3">
                    ✨ Results based on clinical studies. Individual results may vary. ✨
                  </p>
                  <Badge className="px-4 py-2 text-sm font-bold" style={{ 
                    background: `linear-gradient(135deg, ${PRIMARY}, #722033)`, 
                    color: ACCENT 
                  }}>
                    📊 Clinically Proven Technology 🧬
                  </Badge>
                </div>
              </div>
            </Card>
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


