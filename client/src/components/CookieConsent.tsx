/**
 * CauseWay Cookie Consent Banner
 * GDPR-compliant cookie consent with granular controls
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart3, Target, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = 'causeway_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'causeway_cookie_preferences';

export default function CookieConsent() {
  const { language, isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    saveConsent(allAccepted);
  };

  const handleAcceptSelected = () => {
    saveConsent(preferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    saveConsent(onlyNecessary);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    
    // Dispatch custom event for analytics initialization
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: prefs }));
  };

  const cookieTypes = [
    {
      id: 'necessary',
      icon: Shield,
      name: language === 'ar' ? 'ملفات تعريف الارتباط الضرورية' : 'Necessary Cookies',
      description: language === 'ar' 
        ? 'ضرورية لعمل الموقع بشكل صحيح. لا يمكن تعطيلها.'
        : 'Essential for the website to function properly. Cannot be disabled.',
      required: true,
    },
    {
      id: 'analytics',
      icon: BarChart3,
      name: language === 'ar' ? 'ملفات تعريف الارتباط التحليلية' : 'Analytics Cookies',
      description: language === 'ar'
        ? 'تساعدنا على فهم كيفية استخدام الزوار للموقع وتحسين تجربتهم.'
        : 'Help us understand how visitors use our site and improve their experience.',
      required: false,
    },
    {
      id: 'marketing',
      icon: Target,
      name: language === 'ar' ? 'ملفات تعريف الارتباط التسويقية' : 'Marketing Cookies',
      description: language === 'ar'
        ? 'تُستخدم لتتبع الزوار عبر المواقع لعرض إعلانات ذات صلة.'
        : 'Used to track visitors across websites to display relevant advertisements.',
      required: false,
    },
    {
      id: 'functional',
      icon: Settings,
      name: language === 'ar' ? 'ملفات تعريف الارتباط الوظيفية' : 'Functional Cookies',
      description: language === 'ar'
        ? 'تمكّن وظائف محسّنة مثل تذكر تفضيلاتك واللغة المختارة.'
        : 'Enable enhanced functionality like remembering your preferences and language.',
      required: false,
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={() => {}} // Prevent closing by clicking backdrop
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] p-4 md:p-6"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="max-w-4xl mx-auto bg-[#faf9f6] rounded-2xl shadow-2xl border border-[#133129]/10 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#133129] to-[#224B40] p-4 md:p-6">
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-[#d4a84b]/20 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-[#d4a84b]" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="text-lg md:text-xl font-semibold text-[#faf9f6]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {language === 'ar' ? 'إعدادات الخصوصية' : 'Privacy Settings'}
                    </h3>
                    <p className="text-[#faf9f6]/70 text-sm">
                      {language === 'ar' ? 'نحترم خصوصيتك' : 'We respect your privacy'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <p className={`text-[#133129]/80 text-sm md:text-base leading-relaxed mb-4 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar'
                    ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. بعضها ضروري لعمل الموقع، بينما يساعدنا البعض الآخر على فهم كيفية استخدامك للموقع وتحسين خدماتنا.'
                    : 'We use cookies to enhance your experience on our website. Some are essential for the site to function, while others help us understand how you use the site and improve our services.'
                  }
                </p>

                {/* Expandable Details */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className={`flex items-center gap-2 text-[#133129] hover:text-[#d4a84b] transition-colors text-sm font-medium mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {language === 'ar' ? 'تخصيص الإعدادات' : 'Customize Settings'}
                </button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                        {cookieTypes.map((cookie) => {
                          const Icon = cookie.icon;
                          return (
                            <div
                              key={cookie.id}
                              className={`flex items-start gap-4 p-4 rounded-xl bg-[#133129]/5 border border-[#133129]/10 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <div className="w-10 h-10 rounded-lg bg-[#133129]/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-5 h-5 text-[#133129]" />
                              </div>
                              <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                                <div className={`flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <h4 className="font-semibold text-[#133129] text-sm">{cookie.name}</h4>
                                  <Switch
                                    checked={preferences[cookie.id as keyof CookiePreferences]}
                                    onCheckedChange={(checked) => {
                                      if (!cookie.required) {
                                        setPreferences(prev => ({ ...prev, [cookie.id]: checked }));
                                      }
                                    }}
                                    disabled={cookie.required}
                                    className="data-[state=checked]:bg-[#d4a84b]"
                                  />
                                </div>
                                <p className="text-[#133129]/60 text-xs mt-1">{cookie.description}</p>
                                {cookie.required && (
                                  <span className="inline-block mt-2 text-xs text-[#d4a84b] font-medium">
                                    {language === 'ar' ? 'مطلوب دائماً' : 'Always Required'}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold flex-1"
                  >
                    {language === 'ar' ? 'قبول الكل' : 'Accept All'}
                  </Button>
                  {showDetails && (
                    <Button
                      onClick={handleAcceptSelected}
                      variant="outline"
                      className="border-[#133129] text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6] flex-1"
                    >
                      {language === 'ar' ? 'حفظ التفضيلات' : 'Save Preferences'}
                    </Button>
                  )}
                  <Button
                    onClick={handleRejectAll}
                    variant="ghost"
                    className="text-[#133129]/60 hover:text-[#133129] hover:bg-[#133129]/10"
                  >
                    {language === 'ar' ? 'الضروري فقط' : 'Necessary Only'}
                  </Button>
                </div>

                {/* Privacy Policy Link */}
                <p className={`text-xs text-[#133129]/50 mt-4 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' ? (
                    <>
                      بالنقر على "قبول الكل"، فإنك توافق على{' '}
                      <a href="/privacy" className="text-[#d4a84b] hover:underline">سياسة الخصوصية</a>
                      {' '}و{' '}
                      <a href="/terms" className="text-[#d4a84b] hover:underline">شروط الخدمة</a>.
                    </>
                  ) : (
                    <>
                      By clicking "Accept All", you agree to our{' '}
                      <a href="/privacy" className="text-[#d4a84b] hover:underline">Privacy Policy</a>
                      {' '}and{' '}
                      <a href="/terms" className="text-[#d4a84b] hover:underline">Terms of Service</a>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Export a hook to check cookie preferences
export function useCookiePreferences(): CookiePreferences | null {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }

    const handleUpdate = (event: CustomEvent<CookiePreferences>) => {
      setPreferences(event.detail);
    };

    window.addEventListener('cookieConsentUpdated', handleUpdate as EventListener);
    return () => window.removeEventListener('cookieConsentUpdated', handleUpdate as EventListener);
  }, []);

  return preferences;
}
