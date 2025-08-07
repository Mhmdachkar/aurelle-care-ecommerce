import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Heart, ShoppingCart as CartIcon, Eye, Star, Shield, Truck, RotateCcw, Clock, Zap, Award, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useDiscounts } from '@/hooks/useDiscounts';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice: number;
  images: string[];
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  variants?: string[];
  features: string[];
  benefits: string[];
}

const DynamicProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { getTotalDiscount } = useDiscounts();
  const { trackViewContent } = useMetaPixel();

  // Product database
  const products: Record<string, Product> = {
    'champagne-lift-creme': {
      id: 'champagne-lift-creme',
      name: 'Champagne Beaute Lift Firming Body Crème',
      description: 'Luxury firming body cream with visible results in 4 weeks',
      longDescription: 'Experience the luxury of our signature Champagne Beaute Lift Firming Body Crème. This premium formula combines advanced peptides with natural ingredients to deliver visible firming results in just 4 weeks. Perfect for all skin types, this rich, indulgent cream provides deep hydration while targeting the appearance of cellulite and improving skin elasticity.',
      price: 22.99,
      originalPrice: 39.90,
      images: [
        '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png',
        '/lovable-uploads/cb6c6690-1cbb-4768-b0be-65ccae0fb4d6.png',
        '/lovable-uploads/72e5fa9a-1957-4804-aeb8-9ba74a901107.png'
      ],
      rating: 4.8,
      reviews: 1247,
      badge: 'Bestseller',
      category: 'Body Care',
      variants: ['Rose', 'Vanilla', 'Sweet Almond Coconut'],
      features: [
        'Advanced peptide technology',
        'Natural ingredients',
        'Visible results in 4 weeks',
        'Suitable for all skin types',
        'Deep hydration formula'
      ],
      benefits: [
        'Improves skin elasticity',
        'Reduces appearance of cellulite',
        'Provides long-lasting hydration',
        'Firms and tones skin',
        'Luxurious, non-greasy texture'
      ]
    },
    'rose-glow-serum': {
      id: 'rose-glow-serum',
      name: 'Rose Glow Vitamin C Serum',
      description: 'Brightening serum with 20% Vitamin C for radiant skin',
      longDescription: 'Illuminate your complexion with our Rose Glow Vitamin C Serum. This powerful formula combines 20% Vitamin C with rose extract to brighten skin, reduce dark spots, and promote collagen production. The lightweight, fast-absorbing serum delivers antioxidant protection while giving your skin a natural, healthy glow.',
      price: 34.99,
      originalPrice: 49.99,
      images: ['/lovable-uploads/placeholder.svg'],
      rating: 4.9,
      reviews: 892,
      badge: 'New',
      category: 'Face Care',
      variants: ['Original', 'Sensitive'],
      features: [
        '20% Vitamin C',
        'Rose extract',
        'Antioxidant protection',
        'Fast-absorbing formula',
        'Suitable for daily use'
      ],
      benefits: [
        'Brightens complexion',
        'Reduces dark spots',
        'Promotes collagen production',
        'Protects against free radicals',
        'Improves skin texture'
      ]
    },
    'lavender-sleep-mask': {
      id: 'lavender-sleep-mask',
      name: 'Lavender Dream Sleep Mask',
      description: 'Overnight repair mask with lavender for deep hydration',
      longDescription: 'Drift into beauty sleep with our Lavender Dream Sleep Mask. This overnight repair formula combines the calming properties of lavender with powerful hydrating ingredients to repair and rejuvenate your skin while you sleep. Wake up to softer, more radiant skin every morning.',
      price: 28.99,
      originalPrice: 42.00,
      images: ['/lovable-uploads/placeholder.svg'],
      rating: 4.7,
      reviews: 567,
      category: 'Face Care',
      features: [
        'Lavender extract',
        'Overnight repair formula',
        'Deep hydration',
        'Calming properties',
        'Non-comedogenic'
      ],
      benefits: [
        'Repairs skin overnight',
        'Provides deep hydration',
        'Calms and soothes skin',
        'Improves skin texture',
        'Promotes restful sleep'
      ]
    }
  };

  const product = products[productId || ''];

  // Redirect if product not found
  useEffect(() => {
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  // Set default variant
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Track ViewContent event when component mounts
  useEffect(() => {
    if (!product) return;

    const trackViewContentWithDelay = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        trackViewContent(
          product.name,
          product.category,
          product.price
        );
      } else {
        setTimeout(trackViewContentWithDelay, 1000);
      }
    };

    setTimeout(trackViewContentWithDelay, 500);
  }, [product, trackViewContent]);

  // Scroll animations
  const productGallery = useScrollAnimation({ threshold: 0.2 });
  const productDetails = useScrollAnimation({ threshold: 0.1 });
  const pricingSection = useScrollAnimation({ threshold: 0.3 });
  const variantSection = useScrollAnimation({ threshold: 0.2 });
  const featuresSection = useScrollAnimation({ threshold: 0.1 });
  const videoSection = useScrollAnimation({ threshold: 0.2 });
  const { ref: statsRef, visibleItems: statsVisible } = useStaggeredAnimation(2, 200);

  if (!product) {
    return null;
  }

  const basePrices = {
    USD: { current: product.price.toString(), original: product.originalPrice.toString() },
    GBP: { current: (product.price * 0.8).toFixed(2), original: (product.originalPrice * 0.8).toFixed(2) },
    EUR: { current: (product.price * 0.94).toFixed(2), original: (product.originalPrice * 0.94).toFixed(2) }
  };

  // Calculate prices with actual discounts from gift system
  const totalDiscount = getTotalDiscount();
  const discountMultiplier = (100 - totalDiscount) / 100;
  
  const prices = user ? {
    USD: { 
      current: (product.price * discountMultiplier).toFixed(2), 
      original: product.originalPrice.toString(),
      beforeDiscount: product.price.toString(),
      totalDiscount
    },
    GBP: { 
      current: (product.price * 0.8 * discountMultiplier).toFixed(2), 
      original: (product.originalPrice * 0.8).toFixed(2),
      beforeDiscount: (product.price * 0.8).toFixed(2),
      totalDiscount
    },
    EUR: { 
      current: (product.price * 0.94 * discountMultiplier).toFixed(2), 
      original: (product.originalPrice * 0.94).toFixed(2),
      beforeDiscount: (product.price * 0.94).toFixed(2),
      totalDiscount
    }
  } : basePrices;

  const handleAddToCart = async () => {
    await addToCart({
      product_name: product.name,
      price: product.price,
      quantity,
      image_url: product.images[0],
      variant: selectedVariant || 'single'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFDFB9] via-white to-[#FFDFB9]/30">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-[#A4193D] hover:bg-[#A4193D]/10 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Gallery */}
          <div ref={productGallery} className="space-y-6">
            <ImageGallery images={product.images} />
          </div>

          {/* Product Details */}
          <div ref={productDetails} className="space-y-8">
            {product.badge && (
              <Badge className="bg-[#A4193D] text-white font-medium">
                {product.badge}
              </Badge>
            )}
            
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#A4193D] mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div ref={pricingSection} className="space-y-6">
              <div className="flex items-center gap-6">
                <span className="text-4xl font-bold text-[#A4193D]">
                  ${prices[selectedCurrency as keyof typeof prices].current}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${prices[selectedCurrency as keyof typeof prices].original}
                  </span>
                )}
                <CurrencySelector 
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                />
              </div>
              
              {user && totalDiscount > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">
                    🎉 You save ${totalDiscount}% with your loyalty discount!
                  </p>
                </div>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div ref={variantSection} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Choose Variant</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant}
                      variant={selectedVariant === variant ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant)}
                      className={selectedVariant === variant ? "bg-[#A4193D] text-white" : "border-[#A4193D] text-[#A4193D] hover:bg-[#A4193D]/10"}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="text-lg font-semibold text-gray-800">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </Button>
                  <span className="px-6 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-[#A4193D] hover:bg-[#A4193D]/90 text-white font-semibold text-lg py-4"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <TrustBadges />
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-20 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#A4193D] mb-6">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.longDescription}
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#A4193D] mb-6">Key Benefits</h2>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A4193D] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-600 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features */}
          <div ref={featuresSection} className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#A4193D] mb-8 text-center">Product Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#FFDFB9]/20 transition-colors">
                  <div className="w-10 h-10 bg-[#FFDFB9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[#A4193D]" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default DynamicProductPage;
