import React from 'react';
import { Sparkles, ActivitySquare, Cpu, Zap } from 'lucide-react';

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
      { src: '/products/product-1-champagne-beaute/rose-variant.png', alt: 'Rose Variant', fallback: '/placeholder.svg' },
      { src: '/products/product-1-champagne-beaute/vanilla-variant.png', alt: 'Vanilla Variant', fallback: '/placeholder.svg' },
      { src: '/products/product-1-champagne-beaute/almond-variant.png', alt: 'Almond Variant', fallback: '/placeholder.svg' }
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
      src: '/videos/Screen Recording 2025-07-07 172049.mp4',
      poster: '/products/product-1-champagne-beaute/rose-variant.png',
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
      src: '/videos/Screen Recording 2025-08-08 042534.mp4',
      poster: '/products/product-2-booster-pro/pink.png',
      title: 'How It Works'
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
  }
};

export type ProductId = keyof typeof PRODUCT_DATA;
