/**
 * CauseWay PWA Install Prompt Component
 * Premium install prompt with brand identity
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Download, Smartphone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const { language, isRTL } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const content = {
    ar: {
      title: 'تثبيت تطبيق كوزواي',
      subtitle: 'احصل على تجربة أفضل',
      description: 'ثبّت التطبيق للوصول السريع والعمل بدون اتصال',
      features: [
        'وصول سريع من الشاشة الرئيسية',
        'إشعارات فورية',
        'العمل بدون اتصال',
        'تجربة تطبيق كاملة'
      ],
      install: 'تثبيت الآن',
      later: 'لاحقاً',
      installed: 'تم التثبيت بنجاح!'
    },
    en: {
      title: 'Install CauseWay App',
      subtitle: 'Get a better experience',
      description: 'Install the app for quick access and offline capability',
      features: [
        'Quick access from home screen',
        'Instant notifications',
        'Work offline',
        'Full app experience'
      ],
      install: 'Install Now',
      later: 'Later',
      installed: 'Successfully installed!'
    }
  };

  const t = content[language];

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        const lastDismissed = dismissed ? parseInt(dismissed) : 0;
        const daysSinceDismissed = (Date.now() - lastDismissed) / (1000 * 60 * 60 * 24);
        
        // Show if never dismissed or dismissed more than 7 days ago
        if (!dismissed || daysSinceDismissed > 7) {
          setShowPrompt(true);
        }
      }, 30000); // Show after 30 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Listen for successful install
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-md bg-[#faf9f6] rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#133129] to-[#224B40] p-6 text-white">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-[#d4a84b]" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t.title}</h3>
              <p className="text-white/70 text-sm">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-[#133129]/70 mb-4">{t.description}</p>
          
          <ul className="space-y-3 mb-6">
            {t.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-[#133129]">
                <div className="w-5 h-5 rounded-full bg-[#133129]/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#133129]" />
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleInstall}
              className="flex-1 bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              {t.install}
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="border-[#133129]/20 text-[#133129]/70 hover:bg-[#133129]/5"
            >
              {t.later}
            </Button>
          </div>
        </div>

        {/* Brand footer */}
        <div className="px-6 py-3 bg-[#133129]/5 border-t border-[#133129]/10">
          <div className="flex items-center justify-center gap-2 text-xs text-[#133129]/50">
            <span>CauseWay</span>
            <span className="text-[#d4a84b]">|</span>
            <span>Financial & Banking Consultancies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
