/**
 * CauseWay SEO Hook
 * Automatically updates SEO meta tags based on current page and language
 */

import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { updatePageSEO, pageSEO } from '@/utils/seo';

// Map routes to SEO page keys
const routeToPageKey: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/services': 'services',
  '/academy': 'academy',
  '/insights': 'insights',
  '/contact': 'contact',
  '/tools/islamic-finance-calculator': 'calculator',
  '/glossary': 'glossary',
  '/careers': 'careers',
  '/resources': 'resources',
  '/observatory': 'observatory',
  '/regulatory-calendar': 'calendar',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/faq': 'faq'
};

export const useSEO = (customPageKey?: string): void => {
  const [location] = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    // Determine page key from route or use custom key
    const pageKey = customPageKey || routeToPageKey[location] || 'home';
    
    // Only update if we have SEO config for this page
    if (pageSEO[pageKey]) {
      updatePageSEO(pageKey, language, location);
    }
  }, [location, language, customPageKey]);
};

export default useSEO;
