// Meta Pixel tracking utilities
const PIXEL_ID = '757479653472403';

export interface MetaPixelEvent {
  eventName: string;
  parameters?: Record<string, any>;
}

export interface EcommerceEvent {
  value: number;
  currency: string;
  contentIds?: string[];
  contentType?: string;
  numItems?: number;
}

class MetaPixelTracker {
  private pixelId: string;
  private initialized = false;

  constructor(pixelId: string = PIXEL_ID) {
    this.pixelId = pixelId;
  }

  // Initialize Meta Pixel
  init(): void {
    if (this.initialized || typeof window === 'undefined') return;

    try {
      // Meta Pixel Code
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
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
      window.fbq('init', this.pixelId);
      window.fbq('track', 'PageView');

      this.initialized = true;
      console.log(`Meta Pixel initialized with ID: ${this.pixelId}`);
    } catch (error) {
      console.error('Failed to initialize Meta Pixel:', error);
    }
  }

  // Track standard events
  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isAvailable()) return;

    try {
      window.fbq('track', eventName, parameters);
      console.log(`Meta Pixel event tracked: ${eventName}`, parameters);
    } catch (error) {
      console.error('Meta Pixel tracking error:', error);
    }
  }

  // Track custom events
  trackCustomEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isAvailable()) return;

    try {
      window.fbq('trackCustom', eventName, parameters);
      console.log(`Meta Pixel custom event tracked: ${eventName}`, parameters);
    } catch (error) {
      console.error('Meta Pixel custom tracking error:', error);
    }
  }

  // E-commerce tracking methods
  trackPageView(): void {
    this.trackEvent('PageView');
  }

  trackViewContent(contentName: string, contentCategory: string, value?: number): void {
    this.trackEvent('ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value: value,
      currency: 'USD'
    });
  }

  trackAddToCart(event: EcommerceEvent): void {
    this.trackEvent('AddToCart', {
      value: event.value,
      currency: event.currency,
      content_ids: event.contentIds || [],
      content_type: event.contentType || 'product',
      num_items: event.numItems || 1
    });
  }

  trackInitiateCheckout(event: EcommerceEvent): void {
    this.trackEvent('InitiateCheckout', {
      value: event.value,
      currency: event.currency,
      num_items: event.numItems || 1
    });
  }

  trackPurchase(event: EcommerceEvent & { orderId?: string }): void {
    this.trackEvent('Purchase', {
      value: event.value,
      currency: event.currency,
      content_type: event.contentType || 'product',
      order_id: event.orderId,
      num_items: event.numItems || 1
    });
  }

  trackLead(value?: number, currency: string = 'USD'): void {
    this.trackEvent('Lead', {
      value: value,
      currency: currency
    });
  }

  trackCompleteRegistration(method: string = 'email'): void {
    this.trackEvent('CompleteRegistration', {
      registration_method: method
    });
  }

  trackSearch(searchTerm: string): void {
    this.trackEvent('Search', {
      search_string: searchTerm
    });
  }

  trackAddToWishlist(contentId: string, value?: number): void {
    this.trackEvent('AddToWishlist', {
      content_ids: [contentId],
      value: value,
      currency: 'USD'
    });
  }

  // Business-specific events
  trackProductInterest(productId: string, interactionType: string): void {
    this.trackCustomEvent('ProductInterest', {
      product_id: productId,
      interaction_type: interactionType,
      timestamp: new Date().toISOString()
    });
  }

  trackEmailSignup(source: string): void {
    this.trackCustomEvent('EmailSignup', {
      source: source,
      timestamp: new Date().toISOString()
    });
  }

  trackVideoPlay(videoId: string, progress: number): void {
    this.trackCustomEvent('VideoPlay', {
      video_id: videoId,
      progress: progress,
      timestamp: new Date().toISOString()
    });
  }

  trackFormSubmission(formName: string): void {
    this.trackCustomEvent('FormSubmission', {
      form_name: formName,
      timestamp: new Date().toISOString()
    });
  }

  // Utility methods
  private isAvailable(): boolean {
    if (typeof window === 'undefined') {
      console.warn('Meta Pixel: Window object not available');
      return false;
    }

    if (!window.fbq) {
      console.warn('Meta Pixel: fbq function not available');
      return false;
    }

    return true;
  }

  // Get pixel status
  getStatus(): { initialized: boolean; available: boolean; pixelId: string } {
    return {
      initialized: this.initialized,
      available: this.isAvailable(),
      pixelId: this.pixelId
    };
  }
}

// Global Meta Pixel tracker instance
export const metaPixelTracker = new MetaPixelTracker();

// Auto-initialize
if (typeof window !== 'undefined') {
  metaPixelTracker.init();
}

// Export convenience functions
export const trackPageView = () => metaPixelTracker.trackPageView();
export const trackViewContent = (name: string, category: string, value?: number) => 
  metaPixelTracker.trackViewContent(name, category, value);
export const trackAddToCart = (event: EcommerceEvent) => metaPixelTracker.trackAddToCart(event);
export const trackPurchase = (event: EcommerceEvent & { orderId?: string }) => 
  metaPixelTracker.trackPurchase(event);
export const trackLead = (value?: number) => metaPixelTracker.trackLead(value);

declare global {
  interface Window {
    fbq: any;
    _fbq?: any;
  }
} 