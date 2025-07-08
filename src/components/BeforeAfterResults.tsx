import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Star, Award, Zap, Heart } from 'lucide-react';
import { useState } from 'react';

export const BeforeAfterResults = () => {
  const [activeResult, setActiveResult] = useState(0);

  const results = [
    {
      title: "Fine Lines & Wrinkles Reduction",
      beforeImage: "/lovable-uploads/b00aa63d-058a-4b94-b70e-5bb11c237eb7.png",
      description: "Visible improvement in skin texture and firmness after 4 weeks of daily use",
      timeframe: "4 weeks",
      improvement: "85% improvement"
    },
    {
      title: "Skin Firmness & Elasticity",
      beforeImage: "/lovable-uploads/c55c4e0c-f2aa-4b4a-9921-ebf1ae1b28a4.png", 
      description: "Enhanced skin elasticity and reduced appearance of stretch marks",
      timeframe: "4 weeks",
      improvement: "78% firmer"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      age: 42,
      review: "I couldn't believe the transformation! My skin feels like silk and looks years younger.",
      rating: 5,
      verified: true
    },
    {
      name: "Maria L.",
      age: 38,
      review: "The luxury texture and amazing results make this worth every penny. My stretch marks have faded significantly!",
      rating: 5,
      verified: true
    },
    {
      name: "Jennifer K.",
      age: 45,
      review: "After trying countless products, this is the first one that actually delivered visible results in just 4 weeks.",
      rating: 5,
      verified: true
    }
  ];

  const keyResults = [
    {
      icon: Clock,
      stat: "4 Weeks",
      description: "Visible Results Timeline",
      color: "text-gold"
    },
    {
      icon: TrendingUp,
      stat: "85%",
      description: "Improvement in Skin Texture",
      color: "text-rose"
    },
    {
      icon: Heart,
      stat: "12.5K",
      description: "Satisfied Customers",
      color: "text-primary"
    },
    {
      icon: Star,
      stat: "4.9/5",
      description: "Average Rating",
      color: "text-gold-dark"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Results Header */}
      <div className="text-center space-y-4 animate-fade-in-up">
        <Badge className="bg-gradient-rose text-white px-6 py-2 text-lg animate-pulse-glow">
          ✨ PROVEN RESULTS
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
          Transform Your Skin in Just 4 Weeks
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See the incredible transformation achieved by thousands of satisfied customers worldwide
        </p>
      </div>

      {/* Before/After Gallery */}
      <div className="grid lg:grid-cols-2 gap-8">
        {results.map((result, index) => (
          <Card key={index} className="overflow-hidden hover-lift animate-fade-in-up luxury-border">
            <div className="relative">
              <img
                src={result.beforeImage}
                alt={result.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">
                  {result.improvement}
                </Badge>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-primary">{result.title}</h3>
              <p className="text-muted-foreground">{result.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gold" />
                  <span className="text-sm font-semibold text-primary">{result.timeframe}</span>
                </div>
                <Badge variant="outline" className="border-gold text-gold">
                  Verified Results
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {keyResults.map((result, index) => (
          <Card key={index} className="p-6 text-center hover-lift animate-fade-in-up bg-gradient-to-b from-cream to-background">
            <result.icon className={`h-8 w-8 mx-auto mb-3 ${result.color}`} />
            <div className="text-2xl font-bold text-primary mb-1">{result.stat}</div>
            <div className="text-sm text-muted-foreground">{result.description}</div>
          </Card>
        ))}
      </div>

      {/* Scientific Claims */}
      <Card className="p-8 bg-gradient-to-r from-primary to-primary-light text-primary-foreground animate-glow">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Clinically Proven Formula</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Zap className="h-12 w-12 mx-auto text-gold" />
              <h4 className="font-semibold">Boost Collagen</h4>
              <p className="text-sm opacity-90">Gold peptides penetrate dermis to regenerate collagen fibers</p>
            </div>
            <div className="space-y-2">
              <TrendingUp className="h-12 w-12 mx-auto text-gold" />
              <h4 className="font-semibold">Improve Circulation</h4>
              <p className="text-sm opacity-90">Pink pepper extract enhances microcirculation by 65%</p>
            </div>
            <div className="space-y-2">
              <Heart className="h-12 w-12 mx-auto text-gold" />
              <h4 className="font-semibold">Deep Hydration</h4>
              <p className="text-sm opacity-90">Triple hydration complex locks moisture for 24+ hours</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Customer Testimonials */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-primary">What Our Customers Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover-lift animate-fade-in-up">
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.review}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">Age {testimonial.age}</div>
                  </div>
                  {testimonial.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lifestyle Image Section */}
      <Card className="overflow-hidden animate-fade-in-up">
        <div className="relative">
          <img 
            src="/lovable-uploads/8aaef36d-34b7-4334-b07d-511cadc8993b.png"
            alt="Lifestyle - Sculpt and Contour the body"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
            <div className="p-8 space-y-4 max-w-lg">
              <h3 className="text-3xl font-bold text-primary-foreground">
                Sculpt and Contour the body
              </h3>
              <p className="text-primary-foreground/90 text-lg">
                with new elasticity and hydration.
              </p>
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-dark text-primary font-bold px-8 py-3 animate-pulse-glow"
              >
                Experience the Transformation
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Ingredient Highlight */}
      <Card className="p-8 bg-gradient-to-r from-rose-muted via-cream to-gold-light">
        <div className="text-center space-y-6 animate-fade-in-up">
          <img 
            src="/lovable-uploads/2f612191-917f-4ada-921e-fe4f6cab4b30.png"
            alt="Luxe-Lift Firming Complex Information"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-luxury"
          />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">The Science Behind the Luxury</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our exclusive Luxe-Lift Firming Complex combines the finest ingredients nature and science have to offer. 
              Each element is carefully selected and precisely formulated to deliver maximum efficacy while maintaining 
              the luxurious experience you deserve.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};