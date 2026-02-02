/**
 * useAnalytics Hook
 * React hook for easy analytics integration
 */

import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackServiceView,
  trackCalculatorUse,
  trackResourceDownload,
  trackContactSubmission,
  trackWhatsAppClick,
  trackLanguageSwitch,
  trackExternalLink,
  trackScrollDepth,
  trackAcademyCourseClick,
  trackGlossaryTermView,
  trackCalendarEventClick,
  hasAnalyticsConsent,
} from '@/utils/analytics';
import { useLanguage } from '@/contexts/LanguageContext';

export function useAnalytics() {
  const [location] = useLocation();
  const { language } = useLanguage();

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      trackPageView({
        page_path: location,
        page_title: document.title,
        language: language,
      });
    }
  }, [location, language]);

  // Scroll depth tracking
  useEffect(() => {
    if (!hasAnalyticsConsent()) return;

    const scrollDepths = [25, 50, 75, 90, 100];
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          trackScrollDepth(depth);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Memoized tracking functions
  const trackService = useCallback((serviceName: string) => {
    trackServiceView(serviceName);
  }, []);

  const trackCalculator = useCallback((type: string, action: 'calculate' | 'export_pdf' | 'export_amortization') => {
    trackCalculatorUse(type, action);
  }, []);

  const trackDownload = useCallback((name: string, type: string) => {
    trackResourceDownload(name, type);
  }, []);

  const trackContact = useCallback((formType: 'contact' | 'newsletter' | 'briefing') => {
    trackContactSubmission(formType);
  }, []);

  const trackWhatsApp = useCallback((context: string) => {
    trackWhatsAppClick(context);
  }, []);

  const trackLangSwitch = useCallback((from: string, to: string) => {
    trackLanguageSwitch(from, to);
  }, []);

  const trackExternal = useCallback((url: string, text: string) => {
    trackExternalLink(url, text);
  }, []);

  const trackCourse = useCallback((name: string, provider: string) => {
    trackAcademyCourseClick(name, provider);
  }, []);

  const trackGlossary = useCallback((term: string) => {
    trackGlossaryTermView(term);
  }, []);

  const trackCalendar = useCallback((eventName: string, category: string) => {
    trackCalendarEventClick(eventName, category);
  }, []);

  const trackCustomEvent = useCallback((action: string, category: string, label?: string, value?: number) => {
    trackEvent({ action, category, label, value });
  }, []);

  return {
    trackService,
    trackCalculator,
    trackDownload,
    trackContact,
    trackWhatsApp,
    trackLangSwitch,
    trackExternal,
    trackCourse,
    trackGlossary,
    trackCalendar,
    trackCustomEvent,
  };
}

export default useAnalytics;
