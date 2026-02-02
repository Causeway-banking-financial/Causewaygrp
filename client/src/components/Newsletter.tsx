/**
 * CauseWay Newsletter Component
 * Unique, powerful newsletter signup with multiple subscription options
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Mail, Send, CheckCircle2, Sparkles, TrendingUp, Shield, Globe,
  BookOpen, Bell, Zap, ArrowRight, X, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NewsletterProps {
  variant?: 'inline' | 'modal' | 'footer' | 'hero';
  onClose?: () => void;
}

// Newsletter categories/interests
const interests = {
  en: [
    { id: 'yeto', label: 'YETO Observatory Updates', icon: TrendingUp, description: 'Economic indicators & market analysis' },
    { id: 'islamic', label: 'Islamic Finance Insights', icon: BookOpen, description: 'Sharia-compliant products & standards' },
    { id: 'compliance', label: 'Compliance & Risk', icon: Shield, description: 'AML, FATF updates & best practices' },
    { id: 'academy', label: 'Academy Courses', icon: Sparkles, description: 'New courses & certifications' },
    { id: 'opportunities', label: 'Career Opportunities', icon: Globe, description: 'Jobs, internships & fellowships' },
  ],
  ar: [
    { id: 'yeto', label: 'تحديثات مرصد يتو', icon: TrendingUp, description: 'المؤشرات الاقتصادية وتحليل السوق' },
    { id: 'islamic', label: 'رؤى التمويل الإسلامي', icon: BookOpen, description: 'المنتجات المتوافقة مع الشريعة والمعايير' },
    { id: 'compliance', label: 'الامتثال والمخاطر', icon: Shield, description: 'تحديثات مكافحة غسل الأموال وفاتف' },
    { id: 'academy', label: 'دورات الأكاديمية', icon: Sparkles, description: 'دورات وشهادات جديدة' },
    { id: 'opportunities', label: 'فرص وظيفية', icon: Globe, description: 'وظائف وتدريب وزمالات' },
  ]
};

export default function Newsletter({ variant = 'inline', onClose }: NewsletterProps) {
  const { language, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['yeto', 'academy']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [step, setStep] = useState<'email' | 'interests'>('email');

  const content = {
    en: {
      badge: 'STAY INFORMED',
      title: 'Join the CauseWay Intelligence Network',
      subtitle: 'Get exclusive insights delivered to your inbox',
      description: 'Join 2,500+ finance professionals receiving weekly briefings on MENA markets, Islamic finance trends, and career opportunities.',
      emailPlaceholder: 'Enter your email',
      namePlaceholder: 'Your name (optional)',
      subscribeButton: 'Subscribe Free',
      nextButton: 'Continue',
      backButton: 'Back',
      selectInterests: 'Select Your Interests',
      selectDescription: 'Choose the topics you want to receive updates about',
      successTitle: 'Welcome to the Network!',
      successMessage: 'Check your inbox for a confirmation email.',
      stats: {
        subscribers: '2,500+',
        subscribersLabel: 'Subscribers',
        frequency: 'Weekly',
        frequencyLabel: 'Briefings',
        free: '100%',
        freeLabel: 'Free'
      },
      benefits: [
        'Exclusive YETO economic reports',
        'Early access to new courses',
        'Curated job opportunities',
        'Industry event invitations'
      ],
      privacyNote: 'We respect your privacy. Unsubscribe anytime.'
    },
    ar: {
      badge: 'ابقَ على اطلاع',
      title: 'انضم إلى شبكة معلومات كوزواي',
      subtitle: 'احصل على رؤى حصرية في بريدك',
      description: 'انضم إلى أكثر من 2,500 محترف مالي يتلقون إحاطات أسبوعية عن أسواق الشرق الأوسط وشمال أفريقيا واتجاهات التمويل الإسلامي والفرص الوظيفية.',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      namePlaceholder: 'اسمك (اختياري)',
      subscribeButton: 'اشترك مجاناً',
      nextButton: 'متابعة',
      backButton: 'رجوع',
      selectInterests: 'اختر اهتماماتك',
      selectDescription: 'اختر المواضيع التي تريد تلقي تحديثات عنها',
      successTitle: 'مرحباً بك في الشبكة!',
      successMessage: 'تحقق من بريدك الوارد لرسالة التأكيد.',
      stats: {
        subscribers: '+2,500',
        subscribersLabel: 'مشترك',
        frequency: 'أسبوعي',
        frequencyLabel: 'إحاطات',
        free: '100%',
        freeLabel: 'مجاني'
      },
      benefits: [
        'تقارير يتو الاقتصادية الحصرية',
        'وصول مبكر للدورات الجديدة',
        'فرص وظيفية منتقاة',
        'دعوات لفعاليات الصناعة'
      ],
      privacyNote: 'نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.'
    }
  };

  const t = content[language];
  const interestsList = interests[language];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'email') {
      if (!email || !email.includes('@')) {
        toast.error(language === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
        return;
      }
      setStep('interests');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    
    toast.success(language === 'ar' ? 'تم الاشتراك بنجاح!' : 'Successfully subscribed!');
  };

  // Success State
  if (isSubscribed) {
    return (
      <div className={`relative ${variant === 'modal' ? 'p-8' : 'p-6'} ${isRTL ? 'rtl' : 'ltr'}`}>
        {variant === 'modal' && onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h3>
          <p className="text-gray-400">{t.successMessage}</p>
        </div>
      </div>
    );
  }

  // Hero Variant - Large, prominent
  if (variant === 'hero') {
    return (
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#133129] via-[#1a3d33] to-[#224B40] p-8 md:p-12 ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a84b]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#406D61]/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a84b]/20 border border-[#d4a84b]/30 mb-4">
              <Bell className="w-4 h-4 text-[#d4a84b]" />
              <span className="text-[#d4a84b] text-sm font-medium">{t.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t.title}
            </h2>
            <p className="text-gray-300 mb-6">{t.description}</p>
            
            {/* Stats */}
            <div className="flex items-center gap-6 mb-6">
              <div>
                <div className="text-2xl font-bold text-[#d4a84b]">{t.stats.subscribers}</div>
                <div className="text-xs text-gray-400">{t.stats.subscribersLabel}</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl font-bold text-[#d4a84b]">{t.stats.frequency}</div>
                <div className="text-xs text-gray-400">{t.stats.frequencyLabel}</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl font-bold text-[#d4a84b]">{t.stats.free}</div>
                <div className="text-xs text-gray-400">{t.stats.freeLabel}</div>
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-2">
              {t.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <Zap className="w-4 h-4 text-[#d4a84b]" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 'email' ? (
                <>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a84b] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a84b] transition-colors"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold py-3">
                    {t.nextButton} <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-1">{t.selectInterests}</h4>
                    <p className="text-gray-400 text-sm">{t.selectDescription}</p>
                  </div>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {interestsList.map((interest) => (
                      <button
                        key={interest.id}
                        type="button"
                        onClick={() => toggleInterest(interest.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          selectedInterests.includes(interest.id)
                            ? 'bg-[#d4a84b]/20 border-[#d4a84b]/50'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          selectedInterests.includes(interest.id) ? 'bg-[#d4a84b]' : 'bg-white/10'
                        }`}>
                          <interest.icon className={`w-4 h-4 ${selectedInterests.includes(interest.id) ? 'text-[#133129]' : 'text-gray-400'}`} />
                        </div>
                        <div className={`text-${isRTL ? 'right' : 'left'} flex-1`}>
                          <div className={`text-sm font-medium ${selectedInterests.includes(interest.id) ? 'text-white' : 'text-gray-300'}`}>
                            {interest.label}
                          </div>
                          <div className="text-xs text-gray-500">{interest.description}</div>
                        </div>
                        {selectedInterests.includes(interest.id) && (
                          <CheckCircle2 className="w-5 h-5 text-[#d4a84b]" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep('email')} className="flex-1 border-white/20 text-white hover:bg-white/10">
                      {t.backButton}
                    </Button>
                    <Button type="submit" disabled={isSubmitting || selectedInterests.length === 0} className="flex-1 bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold">
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t.subscribeButton}
                    </Button>
                  </div>
                </>
              )}
              <p className="text-center text-gray-500 text-xs">{t.privacyNote}</p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Footer Variant - Compact
  if (variant === 'footer') {
    return (
      <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-[#d4a84b]" />
          <h4 className="text-white font-semibold">{language === 'ar' ? 'النشرة الإخبارية' : 'Newsletter'}</h4>
        </div>
        <p className="text-gray-400 text-sm mb-4">{t.subtitle}</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a84b] transition-colors text-sm"
            required
          />
          <Button type="submit" size="sm" className="bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129]">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    );
  }

  // Inline Variant - Medium
  return (
    <div className={`bg-gradient-to-r from-[#133129] to-[#1a3d33] rounded-2xl p-6 border border-white/10 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-[#d4a84b]" />
        <span className="text-[#d4a84b] text-sm font-medium">{t.badge}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
      <p className="text-gray-400 text-sm mb-4">{t.subtitle}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a84b] transition-colors"
          required
        />
        <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold px-6">
          {t.subscribeButton}
        </Button>
      </form>
    </div>
  );
}

// Export a modal wrapper for popup usage
export function NewsletterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { isRTL } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl bg-gradient-to-br from-[#133129] to-[#1a3d33] rounded-3xl border border-white/10 shadow-2xl ${isRTL ? 'rtl' : 'ltr'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
          <X className="w-6 h-6" />
        </button>
        <Newsletter variant="hero" onClose={onClose} />
      </div>
    </div>
  );
}
