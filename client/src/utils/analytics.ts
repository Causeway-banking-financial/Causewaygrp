/**
 * CauseWay Analytics Utility
 * Privacy-compliant Google Analytics 4 implementation
 * GDPR/CCPA compliant with consent management
 */

// Types for analytics events
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

interface PageViewData {
  page_path: string;
  page_title: string;
  page_location: string;
  language?: string;
}

interface UserProperties {
  user_language?: string;
  user_region?: string;
  user_type?: 'visitor' | 'lead' | 'client';
}

// Check if user has consented to analytics
export function hasAnalyticsConsent(): boolean {
  try {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      const parsed = JSON.parse(consent);
      return parsed.analytics === true;
    }
  } catch {
    // Consent not given or error parsing
  }
  return false;
}

// Initialize Google Analytics with privacy settings
export function initializeAnalytics(): void {
  if (typeof window === 'undefined') return;
  
  // Only initialize if consent is given
  if (!hasAnalyticsConsent()) {
    console.log('[Analytics] Consent not given, analytics disabled');
    return;
  }

  // Check if gtag is already loaded
  if (typeof window.gtag === 'function') {
    console.log('[Analytics] Already initialized');
    return;
  }

  // The GA script is loaded in index.html
  // Configure with privacy-first settings
  (window as any).gtag?.('config', 'G-XXXXXXXXXX', {
    // Privacy settings
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    
    // Cookie settings
    cookie_flags: 'SameSite=None;Secure',
    cookie_expires: 365 * 24 * 60 * 60, // 1 year in seconds
    
    // Data collection settings
    send_page_view: false, // We'll send manually for SPA
    
    // Custom dimensions
    custom_map: {
      dimension1: 'user_language',
      dimension2: 'user_region',
      dimension3: 'page_category',
    }
  });

  console.log('[Analytics] Initialized with privacy settings');
}

// Track page views (for SPA navigation)
export function trackPageView(data?: Partial<PageViewData>): void {
  if (!hasAnalyticsConsent()) return;
  
  const pageData: PageViewData = {
    page_path: data?.page_path || window.location.pathname,
    page_title: data?.page_title || document.title,
    page_location: data?.page_location || window.location.href,
    language: data?.language || document.documentElement.lang,
  };

  (window as any).gtag?.('event', 'page_view', pageData);
}

// Track custom events
export function trackEvent(event: AnalyticsEvent): void {
  if (!hasAnalyticsConsent()) return;
  
  (window as any).gtag?.('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    non_interaction: event.nonInteraction,
  });
}

// Set user properties
export function setUserProperties(properties: UserProperties): void {
  if (!hasAnalyticsConsent()) return;
  
  (window as any).gtag?.('set', 'user_properties', properties);
}

// Predefined event trackers for CauseWay

// Track service page views
export function trackServiceView(serviceName: string): void {
  trackEvent({
    action: 'view_service',
    category: 'Services',
    label: serviceName,
  });
}

// Track calculator usage
export function trackCalculatorUse(calculatorType: string, action: 'calculate' | 'export_pdf' | 'export_amortization'): void {
  trackEvent({
    action: action,
    category: 'Islamic Finance Calculator',
    label: calculatorType,
  });
}

// Track resource downloads
export function trackResourceDownload(resourceName: string, resourceType: string): void {
  trackEvent({
    action: 'download',
    category: 'Resources',
    label: `${resourceType}: ${resourceName}`,
  });
}

// Track contact form submissions
export function trackContactSubmission(formType: 'contact' | 'newsletter' | 'briefing'): void {
  trackEvent({
    action: 'form_submit',
    category: 'Lead Generation',
    label: formType,
  });
}

// Track WhatsApp clicks
export function trackWhatsAppClick(context: string): void {
  trackEvent({
    action: 'whatsapp_click',
    category: 'Engagement',
    label: context,
  });
}

// Track language switches
export function trackLanguageSwitch(from: string, to: string): void {
  trackEvent({
    action: 'language_switch',
    category: 'User Preferences',
    label: `${from} → ${to}`,
  });
}

// Track external link clicks
export function trackExternalLink(url: string, linkText: string): void {
  trackEvent({
    action: 'external_link_click',
    category: 'Outbound',
    label: `${linkText} (${url})`,
  });
}

// Track scroll depth
export function trackScrollDepth(percentage: number): void {
  trackEvent({
    action: 'scroll_depth',
    category: 'Engagement',
    label: `${percentage}%`,
    value: percentage,
    nonInteraction: true,
  });
}

// Track time on page
export function trackTimeOnPage(seconds: number, pagePath: string): void {
  trackEvent({
    action: 'time_on_page',
    category: 'Engagement',
    label: pagePath,
    value: seconds,
    nonInteraction: true,
  });
}

// Track academy course clicks
export function trackAcademyCourseClick(courseName: string, provider: string): void {
  trackEvent({
    action: 'course_click',
    category: 'Academy',
    label: `${courseName} (${provider})`,
  });
}

// Track glossary term views
export function trackGlossaryTermView(term: string): void {
  trackEvent({
    action: 'term_view',
    category: 'Glossary',
    label: term,
  });
}

// Track regulatory calendar event clicks
export function trackCalendarEventClick(eventName: string, category: string): void {
  trackEvent({
    action: 'calendar_event_click',
    category: 'Regulatory Calendar',
    label: `${category}: ${eventName}`,
  });
}

// E-commerce tracking for future subscription model
export function trackBeginCheckout(tier: string, price: number): void {
  if (!hasAnalyticsConsent()) return;
  
  (window as any).gtag?.('event', 'begin_checkout', {
    currency: 'USD',
    value: price,
    items: [{
      item_name: `CauseWay ${tier} Subscription`,
      item_category: 'Subscription',
      price: price,
      quantity: 1,
    }]
  });
}

// Track search queries
export function trackSearch(searchTerm: string, resultsCount: number): void {
  if (!hasAnalyticsConsent()) return;
  
  (window as any).gtag?.('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

// Consent update handler
export function updateAnalyticsConsent(granted: boolean): void {
  if (granted) {
    initializeAnalytics();
    trackEvent({
      action: 'consent_granted',
      category: 'Privacy',
      label: 'analytics',
    });
  } else {
    // Disable analytics
    (window as any).gtag?.('consent', 'update', {
      analytics_storage: 'denied',
    });
  }
}

// Declare gtag on window
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
