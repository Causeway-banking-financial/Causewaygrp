/**
 * CauseWay Footer Component
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Includes: Company info, expertise links, resources, contact, legal
 */

import { Link } from 'wouter';
import Logo from './Logo';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const expertise = [
  { name: 'Islamic Finance', nameAr: 'التمويل الإسلامي', href: '/services/islamic-finance' },
  { name: 'Risk & Compliance', nameAr: 'المخاطر والامتثال', href: '/services/risk-compliance' },
  { name: 'Core Banking', nameAr: 'الأنظمة المصرفية', href: '/services/core-banking' },
  { name: 'Microfinance', nameAr: 'التمويل الأصغر', href: '/services/microfinance' },
  { name: 'Capacity Building', nameAr: 'بناء القدرات', href: '/services/capacity-building' },
  { name: 'Branding', nameAr: 'العلامة التجارية', href: '/services/branding' },
];

const company = [
  { name: 'About Us', nameAr: 'من نحن', href: '/about' },
  { name: 'Our Approach', nameAr: 'نهجنا', href: '/about' },
  { name: 'Leadership', nameAr: 'القيادة', href: '/about' },
  { name: 'Contact', nameAr: 'اتصل بنا', href: '/contact' },
];

const resources = [
  { name: 'Observatory (YETO)', nameAr: 'المرصد (يتو)', href: '/observatory' },
  { name: 'Articles', nameAr: 'مقالات', href: '/insights' },
  { name: 'Publications', nameAr: 'منشورات', href: '/insights' },
  { name: 'News', nameAr: 'أخبار', href: '/insights' },
];

const externalResources = [
  { name: 'Central Bank of Yemen', nameAr: 'البنك المركزي اليمني', href: 'https://www.centralbank.gov.ye', external: true },
  { name: 'AAOIFI Standards', nameAr: 'معايير أيوفي', href: 'https://aaoifi.com', external: true },
  { name: 'Basel Framework', nameAr: 'إطار بازل', href: 'https://www.bis.org/basel_framework/', external: true },
  { name: 'FATF Guidelines', nameAr: 'إرشادات فاتف', href: 'https://www.fatf-gafi.org', external: true },
  { name: 'World Bank Yemen', nameAr: 'البنك الدولي - اليمن', href: 'https://www.worldbank.org/en/country/yemen', external: true },
  { name: 'IMF Reports', nameAr: 'تقارير صندوق النقد', href: 'https://www.imf.org/en/Countries/YEM', external: true },
];

const legal = [
  { name: 'Privacy Policy', nameAr: 'سياسة الخصوصية', href: '/privacy-policy' },
  { name: 'Terms of Service', nameAr: 'شروط الخدمة', href: '/terms-of-service' },
  { name: 'Cookie Notice', nameAr: 'إشعار ملفات تعريف الارتباط', href: '/cookie-notice' },
];

export default function Footer() {
  const { language, isRTL } = useLanguage();

  return (
    <footer className="bg-[#133129]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Footer */}
      <div className="container py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <Logo variant="full" size="md" light className="sm:hidden" />
            <Logo variant="full" size="lg" light className="hidden sm:flex" />
            <p className="mt-3 sm:mt-4 text-[#faf9f6]/70 text-xs sm:text-sm leading-relaxed max-w-sm">
              {language === 'ar' 
                ? 'بناء أنظمة مالية مؤسسة على الشريعة وآمنة حوكمياً للبنوك والمؤسسات وشركاء التنمية في اليمن والمنطقة.'
                : 'Building Sharia-grounded, governance-safe financial systems for banks, institutions, and development partners across Yemen and the region.'
              }
            </p>
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <div className={`flex items-start gap-2 sm:gap-3 text-[#faf9f6]/70 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-[#d4a84b] flex-shrink-0" />
                <div>
                  <p>{language === 'ar' ? 'خورمكسر، طريق الكورنيش' : 'Khormaksar, Corniche Road'}</p>
                  <p>{language === 'ar' ? 'عدن، اليمن' : 'Aden, Yemen'}</p>
                </div>
              </div>
              <div className={`flex items-start gap-2 sm:gap-3 text-[#faf9f6]/70 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-[#d4a84b] flex-shrink-0" />
                <div dir="ltr">
                  <p>+967 2 236655</p>
                  <p>+967 2 232096</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 sm:gap-3 text-[#faf9f6]/70 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4a84b] flex-shrink-0" />
                <div className="flex flex-col" dir="ltr">
                  <a href="mailto:info@causewaygrp.com" className="hover:text-[#d4a84b] transition-colors">
                    info@causewaygrp.com
                  </a>
                  <a href="mailto:yeto@causewaygrp.com" className="hover:text-[#d4a84b] transition-colors text-[#faf9f6]/50">
                    yeto@causewaygrp.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div className="col-span-1">
            <h4 className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              {language === 'ar' ? 'خبراتنا' : 'Expertise'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {expertise.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-xs sm:text-sm"
                  >
                    {language === 'ar' ? item.nameAr : item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="col-span-1">
            <h4 className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              {language === 'ar' ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-xs sm:text-sm"
                  >
                    {language === 'ar' ? item.nameAr : item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4 mt-5 sm:mt-8">
              {language === 'ar' ? 'الموارد' : 'Resources'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-xs sm:text-sm"
                  >
                    {language === 'ar' ? item.nameAr : item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Resources */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              {language === 'ar' ? 'موارد رئيسية' : 'Key Resources'}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {externalResources.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-xs sm:text-sm flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {language === 'ar' ? item.nameAr : item.name}
                    <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#224B40]/30">
        <div className="container py-4 sm:py-6">
          <div className={`flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <p className="text-[#faf9f6]/50 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} {language === 'ar' ? 'كوزواي للاستشارات. جميع الحقوق محفوظة.' : 'CauseWay Consultancies. All Rights Reserved.'}
            </p>
            <div className={`flex items-center gap-4 sm:gap-6 flex-wrap justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              {legal.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="text-[#faf9f6]/50 hover:text-[#d4a84b] transition-colors text-xs sm:text-sm"
                >
                  {language === 'ar' ? item.nameAr : item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
