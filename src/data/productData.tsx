import React from 'react';
import { Sparkles, ActivitySquare, Cpu, Zap, ShieldCheck } from 'lucide-react';

// Product data configurations
export const PRODUCT_DATA = {
  'champagne-beaute-lift': {
    id: 'champagne-beaute-lift',
    name: 'Champagne Beaute Lift Firming Body Crème',
    description: 'Experience luxury skincare that transforms your confidence. Advanced firming formula for hydration and that coveted glass-skin glow.',
    price: {
      current: '$22.99',
      original: '$39.90',
      currency: 'USD'
    },
    images: [
      // Variant images (order must match variants below to sync with selection)
      { src: '/products/product-1/product1_rose.webp', alt: 'Rose Variant', fallback: '/placeholder.svg' },
      { src: '/products/product-1/product-2-vanilla.avif', alt: 'Vanilla Variant', fallback: '/placeholder.svg' },
      { src: '/products/product-1/product-2-allamond.jpeg', alt: 'Sweet Almond Coconut Variant', fallback: '/placeholder.svg' },
      // Additional gallery images
      { src: '/products/product-1/product-1.jpg', alt: 'Lifestyle Image 1', fallback: '/placeholder.svg' },
      { src: '/products/product-1/product-1.jpeg', alt: 'Lifestyle Image 2', fallback: '/placeholder.svg' },
      { src: '/products/product-1/before-after-product1.webp', alt: 'Before After Result 1', fallback: '/placeholder.svg' },
      { src: '/products/product-1/before-fter-product-1.jpg', alt: 'Before After Result 2', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Rose', description: 'Floral & Elegant' },
      { name: 'Vanilla', description: 'Warm & Comforting' },
      { name: 'Sweet Almond Coconut', description: 'Tropical & Nourishing' }
    ],
    features: [
      { icon: Sparkles, label: 'Firming' },
      { icon: ActivitySquare, label: 'Hydrating' },
      { icon: Cpu, label: 'Anti-Aging' },
      { icon: Zap, label: 'Glow Boost' }
    ],
    stats: {
      recommendations: '12.5K',
      browsing: '2.0K',
      reviews: '2,847'
    },
    video: {
      src: '/videos/Download.mp4',
      poster: '/products/product-1/product1_rose.webp',
      title: 'Real Results Video'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Advanced firming and hydrating formula that delivers visible results:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Firms & Tightens:</strong> Improves skin elasticity and reduces sagging</li>
              <li><strong>Deep Hydration:</strong> Long-lasting moisture for smoother skin</li>
              <li><strong>Anti-Aging:</strong> Reduces fine lines and promotes youthful appearance</li>
              <li><strong>Glow Enhancement:</strong> Brightens and evens skin tone</li>
            </ul>
          </div>
        )
      },
      {
        id: 'ingredients',
        title: 'Premium Ingredients',
        icon: '🌿',
        content: (
          <div className="space-y-3">
            <p>Carefully selected natural and scientific ingredients:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-rose-200/50">
                <h4 className="font-semibold text-rose-600 mb-1">Champagne Extract</h4>
                <p className="text-sm text-gray-600">Rich in antioxidants for skin renewal</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-rose-200/50">
                <h4 className="font-semibold text-rose-600 mb-1">Collagen Complex</h4>
                <p className="text-sm text-gray-600">Promotes firmness and elasticity</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-rose-200/50">
                <h4 className="font-semibold text-rose-600 mb-1">Hyaluronic Acid</h4>
                <p className="text-sm text-gray-600">Deep hydration and plumping</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-rose-200/50">
                <h4 className="font-semibold text-rose-600 mb-1">Vitamin E</h4>
                <p className="text-sm text-gray-600">Antioxidant protection</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'usage',
        title: 'How to Use',
        icon: '📋',
        content: (
          <div className="space-y-3">
            <p className="font-semibold text-rose-600">For best results, follow these steps:</p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Cleanse skin thoroughly and pat dry</li>
              <li>Apply a generous amount to desired areas</li>
              <li>Massage gently in upward circular motions</li>
              <li>Allow to absorb completely before dressing</li>
              <li>Use twice daily, morning and evening</li>
            </ol>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-amber-800">
                <strong>Pro Tip:</strong> For enhanced results, use after a warm shower when pores are open for better absorption.
              </p>
            </div>
          </div>
        )
      }
    ],
    madeIn: 'Made in France',
    officialBadge: '8 fl.oz.'
  },

  'booster-pro': {
    id: 'booster-pro',
    name: 'AGE-R Booster Pro',
    description: 'Achieve your glass-skin goals with 6-in-1 professional beauty technology. Enhanced absorption, radiance, elasticity, pore care, and LED personalization—no conductive gel required.',
    price: {
      current: '14.799,00 TL',
      original: '29.599,00 TL',
      currency: 'TL'
    },
    images: [
      { src: '/products/product-2-booster-pro/pink.png', alt: 'Pink Variant', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/black.png', alt: 'Black Variant', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/g1.png', alt: 'Gallery Image 1', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/g2.png', alt: 'Gallery Image 2', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/g3.png', alt: 'Gallery Image 3', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Pink', description: 'Premium Rose Gold' },
      { name: 'Black', description: 'Elegant Matte Black' }
    ],
    features: [
      { icon: Sparkles, label: 'Glass Glow' },
      { icon: ActivitySquare, label: 'Microcurrent' },
      { icon: Cpu, label: 'Electroporation' },
      { icon: Zap, label: 'EMS Lift' }
    ],
    stats: {
      recommendations: '8.2K',
      browsing: '1.5K',
      reviews: '1,247'
    },
    video: {
      src: '/videos/Screen Recording 2025-08-09 031537.mp4',
      poster: '/products/product-2-booster-pro/pink.png',
      title: 'How It Works',
      description: 'Watch the 4 revolutionary modes in action'
    },
    clinicalResults: [
      {
        mode: 'Booster',
        icon: '⚡',
        color: 'from-rose-50 to-pink-50',
        results: [
          { label: 'Absorption', value: '785%', type: 'increase' as const },
          { label: '2-week use', value: '11.4%', type: 'increase' as const },
          { label: 'Radiance', value: '1.73%', type: 'increase' as const }
        ]
      },
      {
        mode: 'MC Mode',
        icon: '💪',
        color: 'from-amber-50 to-yellow-50',
        results: [
          { label: 'Firmness', value: '35.9%', type: 'increase' as const },
          { label: 'Elasticity', value: '16.1%', type: 'increase' as const },
          { label: 'Lift effect', value: '11.8%', type: 'increase' as const }
        ]
      },
      {
        mode: 'Derma Shot',
        icon: '🎯',
        color: 'from-purple-50 to-indigo-50',
        results: [
          { label: 'Sagging', value: '15.3%', type: 'decrease' as const },
          { label: 'Fine lines', value: '5.31%', type: 'decrease' as const },
          { label: 'Muscle tone', value: '4.89%', type: 'increase' as const }
        ]
      },
      {
        mode: 'Air Shot',
        icon: '💎',
        color: 'from-emerald-50 to-teal-50',
        results: [
          { label: 'Pore elasticity', value: '791%', type: 'increase' as const },
          { label: 'Pore size', value: '34.5%', type: 'decrease' as const },
          { label: 'Texture', value: '21.9%', type: 'decrease' as const }
        ]
      }
    ],
    accordionSections: [
      {
        id: 'what',
        title: 'What is the product?',
        icon: '🔬',
        content: (
          <div className="space-y-3 text-gray-700">
            <p className="font-semibold text-lg text-rose-600">6-in-1 Korean Glass Glow Device</p>
            <p>The phrase "glass skin" means flawless, healthy, and glowing skin. Our Booster Pro device gives your skin a GLASS-GLASS-GLASS look.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
              {['Electroporation', 'Microcurrents', 'EMS', 'Electric micro-needles', 'LED', 'Sonic vibration'].map((tech, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-center border border-rose-200/50">
                  {tech}
                </div>
              ))}
            </div>
            <p className="text-sm italic">Compatible with all skin types and designed for professional-level results at home.</p>
          </div>
        )
      },
      {
        id: 'why-special',
        title: 'Why is it so special?',
        icon: '✨',
        content: (
          <div className="space-y-4">
            {[
              { icon: '🎯', title: '6 in 1 Glass Glow Device', desc: 'Achieve your skin goals with innovative technology for clear, crystal-clear skin.' },
              { icon: '💧', title: 'No conductive gel required', desc: 'Use only with your own skincare products! Booster Pro will be a game-changer in your routine.' },
              { icon: '🛡️', title: 'Skin contact sensor', desc: 'Equipped with a sensor that emits LED light only when it comes into contact with the skin.' },
              { icon: '📱', title: 'AGE-R application', desc: 'Use your device more effectively with personalized care through the AGE-R app.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1 text-rose-600">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )
      },
      {
        id: 'modes',
        title: '4 Modes / How it works',
        icon: '⚙️',
        content: (
          <div className="space-y-4">
            {[
              { icon: '⚡', title: 'Booster Mode: Electroporation', desc: 'Enhances absorption of active ingredients and delivers them to the skin, promoting radiance. Creates temporary micro-holes for maximum absorption.' },
              { icon: '💪', title: 'MC Mode: Microcurrent', desc: 'Helps plump facial features, targeting the eye area, laugh lines, and areas around the mouth with gentle electrical stimulation.' },
              { icon: '🎯', title: 'Derma Shot Mode: EMS', desc: 'Stimulates sagging skin, helping to tighten facial features. Medium-frequency EMS supports contour maintenance by activating facial muscles.' },
              { icon: '💎', title: 'Air Shot Mode: Electric Needles', desc: 'Increases pore elasticity by creating micro-passages on the skin\'s surface without damaging it. Supports comprehensive pore structure.' }
            ].map((mode, i) => (
              <div key={i} className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{mode.icon}</div>
                  <h4 className="font-semibold text-rose-600">{mode.title}</h4>
                </div>
                <p className="text-sm text-gray-600 ml-11">{mode.desc}</p>
              </div>
            ))}
          </div>
        )
      }
    ],
    madeIn: 'Made in Korea',
    officialBadge: '6-in-1 Device'
  },

  'vanilla-velvet-balm': {
    id: 'vanilla-velvet-balm',
    name: 'Vanilla Velvet Balm',
    description: 'Luxurious vanilla-infused balm that melts into your skin, providing deep nourishment and a velvety-smooth finish.',
    price: {
      current: '$26.50',
      original: '$45.00',
      currency: 'USD'
    },
    images: [
      { src: '/products/product-1-champagne-beaute/almond-variant.png', alt: 'Vanilla Velvet Balm', fallback: '/placeholder.svg' },
      { src: '/products/product-1-champagne-beaute/vanilla-variant.png', alt: 'Texture View', fallback: '/placeholder.svg' },
      { src: '/products/product-1-champagne-beaute/rose-variant.png', alt: 'Application View', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Original', description: 'Classic Vanilla Scent' },
      { name: 'Light', description: 'Subtle Fragrance' }
    ],
    features: [
      { icon: Sparkles, label: 'Nourishing' },
      { icon: ActivitySquare, label: 'Smoothing' },
      { icon: Cpu, label: 'Protective' },
      { icon: Zap, label: 'Fast Absorbing' }
    ],
    stats: {
      recommendations: '8.9K',
      browsing: '1.2K',
      reviews: '1,892'
    },
    video: {
      src: '/videos/Screen Recording 2025-07-07 172049.mp4',
      poster: '/products/product-1-champagne-beaute/almond-variant.png',
      title: 'Application Demo'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Rich vanilla-infused formula for ultimate skin comfort:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Deep Nourishment:</strong> Intensive moisture for dry skin</li>
              <li><strong>Velvet Texture:</strong> Luxurious, non-greasy finish</li>
              <li><strong>Aromatherapy:</strong> Calming vanilla scent</li>
              <li><strong>Long-lasting:</strong> All-day hydration protection</li>
            </ul>
          </div>
        )
      }
    ],
    madeIn: 'Made in France',
    officialBadge: '4 fl.oz.'
  },

  'truffle-glow-serum': {
    id: 'truffle-glow-serum',
    name: 'Truffle Glow Serum',
    description: 'Rare black truffle extract meets advanced peptide technology for an instant luminous glow and visible radiance boost.',
    price: {
      current: '$39.00',
      original: '$65.00',
      currency: 'USD'
    },
    images: [
      { src: '/products/before-after/after-1.png', alt: 'Truffle Glow Serum', fallback: '/placeholder.svg' },
      { src: '/products/before-after/after-2.png', alt: 'Glow Effect', fallback: '/placeholder.svg' },
      { src: '/products/product-1-champagne-beaute/rose-variant.png', alt: 'Application', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Intensive', description: 'Maximum Glow Power' },
      { name: 'Daily', description: 'Everyday Radiance' }
    ],
    features: [
      { icon: Sparkles, label: 'Instant Glow' },
      { icon: ActivitySquare, label: 'Brightening' },
      { icon: Cpu, label: 'Peptide Complex' },
      { icon: Zap, label: 'Fast Acting' }
    ],
    stats: {
      recommendations: '15.2K',
      browsing: '3.1K',
      reviews: '4,203'
    },
    video: {
      src: '/videos/Screen Recording 2025-08-09 031537.mp4',
      poster: '/products/before-after/after-1.png',
      title: 'Glow Transformation'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Premium truffle extract for exceptional skin radiance:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Instant Glow:</strong> Immediate luminosity boost</li>
              <li><strong>Rare Extracts:</strong> Black truffle peptides</li>
              <li><strong>Anti-Aging:</strong> Reduces dullness and fatigue signs</li>
              <li><strong>Brightening:</strong> Evens skin tone naturally</li>
            </ul>
          </div>
        )
      }
    ],
    madeIn: 'Made in Switzerland',
    officialBadge: '1 fl.oz.'
  },

  'caviar-firming-lotion': {
    id: 'caviar-firming-lotion',
    name: 'Caviar Firming Lotion',
    description: 'Luxury caviar extract technology that firms, lifts, and revitalizes your skin with marine-derived active ingredients.',
    price: {
      current: '$34.90',
      original: '$58.00',
      currency: 'USD'
    },
    images: [
      { src: '/products/before-after/before-1.png', alt: 'Caviar Firming Lotion', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/g1.png', alt: 'Texture Detail', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/g2.png', alt: 'Application Method', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Day', description: 'Morning Firming Formula' },
      { name: 'Night', description: 'Intensive Overnight Repair' }
    ],
    features: [
      { icon: Sparkles, label: 'Firming' },
      { icon: ActivitySquare, label: 'Lifting' },
      { icon: Cpu, label: 'Marine Complex' },
      { icon: Zap, label: 'Revitalizing' }
    ],
    stats: {
      recommendations: '11.7K',
      browsing: '2.3K',
      reviews: '3,156'
    },
    video: {
      src: '/videos/Screen Recording 2025-07-07 172049.mp4',
      poster: '/products/before-after/before-1.png',
      title: 'Firming Results'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Marine caviar technology for superior skin firming:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Firming Action:</strong> Visible skin tightening</li>
              <li><strong>Luxury Extracts:</strong> Pure caviar peptides</li>
              <li><strong>Lifting Effect:</strong> Reduces sagging appearance</li>
              <li><strong>Marine Complex:</strong> Deep ocean nutrients</li>
            </ul>
          </div>
        )
      }
    ],
    madeIn: 'Made in Monaco',
    officialBadge: '3.4 fl.oz.'
  },

  'gold-peptide-elixir': {
    id: 'gold-peptide-elixir',
    name: 'Gold Peptide Elixir',
    description: 'Pure 24K gold particles combined with advanced peptides for the ultimate luxury anti-aging treatment.',
    price: {
      current: '$49.00',
      original: '$85.00',
      currency: 'USD'
    },
    images: [
      { src: '/products/product-2-booster-pro/g3.png', alt: 'Gold Peptide Elixir', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/pink.png', alt: 'Gold Particles', fallback: '/placeholder.svg' },
      { src: '/products/product-2-booster-pro/black.png', alt: 'Luxury Packaging', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Pure Gold', description: '24K Gold Formula' },
      { name: 'Rose Gold', description: 'Gentle Pink Tint' }
    ],
    features: [
      { icon: Sparkles, label: '24K Gold' },
      { icon: ActivitySquare, label: 'Anti-Aging' },
      { icon: Cpu, label: 'Peptide Complex' },
      { icon: Zap, label: 'Luxury Treatment' }
    ],
    stats: {
      recommendations: '18.5K',
      browsing: '4.2K',
      reviews: '5,678'
    },
    video: {
      src: '/videos/Screen Recording 2025-08-09 031537.mp4',
      poster: '/products/product-2-booster-pro/g3.png',
      title: 'Gold Technology'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Luxury 24K gold treatment for exceptional anti-aging:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>24K Gold:</strong> Pure gold micro-particles</li>
              <li><strong>Advanced Peptides:</strong> Collagen boosting complex</li>
              <li><strong>Luxury Formula:</strong> Premium ingredient blend</li>
              <li><strong>Anti-Aging:</strong> Visible wrinkle reduction</li>
            </ul>
          </div>
        )
      }
    ],
    madeIn: 'Made in Italy',
    officialBadge: '1.7 fl.oz.'
  },

  'pink-pepper-tonic': {
    id: 'pink-pepper-tonic',
    name: 'Pink Pepper Tonic',
    description: 'Refreshing tonic with pink pepper extract that energizes, tones, and prepares your skin for optimal product absorption.',
    price: {
      current: '$21.99',
      original: '$35.00',
      currency: 'USD'
    },
    images: [
      { src: '/products/homepage-cards/card-3.png', alt: 'Pink Pepper Tonic', fallback: '/placeholder.svg' },
      { src: '/products/homepage-cards/card-4.png', alt: 'Refreshing Formula', fallback: '/placeholder.svg' },
      { src: '/products/homepage-cards/card-5.png', alt: 'Application', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Original', description: 'Classic Pink Pepper' },
      { name: 'Sensitive', description: 'Gentle Formula' }
    ],
    features: [
      { icon: Sparkles, label: 'Energizing' },
      { icon: ActivitySquare, label: 'Toning' },
      { icon: Cpu, label: 'pH Balancing' },
      { icon: Zap, label: 'Refreshing' }
    ],
    stats: {
      recommendations: '9.8K',
      browsing: '1.8K',
      reviews: '2,441'
    },
    video: {
      src: '/videos/Screen Recording 2025-07-07 172049.mp4',
      poster: '/products/homepage-cards/card-3.png',
      title: 'Toning Benefits'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Pink pepper extract for refreshed, balanced skin:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Energizing:</strong> Awakens tired skin</li>
              <li><strong>Toning:</strong> Balances skin pH</li>
              <li><strong>Refreshing:</strong> Instant cooling effect</li>
              <li><strong>Preparing:</strong> Enhances product absorption</li>
            </ul>
          </div>
        )
      }
    ],
    madeIn: 'Made in France',
    officialBadge: '6.7 fl.oz.'
  },

  'grape-callus-essence': {
    id: 'grape-callus-essence',
    name: 'Grape Callus Essence',
    description: 'Revolutionary grape stem cell technology that regenerates, protects, and restores youthful skin vitality.',
    price: {
      current: '$27.50',
      original: '$42.00',
      currency: 'USD'
    },
    images: [
      { src: '/products/homepage-cards/card-4.png', alt: 'Grape Callus Essence', fallback: '/placeholder.svg' },
      { src: '/products/homepage-cards/card-5.png', alt: 'Stem Cell Technology', fallback: '/placeholder.svg' },
      { src: '/products/homepage-cards/card-6.png', alt: 'Regenerating Power', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Concentrated', description: 'Maximum Potency' },
      { name: 'Daily', description: 'Everyday Use Formula' }
    ],
    features: [
      { icon: Sparkles, label: 'Regenerating' },
      { icon: ActivitySquare, label: 'Stem Cells' },
      { icon: Cpu, label: 'Anti-Aging' },
      { icon: Zap, label: 'Revitalizing' }
    ],
    stats: {
      recommendations: '13.4K',
      browsing: '2.7K',
      reviews: '3,789'
    },
    video: {
      src: '/videos/Screen Recording 2025-08-09 031537.mp4',
      poster: '/products/homepage-cards/card-4.png',
      title: 'Stem Cell Science'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Advanced grape stem cell technology for skin renewal:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Stem Cell Technology:</strong> Plant-based regeneration</li>
              <li><strong>Anti-Aging:</strong> Cellular protection and repair</li>
              <li><strong>Grape Extract:</strong> Antioxidant powerhouse</li>
              <li><strong>Revitalizing:</strong> Restores skin energy</li>
            </ul>
          </div>
        )
      }
    ],
    madeIn: 'Made in Spain',
    officialBadge: '1 fl.oz.'
  },

  'silk-body-butter': {
    id: 'silk-body-butter',
    name: 'Silk Body Butter',
    description: 'Luxurious silk protein-enriched body butter that deeply moisturizes and leaves skin silky-smooth all day long.',
    price: {
      current: '$24.99',
      original: '$38.00',
      currency: 'USD'
    },
    images: [
      { src: '/products/homepage-cards/card-5.png', alt: 'Silk Body Butter', fallback: '/placeholder.svg' },
      { src: '/products/homepage-cards/card-6.png', alt: 'Silky Texture', fallback: '/placeholder.svg' },
      { src: '/products/homepage-cards/card-3.png', alt: 'Moisturizing Effect', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Original', description: 'Classic Silk Formula' },
      { name: 'Shimmer', description: 'Subtle Golden Glow' }
    ],
    features: [
      { icon: Sparkles, label: 'Silk Proteins' },
      { icon: ActivitySquare, label: 'Deep Moisture' },
      { icon: Cpu, label: 'Long-lasting' },
      { icon: Zap, label: 'Fast Absorbing' }
    ],
    stats: {
      recommendations: '10.9K',
      browsing: '2.1K',
      reviews: '2,893'
    },
    video: {
      src: '/videos/Screen Recording 2025-07-07 172049.mp4',
      poster: '/products/homepage-cards/card-5.png',
      title: 'Silk Technology'
    },
    accordionSections: [
      {
        id: 'benefits',
        title: 'Key Benefits',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p>Silk protein technology for ultimate body care:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Silk Proteins:</strong> Natural smoothing agents</li>
              <li><strong>Deep Moisture:</strong> 24-hour hydration</li>
              <li><strong>Luxurious Feel:</strong> Silky-smooth finish</li>
              <li><strong>Fast Absorbing:</strong> No greasy residue</li>
            </ul>
          </div>
        )
      }
    ],
    madeIn: 'Made in Japan',
    officialBadge: '8 fl.oz.'
  },

  'pdrn-pink-collagen-capsule-cream': {
    id: 'pdrn-pink-collagen-capsule-cream',
    name: 'PDRN Pink Collagen Capsule Cream',
    description:
      'Revolutionary dual-texture capsule cream that combats uneven skin tone and blemishes for a bright, radiant, even-toned look. Light-textured, moisturizing formula with PDRN capsules preserved until skin penetration for a maximum glass-skin effect. 55g.',
    price: {
      current: '$20.00',
      original: '$40.00',
      currency: 'USD'
    },
    images: [
      // Variant images (order must match the variants array below)
      { src: '/products/product-3-template/product-3.jpg', alt: 'Single Package', fallback: '/placeholder.svg' },
      { src: '/products/product-3-template/Screenshot 2025-08-12 144526.png', alt: 'Double Pack', fallback: '/placeholder.svg' },
      { src: '/products/product-3-template/Screenshot 2025-08-12 144536.png', alt: 'Gold & Pink Capsule Cream Pack (Set of 2)', fallback: '/placeholder.svg' },
      { src: '/products/product-3-template/Screenshot 2025-08-12 144551.png', alt: 'Rose & Pink Capsule Cream Pack (Set of 2)', fallback: '/placeholder.svg' },
      // Additional gallery images
      { src: '/products/product-3-template/product-3-placeholder.webp', alt: 'Texture / Packaging', fallback: '/placeholder.svg' },
      { src: '/products/product-3-template/product-3-before-after.webp', alt: 'Before & After', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Single Package', description: 'One PDRN Pink Capsule Cream' },
      { name: 'Double Pack', description: 'Two-pack value set' },
      { name: 'Gold & Pink Set', description: 'Gold & Pink Capsule Cream Pack (Set of 2)' },
      { name: 'Rose & Pink Set', description: 'Rose & Pink Capsule Cream Pack (Set of 2)' }
    ],
    features: [
      { icon: Zap, label: 'Intense Hydration' },
      { icon: ActivitySquare, label: 'Improves Elasticity' },
      { icon: Sparkles, label: 'Brightens & Evens Tone' },
      { icon: ShieldCheck, label: 'Strengthens Skin Barrier' }
    ],
    stats: {
      recommendations: '5.6K',
      browsing: '1.1K',
      reviews: '1,034'
    },
    accordionSections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: '✨',
        content: (
          <div>
            <p>
              Meet a revolutionary skincare solution that combats uneven skin tone and blemishes. It leaves your skin
              looking bright, radiant, and even-toned. This customizable cream features a unique dual-texture formula
              combining the PDRN capsule with a clear gel. Thanks to innovative encapsulation technology, the firming
              and moisturizing effects of Salmon DNA PDRN are preserved until it penetrates the skin, achieving a
              maximum glass-skin effect.
            </p>
            <p className="mt-3">
              Light textured, moisturizing capsule cream developed for radiant and healthy-looking skin.
            </p>
          </div>
        )
      },
      {
        id: 'skin-types',
        title: 'Suitable for Skin Types',
        icon: '🧴',
        content: (
          <ul className="list-disc pl-5">
            <li>Combination</li>
            <li>Dry</li>
            <li>Normal</li>
            <li>Oily</li>
            <li>Sensitive</li>
          </ul>
        )
      },
      {
        id: 'concerns',
        title: 'For Skin Concerns',
        icon: '🎯',
        content: (
          <ul className="list-disc pl-5">
            <li>Uneven skin tone and texture</li>
            <li>Blackheads / Whiteheads</li>
            <li>Blemishes / Acne scars</li>
            <li>Pores</li>
          </ul>
        )
      },
      {
        id: 'clinical',
        title: 'Clinical Study Results',
        icon: '📊',
        content: (
          <div className="space-y-2">
            <p><strong>102.4%</strong> increase in skin moisture — immediately after first use</p>
            <p><strong>19.4%</strong> improvement in uneven skin tone — after 2 weeks of use</p>
            <p><strong>1.5%</strong> reduction in pigmentation — after 2 weeks of use</p>
            <p><strong>33%</strong> increase in skin elasticity — after 2 weeks of use</p>
            <p className="text-sm text-gray-600">Clinically tested by the Global Institute of Dermatological Sciences. Results may vary.</p>
          </div>
        )
      },
      {
        id: 'ingredients',
        title: 'Main Contents',
        icon: '🌿',
        content: (
          <ul className="list-disc pl-5">
            <li><strong>Salmon DNA PDRN:</strong> Helps with blemish and pigmentation care.</li>
            <li><strong>Collagen & Hyaluronic Acid:</strong> Deeply moisturizes and increases radiance.</li>
            <li><strong>Niacinamide:</strong> Improves uneven skin tone for a healthy appearance.</li>
          </ul>
        )
      },
      {
        id: 'what-is-pdrn',
        title: 'What is PDRN?',
        icon: '🔬',
        content: (
          <p>
            PDRN is a form of DNA derived from salmon. The extraction isolates small DNA fragments highly compatible
            with human skin cells due to structural similarity, helping strengthen the skin’s natural barrier and
            resilience.
          </p>
        )
      },
      {
        id: 'usage',
        title: 'Usage',
        icon: '📋',
        content: (
          <div>
            <p>
              Mix the vitamin capsule and clear gel in a ratio appropriate for your skin type. Increase the gel ratio
              for a lighter feel; increase the capsule ratio for more intense hydration and elasticity.
            </p>
            <p className="mt-2">
              Apply the mixture to your face and neck morning and evening, after your serum.
            </p>
          </div>
        )
      }
    ],
    clinicalResults: [
      {
        mode: 'Clinical Study',
        icon: '📈',
        color: 'from-rose-50 to-pink-50',
        results: [
          { label: 'Skin moisture', value: '102.4%', type: 'increase' as const },
          { label: 'Uneven tone improvement', value: '19.4%', type: 'increase' as const },
          { label: 'Pigmentation', value: '1.5%', type: 'decrease' as const },
          { label: 'Elasticity', value: '33%', type: 'increase' as const }
        ]
      }
    ],
    madeIn: 'Made in Korea',
    officialBadge: '55g'
  },

  'intensive-vitamin-c-capsule-cream': {
    id: 'intensive-vitamin-c-capsule-cream',
    name: 'Intensive Vitamin C Capsule Cream',
    description:
      'Dual-texture Vitamin C capsule cream with adjustable capsule-to-gel ratio. Brightens, evens skin tone, targets blemishes, and boosts radiance while remaining gentle on skin. 55g.',
    price: {
      current: '$20.00',
      original: '$40.00',
      currency: 'USD'
    },
    images: [
      // Variant images (order must match the variants array below)
      { src: '/products/product-4-template/product-4.jpg', alt: 'Only', fallback: '/placeholder.svg' },
      { src: '/products/product-4-template/Screenshot 2025-08-13 024511.png', alt: 'Two Set', fallback: '/placeholder.svg' },
      { src: '/products/product-4-template/Screenshot 2025-08-13 024536.png', alt: 'Gold & Pink Capsule Cream Set (Pack of 2)', fallback: '/placeholder.svg' },
      { src: '/products/product-4-template/Screenshot 2025-08-13 024549.png', alt: 'Gold & Red Capsule Cream Set (Pack of 2)', fallback: '/placeholder.svg' },
      // Additional gallery
      { src: '/products/product-4-template/product-4-1.webp', alt: 'Vitamin C Texture', fallback: '/placeholder.svg' },
      { src: '/products/product-4-template/product-4-4.webp', alt: 'Packaging', fallback: '/placeholder.svg' },
      { src: '/products/product-4-template/product4-2.webp', alt: 'Details', fallback: '/placeholder.svg' },
      { src: '/products/product-4-template/product-4-3.jpg', alt: 'Lifestyle', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Only', description: 'Single package' },
      { name: 'Two Set', description: 'Value set of two' },
      { name: 'Gold & Pink Set', description: 'Gold & Pink Capsule Cream Set (Pack of 2)' },
      { name: 'Gold & Red Set', description: 'Gold & Red Capsule Cream Set (Pack of 2)' }
    ],
    features: [
      { icon: Sparkles, label: 'Brightening & Radiance' },
      { icon: ActivitySquare, label: 'Anti-Aging Care' },
      { icon: ShieldCheck, label: 'Low Irritation Tested' },
      { icon: Zap, label: 'Even Skin Tone' }
    ],
    stats: {
      recommendations: '7.4K',
      browsing: '1.3K',
      reviews: '1,562'
    },
    video: {
      src: '/videos/WhatsApp Video 2025-08-13 at 02.23.29_eecd18ca.mp4',
      poster: '/products/product-4-template/product-4.jpg',
      title: 'Vitamin C Capsule Cream in Action'
    },
    accordionSections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: '🔬',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <p>Deep Vitamin C Capsule Cream is a revolutionary skincare solution developed to even out skin tone and reduce the appearance of blemishes. It delivers a bright, radiant, and balanced appearance.</p>
            <p>This customizable cream combines a Vitamin C capsule with a clear gel. The capsule contains 50% Sea Buckthorn extract, 5% Niacinamide, and Pure Vitamin C—encapsulated to stay fresh and potent.</p>
            <p>Thanks to the proprietary technology, Vitamin C is delivered efficiently and powerfully with minimal irritation.</p>
            <p className="font-semibold">55g • pH 5.8–7.8 • No artificial colors • Sustainable packaging</p>
          </div>
        )
      },
      {
        id: 'skin-types-concerns',
        title: 'Skin Types & Concerns',
        icon: '🌿',
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-rose-600">Suitable for All Skin Types:</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Combination</li>
                <li>Dry</li>
                <li>Normal</li>
                <li>Oily</li>
                <li>Sensitive</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-rose-600">For Skin Concerns:</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Anti-aging</li>
                <li>Acne / Blemishes</li>
                <li>Dullness</li>
                <li>Uneven skin tone</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'main-components',
        title: 'Main Components',
        icon: '🧪',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <ul className="list-disc pl-5">
              <li><strong>50% Sea Buckthorn Extract:</strong> Rich in antioxidants; nourishes and moisturizes.</li>
              <li><strong>5% Niacinamide:</strong> Improves texture, reduces pores, brightens skin tone.</li>
              <li><strong>Ascorbic Acid (Pure Vitamin C):</strong> Powerful antioxidant; evens tone and boosts elasticity.</li>
              <li><strong>Vitamins E, Q, P:</strong> Support moisture and regeneration for a youthful complexion.</li>
              <li><strong>Ferulic Acid:</strong> Stabilizes Vitamin C and enhances effectiveness; added antioxidant protection.</li>
            </ul>
          </div>
        )
      },
      {
        id: 'study-results',
        title: 'Study Results',
        icon: '📊',
        content: (
          <div className="flex flex-col gap-2 text-gray-700">
            <p><strong>Instant</strong> 34.8% increase in skin radiance</p>
            <p><strong>24h</strong> 32.6% increase in skin radiance</p>
            <p><strong>Hydration:</strong> 13.4% superficial moisturizing; 4.1% increase in skin hydration</p>
            <p><strong>Barrier:</strong> 7.5% improvement in skin barrier</p>
            <p><strong>Tone:</strong> 12.9% improvement in uneven tone; 18.2% improvement in tone evenness</p>
            <p className="text-sm italic">Dermatologist approved. Low irritation test completed. Results may vary.</p>
          </div>
        )
      },
      {
        id: 'how-to-use',
        title: 'How to Use',
        icon: '📋',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <p>Mix the vitamin capsule and transparent gel in proportions suitable for your skin type.</p>
            <ul className="list-disc pl-5">
              <li>For a lighter feel: increase the gel ratio</li>
              <li>For more intense moisture and elasticity: increase the capsule ratio</li>
            </ul>
            <p>Gently apply to face and neck morning and evening after your serum. Always apply sunscreen after morning use.</p>
          </div>
        )
      }
    ],
    clinicalResults: [
      {
        mode: 'Radiance',
        icon: '✨',
        color: 'from-amber-50 to-yellow-50',
        results: [
          { label: 'Instant radiance', value: '34.8%', type: 'increase' as const },
          { label: 'Radiance after 24h', value: '32.6%', type: 'increase' as const }
        ]
      },
      {
        mode: 'Hydration',
        icon: '💧',
        color: 'from-blue-50 to-cyan-50',
        results: [
          { label: 'Superficial moisturizing', value: '13.4%', type: 'increase' as const },
          { label: 'Skin hydration', value: '4.1%', type: 'increase' as const }
        ]
      },
      {
        mode: 'Tone',
        icon: '🌈',
        color: 'from-purple-50 to-pink-50',
        results: [
          { label: 'Uneven tone', value: '12.9%', type: 'improvement' as any },
          { label: 'Tone evenness', value: '18.2%', type: 'increase' as const }
        ]
      }
    ],
    madeIn: 'Made in Korea',
    officialBadge: '55g'
  },

  'txa-niacinamide-capsule-cream': {
    id: 'txa-niacinamide-capsule-cream',
    name: 'TXA Niacinamide Capsule Cream',
    description:
      'Customizable TXA capsule cream that refines uneven skin tone and texture for a clearer, more radiant complexion. Gentle, effective, and suitable for sensitive and acne-prone skin.',
    price: {
      current: '$39.00',
      original: '$78.00',
      currency: 'USD'
    },

  'skin-txa-niacinamide-pro': {
    id: 'skin-txa-niacinamide-pro',
    name: 'Collagen Night Care Mask',
    description: 'Innovative peel-off night mask that supports and maintains skin elasticity overnight. Provides 8-hour triple care for elasticity, moisture, and radiance, and peels off in one piece without irritation.',
    price: {
      current: '1.799,00 TL',
      original: '3.599,00 TL',
      currency: 'TL'
    },
    images: [
      // Variant images (order must match variants)
      { src: '/products/product-6-template/product-6.jpg', alt: 'Single Package', fallback: '/placeholder.svg' },
      { src: '/products/product-6-template/product-6-1.jpg', alt: 'Double Pack', fallback: '/placeholder.svg' },
      { src: '/products/product-6-template/product-6-2.webp', alt: 'Gold & Rose Capsule Cream Pack (Set of 2)', fallback: '/placeholder.svg' },
      { src: '/products/product-6-template/product-6-3.webp', alt: 'Pink & Rose Capsule Cream Pack (Set of 2)', fallback: '/placeholder.svg' },
      // Additional gallery
      { src: '/products/product-6-template/product-6-4.webp', alt: 'Texture / Lifestyle 1', fallback: '/placeholder.svg' },
      { src: '/products/product-6-template/product-6-5.jpg', alt: 'Texture / Lifestyle 2', fallback: '/placeholder.svg' },
      { src: '/products/product-6-template/product-6-6.webp', alt: 'Packaging Detail', fallback: '/placeholder.svg' },
      { src: '/products/product-6-template/product-6-7.webp', alt: 'Set Arrangement', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Single Package', description: 'One TXA Niacinamide Pro' },
      { name: 'Double Pack', description: 'Two-pack value set' },
      { name: 'Gold & Rose Set', description: 'Gold & Rose Capsule Cream Pack (Set of 2)' },
      { name: 'Pink & Rose Set', description: 'Pink & Rose Capsule Cream Pack (Set of 2)' }
    ],
    features: [
      { icon: ShieldCheck, label: 'Dermatologist Approved' },
      { icon: Sparkles, label: 'Radiance & Brightening' },
      { icon: ActivitySquare, label: 'Elasticity Support' },
      { icon: Zap, label: 'Moisture Lock (8h)' }
    ],
    stats: {
      recommendations: '4.3K',
      browsing: '980',
      reviews: '902'
    },
    video: {
      src: '/videos/WhatsApp Video 2025-08-13 at 14.51.10_461b3c9f.mp4',
      poster: '/products/product-6-template/product-6.jpg',
      title: 'Collagen Night Care — Real Results'
    },
    accordionSections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: '✨',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <p>Medicube Collagen Night Wrapping Mask is a peel-off night mask designed to support and maintain skin elasticity overnight.</p>
            <p>Provides elasticity, moisture, and radiance with its 8-hour triple care. Peels off in one piece, leaving skin fresh and vibrant.</p>
            <p>Formulated with advanced Korean skincare technology to visibly firm, smooth, and brighten skin with regular use.</p>
            <div className="text-sm">
              <ul className="list-disc pl-5">
                <li>Dermatologist approved • Low irritation</li>
                <li>No artificial colours or fragrances</li>
                <li>Sustainable packaging</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'skin-types',
        title: 'Suitable for All Skin Types',
        icon: '🧴',
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-rose-600">Skin Types</p>
              <ul className="list-disc pl-5">
                <li>Combination</li>
                <li>Dry</li>
                <li>Normal</li>
                <li>Oily</li>
                <li>Sensitive</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-rose-600">Skin Concerns</p>
              <ul className="list-disc pl-5">
                <li>Dryness</li>
                <li>Dullness</li>
                <li>Fine lines</li>
                <li>Sagging</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'clinical-results',
        title: 'Clinical Results',
        icon: '📊',
        content: (
          <div className="flex flex-col gap-2 text-gray-700">
            <p><strong>After 2 weeks of use:</strong></p>
            <ul className="list-disc pl-5">
              <li>31.4% increase in skin elasticity</li>
              <li>4.5% reduction in transepidermal water loss</li>
              <li>24.8% increase in 24-hour moisture retention</li>
              <li>23.4% increase in surface moisture content</li>
              <li>2.9% increase in deep moisture content</li>
            </ul>
            <p className="text-sm italic">These are clinical test results. Individual results may vary.</p>
          </div>
        )
      },
      {
        id: 'main-contents',
        title: 'Main Contents',
        icon: '🧪',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <ul className="list-disc pl-5">
              <li><strong>Hyaluronic Acid:</strong> Intense moisture, softens fine lines</li>
              <li><strong>Niacinamide (Vitamin B3):</strong> Improves texture, evens tone, adds radiance</li>
              <li><strong>Glycerin:</strong> Moisturizes and supports skin barrier</li>
              <li><strong>Tocopherol (Vitamin E):</strong> Antioxidant, improves texture</li>
              <li><strong>Ceramide NP:</strong> Prevents moisture loss, protects from environmental damage</li>
              <li><strong>Collagen Extract:</strong> Elasticity and moisture; targets signs of aging</li>
              <li><strong>Adenosine:</strong> Reduces appearance of fine lines</li>
              <li><strong>Butylene Glycol:</strong> Keeps skin moist, boosts absorption</li>
            </ul>
          </div>
        )
      },
      {
        id: 'usage',
        title: 'Instructions for Use',
        icon: '📋',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <ol className="list-decimal pl-5">
              <li>After cleansing, apply toner and moisturizer.</li>
              <li>Apply mask evenly (avoid eyebrows, hairline, eyes, lips).</li>
              <li>Let dry ~15 minutes and sleep.</li>
              <li>In the morning, peel off from edges or rinse with lukewarm water.</li>
            </ol>
          </div>
        )
      },
      {
        id: 'faq',
        title: 'Frequently Asked Questions',
        icon: '❓',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <div>
              <p className="font-semibold">When should I apply this product?</p>
              <p>Use as the last step of your nightly routine.</p>
            </div>
            <div>
              <p className="font-semibold">Do I need to rinse after it dries?</p>
              <p>No, peel off from the edges; optionally rinse if desired.</p>
            </div>
            <div>
              <p className="font-semibold">Does the mask prevent skin from breathing?</p>
              <p>No, special film technology adapts to the skin without discomfort.</p>
            </div>
            <div>
              <p className="font-semibold">How do I know when it’s dry?</p>
              <p>It should feel dry and non-sticky when touched.</p>
            </div>
            <div>
              <p className="font-semibold">Can I use it every day?</p>
              <p>Recommended 3–4 times a week. Daily use is fine in dry weather or winter.</p>
            </div>
          </div>
        )
      }
    ],
    madeIn: 'Made in Korea',
    officialBadge: '75ml'
  },
    images: [
      // Variant images (order must match the variants array below)
      { src: '/products/product-5-template/product-5.jpg', alt: 'Single Package', fallback: '/placeholder.svg' },
      { src: '/products/product-5-template/Screenshot 2025-08-13 134630.png', alt: 'Double Pack', fallback: '/placeholder.svg' },
      { src: '/products/product-5-template/Screenshot 2025-08-13 134648.png', alt: 'Gold & Rose Capsule Cream Pack (Set of 2)', fallback: '/placeholder.svg' },
      { src: '/products/product-5-template/Screenshot 2025-08-13 134701.png', alt: 'Pink & Rose Capsule Cream Pack (Set of 2)', fallback: '/placeholder.svg' },
      // Additional gallery
      { src: '/products/product-5-template/product-5-4.jpg', alt: 'TXA Texture / Lifestyle', fallback: '/placeholder.svg' },
      { src: '/products/product-5-template/product-5-1.webp', alt: 'TXA Capsule Close-up', fallback: '/placeholder.svg' },
      { src: '/products/product-5-template/product-5-3.jpg', alt: 'Packaging Detail', fallback: '/placeholder.svg' },
      { src: '/products/product-5-template/prooduct-5-2.webp', alt: 'Set Arrangement', fallback: '/placeholder.svg' }
    ],
    variants: [
      { name: 'Single Package', description: 'One TXA Niacinamide Capsule Cream' },
      { name: 'Double Pack', description: 'Two-pack value set' },
      { name: 'Gold & Rose Set', description: 'Gold & Rose Capsule Cream Pack (Set of 2)' },
      { name: 'Pink & Rose Set', description: 'Pink & Rose Capsule Cream Pack (Set of 2)' }
    ],
    features: [
      { icon: ShieldCheck, label: 'Gentle • 0.00% Irritation in tests' },
      { icon: Sparkles, label: 'Brightens & Evens Tone' },
      { icon: ActivitySquare, label: 'Helps Blemishes & Acne Scars' },
      { icon: Zap, label: 'Refines Texture & Pores' }
    ],
    stats: {
      recommendations: '6.1K',
      browsing: '1.2K',
      reviews: '1,342'
    },
    video: {
      src: '/videos/skin TXA NIACINAMIDE CAPSULE CREAM .mp4',
      poster: '/products/product-5-template/product-5.jpg',
      title: 'TXA Niacinamide in Action'
    },
    accordionSections: [
      {
        id: 'overview',
        title: 'Overview',
        icon: '✨',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <p><strong>Pop! and Erase!</strong> Refines uneven skin tone and texture for a visibly clearer, more radiant complexion.</p>
            <p>Lightweight, customizable capsule cream with TXA, designed to improve uneven skin tone with minimal irritation.</p>
            <p className="text-sm italic">Clinically tested by Cutis Biomedical Research Center & Global Institute of Dermatological Sciences.</p>
          </div>
        )
      },
      {
        id: 'skin-types-concerns',
        title: 'Skin Types & Concerns',
        icon: '🧴',
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-rose-600">Suitable for All Skin Types:</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Combination</li>
                <li>Dry</li>
                <li>Normal</li>
                <li>Oily</li>
                <li>Sensitive</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-rose-600">Targeted Concerns:</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Blemishes</li>
                <li>Irregular tone & texture</li>
                <li>Acne scars / spots</li>
                <li>Pores</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'main-components',
        title: 'Main Components',
        icon: '🧪',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <ul className="list-disc pl-5">
              <li><strong>99% Pure Tranexamic Acid (TXA):</strong> Visibly reduces tone irregularities and acne scars.</li>
              <li><strong>5% Niacinamide:</strong> Revitalizes dullness; smoother, softer, fresher skin.</li>
              <li><strong>Alpha-Arbutin & Glutathione:</strong> Boosts moisture and clarity for a healthy glow.</li>
            </ul>
          </div>
        )
      },
      {
        id: 'what-is-txa',
        title: 'What is TXA?',
        icon: '🧬',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <p><strong>Tranexamic Acid (TXA)</strong> is a low-irritation ingredient used to treat blemishes, acne scars, and hyperpigmentation.</p>
            <p>With <strong>99% purity</strong>, it absorbs quickly and delivers benefits without residue.</p>
            <p className="text-sm italic">The above is based solely on raw material characteristics.</p>
          </div>
        )
      },
      {
        id: 'study-results',
        title: 'Study Results',
        icon: '📊',
        content: (
          <div className="flex flex-col gap-2 text-gray-700">
            <p>Skin radiance <strong>+46%</strong> after a single use</p>
            <p>Skin moisture <strong>+41%</strong> after a single use</p>
            <p>Skin tone balance <strong>+5.4%</strong> after a single use</p>
            <p className="text-sm italic">Clinical test: Global Institute of Dermatological Sciences. Results may vary.</p>
          </div>
        )
      },
      {
        id: 'usage',
        title: 'How to Use',
        icon: '📋',
        content: (
          <div className="flex flex-col gap-3 text-gray-700">
            <p>Mix the red TXA capsule and red gel in the ratio appropriate for your skin type.</p>
            <ul className="list-disc pl-5">
              <li>For a lighter feel: increase the gel ratio</li>
              <li>For more moisture and elasticity: increase the capsule ratio</li>
            </ul>
            <p>Apply to face and neck morning and evening after serums.</p>
          </div>
        )
      }
    ],
    madeIn: 'Made in Korea',
    officialBadge: '55g'
  }
};

export type ProductId = keyof typeof PRODUCT_DATA;
