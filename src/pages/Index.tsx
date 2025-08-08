import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductPage from '@/components/ProductPage';
import BoosterProPage from '@/components/BoosterProPage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const THEME_PRIMARY = '#A4193D'; // deep rose
const THEME_ACCENT = '#FFDFB9'; // peach

const PRODUCTS: Array<{
  slug: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
}> = [
  { slug: 'champagne-beaute-lift', name: 'Champagne Beaute Lift', price: '$22.99', image: '/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png', badge: 'Best Seller' },
  { slug: 'rose-silk-cream', name: 'Rose Silk Cream', price: '$29.90', image: '/lovable-uploads/cb6c6690-1cbb-4768-b0be-65ccae0fb4d6.png' },
  { slug: 'vanilla-velvet-balm', name: 'Vanilla Velvet Balm', price: '$26.50', image: '/lovable-uploads/72e5fa9a-1957-4804-aeb8-9ba74a901107.png' },
  { slug: 'truffle-glow-serum', name: 'Truffle Glow Serum', price: '$39.00', image: '/lovable-uploads/c970e003-859b-4681-a7f6-64824cb2a3ac.png', badge: 'New' },
  { slug: 'caviar-firming-lotion', name: 'Caviar Firming Lotion', price: '$34.90', image: '/lovable-uploads/8b9df9aa-660c-4e4c-9443-a322b47eae9c.png' },
  { slug: 'gold-peptide-elixir', name: 'Gold Peptide Elixir', price: '$49.00', image: '/lovable-uploads/d2ccd223-4da9-45ee-8e7e-ddcf57d99ae7.png' },
  { slug: 'pink-pepper-tonic', name: 'Pink Pepper Tonic', price: '$21.99', image: '/lovable-uploads/ac6356ff-c0b3-4f9c-bbf9-c4b923551602.png' },
  { slug: 'grape-callus-essence', name: 'Grape Callus Essence', price: '$27.50', image: '/lovable-uploads/5baa6fc4-e2cc-4680-98c5-a26581ed6e81.png' },
  { slug: 'silk-body-butter', name: 'Silk Body Butter', price: '$24.99', image: '/lovable-uploads/06bcd4ee-4669-4a91-bc7f-1577ab0cee7d.png' },
];

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const productSlug = useMemo(() => new URLSearchParams(location.search).get('product'), [location.search]);
  const isViewingProduct = Boolean(productSlug);

  if (isViewingProduct) {
    // For now route 'champagne-beaute-lift' to existing detailed page, and 'booster-pro' to the new page
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="outline"
            onClick={() => navigate({ pathname: '/', search: '' })}
            className="mb-4 border-2"
            style={{ borderColor: THEME_PRIMARY, color: THEME_PRIMARY }}
          >
            ← Back to Home
          </Button>
        </div>
        {productSlug === 'booster-pro' ? <BoosterProPage /> : <ProductPage />}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(180deg, ${THEME_ACCENT}11, #ffffff)` }}>
      {/* Hero Video Header */}
      <header className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[32/9]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            poster="/lovable-uploads/8961e353-4116-4582-81c4-6c6a8b789935.png"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/Screen Recording 2025-07-07 172049.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${THEME_PRIMARY}dd 0%, ${THEME_PRIMARY}88 35%, transparent 70%)`,
            }}
          />
          {/* Headline */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3" style={{ color: THEME_ACCENT }}>
                  Elegant Results. Visible Beauty.
                </h1>
                <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6" style={{ color: '#FFEED7' }}>
                  Discover luxury skincare crafted for confidence. Firming, hydrating, and glow-enhancing formulas designed for you.
                </p>
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="shadow-md"
                    style={{ backgroundColor: THEME_ACCENT, color: THEME_PRIMARY }}
                    onClick={() => {
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Shop Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2"
                    style={{ borderColor: THEME_ACCENT, color: THEME_ACCENT }}
                  >
                    Watch Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main id="products" className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: THEME_PRIMARY }}>Featured Beauty</h2>
          <p className="text-sm sm:text-base mt-2" style={{ color: '#7f2039' }}>Curated for radiance, firmness, and glow</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p, idx) => (
            <Card key={p.slug} className="overflow-hidden group border-2" style={{ borderColor: `${THEME_PRIMARY}22` }}>
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <span
                    className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: THEME_PRIMARY, color: THEME_ACCENT }}
                  >
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1" style={{ color: THEME_PRIMARY }}>{p.name}</h3>
                <p className="text-sm mb-4" style={{ color: '#7f2039' }}>{p.price}</p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    style={{ backgroundColor: THEME_PRIMARY, color: THEME_ACCENT }}
                    onClick={() => navigate({ pathname: '/', search: `?product=${p.slug}` })}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="w-12 border-2"
                    style={{ borderColor: THEME_PRIMARY, color: THEME_PRIMARY }}
                    title="Add to favorites"
                  >
                    ❤
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Thematic Footer Teaser */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl p-6 sm:p-8 text-center" style={{ background: `linear-gradient(90deg, ${THEME_ACCENT}, #fff)` }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: THEME_PRIMARY }}>
              Beauty You Can Feel
            </h3>
            <p className="text-sm sm:text-base" style={{ color: '#7f2039' }}>
              Sensory-rich textures. Visible results. Thoughtful formulas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
