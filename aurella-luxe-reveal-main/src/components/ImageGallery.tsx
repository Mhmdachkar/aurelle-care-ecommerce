import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ImageGalleryProps {
  selectedVariant: string;
}

export const ImageGallery = ({ selectedVariant }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Product images using direct links
  const variantImages = {
    'Rose': [
      '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png',
      '/lovable-uploads/5baa6fc4-e2cc-4680-98c5-a26581ed6e81.png',
      '/lovable-uploads/c970e003-859b-4681-a7f6-64824cb2a3ac.png',
    ],
    'Vanilla': [
      '/lovable-uploads/cb6c6690-1cbb-4768-b0be-65ccae0fb4d6.png',
      '/lovable-uploads/81e2f348-0374-4440-9196-e9fc43dcd6b6.png',
      '/lovable-uploads/8aaef36d-34b7-4334-b07d-511cadc8993b.png',
    ],
    'Sweet Almond Coconut': [
      '/lovable-uploads/72e5fa9a-1957-4804-aeb8-9ba74a901107.png',
      '/lovable-uploads/2f612191-917f-4ada-921e-fe4f6cab4b30.png',
      '/lovable-uploads/81e2f348-0374-4440-9196-e9fc43dcd6b6.png',
    ]
  };
  
  const productImages = variantImages[selectedVariant as keyof typeof variantImages] || variantImages['Rose'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display - Smaller Size */}
      <Card className="relative overflow-hidden luxury-border animate-fade-in-up group hover-lift max-w-md mx-auto">
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
            <div className="absolute top-4 right-4 bg-gradient-luxury text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold animate-float shadow-luxury">
              ✨ Zoomed
            </div>
          )}
          
          {/* Enhanced Shimmer Effect */}
          <div className="absolute inset-0 animate-shimmer opacity-20 group-hover:opacity-50 transition-opacity duration-700" 
               style={{
                 background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)',
                 backgroundSize: '200% 200%'
               }}
          />
        </div>
      </Card>

      {/* Thumbnail Gallery - Smaller Size */}
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {productImages.map((image, index) => (
          <Card
            key={index}
            className={`relative aspect-square cursor-pointer overflow-hidden transition-all duration-500 transform-gpu ${
              selectedImage === index 
                ? 'ring-4 ring-gold shadow-luxury animate-glow scale-105' 
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

      {/* 3D Animation Hint */}
      <div className="text-center animate-float">
        <p className="text-sm text-muted-foreground mb-2">
          ✨ Hover over main image to zoom • Click thumbnails to switch views
        </p>
        <div className="inline-flex items-center space-x-2 text-gold">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-xs font-semibold">LUXURY EXPERIENCE</span>
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};