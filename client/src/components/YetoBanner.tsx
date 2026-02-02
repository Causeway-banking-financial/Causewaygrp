/**
 * YETO Coming Soon Banner Component
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Yemen Economic Transparency Observatory
 * المرصد اليمني للشفافية الاقتصادية
 * 
 * REDESIGNED: Better mobile view, unique styling, improved UX
 */

import { useState, useEffect } from 'react';
import { X, Bell, ArrowRight, BarChart3, TrendingUp, FileText, Sparkles } from 'lucide-react';
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
  const [isAnimating, setIsAnimating] = useState(true);
  const { language, isRTL } = useLanguage();

  // Pulse animation for the banner
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      <div 
        className="bg-gradient-to-r from-[#133129] via-[#1a3d32] to-[#133129] border-b border-[#d4a84b]/20 relative overflow-hidden sticky top-0 z-50"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Animated gradient overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a84b]/5 to-transparent transition-opacity duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'translateX(-100%)', animation: 'shimmer 3s infinite' }}
        />
        
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
        
        <div className="container py-2.5 sm:py-2 relative">
          <div className={`flex items-center justify-between gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Left side - YETO branding */}
            <div className={`flex items-center gap-2 sm:gap-3 flex-1 min-w-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* YETO Logo/Badge */}
              <div className="relative flex-shrink-0">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#d4a84b]/20 rounded-md flex items-center justify-center border border-[#d4a84b]/30">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4a84b]" />
                </div>
                {/* Pulse dot */}
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#d4a84b] rounded-full animate-pulse" />
              </div>
              
              {/* Text content - responsive */}
              <div className={`flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0 ${isRTL ? 'items-end sm:flex-row-reverse' : 'items-start'}`}>
                <span className="text-[#d4a84b] text-xs sm:text-sm font-bold tracking-wide">
                  {language === 'ar' ? 'يتو' : 'YETO'}
                </span>
                <span className="text-[#faf9f6]/70 text-[10px] sm:text-xs truncate max-w-[180px] sm:max-w-none">
                  {language === 'ar' 
                    ? 'المرصد اليمني للشفافية الاقتصادية' 
                    : 'Yemen Economic Transparency Observatory'
                  }
                </span>
              </div>
            </div>
            
            {/* Right side - CTA and close */}
            <div className={`flex items-center gap-2 sm:gap-3 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Coming Soon badge - hidden on very small screens */}
              <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 bg-[#d4a84b]/10 border border-[#d4a84b]/20 rounded-full text-[#d4a84b] text-[10px] sm:text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-[#d4a84b] rounded-full animate-pulse" />
                {language === 'ar' ? 'قريباً' : 'Soon'}
              </span>
              
              {/* Learn more link */}
              <Link 
                href="/observatory" 
                className={`flex items-center gap-1 text-[#d4a84b] hover:text-[#faf9f6] text-xs sm:text-sm font-medium transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span className="hidden sm:inline">{language === 'ar' ? 'اعرف المزيد' : 'Learn more'}</span>
                <span className="sm:hidden">{language === 'ar' ? 'المزيد' : 'More'}</span>
                <ArrowRight className={`w-3 h-3 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
              </Link>
              
              {/* Close button */}
              <button 
                onClick={handleClose}
                className="text-[#faf9f6]/40 hover:text-[#faf9f6]/80 transition-colors p-1 -mr-1 rounded hover:bg-[#faf9f6]/5"
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
      <div className="bg-[#224B40] rounded-xl p-5 sm:p-6 md:p-8 relative overflow-hidden border border-[#406D61]/20 shadow-xl" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #d4a84b 1px, transparent 1px),
                             radial-gradient(circle at 80% 50%, #d4a84b 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e6b5a]/10 to-transparent" />
        
        {/* Decorative corner elements */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-8 h-8 border-${isRTL ? 'r' : 'l'}-2 border-t-2 border-[#d4a84b]/30 rounded-tl`} />
        <div className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} w-8 h-8 border-${isRTL ? 'l' : 'r'}-2 border-b-2 border-[#d4a84b]/30 rounded-br`} />
        
        <div className="relative z-10">
          <div className={`flex items-center gap-2 mb-3 sm:mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#d4a84b]/30 to-[#d4a84b]/10 rounded-xl flex items-center justify-center border border-[#d4a84b]/30 shadow-lg">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4a84b]" />
            </div>
            <div>
              <span className="text-[#d4a84b] font-bold text-sm sm:text-base uppercase tracking-wider block">
                {language === 'ar' ? 'قريباً' : 'Coming Soon'}
              </span>
              <span className="text-[#faf9f6]/50 text-xs">Q2 2026</span>
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#faf9f6] mb-1 sm:mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'منصة يتو' : 'YETO Platform'}
          </h3>
          <p className="text-[#faf9f6]/80 text-lg sm:text-xl mb-4 sm:mb-6" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
            {language === 'ar' ? 'Yemen Economic Transparency Observatory' : 'المرصد اليمني للشفافية الاقتصادية'}
          </p>
          
          {/* Feature highlights - improved mobile grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="text-center p-2 sm:p-3 bg-[#133129]/50 rounded-lg border border-[#406D61]/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5a8a6a]/30 to-[#5a8a6a]/10 rounded-lg flex items-center justify-center mx-auto mb-2 border border-[#5a8a6a]/20">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#5a8a6a]" />
              </div>
              <span className="text-[#faf9f6]/80 text-xs sm:text-sm font-medium block">{language === 'ar' ? 'بيانات' : 'Data'}</span>
              <span className="text-[#faf9f6]/50 text-[10px] sm:text-xs">{language === 'ar' ? 'اقتصادية' : 'Economic'}</span>
            </div>
            <div className="text-center p-2 sm:p-3 bg-[#133129]/50 rounded-lg border border-[#406D61]/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5a8a6a]/30 to-[#5a8a6a]/10 rounded-lg flex items-center justify-center mx-auto mb-2 border border-[#5a8a6a]/20">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#5a8a6a]" />
              </div>
              <span className="text-[#faf9f6]/80 text-xs sm:text-sm font-medium block">{language === 'ar' ? 'تحليلات' : 'Analysis'}</span>
              <span className="text-[#faf9f6]/50 text-[10px] sm:text-xs">{language === 'ar' ? 'معمقة' : 'Deep'}</span>
            </div>
            <div className="text-center p-2 sm:p-3 bg-[#133129]/50 rounded-lg border border-[#406D61]/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5a8a6a]/30 to-[#5a8a6a]/10 rounded-lg flex items-center justify-center mx-auto mb-2 border border-[#5a8a6a]/20">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#5a8a6a]" />
              </div>
              <span className="text-[#faf9f6]/80 text-xs sm:text-sm font-medium block">{language === 'ar' ? 'تقارير' : 'Reports'}</span>
              <span className="text-[#faf9f6]/50 text-[10px] sm:text-xs">{language === 'ar' ? 'شفافية' : 'Transparency'}</span>
            </div>
          </div>

          <form onSubmit={handleNotify} className={`flex flex-col sm:flex-row gap-2 sm:gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
              className="flex-1 px-4 py-3 bg-[#133129] border border-[#406D61]/30 rounded-lg text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:outline-none focus:border-[#d4a84b] focus:ring-1 focus:ring-[#d4a84b]/30 text-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-bold whitespace-nowrap text-sm py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              {language === 'ar' ? 'أخبرني عند الإطلاق' : 'Notify Me'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Modal variant
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-gradient-to-br from-[#133129] to-[#1a3d32] rounded-2xl p-6 sm:p-8 max-w-lg w-full relative overflow-hidden shadow-2xl border border-[#406D61]/20" dir={isRTL ? 'rtl' : 'ltr'}>
        <button 
          onClick={handleClose}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-[#faf9f6]/60 hover:text-[#faf9f6] transition-colors z-10 p-2 rounded-full hover:bg-[#faf9f6]/10`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Decorative elements */}
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} w-16 h-16 border-${isRTL ? 'r' : 'l'}-2 border-t-2 border-[#d4a84b]/20 rounded-tl-xl`} />
        <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} w-16 h-16 border-${isRTL ? 'l' : 'r'}-2 border-b-2 border-[#d4a84b]/20 rounded-br-xl`} />
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e6b5a]/10 to-transparent" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#d4a84b]/30 to-[#d4a84b]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 border border-[#d4a84b]/30 shadow-xl">
            <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-[#d4a84b]" />
          </div>
          
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#d4a84b]/10 border border-[#d4a84b]/20 rounded-full text-[#d4a84b] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 bg-[#d4a84b] rounded-full animate-pulse" />
            {language === 'ar' ? 'قريباً' : 'Coming Soon'}
          </span>
          
          <h3 className="text-3xl sm:text-4xl font-serif text-[#faf9f6] mt-2 mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'منصة يتو' : 'YETO Platform'}
          </h3>
          <p className="text-[#faf9f6]/80 text-lg sm:text-xl mb-4" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
            {language === 'ar' ? 'Yemen Economic Transparency Observatory' : 'المرصد اليمني للشفافية الاقتصادية'}
          </p>
          <p className="text-[#faf9f6]/60 text-sm sm:text-base mb-6 sm:mb-8 max-w-sm mx-auto">
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
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
              className="w-full px-4 py-3 sm:py-4 bg-[#224B40] border border-[#406D61]/30 rounded-xl text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:outline-none focus:border-[#d4a84b] focus:ring-2 focus:ring-[#d4a84b]/20 text-sm sm:text-base"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-bold w-full text-sm sm:text-base py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
              {language === 'ar' ? 'أخبرني عند إطلاق يتو' : 'Notify Me When YETO Launches'}
            </Button>
          </form>
          
          <p className="text-[#faf9f6]/40 text-xs mt-4">
            {language === 'ar' ? 'الإطلاق المتوقع: الربع الثاني 2026' : 'Expected launch: Q2 2026'}
          </p>
        </div>
      </div>
    </div>
  );
}
