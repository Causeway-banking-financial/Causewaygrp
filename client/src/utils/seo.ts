/**
 * CauseWay Multi-Language SEO Utilities
 * Dynamic meta tag management and hreflang support
 */

interface SEOConfig {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  keywords?: string;
  keywordsAr?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

// Page-specific SEO configurations
export const pageSEO: Record<string, SEOConfig> = {
  home: {
    title: 'CauseWay | Financial & Banking Consultancies - Yemen & MENA Region',
    titleAr: 'كوزواي | استشارات مالية ومصرفية - اليمن ومنطقة الشرق الأوسط',
    description: 'CauseWay delivers world-class Islamic finance engineering, banking consultancy, AML/CFT compliance, risk management, and governance solutions for financial institutions across Yemen and the MENA region.',
    descriptionAr: 'تقدم كوزواي خدمات استشارية عالمية المستوى في هندسة التمويل الإسلامي والاستشارات المصرفية والامتثال لمكافحة غسل الأموال وإدارة المخاطر والحوكمة للمؤسسات المالية في اليمن ومنطقة الشرق الأوسط.',
    keywords: 'Islamic Finance Yemen, Banking Consultancy, AAOIFI Standards, AML/CFT, Risk Management, Microfinance',
    keywordsAr: 'التمويل الإسلامي اليمن، استشارات مصرفية، معايير أيوفي، مكافحة غسل الأموال، إدارة المخاطر، التمويل الأصغر'
  },
  about: {
    title: 'About CauseWay | Our Story & Mission',
    titleAr: 'عن كوزواي | قصتنا ورسالتنا',
    description: 'Learn about CauseWay\'s mission to build Sharia-grounded, governance-safe financial systems. Our team brings decades of experience in Islamic finance and banking transformation.',
    descriptionAr: 'تعرف على رسالة كوزواي في بناء أنظمة مالية متوافقة مع الشريعة وآمنة حوكمياً. يمتلك فريقنا عقوداً من الخبرة في التمويل الإسلامي والتحول المصرفي.'
  },
  services: {
    title: 'Our Services | Financial & Banking Consulting',
    titleAr: 'خدماتنا | استشارات مالية ومصرفية',
    description: 'Comprehensive financial consulting services including Islamic finance engineering, risk & compliance, core banking systems, microfinance development, and capacity building.',
    descriptionAr: 'خدمات استشارية مالية شاملة تشمل هندسة التمويل الإسلامي وإدارة المخاطر والامتثال وأنظمة البنوك الأساسية وتطوير التمويل الأصغر وبناء القدرات.'
  },
  academy: {
    title: 'CauseWay Academy | Executive Training Programs',
    titleAr: 'أكاديمية كوزواي | برامج التدريب التنفيذي',
    description: 'World-class executive training programs for banking professionals. Board leadership, Islamic finance, risk management, compliance, and digital transformation courses.',
    descriptionAr: 'برامج تدريب تنفيذي عالمية المستوى للمحترفين المصرفيين. دورات في القيادة المؤسسية والتمويل الإسلامي وإدارة المخاطر والامتثال والتحول الرقمي.'
  },
  insights: {
    title: 'Insights | Financial Sector Analysis & Research',
    titleAr: 'رؤى | تحليلات وأبحاث القطاع المالي',
    description: 'Expert analysis and research on Islamic finance, banking governance, AML/CFT compliance, and financial sector development in Yemen and the MENA region.',
    descriptionAr: 'تحليلات وأبحاث متخصصة في التمويل الإسلامي والحوكمة المصرفية والامتثال لمكافحة غسل الأموال وتطوير القطاع المالي في اليمن ومنطقة الشرق الأوسط.'
  },
  contact: {
    title: 'Contact CauseWay | Get in Touch',
    titleAr: 'تواصل مع كوزواي | اتصل بنا',
    description: 'Contact CauseWay for financial consulting services. Schedule a consultation, request a proposal, or learn more about our Islamic finance and banking solutions.',
    descriptionAr: 'تواصل مع كوزواي للحصول على خدمات الاستشارات المالية. حدد موعداً للاستشارة أو اطلب عرضاً أو تعرف على حلولنا في التمويل الإسلامي والخدمات المصرفية.'
  },
  calculator: {
    title: 'Islamic Finance Calculator | Murabaha, Ijara, Sukuk, Zakat',
    titleAr: 'حاسبة التمويل الإسلامي | المرابحة، الإجارة، الصكوك، الزكاة',
    description: 'Free Islamic finance calculator for Murabaha, Ijara, Sukuk yield, and Zakat calculations. AAOIFI-compliant methodology with detailed explanations.',
    descriptionAr: 'حاسبة تمويل إسلامي مجانية لحسابات المرابحة والإجارة وعوائد الصكوك والزكاة. منهجية متوافقة مع معايير أيوفي مع شرح تفصيلي.'
  },
  glossary: {
    title: 'Financial Glossary | Arabic-English Banking Terms',
    titleAr: 'قاموس مالي | مصطلحات مصرفية عربي-إنجليزي',
    description: 'Comprehensive Arabic-English glossary of Islamic finance, banking, compliance, and risk management terms. Essential reference for financial professionals.',
    descriptionAr: 'قاموس شامل عربي-إنجليزي لمصطلحات التمويل الإسلامي والخدمات المصرفية والامتثال وإدارة المخاطر. مرجع أساسي للمحترفين الماليين.'
  },
  careers: {
    title: 'Careers at CauseWay | Join Our Team',
    titleAr: 'وظائف في كوزواي | انضم لفريقنا',
    description: 'Explore career opportunities at CauseWay. Join our team of financial consultants making an impact in Yemen and the MENA region.',
    descriptionAr: 'استكشف فرص العمل في كوزواي. انضم لفريقنا من المستشارين الماليين الذين يحدثون تأثيراً في اليمن ومنطقة الشرق الأوسط.'
  }
};

// Update document meta tags dynamically
export const updateMetaTags = (pageKey: string, language: 'en' | 'ar'): void => {
  const config = pageSEO[pageKey];
  if (!config) return;

  const isArabic = language === 'ar';

  // Update title
  document.title = isArabic ? config.titleAr : config.title;

  // Update meta description
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', isArabic ? config.descriptionAr : config.description);
  }

