/**
 * Language Context for Arabic/English Support
 * Provides bilingual functionality across the CauseWay website
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Core translations for the website
export const translations: Translations = {
  // Navigation
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.observatory': { en: 'Observatory', ar: 'المرصد' },
  'nav.insights': { en: 'Insights', ar: 'رؤى' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'nav.clientPortal': { en: 'Client Portal', ar: 'بوابة العملاء' },
  
  // Hero
  'hero.tagline': { 
    en: 'Where Finance Becomes Infrastructure', 
    ar: 'حيث يصبح التمويل بنية تحتية' 
  },
  'hero.subtitle': { 
    en: 'Building Sharia-grounded, governance-safe financial systems for banks, institutions, and development partners.', 
    ar: 'بناء أنظمة مالية متوافقة مع الشريعة وآمنة حوكمياً للبنوك والمؤسسات وشركاء التنمية.' 
  },
  'hero.cta.services': { en: 'Explore Our Services', ar: 'استكشف خدماتنا' },
  'hero.cta.briefing': { en: 'Request a Briefing', ar: 'اطلب إحاطة' },
  
  // Services
  'services.islamicFinance': { en: 'Islamic Finance Engineering', ar: 'هندسة التمويل الإسلامي' },
  'services.riskCompliance': { en: 'Risk & Compliance', ar: 'المخاطر والامتثال' },
  'services.coreBanking': { en: 'Core Banking Systems', ar: 'أنظمة البنوك الأساسية' },
  'services.microfinance': { en: 'Microfinance Development', ar: 'تطوير التمويل الأصغر' },
  'services.capacityBuilding': { en: 'Capacity Building', ar: 'بناء القدرات' },
  'services.branding': { en: 'Branding & Identity', ar: 'العلامة التجارية والهوية' },
  
  // YETO
  'yeto.title': { en: 'YETO Platform', ar: 'منصة يتو' },
  'yeto.fullName': { 
    en: 'Yemen Economic Transparency Observatory', 
    ar: 'المرصد اليمني للشفافية الاقتصادية' 
  },
  'yeto.comingSoon': { en: 'Coming Soon', ar: 'قريباً' },
  'yeto.learnMore': { en: 'Learn More', ar: 'اعرف المزيد' },
  
  // Common
  'common.readMore': { en: 'Read More', ar: 'اقرأ المزيد' },
  'common.viewAll': { en: 'View All', ar: 'عرض الكل' },
  'common.subscribe': { en: 'Subscribe', ar: 'اشترك' },
  'common.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'common.phone': { en: 'Phone', ar: 'الهاتف' },
  'common.address': { en: 'Address', ar: 'العنوان' },
  'common.send': { en: 'Send', ar: 'إرسال' },
  
  // Footer
  'footer.expertise': { en: 'Expertise', ar: 'الخبرات' },
  'footer.company': { en: 'Company', ar: 'الشركة' },
  'footer.resources': { en: 'Resources', ar: 'الموارد' },
  'footer.externalResources': { en: 'Key Resources', ar: 'موارد رئيسية' },
  'footer.copyright': { 
    en: '© 2026 CauseWay Consultancies. All Rights Reserved.', 
    ar: '© 2026 كوزواي للاستشارات. جميع الحقوق محفوظة.' 
  },
  'footer.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'footer.terms': { en: 'Terms of Service', ar: 'شروط الخدمة' },
  'footer.cookies': { en: 'Cookie Notice', ar: 'إشعار ملفات تعريف الارتباط' },
  
  // Insights
  'insights.title': { en: 'Insights', ar: 'رؤى' },
  'insights.articles': { en: 'Articles', ar: 'مقالات' },
  'insights.publications': { en: 'Publications', ar: 'منشورات' },
  'insights.news': { en: 'News', ar: 'أخبار' },
  
  // Categories
  'category.governance': { en: 'Governance', ar: 'الحوكمة' },
  'category.islamicFinance': { en: 'Islamic Finance', ar: 'التمويل الإسلامي' },
  'category.compliance': { en: 'Compliance', ar: 'الامتثال' },
  'category.riskManagement': { en: 'Risk Management', ar: 'إدارة المخاطر' },
  'category.economicAnalysis': { en: 'Economic Analysis', ar: 'التحليل الاقتصادي' },
  
  // Contact
  'contact.title': { en: 'Contact Us', ar: 'اتصل بنا' },
  'contact.subtitle': { 
    en: 'Get in touch with our team', 
    ar: 'تواصل مع فريقنا' 
  },
  'contact.form.name': { en: 'Full Name', ar: 'الاسم الكامل' },
  'contact.form.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'contact.form.organization': { en: 'Organization', ar: 'المؤسسة' },
  'contact.form.subject': { en: 'Subject', ar: 'الموضوع' },
  'contact.form.message': { en: 'Message', ar: 'الرسالة' },
  'contact.form.submit': { en: 'Send Message', ar: 'إرسال الرسالة' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('causeway-language', lang);
    
    // Update document direction and lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  const isRTL = language === 'ar';

  // Set initial document direction
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
