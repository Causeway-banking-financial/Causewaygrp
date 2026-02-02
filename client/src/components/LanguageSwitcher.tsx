/**
 * Language Switcher Component
 * Premium design with smooth transitions and clear visual feedback
 * Supports Arabic/English with persistent preference
 */

import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal' | 'toggle' | 'dropdown';
  showLabel?: boolean;
  className?: string;
}

export default function LanguageSwitcher({ 
  variant = 'default', 
  showLabel = true,
  className = '' 
}: LanguageSwitcherProps) {
  const { language, setLanguage, isRTL } = useLanguage();

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    if (lang !== language) {
      setLanguage(lang);
      toast.success(
        lang === 'ar' ? 'تم التبديل إلى العربية' : 'Switched to English',
        { duration: 2000 }
      );
    }
  };

  // Toggle variant - pill-shaped toggle switch
  if (variant === 'toggle') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <div className="flex items-center bg-[#224B40]/50 rounded-full p-0.5 border border-[#406D61]/30">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              language === 'en'
                ? 'bg-[#d4a84b] text-[#133129] shadow-md'
                : 'text-[#faf9f6]/70 hover:text-[#faf9f6]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange('ar')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              language === 'ar'
                ? 'bg-[#d4a84b] text-[#133129] shadow-md'
                : 'text-[#faf9f6]/70 hover:text-[#faf9f6]'
            }`}
          >
            ع
          </button>
        </div>
      </div>
    );
  }

  // Minimal variant - just text
  if (variant === 'minimal') {
    return (
      <button
        onClick={() => handleLanguageChange(language === 'ar' ? 'en' : 'ar')}
        className={`text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors text-sm font-medium ${className}`}
      >
        {language === 'ar' ? 'English' : 'العربية'}
      </button>
    );
  }

  // Dropdown variant - expandable menu
  if (variant === 'dropdown') {
    return (
      <div className={`relative group ${className}`}>
        <button className={`flex items-center gap-2 text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Globe className="w-4 h-4" />
          <span className="text-sm">{language === 'ar' ? 'العربية' : 'English'}</span>
        </button>
        
        <div className="absolute top-full mt-2 right-0 bg-[#133129] border border-[#406D61]/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[140px] overflow-hidden z-50">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-[#224B40]/50 transition-colors ${
              language === 'en' ? 'text-[#d4a84b]' : 'text-[#faf9f6]/80'
            }`}
          >
            <span>English</span>
            {language === 'en' && <Check className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleLanguageChange('ar')}
            className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-[#224B40]/50 transition-colors ${
              language === 'ar' ? 'text-[#d4a84b]' : 'text-[#faf9f6]/80'
            }`}
          >
            <span>العربية</span>
            {language === 'ar' && <Check className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  // Default variant - button with icon
  return (
    <button 
      onClick={() => handleLanguageChange(language === 'ar' ? 'en' : 'ar')}
      className={`flex items-center gap-1.5 text-[#faf9f6]/70 hover:text-[#d4a84b] transition-colors group ${isRTL ? 'flex-row-reverse' : ''} ${className}`}
    >
      <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
      {showLabel && (
        <span className="text-sm font-medium">
          {language === 'ar' ? 'English' : 'العربية'}
        </span>
      )}
    </button>
  );
}
