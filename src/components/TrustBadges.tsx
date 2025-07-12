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
    <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
      {/* Quick Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {trustFeatures.map((feature, index) => (
          <Card key={index} className="p-3 sm:p-4 hover-lift transition-luxury border-2 border-transparent hover:border-gold">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <feature.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${feature.color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="font-semibold text-primary text-xs sm:text-sm truncate">{feature.title}</span>
                  <Badge variant="outline" className="text-xs py-0 px-1 sm:px-2 flex-shrink-0">
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Special Offer Badge */}
      <Card className="p-3 sm:p-4 bg-gradient-rose text-white animate-pulse-glow text-center">
        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">🎉 BUY MORE SAVE MORE</h3>
        <p className="text-xs sm:text-sm opacity-90">All products participate in the event</p>
      </Card>

      {/* Detailed Guarantees */}
      <div className="space-y-3 sm:space-y-4">
        {guarantees.map((guarantee, index) => (
          <Card key={index} className={`p-4 sm:p-6 hover-lift transition-luxury ${guarantee.highlight ? 'border-2 border-gold bg-gradient-to-r from-gold/10 to-transparent' : ''}`}>
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className={`p-2 sm:p-3 rounded-full ${guarantee.highlight ? 'bg-gold' : 'bg-cream'} flex-shrink-0`}>
                <guarantee.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${guarantee.highlight ? 'text-primary' : 'text-gold'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-primary text-sm sm:text-base mb-1 sm:mb-2">{guarantee.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{guarantee.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Security Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4 text-center bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            <span className="font-semibold text-green-800 text-sm sm:text-base">SSL Secure</span>
          </div>
          <p className="text-xs text-green-600">Your data is protected</p>
        </Card>

        <Card className="p-3 sm:p-4 text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="font-semibold text-blue-800 text-sm sm:text-base">30-Day Returns</span>
          </div>
          <p className="text-xs text-blue-600">Easy return policy</p>
        </Card>
      </div>



      {/* Shipping Information */}
      <div className="text-center text-xs sm:text-sm text-muted-foreground animate-float space-y-2">
        <p className="px-2">
          ✈️ You may receive your items earlier. Tracking Numbers will always be sent so you can track it every step of the way!
        </p>
        <p className="font-semibold text-gold">Cool things are worth waiting for! 😉</p>
      </div>
    </div>
  );
};