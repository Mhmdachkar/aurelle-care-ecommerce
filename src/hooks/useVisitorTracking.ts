import { useEffect, useRef } from 'react';

interface VisitorTrackingOptions {
  enabled?: boolean;
  trackPageViews?: boolean;
  trackTimeOnPage?: boolean;
}

// Simple UUID generator
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const useVisitorTracking = (options: VisitorTrackingOptions = {}) => {
  const {
    enabled = true,
    trackPageViews = true,
    trackTimeOnPage: trackTimeOnPageOption = true,
  } = options;

  const sessionIdRef = useRef<string | null>(null);
  const pageStartTimeRef = useRef<number>(Date.now());
  const hasTrackedCurrentPageRef = useRef<boolean>(false);

  // Generate or retrieve session ID
  const getSessionId = () => {
    if (sessionIdRef.current) return sessionIdRef.current;
    
    // Check if session ID exists in sessionStorage
    let sessionId = sessionStorage.getItem('visitor_session_id');
    
    if (!sessionId) {
      sessionId = generateUUID();
      sessionStorage.setItem('visitor_session_id', sessionId);
    }
    
    sessionIdRef.current = sessionId;
    return sessionId;
  };

  // Track page visit
  const trackPageVisit = async (customUrl?: string, customTitle?: string) => {
    if (!enabled) return;

    try {
      const sessionId = getSessionId();
      const pageUrl = customUrl || window.location.href;
      const pageTitle = customTitle || document.title;
      const userAgent = navigator.userAgent;
      const referrer = document.referrer;

      // Call the tracking function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/track-visitor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          sessionId,
          pageUrl,
          pageTitle,
          userAgent,
          referrer,
        }),
      });

      if (!response.ok) {
        console.warn('Failed to track visitor:', response.statusText);
      }
    } catch (error) {
      console.warn('Error tracking visitor:', error);
    }
  };

  // Track time spent on page
  const trackTimeOnPageFunc = async () => {
    if (!enabled || !trackTimeOnPageOption) return;

    const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current) / 1000);
    
    // Only track if user spent more than 5 seconds on page
    if (timeSpent < 5) return;

    try {
      // Update the current page visit with duration
      // This would need to be implemented in the backend
      console.log(`Time spent on page: ${timeSpent} seconds`);
    } catch (error) {
      console.warn('Error tracking time on page:', error);
    }
  };

  // Track page visit on mount and route changes
  useEffect(() => {
    if (!enabled || !trackPageViews) return;

    // Reset page start time
    pageStartTimeRef.current = Date.now();
    hasTrackedCurrentPageRef.current = false;

    // Track page visit
    trackPageVisit();
    hasTrackedCurrentPageRef.current = true;

    // Track time on page when leaving
    const handleBeforeUnload = () => {
      trackTimeOnPageFunc();
    };

    // Track time on page when visibility changes (tab switching, etc.)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackTimeOnPageFunc();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Track time on page when component unmounts
      trackTimeOnPageFunc();
    };
  }, [enabled, trackPageViews, trackTimeOnPageOption]);

  return {
    sessionId: sessionIdRef.current,
    trackPageVisit,
    trackTimeOnPage: trackTimeOnPageFunc,
  };
}; 