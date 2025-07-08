import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Truck, RotateCcw, Clock, Zap, Award, Globe, Headphones } from 'lucide-react';

export const TrustBadges = () => {
  const trustFeatures = [
    {
      icon: Zap,
      title: "In Stock",
      description: "Priority is given to delivery after payment",
      badge: "🔥 Hot",
      color: "text-red-500"
    },
    {
      icon: Award,
      title: "Returns",
      description: "Fast Refund, Money-Back Guarantee",
      badge: "🏆 Trusted",
      color: "text-gold"
    },
    {
      icon: Clock,
      title: "Handling time",
      description: "Priority delivery after payment",
      badge: "⏰ Fast",
      color: "text-blue-500"
    },
    {
      icon: Truck,
      title: "Shipping",
      description: "We'll arrange the fastest shipping for you",
      badge: "🚢 Express",
      color: "text-green-500"
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: "100% Risk-Free Purchase",
      description: "If you're not satisfied, simply contact us for a replacement or refund",
      highlight: true
    },
    {
      icon: Globe,
      title: "Insured Worldwide Shipping",
      description: "Real-time tracking and insurance coverage for every order",
      highlight: false
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description: "Live representatives ready to help within 24 hours, 7 days a week",
      highlight: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Quick Trust Badges */}
      <div className="grid grid-cols-2 gap-3">
        {trustFeatures.map((feature, index) => (
          <Card key={index} className="p-4 hover-lift transition-luxury border-2 border-transparent hover:border-gold">
            <div className="flex items-center space-x-3">
              <feature.icon className={`h-5 w-5 ${feature.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-primary text-sm">{feature.title}</span>
                  <Badge variant="outline" className="text-xs py-0 px-2">
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Special Offer Badge */}
      <Card className="p-4 bg-gradient-rose text-white animate-pulse-glow text-center">
        <h3 className="font-bold text-lg mb-2">🎉 BUY MORE SAVE MORE</h3>
        <p className="text-sm opacity-90">All products participate in the event</p>
      </Card>

      {/* Detailed Guarantees */}
      <div className="space-y-3">
        {guarantees.map((guarantee, index) => (
          <Card 
            key={index} 
            className={`p-4 hover-lift transition-luxury ${
              guarantee.highlight ? 'luxury-border bg-gradient-to-r from-cream to-gold-light' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <guarantee.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-primary mb-1">{guarantee.title}</h4>
                <p className="text-sm text-muted-foreground">{guarantee.description}</p>
              </div>
              {guarantee.highlight && (
                <Badge className="bg-primary text-primary-foreground animate-glow">
                  🔒 Secure
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Contact Information */}
      <Card className="p-4 bg-gradient-to-r from-primary to-primary-light text-primary-foreground text-center animate-glow">
        <h3 className="font-bold mb-2">Need Help?</h3>
        <p className="text-sm opacity-90 mb-2">Contact our support team anytime</p>
        <p className="text-sm font-mono">support@sentdream.net</p>
      </Card>

      {/* Why Choose Us Section */}
      <Card className="p-6 luxury-border">
        <h3 className="text-lg font-bold text-primary mb-4 text-center">WHY US❓</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="h-3 w-3 text-gold" />
            </div>
            <p className="text-muted-foreground">
              🏆 We work directly with manufacturers all over the world to ensure the best quality of our products. 
              We have a Quality Control department which helps us to keep our promise!
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Headphones className="h-3 w-3 text-gold" />
            </div>
            <p className="text-muted-foreground">
              😊 24/7 Customer Support: We have a team of live reps ready to help and answer any questions you have 
              within a 24-hour time frame, 7 days a week.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Globe className="h-3 w-3 text-gold" />
            </div>
            <p className="text-muted-foreground">
              🚢 Insured Worldwide Shipping: Each order includes real-time tracking details and insurance coverage 
              in the unlikely event that a package gets lost or stolen in transit.
            </p>
          </div>
        </div>
      </Card>

      {/* Shipping Information */}
      <div className="text-center text-sm text-muted-foreground animate-float">
        <p className="mb-2">
          ✈️ You may receive your items earlier. Tracking Numbers will always be sent so you can track it every step of the way!
        </p>
        <p className="font-semibold text-gold">Cool things are worth waiting for! 😉</p>
      </div>
    </div>
  );
};