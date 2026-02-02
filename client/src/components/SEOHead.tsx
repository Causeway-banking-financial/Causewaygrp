/**
 * SEOHead Component
 * Dynamically updates document head with page-specific SEO meta tags
 * Expert-level implementation for optimal search engine visibility
 */

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { seoConfig, getPageMeta, getCanonicalUrl } from '@/lib/seoConfig';

interface SEOHeadProps {
  pageKey: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  noIndex?: boolean;
}

export default function SEOHead({
  pageKey,
  customTitle,
  customDescription,
  customKeywords,
  noIndex = false,
}: SEOHeadProps) {
  const { language } = useLanguage();
  
  useEffect(() => {
    const meta = getPageMeta(pageKey, language);
    const canonicalUrl = getCanonicalUrl(pageKey);
    
    // Update title
    const title = customTitle || meta.title;
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    
    // Primary meta tags
    const description = customDescription || meta.description;
    const keywords = customKeywords ? customKeywords.join(', ') : meta.keywords;
    
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('title', title);
    
    // Robots
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:locale', language === 'ar' ? 'ar_YE' : 'en_US', true);
    
    // Twitter Card
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:url', canonicalUrl);
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
    
    // Update hreflang for current language
    const hreflangEn = document.querySelector('link[hreflang="en"]') as HTMLLinkElement;
    const hreflangAr = document.querySelector('link[hreflang="ar"]') as HTMLLinkElement;
    const hreflangDefault = document.querySelector('link[hreflang="x-default"]') as HTMLLinkElement;
    
    if (hreflangEn) hreflangEn.href = canonicalUrl;
    if (hreflangAr) hreflangAr.href = `${canonicalUrl}${canonicalUrl.endsWith('/') ? '' : '/'}?lang=ar`;
    if (hreflangDefault) hreflangDefault.href = canonicalUrl;
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
  }, [pageKey, language, customTitle, customDescription, customKeywords, noIndex]);
  
  return null; // This component doesn't render anything
}

/**
 * Hook to use SEO configuration
 */
export function useSEO(pageKey: string) {
  const { language } = useLanguage();
  return {
    meta: getPageMeta(pageKey, language),
    canonicalUrl: getCanonicalUrl(pageKey),
    config: seoConfig[pageKey] || seoConfig.home,
  };
}
