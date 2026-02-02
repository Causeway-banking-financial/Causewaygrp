/**
 * WhatsApp Integration Component
 * Smart floating button with context-aware pre-filled messages
 * 
 * Best Practices Applied:
 * - Context-aware messaging based on current page
 * - Bilingual Arabic/English support
 * - Professional tone matching CauseWay brand
 * - Smooth animations and micro-interactions
 * - Mobile-optimized positioning
 * - Accessibility compliant
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, Send, Phone, Clock, CheckCircle2 } from 'lucide-react';

// CauseWay WhatsApp Business Number (placeholder - replace with actual)
const WHATSAPP_NUMBER = '+967777000000';

// Brand Colors
const COLORS = {
  whatsapp: '#25D366',
  whatsappDark: '#128C7E',
  forest: '#133129',
  gold: '#d4a84b',
};

interface ContextMessage {
  title: string;
  message: string;
  icon: string;
}

// Context-aware messages based on page
const PAGE_CONTEXTS: Record<string, { en: ContextMessage; ar: ContextMessage }> = {
  '/': {
    en: {
      title: 'General Inquiry',
      message: 'Hello CauseWay team,\n\nI visited your website and would like to learn more about your financial and banking consultancy services.\n\nPlease contact me at your earliest convenience.',
      icon: '👋',
    },
    ar: {
      title: 'استفسار عام',
      message: 'مرحباً فريق كوزواي،\n\nقمت بزيارة موقعكم الإلكتروني وأود معرفة المزيد عن خدماتكم الاستشارية المالية والمصرفية.\n\nيرجى التواصل معي في أقرب وقت ممكن.',
      icon: '👋',
    },
  },
  '/services': {
    en: {
      title: 'Service Inquiry',
      message: 'Hello CauseWay team,\n\nI am interested in your consultancy services. I would like to discuss:\n\n• [Please specify the service area]\n• [Your organization type]\n• [Timeline/urgency]\n\nLooking forward to your response.',
      icon: '💼',
    },
    ar: {
      title: 'استفسار عن الخدمات',
      message: 'مرحباً فريق كوزواي،\n\nأنا مهتم بخدماتكم الاستشارية. أود مناقشة:\n\n• [يرجى تحديد مجال الخدمة]\n• [نوع مؤسستكم]\n• [الجدول الزمني/الأولوية]\n\nأتطلع لردكم.',
      icon: '💼',
    },
  },
  '/about': {
    en: {
      title: 'Partnership Inquiry',
      message: 'Hello CauseWay team,\n\nI learned about your firm and I am interested in exploring potential collaboration opportunities.\n\nI represent [Organization Name] and would like to schedule a meeting to discuss how we might work together.',
      icon: '🤝',
    },
    ar: {
      title: 'استفسار عن الشراكة',
      message: 'مرحباً فريق كوزواي،\n\nتعرفت على شركتكم وأنا مهتم باستكشاف فرص التعاون المحتملة.\n\nأمثل [اسم المؤسسة] وأود جدولة اجتماع لمناقشة كيفية العمل معاً.',
      icon: '🤝',
    },
  },
  '/contact': {
    en: {
      title: 'Direct Contact',
      message: 'Hello CauseWay team,\n\nI would like to speak with a consultant regarding:\n\n[Please describe your inquiry]\n\nPreferred contact method: WhatsApp\nBest time to reach me: [Your availability]',
      icon: '📞',
    },
    ar: {
      title: 'تواصل مباشر',
      message: 'مرحباً فريق كوزواي،\n\nأود التحدث مع مستشار بخصوص:\n\n[يرجى وصف استفساركم]\n\nطريقة التواصل المفضلة: واتساب\nأفضل وقت للتواصل: [توفركم]',
      icon: '📞',
    },
  },
  '/tools/islamic-finance-calculator': {
    en: {
      title: 'Islamic Finance Consultation',
      message: 'Hello CauseWay team,\n\nI used your Islamic Finance Calculator and would like professional guidance on:\n\n• Calculation type: [Murabaha/Ijara/Sukuk/Zakat]\n• Amount: [Approximate value]\n• Purpose: [Personal/Business]\n\nI would appreciate a consultation to discuss my specific requirements.',
      icon: '🧮',
    },
    ar: {
      title: 'استشارة التمويل الإسلامي',
      message: 'مرحباً فريق كوزواي،\n\nاستخدمت حاسبة التمويل الإسلامي وأود الحصول على إرشاد مهني حول:\n\n• نوع الحساب: [مرابحة/إجارة/صكوك/زكاة]\n• المبلغ: [القيمة التقريبية]\n• الغرض: [شخصي/تجاري]\n\nأقدر استشارة لمناقشة متطلباتي المحددة.',
      icon: '🧮',
    },
  },
  '/academy': {
    en: {
      title: 'Training Inquiry',
      message: 'Hello CauseWay team,\n\nI am interested in your training and capacity building programs.\n\n• Area of interest: [Please specify]\n• Number of participants: [Individual/Group]\n• Preferred format: [Online/In-person/Hybrid]\n\nPlease share more details about available programs.',
      icon: '🎓',
    },
    ar: {
      title: 'استفسار عن التدريب',
      message: 'مرحباً فريق كوزواي،\n\nأنا مهتم ببرامج التدريب وبناء القدرات لديكم.\n\n• مجال الاهتمام: [يرجى التحديد]\n• عدد المشاركين: [فردي/مجموعة]\n• الصيغة المفضلة: [عن بُعد/حضوري/هجين]\n\nيرجى مشاركة المزيد من التفاصيل حول البرامج المتاحة.',
      icon: '🎓',
    },
  },
  '/glossary': {
    en: {
      title: 'Technical Question',
      message: 'Hello CauseWay team,\n\nI have a technical question regarding financial/banking terminology:\n\n[Please describe your question]\n\nI would appreciate clarification from your experts.',
      icon: '📚',
    },
    ar: {
      title: 'سؤال تقني',
      message: 'مرحباً فريق كوزواي،\n\nلدي سؤال تقني بخصوص المصطلحات المالية/المصرفية:\n\n[يرجى وصف سؤالكم]\n\nأقدر توضيحاً من خبرائكم.',
      icon: '📚',
    },
  },
  '/resources': {
    en: {
      title: 'Resource Request',
      message: 'Hello CauseWay team,\n\nI am looking for resources/tools related to:\n\n[Please specify your needs]\n\nDo you have any recommendations or materials that could help?',
      icon: '📁',
    },
    ar: {
      title: 'طلب موارد',
      message: 'مرحباً فريق كوزواي،\n\nأبحث عن موارد/أدوات متعلقة بـ:\n\n[يرجى تحديد احتياجاتكم]\n\nهل لديكم أي توصيات أو مواد يمكن أن تساعد؟',
      icon: '📁',
    },
  },
  '/insights': {
    en: {
      title: 'Research Inquiry',
      message: 'Hello CauseWay team,\n\nI read your insights and would like to discuss:\n\n• Topic: [Specific article/topic]\n• Purpose: [Research/Business decision/Academic]\n\nWould it be possible to arrange a brief consultation?',
      icon: '📊',
    },
    ar: {
      title: 'استفسار بحثي',
      message: 'مرحباً فريق كوزواي،\n\nقرأت رؤاكم وأود مناقشة:\n\n• الموضوع: [مقال/موضوع محدد]\n• الغرض: [بحث/قرار تجاري/أكاديمي]\n\nهل يمكن ترتيب استشارة قصيرة؟',
      icon: '📊',
    },
  },
};

// Default context for unmatched pages
const DEFAULT_CONTEXT = {
  en: {
    title: 'General Inquiry',
    message: 'Hello CauseWay team,\n\nI would like to inquire about your services.\n\n[Please describe your inquiry]\n\nThank you.',
    icon: '💬',
  },
  ar: {
    title: 'استفسار عام',
    message: 'مرحباً فريق كوزواي،\n\nأود الاستفسار عن خدماتكم.\n\n[يرجى وصف استفساركم]\n\nشكراً لكم.',
    icon: '💬',
  },
};

// Quick action buttons
const QUICK_ACTIONS = {
  en: [
    { id: 'consultation', label: 'Request Consultation', icon: '📅', message: 'I would like to schedule a consultation.' },
    { id: 'quote', label: 'Get a Quote', icon: '💰', message: 'I would like to request a quote for your services.' },
    { id: 'support', label: 'Technical Support', icon: '🔧', message: 'I need technical support with your tools.' },
  ],
  ar: [
    { id: 'consultation', label: 'طلب استشارة', icon: '📅', message: 'أود جدولة استشارة.' },
    { id: 'quote', label: 'طلب عرض سعر', icon: '💰', message: 'أود طلب عرض سعر لخدماتكم.' },
    { id: 'support', label: 'الدعم الفني', icon: '🔧', message: 'أحتاج دعماً فنياً لأدواتكم.' },
  ],
};

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  
  const isRTL = language === 'ar';
  
  // Get context-aware message based on current page
  const getPageContext = () => {
    // Check for exact match first
    if (PAGE_CONTEXTS[location]) {
      return PAGE_CONTEXTS[location][language];
    }
    
    // Check for partial match (e.g., /tools/* matches /tools/islamic-finance-calculator)
    const pathParts = location.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const basePath = `/${pathParts[0]}`;
      if (PAGE_CONTEXTS[basePath]) {
        return PAGE_CONTEXTS[basePath][language];
      }
    }
    
    return DEFAULT_CONTEXT[language];
  };
  
  const context = getPageContext();
  const quickActions = QUICK_ACTIONS[language];
  
  // Show tooltip after 3 seconds on first visit
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('whatsapp_tooltip_seen');
    if (!hasSeenTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem('whatsapp_tooltip_seen', 'true');
        }, 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Generate WhatsApp URL
  const generateWhatsAppURL = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  };
  
  // Handle sending message
  const handleSendMessage = (message: string) => {
    const url = generateWhatsAppURL(message);
    window.open(url, '_blank');
    setIsOpen(false);
  };
  
  // Text translations
  const t = {
    en: {
      chatWithUs: 'Chat with us',
      weAreHere: 'We\'re here to help',
      responseTime: 'Typical response: Within 2 hours',
      businessHours: 'Business hours: Sun-Thu, 9AM-6PM (GMT+3)',
      sendMessage: 'Send Message',
      typeMessage: 'Type your message...',
      quickActions: 'Quick Actions',
      contextTitle: context.title,
      close: 'Close',
      tooltip: 'Need help? Chat with us!',
    },
    ar: {
      chatWithUs: 'تواصل معنا',
      weAreHere: 'نحن هنا لمساعدتك',
      responseTime: 'وقت الاستجابة: خلال ساعتين',
      businessHours: 'ساعات العمل: الأحد-الخميس، 9ص-6م (GMT+3)',
      sendMessage: 'إرسال الرسالة',
      typeMessage: 'اكتب رسالتك...',
      quickActions: 'إجراءات سريعة',
      contextTitle: context.title,
      close: 'إغلاق',
      tooltip: 'تحتاج مساعدة؟ تواصل معنا!',
    },
  }[language];
  
  return (
    <>
      {/* Floating Button */}
      <div 
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50`}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div 
            className={`absolute bottom-full mb-3 ${isRTL ? 'left-0' : 'right-0'} 
              bg-white rounded-lg shadow-lg px-4 py-2 whitespace-nowrap
              animate-bounce`}
            style={{ 
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <p className="text-sm font-medium text-gray-800">{t.tooltip}</p>
            <div 
              className={`absolute top-full ${isRTL ? 'left-4' : 'right-4'} 
                border-8 border-transparent border-t-white`}
            />
          </div>
        )}
        
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative w-14 h-14 rounded-full shadow-lg
            flex items-center justify-center
            transition-all duration-300 ease-out
            ${isOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}
            ${isHovered && !isOpen ? 'scale-110' : ''}
          `}
          style={{
            background: isOpen 
              ? COLORS.forest 
              : `linear-gradient(135deg, ${COLORS.whatsapp} 0%, ${COLORS.whatsappDark} 100%)`,
            boxShadow: isHovered || isOpen
              ? '0 8px 25px rgba(37, 211, 102, 0.4)'
              : '0 4px 15px rgba(37, 211, 102, 0.3)',
          }}
          aria-label={isOpen ? t.close : t.chatWithUs}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
          
          {/* Pulse Animation */}
          {!isOpen && (
            <span 
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: COLORS.whatsapp }}
            />
          )}
        </button>
        
        {/* Chat Panel */}
        {isOpen && (
          <div 
            className={`
              absolute bottom-16 ${isRTL ? 'left-0' : 'right-0'}
              w-80 sm:w-96 bg-white rounded-2xl shadow-2xl
              overflow-hidden transform origin-bottom-right
              animate-in fade-in slide-in-from-bottom-5 duration-300
            `}
            style={{
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              maxHeight: 'calc(100vh - 120px)',
            }}
          >
            {/* Header */}
            <div 
              className="p-4"
              style={{
                background: `linear-gradient(135deg, ${COLORS.forest} 0%, ${COLORS.whatsappDark} 100%)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{t.chatWithUs}</h3>
                  <p className="text-white/80 text-sm">{t.weAreHere}</p>
                </div>
              </div>
              
              {/* Status Info */}
              <div className="mt-3 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{t.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{t.businessHours}</span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4 max-h-80 overflow-y-auto">
              {/* Context Message */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{context.icon}</span>
                  <span className="font-medium text-gray-800">{t.contextTitle}</span>
                </div>
                <div 
                  className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 whitespace-pre-line"
                  style={{ borderLeft: `3px solid ${COLORS.whatsapp}` }}
                >
                  {context.message}
                </div>
                <button
                  onClick={() => handleSendMessage(context.message)}
                  className="mt-2 w-full py-2 rounded-lg text-white font-medium
                    flex items-center justify-center gap-2 transition-all
                    hover:opacity-90 active:scale-98"
                  style={{ background: COLORS.whatsapp }}
                >
                  <Send className="w-4 h-4" />
                  {t.sendMessage}
                </button>
              </div>
              
              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">{t.quickActions}</span>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleSendMessage(action.message)}
                    className="w-full p-3 rounded-lg border border-gray-200
                      flex items-center gap-3 text-left
                      hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Custom Message */}
              <div className="mt-4">
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={t.typeMessage}
                  className="w-full p-3 rounded-lg border border-gray-200 
                    text-sm resize-none focus:outline-none focus:border-green-400
                    transition-all"
                  rows={3}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {customMessage.trim() && (
                  <button
                    onClick={() => handleSendMessage(customMessage)}
                    className="mt-2 w-full py-2 rounded-lg text-white font-medium
                      flex items-center justify-center gap-2 transition-all
                      hover:opacity-90"
                    style={{ background: COLORS.whatsappDark }}
                  >
                    <Send className="w-4 h-4" />
                    {t.sendMessage}
                  </button>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Phone className="w-3 h-3" />
                <span>Powered by WhatsApp Business</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
