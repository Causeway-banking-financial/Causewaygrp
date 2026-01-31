/**
 * YETO Coming Soon Banner Component
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Yemen Economic Transparency Observatory
 * المرصد اليمني للشفافية الاقتصادية
 */

import { useState } from 'react';
import { X, Bell, ArrowRight, BarChart3, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface YetoBannerProps {
  variant?: 'top' | 'inline' | 'modal';
  onClose?: () => void;
}

export default function YetoBanner({ variant = 'top', onClose }: YetoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const { language, isRTL } = useLanguage();

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(language === 'ar' 
        ? 'شكراً لك! سنخبرك عند إطلاق يتو.'
        : 'Thank you! We\'ll notify you when YETO launches.'
      );
      setEmail('');
    }
  };

  if (!isVisible) return null;

  if (variant === 'top') {
    return (
      <div className="bg-gradient-to-r from-[#d4a84b] via-[#c9a227] to-[#d4a84b] relative overflow-hidden sticky top-0 z-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container py-2.5 sm:py-3 relative">
          <div className={`flex items-center justify-between gap-2 sm:gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 sm:gap-3 min-w-0 flex-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-[#133129]/20 rounded-full flex-shrink-0">
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#133129]" />
              </div>
              <div className={`flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-semibold text-[#133129] text-xs sm:text-sm whitespace-nowrap">
                  {language === 'ar' ? 'يتو قريباً' : 'YETO Coming Soon'}
                </span>
                <span className="text-[#133129]/80 text-xs sm:text-sm hidden md:inline truncate">
                  — {language === 'ar' ? 'المرصد اليمني للشفافية الاقتصادية' : 'Yemen Economic Transparency Observatory'}
                </span>
                <span className="text-[#133129]/70 text-xs hidden lg:inline" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
                  {language === 'ar' ? 'Yemen Economic Transparency Observatory' : 'المرصد اليمني للشفافية الاقتصادية'}
                </span>
              </div>
            </div>
            <div className={`flex items-center gap-2 sm:gap-3 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link href="/observatory">
                <Button 
                  size="sm" 
                  className="bg-[#133129] text-[#faf9f6] hover:bg-[#224B40] text-xs px-2.5 sm:px-3 py-1.5"
                >
                  <span className="hidden xs:inline">{language === 'ar' ? 'اعرف المزيد' : 'Learn More'}</span>
                  <span className="xs:hidden">{language === 'ar' ? 'المزيد' : 'More'}</span>
                  <ArrowRight className={`w-3 h-3 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}`} />
                </Button>
              </Link>
              <button 
                onClick={handleClose}
                className="text-[#133129]/60 hover:text-[#133129] transition-colors p-1"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-[#224B40] rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden border border-[#406D61]/20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e6b5a]/10 to-transparent" />
        
        {/* Decorative corner elements */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-8 h-8 border-${isRTL ? 'r' : 'l'} border-t border-[#d4a84b]/30`} />
        <div className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} w-8 h-8 border-${isRTL ? 'l' : 'r'} border-b border-[#d4a84b]/30`} />
        
        <div className="relative z-10">
          <div className={`flex items-center gap-2 mb-3 sm:mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#d4a84b]/20 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4a84b]" />
            </div>
            <span className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {language === 'ar' ? 'قريباً' : 'Coming Soon'}
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#faf9f6] mb-1 sm:mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'منصة يتو' : 'YETO Platform'}
          </h3>
          <p className="text-[#faf9f6]/80 text-base sm:text-lg mb-3 sm:mb-4" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
            {language === 'ar' ? 'Yemen Economic Transparency Observatory' : 'المرصد اليمني للشفافية الاقتصادية'}
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1e6b5a]/20 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#5a8a6a]" />
              </div>
              <span className="text-[#faf9f6]/70 text-xs">{language === 'ar' ? 'بيانات اقتصادية' : 'Economic Data'}</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1e6b5a]/20 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#5a8a6a]" />
              </div>
              <span className="text-[#faf9f6]/70 text-xs">{language === 'ar' ? 'تحليلات' : 'Analysis'}</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1e6b5a]/20 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#5a8a6a]" />
              </div>
              <span className="text-[#faf9f6]/70 text-xs">{language === 'ar' ? 'تقارير' : 'Reports'}</span>
            </div>
          </div>

          <form onSubmit={handleNotify} className={`flex flex-col sm:flex-row gap-2 sm:gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني للتحديثات' : 'Enter your email for updates'}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#133129] border border-[#406D61]/30 rounded text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:outline-none focus:border-[#d4a84b] text-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold whitespace-nowrap text-sm py-2 sm:py-2.5">
              {language === 'ar' ? 'أخبرني' : 'Notify Me'}
            </Button>
          </form>
          
          <p className="text-[#faf9f6]/50 text-xs mt-3 sm:mt-4">
            {language === 'ar' ? 'الإطلاق المتوقع: الربع الثاني 2026' : 'Expected launch: Q2 2026'}
          </p>
        </div>
      </div>
    );
  }

  // Modal variant
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#133129] rounded-lg p-6 sm:p-8 max-w-lg w-full relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleClose}
          className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} sm:top-4 sm:${isRTL ? 'left-4' : 'right-4'} text-[#faf9f6]/60 hover:text-[#faf9f6] transition-colors z-10 p-1`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Decorative corner elements */}
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} w-12 h-12 border-${isRTL ? 'r' : 'l'} border-t border-[#d4a84b]/30`} />
        <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} w-12 h-12 border-${isRTL ? 'l' : 'r'} border-b border-[#d4a84b]/30`} />
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e6b5a]/20 to-transparent" />
        
        <div className="relative z-10 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#d4a84b]/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-[#d4a84b]" />
          </div>
          
          <span className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {language === 'ar' ? 'قريباً' : 'Coming Soon'}
          </span>
          
          <h3 className="text-2xl sm:text-3xl font-serif text-[#faf9f6] mt-2 mb-1 sm:mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'منصة يتو' : 'YETO Platform'}
          </h3>
          <p className="text-[#faf9f6]/80 text-lg sm:text-xl mb-3 sm:mb-4" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
            {language === 'ar' ? 'Yemen Economic Transparency Observatory' : 'المرصد اليمني للشفافية الاقتصادية'}
          </p>
          <p className="text-[#faf9f6]/70 text-xs sm:text-sm mb-6 sm:mb-8">
            {language === 'ar' 
              ? 'بوابتك إلى البيانات الاقتصادية الشاملة والتحليلات وتقارير الشفافية لليمن.'
              : 'Your gateway to comprehensive economic data, analysis, and transparency reporting for Yemen.'
            }
          </p>

          <form onSubmit={handleNotify} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني لتحديثات الإطلاق' : 'Enter your email for launch updates'}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#224B40] border border-[#406D61]/30 rounded text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:outline-none focus:border-[#d4a84b] text-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold w-full text-sm sm:text-base">
              {language === 'ar' ? 'أخبرني عند إطلاق يتو' : 'Notify Me When YETO Launches'}
            </Button>
          </form>
          
          <p className="text-[#faf9f6]/50 text-xs mt-4">
            {language === 'ar' ? 'الإطلاق المتوقع: الربع الثاني 2026' : 'Expected launch: Q2 2026'}
          </p>
        </div>
      </div>
    </div>
  );
}
