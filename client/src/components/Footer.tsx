/**
 * CauseWay Footer Component
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Improved mobile design with better spacing and readability
 */

import { Link } from 'wouter';
import Logo from './Logo';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import Newsletter from './Newsletter';
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
  { name: 'Our Approach', nameAr: 'نهجنا', href: '/how-we-work' },
  { name: 'Contact', nameAr: 'اتصل بنا', href: '/contact' },
];

const resources = [
  { name: 'Observatory (YETO)', nameAr: 'المرصد (يتو)', href: '/observatory' },
  { name: 'Articles', nameAr: 'مقالات', href: '/insights' },
  { name: 'FAQ', nameAr: 'الأسئلة الشائعة', href: '/faq' },
];

const externalResources = [
  { name: 'Central Bank of Yemen', nameAr: 'البنك المركزي اليمني', href: 'https://www.centralbank.gov.ye' },
  { name: 'AAOIFI Standards', nameAr: 'معايير أيوفي', href: 'https://aaoifi.com' },
  { name: 'Basel Framework', nameAr: 'إطار بازل', href: 'https://www.bis.org/basel_framework/' },
  { name: 'FATF Guidelines', nameAr: 'إرشادات فاتف', href: 'https://www.fatf-gafi.org' },
];

const legal = [
  { name: 'Privacy Policy', nameAr: 'سياسة الخصوصية', href: '/privacy' },
  { name: 'Terms of Service', nameAr: 'شروط الخدمة', href: '/terms' },
];

export default function Footer() {
  const { language, isRTL } = useLanguage();

  return (
    <footer className="bg-[#133129]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        {/* Mobile: Stacked layout, Desktop: Grid */}
        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-8 lg:gap-12">
          
          {/* Company Info - Full width on mobile */}
          <div className="md:col-span-2">
            <Logo variant="full" size="lg" light />
            <p className="mt-4 text-[#faf9f6]/70 text-sm leading-relaxed max-w-md">
              {language === 'ar' 
                ? 'بناء أنظمة مالية مؤسسة على الشريعة وآمنة حوكمياً للبنوك والمؤسسات وشركاء التنمية في اليمن والمنطقة.'
                : 'Building Sharia-grounded, governance-safe financial systems for banks, institutions, and development partners across Yemen and the region.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className={`flex items-start gap-3 text-[#faf9f6]/70 text-sm ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <MapPin className="w-4 h-4 mt-0.5 text-[#d4a84b] flex-shrink-0" />
                <span>
                  {language === 'ar' ? 'خورمكسر، طريق الكورنيش، عدن، اليمن' : 'Khormaksar, Corniche Road, Aden, Yemen'}
                </span>
              </div>
              <div className={`flex items-center gap-3 text-[#faf9f6]/70 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-4 h-4 text-[#d4a84b] flex-shrink-0" />
                <span dir="ltr">+967 2 236655</span>
              </div>
              <div className={`flex items-center gap-3 text-[#faf9f6]/70 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-4 h-4 text-[#d4a84b] flex-shrink-0" />
                <a href="mailto:info@causewaygrp.com" className="hover:text-[#d4a84b] transition-colors" dir="ltr">
                  info@causewaygrp.com
                </a>
              </div>
            </div>
          </div>

          {/* Links Section - 2 columns on mobile, 3 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0">
            {/* Expertise */}
            <div>
              <h4 className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'ar' ? 'خبراتنا' : 'Expertise'}
              </h4>
              <ul className="space-y-2.5">
                {expertise.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className="text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm"
                    >
                      {language === 'ar' ? item.nameAr : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company & Resources */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0">
            <div>
              <h4 className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider mb-4">
                {language === 'ar' ? 'الشركة' : 'Company'}
              </h4>
              <ul className="space-y-2.5">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm"
                    >
                      {language === 'ar' ? item.nameAr : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h4 className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider mb-4 mt-8">
                {language === 'ar' ? 'الموارد' : 'Resources'}
              </h4>
              <ul className="space-y-2.5">
                {resources.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm"
                    >
                      {language === 'ar' ? item.nameAr : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* External Resources */}
          <div>
            <h4 className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider mb-4">
              {language === 'ar' ? 'موارد رئيسية' : 'Key Resources'}
            </h4>
            <ul className="space-y-2.5">
              {externalResources.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm inline-flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {language === 'ar' ? item.nameAr : item.name}
                    <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Newsletter */}
            <div className="mt-8">
              <Newsletter variant="footer" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#224B40]/30">
        <div className="container py-6">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-[#faf9f6]/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {language === 'ar' ? 'كوزواي للاستشارات. جميع الحقوق محفوظة.' : 'CauseWay Consultancies. All Rights Reserved.'}
            </p>
            <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {legal.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="text-[#faf9f6]/50 hover:text-[#d4a84b] transition-colors text-sm"
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
