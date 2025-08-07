import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star, Play, ArrowRight, Sparkles, Award, Shield, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useMetaPixel } from '@/hooks/useMetaPixel';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { trackViewContent, trackAddToCart } = useMetaPixel();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: 'champagne-lift-creme',
      name: 'Champagne Beaute Lift Firming Body Crème',
      description: 'Luxury firming body cream with visible results in 4 weeks',
      price: 22.99,
      originalPrice: 39.90,
      image: '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png',
      rating: 4.8,
      reviews: 1247,
      badge: 'Bestseller',
      category: 'Body Care'
    },
    {
      id: 'rose-glow-serum',
      name: 'Rose Glow Vitamin C Serum',
      description: 'Brightening serum with 20% Vitamin C for radiant skin',
      price: 34.99,
      originalPrice: 49.99,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.9,
      reviews: 892,
      badge: 'New',
      category: 'Face Care'
    },
    {
      id: 'lavender-sleep-mask',
      name: 'Lavender Dream Sleep Mask',
      description: 'Overnight repair mask with lavender for deep hydration',
      price: 28.99,
      originalPrice: 42.00,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.7,
      reviews: 567,
      category: 'Face Care'
    },
    {
      id: 'coconut-body-scrub',
      name: 'Coconut Bliss Body Scrub',
      description: 'Exfoliating body scrub with coconut and brown sugar',
      price: 19.99,
      originalPrice: 29.99,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.6,
      reviews: 423,
      category: 'Body Care'
    },
    {
      id: 'hyaluronic-moisturizer',
      name: 'Hyaluronic Acid Moisturizer',
      description: '24-hour hydration with 2% hyaluronic acid',
      price: 26.99,
      originalPrice: 38.50,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.8,
      reviews: 756,
      badge: 'Popular',
      category: 'Face Care'
    },
    {
      id: 'argan-hair-oil',
      name: 'Argan Oil Hair Treatment',
      description: 'Nourishing hair oil for shine and repair',
      price: 24.99,
      originalPrice: 35.00,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.7,
      reviews: 634,
      category: 'Hair Care'
    },
    {
      id: 'retinol-night-cream',
      name: 'Retinol Night Repair Cream',
      description: 'Anti-aging night cream with 0.5% retinol',
      price: 39.99,
      originalPrice: 55.00,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.9,
      reviews: 445,
      badge: 'Premium',
      category: 'Face Care'
    },
    {
      id: 'tea-tree-cleanser',
      name: 'Tea Tree Purifying Cleanser',
      description: 'Gentle cleanser with tea tree oil for clear skin',
      price: 18.99,
      originalPrice: 26.99,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.5,
      reviews: 389,
      category: 'Face Care'
    },
    {
      id: 'shea-hand-cream',
      name: 'Shea Butter Hand Cream',
      description: 'Intensive hand cream with shea butter and vitamin E',
      price: 15.99,
      originalPrice: 22.50,
      image: '/lovable-uploads/placeholder.svg',
      rating: 4.6,
      reviews: 298,
      category: 'Body Care'
    }
  ];

  const handleProductClick = (product: Product) => {
    trackViewContent(product.name, product.category, product.price);
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (product: Product) => {
    await addToCart({
      product_name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image,
      variant: 'single'
    });
    trackAddToCart(product.name, product.category, product.price, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFDFB9] via-white to-[#FFDFB9]/30">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A4193D]/80 to-[#A4193D]/60 z-10"></div>
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover"
          poster="/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png"
        >
          <source src="/videos/Screen Recording 2025-07-07 172049.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Luxury Beauty Collection
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block text-[#FFDFB9]">Natural Radiance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Premium skincare products crafted with natural ingredients for your most beautiful self
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#FFDFB9] text-[#A4193D] hover:bg-[#FFDFB9]/90 font-semibold"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Story
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-[#A4193D] mb-2" />
              <h3 className="font-semibold text-gray-800">Premium Quality</h3>
              <p className="text-sm text-gray-600">Luxury ingredients</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-[#A4193D] mb-2" />
              <h3 className="font-semibold text-gray-800">Safe & Natural</h3>
              <p className="text-sm text-gray-600">Cruelty-free</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-[#A4193D] mb-2" />
              <h3 className="font-semibold text-gray-800">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders $50+</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-[#A4193D] mb-2" />
              <h3 className="font-semibold text-gray-800">4.8/5 Rating</h3>
              <p className="text-sm text-gray-600">From 10k+ reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 bg-gradient-to-b from-white to-[#FFDFB9]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#A4193D] mb-4">
              Our Beauty Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium beauty products designed to enhance your natural beauty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card 
                key={product.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product)}
              >
                <CardHeader className="relative p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-[#A4193D] text-white">
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-[#FFDFB9] text-[#A4193D]">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#A4193D]">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#A4193D] hover:bg-[#A4193D]/90 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#A4193D] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Beauty Routine?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of customers who have discovered their natural radiance with our premium beauty collection
          </p>
          <Button 
            size="lg" 
            className="bg-[#FFDFB9] text-[#A4193D] hover:bg-[#FFDFB9]/90 font-semibold"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
