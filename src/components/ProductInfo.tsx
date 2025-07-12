import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Droplets, Leaf, Heart, Clock, Star, Award, Shield } from 'lucide-react';

export const ProductInfo = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "Luxe-Lift Firming Complex",
      description: "Champagne extract, black truffle, caviar, and gold peptides awaken skin elasticity",
      color: "text-gold"
    },
    {
      icon: Clock,
      title: "Visible Results in 4 Weeks",
      description: "Gold peptides penetrate dermis to boost collagen regeneration and reduce fine lines",
      color: "text-rose"
    },
    {
      icon: Droplets,
      title: "Pink Pepper Extract",
      description: "Stimulates microcirculation and helps reduce fat accumulation on hips, waist, and thighs",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Triple Hydration Formula",
      description: "Glycerin, niacinamide, and sodium hyaluronate lock in moisture all day",
      color: "text-gold-dark"
    }
  ];

  const ingredients = [
    { name: "Champagne Extract", benefit: "Anti-aging & radiance", premium: true },
    { name: "Gold Peptides", benefit: "Collagen regeneration", premium: true },
    { name: "Black Truffle", benefit: "Luxury skin nourishment", premium: true },
    { name: "Caviar Extract", benefit: "Firming & plumping", premium: true },
    { name: "Pink Pepper Extract", benefit: "Microcirculation boost", premium: false },
    { name: "Grape Callus Extract", benefit: "Fat reduction support", premium: false },
    { name: "Sodium Hyaluronate", benefit: "Deep hydration", premium: false },
    { name: "Niacinamide", benefit: "Skin barrier repair", premium: false }
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Description */}
      <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-cream via-background to-rose-muted animate-fade-in-up luxury-border">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 text-gold animate-glow">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">Luxury Meets Science</h2>
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
            🍾 Consult Beaute's exclusive Luxe-Lift Firming Complex blends luxurious ingredients like champagne extract, 
            black truffle, caviar, and gold peptides to awaken skin elasticity from the source and enhance skin plumpness 
            and contour. Apply daily for a spa-like indulgence — your skin will feel firmer and more radiant. ✨
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-3 animate-fade-in-up hover-lift">
                <div className={`mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-luxury flex items-center justify-center animate-float`}>
                  <benefit.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${benefit.color}`} />
                </div>
                <h4 className="font-semibold text-primary text-sm sm:text-base">{benefit.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground px-2">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="benefits" className="animate-slide-in-right">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-cream gap-1 sm:gap-0 p-1">
          <TabsTrigger value="benefits" className="data-[state=active]:bg-gold data-[state=active]:text-primary text-xs sm:text-sm">Benefits</TabsTrigger>
          <TabsTrigger value="ingredients" className="data-[state=active]:bg-gold data-[state=active]:text-primary text-xs sm:text-sm">Ingredients</TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-gold data-[state=active]:text-primary text-xs sm:text-sm">How to Use</TabsTrigger>
          <TabsTrigger value="details" className="data-[state=active]:bg-gold data-[state=active]:text-primary text-xs sm:text-sm">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 hover-lift animate-fade-in-up">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center">
                <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                Visible Transformation
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                ✨ The gold peptides and active peptides in the Luxe-Lift formula penetrate the dermis to boost collagen 
                regeneration, visibly reducing fine lines, dry lines, and creases. It's more than hydration — it's a true 
                skin-smoothing, age-defying transformation, leaving the neck, arms, and abdomen looking silky and refined. 👗
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover-lift animate-fade-in-up">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center">
                <Droplets className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-rose" />
                Body Contouring
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                🔥 Specially enriched with pink pepper extract and grape callus extract, this cream stimulates microcirculation 
                and helps reduce the appearance of fat accumulation on the hips, waist, and thighs. Skin appears firmer, 
                plumper, and smoother. 🍑
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover-lift animate-fade-in-up">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center">
                <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gold-dark" />
                Deep Hydration
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                💧 Infused with glycerin, niacinamide, and sodium hyaluronate, this triple-star hydrating formula penetrates 
                deeply and locks in moisture. Even dry, rough, or cracked skin can be quickly repaired and smoothed. 💦
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover-lift animate-fade-in-up">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center">
                <Leaf className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                Gentle & Safe
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                🌿 Blended with grape seed extract and multiple botanical antioxidants, this cream is safe, gentle, and 
                non-irritating, perfect for all skin types — especially mature, dry, or postpartum skin. 🍃
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ingredients" className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center">
                <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                Premium Ingredients
              </h3>
              <div className="space-y-3">
                {ingredients.filter(ing => ing.premium).map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gradient-gold rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary text-sm sm:text-base truncate">{ingredient.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{ingredient.benefit}</div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground text-xs ml-2 flex-shrink-0">Premium</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center">
                <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-rose" />
                Active Ingredients
              </h3>
              <div className="space-y-3">
                {ingredients.filter(ing => !ing.premium).map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-cream rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary text-sm sm:text-base truncate">{ingredient.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{ingredient.benefit}</div>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary text-xs ml-2 flex-shrink-0">Active</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="mt-4 sm:mt-6">
          <Card className="p-4 sm:p-6 lg:p-8 text-center animate-fade-in-up">
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">How to Use</h3>
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground px-2">
                💖 Use daily after showering, gently massaging it into the skin. In just a few minutes, it will awaken 
                elasticity, soften signs of aging, and leave you with a firm, silky-smooth body texture that radiates 
                youthful energy. 💆‍♀️
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
                    <span className="text-xl sm:text-2xl text-gold">1</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base">Cleanse</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground px-2">After shower when skin is clean and slightly damp</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
                    <span className="text-xl sm:text-2xl text-gold">2</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base">Apply</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground px-2">Massage gently in circular motions on problem areas</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
                    <span className="text-xl sm:text-2xl text-gold">3</span>
                  </div>
                  <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base">Enjoy</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground px-2">See visible results in just 4 weeks of daily use</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4 sm:mt-6">
          <Card className="p-4 sm:p-6 animate-fade-in-up">
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="font-semibold text-primary text-sm sm:text-base">Item Name:</span>
                  <span className="text-muted-foreground text-sm sm:text-base break-words">Consult Beaute Champagne Beaute Lift Firming Body Crème</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="font-semibold text-primary text-sm sm:text-base">Volume:</span>
                  <span className="text-muted-foreground text-sm sm:text-base">8 fl.oz./237 mL (1 bottle)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="font-semibold text-primary text-sm sm:text-base">Shelf Life:</span>
                  <span className="text-muted-foreground text-sm sm:text-base">24 Months</span>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="font-semibold text-primary text-sm sm:text-base">Scents Available:</span>
                  <span className="text-muted-foreground text-sm sm:text-base">Rose, Vanilla, Sweet Almond Coconut</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="font-semibold text-primary text-sm sm:text-base">Skin Type:</span>
                  <span className="text-muted-foreground text-sm sm:text-base">All skin types, especially mature & dry skin</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="font-semibold text-primary text-sm sm:text-base">Usage:</span>
                  <span className="text-muted-foreground text-sm sm:text-base">Daily after shower</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};