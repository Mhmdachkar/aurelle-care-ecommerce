import React, { useEffect } from 'react';

const PIXEL_ID = '757479653472403';

interface MetaPixelProviderProps {
  children: React.ReactNode;
}

export const MetaPixelProvider: React.FC<MetaPixelProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Meta Pixel
    if (typeof window !== 'undefined') {
      console.log('🎯 Initializing Meta Pixel...');
      
      // Meta Pixel Code
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) {
          console.log('⚠️ Meta Pixel already initialized');
          return;
        }
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Initialize pixel
      window.fbq('init', PIXEL_ID);
      
      // Track initial page view
      window.fbq('track', 'PageView');

      console.log('✅ Meta Pixel initialized with ID:', PIXEL_ID);
      
      // Verify pixel is available
      setTimeout(() => {
        if (window.fbq) {
          console.log('✅ Meta Pixel fbq function is available');
        } else {
          console.error('❌ Meta Pixel fbq function is NOT available');
        }
      }, 1000);
    } else {
      console.error('❌ Window object not available for Meta Pixel initialization');
    }
  }, []);

  return <>{children}</>;
}; 