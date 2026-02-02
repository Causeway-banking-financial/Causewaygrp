/**
 * SEO Configuration for CauseWay Website
 * Expert-level SEO with page-specific meta tags, structured data, and targeting
 */

export interface PageSEO {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  keywords: string[];
  ogImage?: string;
  canonicalPath: string;
  structuredData?: object;
}

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: 'CauseWay | Financial & Banking Consultancies - Yemen & MENA',
    titleAr: 'كوزواي | استشارات مالية ومصرفية - اليمن والشرق الأوسط',
    description: 'CauseWay: Leading Islamic finance and banking consultancy in Yemen & MENA. Expert AML/CFT compliance, risk management, and Sharia-compliant solutions.',
    descriptionAr: 'كوزواي: الرائدة في استشارات التمويل الإسلامي والمصرفية في اليمن والشرق الأوسط. خبراء في مكافحة غسل الأموال وإدارة المخاطر.',
    keywords: ['Islamic Finance Yemen', 'Banking Consultancy', 'AML/CFT Compliance', 'Risk Management', 'Sharia Compliance', 'MENA Finance'],
    canonicalPath: '/',
  },
  
  islamicFinance: {
    title: 'Islamic Finance Engineering | Sukuk & Sharia-Compliant Products | CauseWay',
    titleAr: 'هندسة التمويل الإسلامي | الصكوك والمنتجات المتوافقة مع الشريعة | كوزواي',
    description: 'Expert Islamic finance engineering: Sukuk structuring, Murabaha, Ijara, Musharaka products. AAOIFI-compliant solutions for banks in Yemen & MENA.',
    descriptionAr: 'هندسة التمويل الإسلامي: هيكلة الصكوك، المرابحة، الإجارة، المشاركة. حلول متوافقة مع معايير AAOIFI للبنوك.',
    keywords: ['Islamic Finance', 'Sukuk Structuring', 'AAOIFI Standards', 'Murabaha', 'Ijara', 'Sharia Board'],
    canonicalPath: '/services/islamic-finance',
  },
  
  riskCompliance: {
    title: 'AML/CFT Compliance & Risk Management | Financial Governance | CauseWay',
    titleAr: 'مكافحة غسل الأموال وإدارة المخاطر | الحوكمة المالية | كوزواي',
    description: 'Comprehensive AML/CFT frameworks, regulatory compliance, internal audit, and enterprise risk management for banks and financial institutions.',
    descriptionAr: 'أطر شاملة لمكافحة غسل الأموال، الامتثال التنظيمي، التدقيق الداخلي، وإدارة المخاطر المؤسسية للبنوك.',
    keywords: ['AML/CFT', 'Risk Management', 'Regulatory Compliance', 'Internal Audit', 'Basel III', 'Financial Governance'],
    canonicalPath: '/services/risk-compliance',
  },
  
  coreBanking: {
    title: 'Core Banking Systems | Digital Transformation | Implementation | CauseWay',
    titleAr: 'الأنظمة المصرفية الأساسية | التحول الرقمي | التنفيذ | كوزواي',
    description: 'Core banking system selection, implementation, and digital transformation. Vendor-neutral advisory for banks modernizing their infrastructure.',
    descriptionAr: 'اختيار وتنفيذ الأنظمة المصرفية الأساسية والتحول الرقمي. استشارات محايدة للبنوك لتحديث بنيتها التحتية.',
    keywords: ['Core Banking Systems', 'Digital Transformation', 'Banking Technology', 'System Integration', 'Data Migration', 'Fintech'],
    canonicalPath: '/services/core-banking',
  },
  
  microfinance: {
    title: 'Microfinance Development | MFI Establishment | Financial Inclusion | CauseWay',
    titleAr: 'تطوير التمويل الأصغر | إنشاء مؤسسات التمويل الأصغر | الشمول المالي | كوزواي',
    description: 'Microfinance institution establishment, licensing, product development, and capacity building. Driving financial inclusion in Yemen & MENA.',
    descriptionAr: 'إنشاء مؤسسات التمويل الأصغر، الترخيص، تطوير المنتجات، وبناء القدرات. تعزيز الشمول المالي في اليمن والمنطقة.',
    keywords: ['Microfinance', 'MFI Establishment', 'Financial Inclusion', 'Capacity Building', 'Social Performance', 'Client Protection'],
    canonicalPath: '/services/microfinance',
  },
  
  capacityBuilding: {
    title: 'Capacity Building | Executive Training | Board Development | CauseWay',
    titleAr: 'بناء القدرات | التدريب التنفيذي | تطوير مجالس الإدارة | كوزواي',
    description: 'Professional development programs for banking executives, board members, and staff. Certified training in Islamic finance, risk, and governance.',
    descriptionAr: 'برامج تطوير مهني للقيادات المصرفية وأعضاء مجالس الإدارة والموظفين. تدريب معتمد في التمويل الإسلامي والمخاطر والحوكمة.',
    keywords: ['Capacity Building', 'Executive Training', 'Board Development', 'Banking Certification', 'Leadership Development', 'Workshops'],
    canonicalPath: '/services/capacity-building',
  },
  
  branding: {
    title: 'Brand Strategy & Corporate Identity | Financial Sector Branding | CauseWay',
    titleAr: 'استراتيجية العلامة التجارية والهوية المؤسسية | العلامات التجارية للقطاع المالي | كوزواي',
    description: 'Strategic branding and corporate identity for banks and financial institutions. Build trust through professional visual identity and messaging.',
    descriptionAr: 'العلامة التجارية الاستراتيجية والهوية المؤسسية للبنوك والمؤسسات المالية. بناء الثقة من خلال الهوية البصرية المهنية.',
    keywords: ['Financial Branding', 'Corporate Identity', 'Brand Strategy', 'Visual Identity', 'Bank Marketing', 'Digital Presence'],
    canonicalPath: '/services/branding',
  },
  
  yeto: {
    title: 'YETO Economic Observatory | Yemen Economic Data & Analysis | CauseWay',
    titleAr: 'مرصد يتو الاقتصادي | بيانات وتحليلات الاقتصاد اليمني | كوزواي',
    description: 'YETO: Yemen Economic Trends Observatory. Real-time economic data, currency rates, food security indices, and market analysis for Yemen.',
    descriptionAr: 'يتو: مرصد الاتجاهات الاقتصادية اليمنية. بيانات اقتصادية فورية، أسعار العملات، مؤشرات الأمن الغذائي، وتحليل السوق.',
    keywords: ['Yemen Economy', 'Economic Data', 'Currency Rates', 'Food Security', 'Market Analysis', 'YETO Observatory'],
    canonicalPath: '/yeto',
  },
  
  insights: {
    title: 'Insights & Research | Financial Sector Analysis | CauseWay',
    titleAr: 'الرؤى والأبحاث | تحليل القطاع المالي | كوزواي',
    description: 'Expert insights on Islamic finance, banking governance, AML/CFT compliance, and financial sector trends in Yemen and MENA region.',
    descriptionAr: 'رؤى خبراء حول التمويل الإسلامي، حوكمة البنوك، مكافحة غسل الأموال، واتجاهات القطاع المالي في اليمن والمنطقة.',
    keywords: ['Financial Insights', 'Banking Research', 'Islamic Finance Analysis', 'Governance', 'MENA Finance', 'Thought Leadership'],
    canonicalPath: '/insights',
  },
  
  academy: {
    title: 'CauseWay Academy | Professional Banking & Finance Courses | CauseWay',
    titleAr: 'أكاديمية كوزواي | دورات مهنية في المصرفية والتمويل | كوزواي',
    description: 'Professional certification courses in Islamic finance, AML/CFT, risk management, and banking operations. Online and in-person training.',
    descriptionAr: 'دورات شهادات مهنية في التمويل الإسلامي، مكافحة غسل الأموال، إدارة المخاطر، والعمليات المصرفية. تدريب عبر الإنترنت وحضوري.',
    keywords: ['Banking Courses', 'Finance Certification', 'Islamic Finance Training', 'AML Training', 'Professional Development', 'E-Learning'],
    canonicalPath: '/academy',
  },
  
  contact: {
    title: 'Contact CauseWay | Request a Consultation | Yemen & MENA',
    titleAr: 'تواصل مع كوزواي | اطلب استشارة | اليمن والشرق الأوسط',
    description: 'Contact CauseWay for financial consulting services. Request a briefing on Islamic finance, risk management, or banking transformation.',
    descriptionAr: 'تواصل مع كوزواي للحصول على خدمات الاستشارات المالية. اطلب إحاطة حول التمويل الإسلامي أو إدارة المخاطر أو التحول المصرفي.',
    keywords: ['Contact', 'Consultation', 'Financial Advisory', 'Banking Consultancy', 'Yemen', 'MENA'],
    canonicalPath: '/contact',
  },
  
  about: {
    title: 'About CauseWay | Our Story & Mission | Financial Consultancy',
    titleAr: 'عن كوزواي | قصتنا ورسالتنا | الاستشارات المالية',
    description: 'Learn about CauseWay: Our mission to build governance-safe financial systems for Yemen and MENA. Meet our team of banking experts.',
    descriptionAr: 'تعرف على كوزواي: رسالتنا لبناء أنظمة مالية آمنة حوكمياً لليمن والمنطقة. تعرف على فريقنا من خبراء المصرفية.',
    keywords: ['About CauseWay', 'Our Team', 'Mission', 'Financial Experts', 'Yemen Consultancy', 'Banking Professionals'],
    canonicalPath: '/about',
  },
};

/**
 * Generate meta tags for a specific page
 */
export function getPageMeta(pageKey: string, language: 'en' | 'ar' = 'en'): {
  title: string;
  description: string;
  keywords: string;
} {
  const page = seoConfig[pageKey] || seoConfig.home;
  return {
    title: language === 'ar' ? page.titleAr : page.title,
    description: language === 'ar' ? page.descriptionAr : page.description,
    keywords: page.keywords.join(', '),
  };
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(pageKey: string): string {
  const page = seoConfig[pageKey] || seoConfig.home;
  return `https://causewaygrp.com${page.canonicalPath}`;
}
