import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, Sparkles, TrendingUp } from 'lucide-react';

export const BeforeAfterResults = () => {
  const results = [
    {
      title: "Firming & Lifting",
      description: "Visible reduction in sagging and improved skin firmness on arms and abdomen",
      beforeImage: "/lovable-uploads/c970e003-859b-4681-a7f6-64824cb2a3ac.png",
      afterImage: "/lovable-uploads/8b9df9aa-660c-4e4c-9443-a322b47eae9c.png",
      improvement: "92% Firmer",
      timeframe: "4 weeks"
    },
    {
      title: "Skin Smoothness",
      description: "Dramatic improvement in skin texture and reduction of fine lines",
      beforeImage: "/lovable-uploads/d2ccd223-4da9-45ee-8e7e-ddcf57d99ae7.png",
      afterImage: "/lovable-uploads/2f612191-917f-4ada-921e-fe4f6cab4b30.png",
      improvement: "85% Smoother",
      timeframe: "6 weeks"
    },
    {
      title: "Body Contouring",
      description: "Noticeable reduction in the appearance of fat accumulation areas",
      beforeImage: "/lovable-uploads/5baa6fc4-e2cc-4680-98c5-a26581ed6e81.png",
      afterImage: "/lovable-uploads/ac6356ff-c0b3-4f9c-bbf9-c4b923551602.png",
      improvement: "78% Contoured",
      timeframe: "8 weeks"
    },
    {
      title: "Hydration & Glow",
      description: "Enhanced skin hydration and natural radiance restoration",
      beforeImage: "/lovable-uploads/b00aa63d-058a-4b94-b70e-5bb11c237eb7.png",
      afterImage: "/lovable-uploads/c55c4e0c-f2aa-4b4a-9921-ebf1ae1b28a4.png",
      improvement: "94% Hydrated",
      timeframe: "2 weeks"
    }
  ];

  const keyResults = [
    {
      icon: Award,
      stat: "92%",
      description: "Skin Firmness Improvement",
      color: "text-gold"
    },
    {
      icon: Sparkles,
      stat: "85%",
      description: "Smoother Skin Texture",
      color: "text-rose"
    },
    {
      icon: TrendingUp,
      stat: "78%",
      description: "Body Contouring Effect",
      color: "text-primary"
    },
    {
      icon: Clock,
      stat: "4 weeks",
      description: "Average Results Time",
      color: "text-gold-dark"
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">Real Results, Real People</h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          See the transformation that thousands of women have experienced with our luxury formula
        </p>
      </div>

      {/* Before/After Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {results.map((result, index) => (
          <Card key={index} className="overflow-hidden hover-lift animate-fade-in-up luxury-border">
            <div className="relative">
              <img
                src={result.beforeImage}
                alt={result.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm">
                  {result.improvement}
                </Badge>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-primary">{result.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{result.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gold" />
                  <span className="text-xs sm:text-sm font-semibold text-primary">{result.timeframe}</span>
                </div>
                <Badge variant="outline" className="border-gold text-gold text-xs sm:text-sm">
                  Verified Results
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {keyResults.map((result, index) => (
          <Card key={index} className="p-4 sm:p-6 text-center hover-lift animate-fade-in-up bg-gradient-to-b from-cream to-background">
            <result.icon className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 ${result.color}`} />
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">{result.stat}</div>
            <div className="text-xs sm:text-sm text-muted-foreground px-1">{result.description}</div>
          </Card>
        ))}
      </div>

      {/* Scientific Claims */}
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-gold/10 via-cream to-rose/10 luxury-border">
        <div className="text-center space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-primary">Clinical Study Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gold mb-1 sm:mb-2">95%</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Noticed firmer skin</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-rose mb-1 sm:mb-2">88%</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Improved skin elasticity</p>
            </div>
            <div className="text-center sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">92%</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Would recommend to friends</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
            *Based on a 12-week clinical study with 150 participants. Results may vary. Individual results not guaranteed.
          </p>
        </div>
      </Card>
    </div>
  );
};