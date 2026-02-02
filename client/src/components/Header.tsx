/**
 * CauseWay Header Component
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Navigation: About, Services, Observatory, Insights, Contact
 * Features: Language toggle, Client Portal CTA
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Lock, Globe, ChevronRight } from 'lucide-react';
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
  { name: 'FAQ', nameAr: 'الأسئلة الشائعة', href: '/faq' },
  { name: 'Careers', nameAr: 'الوظائف', href: '/careers' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [location] = useLocation();
  const { language, toggleLanguage, t, isRTL } = useLanguage();

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
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            
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

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#faf9f6] p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu - Full screen overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed left-0 right-0 bottom-0 bg-[#133129] z-[9999] overflow-y-auto" style={{ top: '60px' }}>
            <div className="container py-6">
              <div className="flex flex-col gap-2">
                <Link 
                  href="/about"
                  className={`text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium py-3 border-b border-[#224B40]/20 ${
                    isActive('/about') ? 'text-[#d4a84b]' : ''
                  }`}
                >
                  {t('nav.about')}
                </Link>
                
                {/* Services Accordion */}
                <div className="border-b border-[#224B40]/20">
                  <button 
                    onClick={() => toggleMobileSection('services')}
                    className={`w-full flex items-center justify-between py-3 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium ${
                      isActive('/services') ? 'text-[#d4a84b]' : ''
                    }`}
                  >
                    <span>{t('nav.services')}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'services' ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSection === 'services' && (
                    <div className={`pb-3 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                      {services.map((service) => (
                        <Link 
                          key={service.href}
                          href={service.href}
                          className="block text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm py-2"
                        >
                          {language === 'ar' ? service.nameAr : service.name}
                        </Link>
                      ))}
                      <Link 
                        href="/services"
                        className="block text-[#d4a84b] font-medium text-sm py-2 mt-2 border-t border-[#224B40]/20 pt-3"
                      >
                        {language === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
                      </Link>
                    </div>
                  )}
                </div>

                <Link 
                  href="/observatory"
                  className={`text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium py-3 border-b border-[#224B40]/20 ${
                    isActive('/observatory') ? 'text-[#d4a84b]' : ''
                  }`}
                >
                  {t('nav.observatory')}
                </Link>

                {/* Insights Accordion */}
                <div className="border-b border-[#224B40]/20">
                  <button 
                    onClick={() => toggleMobileSection('insights')}
                    className={`w-full flex items-center justify-between py-3 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium ${
                      isActive('/insights') ? 'text-[#d4a84b]' : ''
                    }`}
                  >
                    <span>{t('nav.insights')}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'insights' ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSection === 'insights' && (
                    <div className={`pb-3 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                      {insights.map((item) => (
                        <Link 
                          key={item.name}
                          href={item.href}
                          className="block text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm py-2"
                        >
                          {language === 'ar' ? item.nameAr : item.name}
                        </Link>
                      ))}
                      <Link 
                        href="/insights"
                        className="block text-[#d4a84b] font-medium text-sm py-2 mt-2 border-t border-[#224B40]/20 pt-3"
                      >
                        {language === 'ar' ? 'جميع الرؤى' : 'All Insights'}
                      </Link>
                    </div>
                  )}
                </div>

                {/* Resources Accordion */}
                <div className="border-b border-[#224B40]/20">
                  <button 
                    onClick={() => toggleMobileSection('resources')}
                    className={`w-full flex items-center justify-between py-3 text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium ${
                      isActive('/how-we-work') || isActive('/resources') || isActive('/faq') ? 'text-[#d4a84b]' : ''
                    }`}
                  >
                    <span>{language === 'ar' ? 'الموارد' : 'Resources'}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'resources' ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedSection === 'resources' && (
                    <div className={`pb-3 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                      {resources.map((item) => (
                        <Link 
                          key={item.href}
                          href={item.href}
                          className="block text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm py-2"
                        >
                          {language === 'ar' ? item.nameAr : item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link 
                  href="/contact"
                  className={`text-[#faf9f6]/90 hover:text-[#d4a84b] transition-colors font-medium py-3 border-b border-[#224B40]/20 ${
                    isActive('/contact') ? 'text-[#d4a84b]' : ''
                  }`}
                >
                  {t('nav.contact')}
                </Link>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-4 pt-6 mt-4 border-t border-[#224B40]/30">
                  <button 
                    onClick={toggleLanguage}
                    className={`flex items-center gap-2 text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <Globe className="w-5 h-5" />
                    <span>{language === 'ar' ? 'English' : 'العربية - Arabic'}</span>
                  </button>
                  
                  <Button 
                    onClick={handleClientPortal}
                    className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold w-full justify-center"
                  >
                    <Lock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('nav.clientPortal')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
