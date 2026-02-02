/**
 * CauseWay Header Component
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Navigation: About, Services, Observatory, Insights, Contact
 * Features: Language toggle, Client Portal CTA, Improved mobile navigation
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Lock, ChevronRight, Globe, Home, Building2, BarChart3, BookOpen, Folder, Phone, Languages } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const services = [
  { name: 'Islamic Finance Engineering', nameAr: 'هندسة التمويل الإسلامي', href: '/services/islamic-finance' },
  { name: 'Risk & Compliance', nameAr: 'المخاطر والامتثال', href: '/services/risk-compliance' },
  { name: 'Core Banking Systems', nameAr: 'أنظمة البنوك الأساسية', href: '/services/core-banking' },
  { name: 'Microfinance Development', nameAr: 'تطوير التمويل الأصغر', href: '/services/microfinance' },
  { name: 'Capacity Building', nameAr: 'بناء القدرات', href: '/services/capacity-building' },
  { name: 'Branding & Identity', nameAr: 'العلامة التجارية والهوية', href: '/services/branding' },
];

const insights = [
  { name: 'Articles', nameAr: 'مقالات', href: '/insights' },
  { name: 'Publications', nameAr: 'منشورات', href: '/insights' },
  { name: 'News', nameAr: 'أخبار', href: '/insights' },
];

const resources = [
  { name: 'How We Work', nameAr: 'كيف نعمل', href: '/how-we-work' },
  { name: 'Resource Hub', nameAr: 'مركز الموارد', href: '/resources' },
  { name: 'CauseWay Academy', nameAr: 'أكاديمية كوزواي', href: '/academy' },
  { name: 'Financial Glossary', nameAr: 'القاموس المالي', href: '/glossary' },
  { name: 'Regulatory Calendar', nameAr: 'التقويم التنظيمي', href: '/regulatory-calendar' },
  { name: 'FAQ', nameAr: 'الأسئلة الشائعة', href: '/faq' },
  { name: 'Careers', nameAr: 'الوظائف', href: '/careers' },
];

// Mobile navigation items with icons
const mobileNavItems = [
  { name: 'Home', nameAr: 'الرئيسية', href: '/', icon: Home },
  { name: 'About', nameAr: 'من نحن', href: '/about', icon: Building2 },
  { name: 'Observatory', nameAr: 'المرصد', href: '/observatory', icon: BarChart3 },
  { name: 'Contact', nameAr: 'اتصل بنا', href: '/contact', icon: Phone },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [location] = useLocation();
  const { language, setLanguage, toggleLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedSection(null);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => location === path || location.startsWith(path + '/');

  const handleClientPortal = () => {
    toast.info(language === 'ar' ? 'بوابة العملاء قريباً' : 'Client Portal access coming soon');
  };

  const toggleMobileSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Quick language toggle for mobile header
  const handleQuickLanguageToggle = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    toast.success(
      newLang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English',
      { duration: 2000 }
    );
  };

  return (
    <header 
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#133129]/98 backdrop-blur-md shadow-lg py-2 sm:py-3 top-0' 
          : 'bg-[#133129]/90 backdrop-blur-sm py-3 sm:py-5 top-0'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Logo variant="full" size="sm" light className="cursor-pointer sm:hidden" showArabic={false} />
            <Logo variant="full" size="md" light className="cursor-pointer hidden sm:flex" />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center gap-6 xl:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link 
              href="/about"
              className={`text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium text-sm xl:text-base ${
                isActive('/about') ? 'text-[#d4a84b]' : ''
              }`}
            >
              {t('nav.about')}
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium text-sm xl:text-base ${
                isActive('/services') ? 'text-[#d4a84b]' : ''
              }`}>
                {t('nav.services')} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#133129] border-[#224B40]/30 min-w-[220px]">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link 
                      href={service.href}
                      className="text-[#faf9f6]/90 hover:text-[#d4a84b] hover:bg-[#224B40]/50 cursor-pointer text-sm py-2"
                    >
                      {language === 'ar' ? service.nameAr : service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link 
                    href="/services"
                    className="text-[#d4a84b] hover:bg-[#224B40]/50 cursor-pointer border-t border-[#224B40]/20 mt-1 pt-2 text-sm"
                  >
                    {language === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/observatory"
              className={`text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium text-sm xl:text-base ${
                isActive('/observatory') ? 'text-[#d4a84b]' : ''
              }`}
            >
              {t('nav.observatory')}
            </Link>

            {/* Insights Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium text-sm xl:text-base ${
                isActive('/insights') ? 'text-[#d4a84b]' : ''
              }`}>
                {t('nav.insights')} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#133129] border-[#224B40]/30">
                {insights.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      href={item.href}
                      className="text-[#faf9f6]/90 hover:text-[#d4a84b] hover:bg-[#224B40]/50 cursor-pointer text-sm py-2"
                    >
                      {language === 'ar' ? item.nameAr : item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link 
                    href="/insights"
                    className="text-[#d4a84b] hover:bg-[#224B40]/50 cursor-pointer border-t border-[#224B40]/20 mt-1 pt-2 text-sm"
                  >
                    {language === 'ar' ? 'جميع الرؤى' : 'All Insights'}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium text-sm xl:text-base ${
                isActive('/how-we-work') || isActive('/resources') || isActive('/faq') ? 'text-[#d4a84b]' : ''
              }`}>
                {language === 'ar' ? 'الموارد' : 'Resources'} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#133129] border-[#224B40]/30">
                {resources.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link 
                      href={item.href}
                      className="text-[#faf9f6]/90 hover:text-[#d4a84b] hover:bg-[#224B40]/50 cursor-pointer text-sm py-2"
                    >
                      {language === 'ar' ? item.nameAr : item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/contact"
              className={`text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium text-sm xl:text-base ${
                isActive('/contact') ? 'text-[#d4a84b]' : ''
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className={`hidden lg:flex items-center gap-3 xl:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageSwitcher variant="toggle" />
            
            <Button 
              onClick={handleClientPortal}
              variant="outline" 
              size="sm"
              className="border-[#d4a84b]/50 text-[#d4a84b] hover:bg-[#d4a84b]/10 hover:border-[#d4a84b] text-sm"
            >
              <Lock className={`w-3 h-3 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
              {t('nav.clientPortal')}
            </Button>
          </div>

          {/* Mobile Header Right Side - Language Toggle + Menu Button */}
          <div className={`lg:hidden flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Visible Language Toggle Button in Mobile Header */}
            <button
              onClick={handleQuickLanguageToggle}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#224B40]/50 border border-[#406D61]/30 text-[#faf9f6]/90 hover:text-[#d4a84b] hover:border-[#d4a84b]/50 transition-all"
              aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="text-[#faf9f6] p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu - Full screen overlay with improved navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed left-0 right-0 bottom-0 bg-[#133129] z-[9999] overflow-y-auto" style={{ top: '60px' }}>
            <div className="container py-4">
              {/* Quick Navigation Icons */}
              <div className="grid grid-cols-4 gap-2 mb-6 pb-4 border-b border-[#224B40]/30">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                        isActive(item.href) && item.href !== '/'
                          ? 'bg-[#d4a84b]/20 text-[#d4a84b]'
                          : location === item.href && item.href === '/'
                          ? 'bg-[#d4a84b]/20 text-[#d4a84b]'
                          : 'bg-[#224B40]/30 text-[#faf9f6]/80 hover:bg-[#224B40]/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">
                        {language === 'ar' ? item.nameAr : item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Main Navigation */}
              <div className="flex flex-col gap-1">
                {/* Services Accordion */}
                <div className="border-b border-[#224B40]/20">
                  <button 
                    onClick={() => toggleMobileSection('services')}
                    className={`w-full flex items-center justify-between py-3.5 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium ${
                      isActive('/services') ? 'text-[#d4a84b]' : ''
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#224B40]/50 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-[#d4a84b]" />
                      </div>
                      <span>{t('nav.services')}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'services' ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSection === 'services' && (
                    <div className={`pb-3 space-y-1 ${isRTL ? 'pr-11' : 'pl-11'}`}>
                      {services.map((service) => (
                        <Link 
                          key={service.href}
                          href={service.href}
                          className={`block text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm py-2.5 px-3 rounded-lg hover:bg-[#224B40]/30 ${
                            isActive(service.href) ? 'text-[#d4a84b] bg-[#224B40]/30' : ''
                          }`}
                        >
                          {language === 'ar' ? service.nameAr : service.name}
                        </Link>
                      ))}
                      <Link 
                        href="/services"
                        className="block text-[#d4a84b] font-medium text-sm py-2.5 px-3 mt-2 border-t border-[#224B40]/20 pt-3"
                      >
                        {language === 'ar' ? 'عرض جميع الخدمات →' : 'View All Services →'}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Insights Accordion */}
                <div className="border-b border-[#224B40]/20">
                  <button 
                    onClick={() => toggleMobileSection('insights')}
                    className={`w-full flex items-center justify-between py-3.5 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium ${
                      isActive('/insights') ? 'text-[#d4a84b]' : ''
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#224B40]/50 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-[#d4a84b]" />
                      </div>
                      <span>{t('nav.insights')}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'insights' ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSection === 'insights' && (
                    <div className={`pb-3 space-y-1 ${isRTL ? 'pr-11' : 'pl-11'}`}>
                      {insights.map((item) => (
                        <Link 
                          key={item.name}
                          href={item.href}
                          className="block text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm py-2.5 px-3 rounded-lg hover:bg-[#224B40]/30"
                        >
                          {language === 'ar' ? item.nameAr : item.name}
                        </Link>
                      ))}
                      <Link 
                        href="/insights"
                        className="block text-[#d4a84b] font-medium text-sm py-2.5 px-3 mt-2 border-t border-[#224B40]/20 pt-3"
                      >
                        {language === 'ar' ? 'جميع الرؤى →' : 'All Insights →'}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Resources Accordion */}
                <div className="border-b border-[#224B40]/20">
                  <button 
                    onClick={() => toggleMobileSection('resources')}
                    className={`w-full flex items-center justify-between py-3.5 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium ${
                      isActive('/how-we-work') || isActive('/resources') || isActive('/faq') ? 'text-[#d4a84b]' : ''
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 rounded-lg bg-[#224B40]/50 flex items-center justify-center">
                        <Folder className="w-4 h-4 text-[#d4a84b]" />
                      </div>
                      <span>{language === 'ar' ? 'الموارد' : 'Resources'}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'resources' ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSection === 'resources' && (
                    <div className={`pb-3 space-y-1 ${isRTL ? 'pr-11' : 'pl-11'}`}>
                      {resources.map((item) => (
                        <Link 
                          key={item.href}
                          href={item.href}
                          className={`block text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm py-2.5 px-3 rounded-lg hover:bg-[#224B40]/30 ${
                            isActive(item.href) ? 'text-[#d4a84b] bg-[#224B40]/30' : ''
                          }`}
                        >
                          {language === 'ar' ? item.nameAr : item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Actions Section */}
              <div className="mt-6 pt-4 border-t border-[#224B40]/30 space-y-4">
                {/* Language Switcher - Prominent in Mobile Menu */}
                <div className="bg-[#224B40]/30 rounded-xl p-4">
                  <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Languages className="w-5 h-5 text-[#d4a84b]" />
                    <span className="text-[#faf9f6]/80 text-sm font-medium">
                      {language === 'ar' ? 'اختر اللغة' : 'Select Language'}
                    </span>
                  </div>
                  <div className="flex items-center bg-[#133129]/50 rounded-xl p-1 border border-[#406D61]/30">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        toast.success('Switched to English', { duration: 2000 });
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        language === 'en'
                          ? 'bg-[#d4a84b] text-[#133129] shadow-lg'
                          : 'text-[#faf9f6]/70 hover:text-[#faf9f6] hover:bg-[#224B40]/50'
                      }`}
                    >
                      <span className="text-base">🇬🇧</span>
                      <span>English</span>
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ar');
                        toast.success('تم التبديل إلى العربية', { duration: 2000 });
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        language === 'ar'
                          ? 'bg-[#d4a84b] text-[#133129] shadow-lg'
                          : 'text-[#faf9f6]/70 hover:text-[#faf9f6] hover:bg-[#224B40]/50'
                      }`}
                    >
                      <span className="text-base">🇸🇦</span>
                      <span>العربية</span>
                    </button>
                  </div>
                </div>
                
                {/* Client Portal Button */}
                <Button 
                  onClick={handleClientPortal}
                  className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold w-full justify-center py-3"
                >
                  <Lock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('nav.clientPortal')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
