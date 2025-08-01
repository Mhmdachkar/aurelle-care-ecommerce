import { useCallback } from 'react';

declare global {
  interface Window {
    fbq: any;
  }
}

const PIXEL_ID = '757479653472403'; // Your Meta Pixel ID

export const useMetaPixel = () => {
  const trackEvent = useCallback((eventName: string, parameters?: any) => {
    console.log(`🎯 Attempting to track Meta Pixel event: ${eventName}`, parameters);
    
    if (typeof window === 'undefined') {
      console.warn('❌ Meta Pixel: Window object not available');
      return;
    }
    
    if (!window.fbq) {
      console.warn('❌ Meta Pixel: fbq function not available. Pixel may not be loaded yet.');
      return;
    }
    
    try {
      window.fbq('track', eventName, parameters);
      console.log(`✅ Meta Pixel event tracked successfully: ${eventName}`, parameters);
    } catch (error) {
      console.error('❌ Error tracking Meta Pixel event:', error);
    }
  }, []);

  const trackPageView = useCallback(() => {
    trackEvent('PageView');
  }, [trackEvent]);

  const trackViewContent = useCallback((contentName: string, contentCategory: string, value?: number) => {
    trackEvent('ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value: value,
      currency: 'USD'
    });
  }, [trackEvent]);

  const trackAddToCart = useCallback((value: number, currency: string = 'USD', contentId?: string, quantity?: number) => {
    trackEvent('AddToCart', {
      value: value,
      currency: currency,
      content_ids: contentId ? [contentId] : [],
      content_type: 'product',
      num_items: quantity || 1
    });
  }, [trackEvent]);

  const trackInitiateCheckout = useCallback((value: number, currency: string = 'USD', numItems?: number) => {
    trackEvent('InitiateCheckout', {
      value: value,
      currency: currency,
      num_items: numItems || 1
    });
  }, [trackEvent]);

  const trackPurchase = useCallback((value: number, currency: string = 'USD', orderId?: string) => {
    trackEvent('Purchase', {
      value: value,
      currency: currency,
      content_type: 'product',
      order_id: orderId
    });
  }, [trackEvent]);

  const trackLead = useCallback((value?: number, currency: string = 'USD') => {
    trackEvent('Lead', {
      value: value,
      currency: currency
    });
  }, [trackEvent]);

  const trackCompleteRegistration = useCallback((method?: string) => {
    trackEvent('CompleteRegistration', {
      registration_method: method || 'email'
    });
  }, [trackEvent]);

  const trackCustomEvent = useCallback((eventName: string, parameters?: any) => {
    console.log(`🎯 Attempting to track Meta Pixel custom event: ${eventName}`, parameters);
    
    if (typeof window === 'undefined') {
      console.warn('❌ Meta Pixel: Window object not available');
      return;
    }
    
    if (!window.fbq) {
      console.warn('❌ Meta Pixel: fbq function not available. Pixel may not be loaded yet.');
      return;
    }
    
    try {
      window.fbq('trackCustom', eventName, parameters);
      console.log(`✅ Meta Pixel custom event tracked successfully: ${eventName}`, parameters);
    } catch (error) {
      console.error('❌ Error tracking Meta Pixel custom event:', error);
    }
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackLead,
    trackCompleteRegistration,
    trackCustomEvent,
  };
}; 