  // Update keywords if available
  if (config.keywords || config.keywordsAr) {
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', isArabic ? (config.keywordsAr || '') : (config.keywords || ''));
    }
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', isArabic ? config.titleAr : config.title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', isArabic ? config.descriptionAr : config.description);
  }

  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', isArabic ? config.titleAr : config.title);
  }

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) {
    twitterDesc.setAttribute('content', isArabic ? config.descriptionAr : config.description);
  }

  // Update HTML lang and dir attributes
  document.documentElement.lang = isArabic ? 'ar' : 'en';
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

  // Update OG locale
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    ogLocale.setAttribute('content', isArabic ? 'ar_YE' : 'en_US');
  }
};

// Generate JSON-LD structured data for a page
export const generateStructuredData = (pageKey: string, language: 'en' | 'ar'): string => {
  const config = pageSEO[pageKey];
  if (!config) return '';

  const isArabic = language === 'ar';
  const baseUrl = 'https://causewaygrp.com';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isArabic ? config.titleAr : config.title,
    description: isArabic ? config.descriptionAr : config.description,
    url: `${baseUrl}/${pageKey === 'home' ? '' : pageKey}`,
    inLanguage: isArabic ? 'ar' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CauseWay',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'CauseWay Consultancies',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/causeway-logo.png`
      }
    }
  };

  return JSON.stringify(data);
};

// Add or update JSON-LD script in document head
export const updateStructuredData = (pageKey: string, language: 'en' | 'ar'): void => {
  const scriptId = 'page-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = generateStructuredData(pageKey, language);
};

// Update canonical URL
export const updateCanonicalUrl = (path: string): void => {
  const baseUrl = 'https://causewaygrp.com';
  const canonical = document.querySelector('link[rel="canonical"]');
  
  if (canonical) {
    canonical.setAttribute('href', `${baseUrl}${path}`);
  }
};

// Comprehensive SEO update function
export const updatePageSEO = (pageKey: string, language: 'en' | 'ar', path: string): void => {
  updateMetaTags(pageKey, language);
  updateStructuredData(pageKey, language);
  updateCanonicalUrl(path);
};
