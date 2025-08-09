import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';

export const ImageGallery = ({ selectedVariant }: { selectedVariant: string }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Define variant-specific images
  const variantImages = {
    'Rose': '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png',
    'Vanilla': '/lovable-uploads/cb6c6690-1cbb-4768-b0be-65ccae0fb4d6.png',
    'Sweet Almond Coconut': '/lovable-uploads/72e5fa9a-1957-4804-aeb8-9ba74a901107.png'
  };

  // Additional product images for thumbnails - updated when variant changes
  const productImages = useMemo(() => [
    variantImages[selectedVariant as keyof typeof variantImages] || variantImages['Rose'],
    '/lovable-uploads/c970e003-859b-4681-a7f6-64824cb2a3ac.png',
    '/lovable-uploads/8b9df9aa-660c-4e4c-9443-a322b47eae9c.png',
    '/lovable-uploads/d2ccd223-4da9-45ee-8e7e-ddcf57d99ae7.png',
    '/lovable-uploads/ac6356ff-c0b3-4f9c-bbf9-c4b923551602.png',
    '/lovable-uploads/5baa6fc4-e2cc-4680-98c5-a26581ed6e81.png'
  ], [selectedVariant]);

  // Update main image when variant changes
  useEffect(() => {
    setSelectedImage(0); // Reset to main image when variant changes
  }, [selectedVariant]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image Display */}
      <Card className="relative overflow-hidden luxury-border animate-fade-in-up group hover-lift max-w-sm sm:max-w-md mx-auto">
        <div 
          className="relative aspect-square cursor-zoom-in transform-gpu"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          style={{
            transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)'
          }}
        >
          <img
            src={productImages[selectedImage]}
            alt="Champagne Beaute Lift Firming Body Crème"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={{
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              filter: isZoomed ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
            }}
          />
          
          {/* 3D Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Zoom Indicator */}
          {isZoomed && (
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-luxury text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold animate-float shadow-luxury">
              ✨ Zoomed
            </div>
          )}
          
          {/* Enhanced Shimmer Effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 2s infinite'
            }}
          />
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-sm sm:max-w-md mx-auto">
        {productImages.map((image, index) => (
          <Card
            key={index}
            className={`relative aspect-square cursor-pointer overflow-hidden transition-all duration-500 transform-gpu ${
              selectedImage === index 
                ? 'ring-2 sm:ring-4 ring-gold shadow-luxury animate-glow scale-105' 
                : 'hover:ring-2 hover:ring-primary hover:scale-110'
            }`}
            onClick={() => setSelectedImage(index)}
            style={{
              transform: selectedImage === index 
                ? 'perspective(500px) rotateX(2deg) rotateY(2deg) scale(1.05)' 
                : 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)',
              transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)'
            }}
          >
            <img
              src={image}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-500 hover:brightness-110"
              style={{
                filter: selectedImage === index ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
              }}
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-gradient-luxury opacity-30 animate-pulse-glow" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </Card>
        ))}
      </div>

      {/* Product Features */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm sm:max-w-md mx-auto">
        <Card className="p-2 sm:p-3 text-center bg-gradient-to-r from-gold/10 to-transparent border-gold/30">
          <div className="text-xs sm:text-sm font-semibold text-gold mb-1">Premium Quality</div>
          <div className="text-xs text-muted-foreground">Luxury ingredients</div>
        </Card>
        <Card className="p-2 sm:p-3 text-center bg-gradient-to-r from-rose/10 to-transparent border-rose/30">
          <div className="text-xs sm:text-sm font-semibold text-rose mb-1">Fast Results</div>
          <div className="text-xs text-muted-foreground">In just 4 weeks</div>
        </Card>
      </div>
    </div>
  );
};