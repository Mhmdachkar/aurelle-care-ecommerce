// Google Analytics 4 Integration for E-commerce
declare global {
  interface Window {
    gtag: any;
  }
}

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID

// Initialize GA4
export const initGA = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `;
    document.head.appendChild(script2);
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track e-commerce events
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }
};

// Track add to cart
export const trackAddToCart = (itemId: string, itemName: string, value: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: value,
      items: [{
        item_id: itemId,
        item_name: itemName,
        price: value,
        quantity: 1,
      }],
    });
  }
};

// Track user sessions
export const trackLogin = (userId: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'login', {
      method: 'email',
    });
    window.gtag('config', GA_TRACKING_ID, {
      user_id: userId,
    });
  }
};

// Track checkout progress
export const trackBeginCheckout = (value: number, items: any[]) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: value,
      items: items,
    });
  }
}; 