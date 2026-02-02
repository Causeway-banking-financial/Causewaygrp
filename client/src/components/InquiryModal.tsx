/**
 * CauseWay Inquiry Modal Component
 * Features: Pre-filled service name, inline validation, bilingual support
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  X, Send, CheckCircle2, Loader2, AlertCircle, 
  User, Mail, Phone, Building2, MessageSquare, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { submitInquiry, validateInquiry, type ValidationErrors } from '@/lib/inquiryService';
import { motion, AnimatePresence } from 'framer-motion';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  serviceNameAr?: string;
}

export default function InquiryModal({ isOpen, onClose, serviceName, serviceNameAr }: InquiryModalProps) {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setErrors({});
      setTouched({});
      setIsSuccess(false);
    }
  }, [isOpen]);

  const content = {
    en: {
      title: 'Inquire About',
      subtitle: 'Fill out the form below and our team will contact you within 24-48 hours.',
      namePlaceholder: 'Your full name',
      nameLabel: 'Full Name',
      emailPlaceholder: 'your.email@example.com',
      emailLabel: 'Email Address',
      phonePlaceholder: '+967 XXX XXX XXX',
      phoneLabel: 'Phone Number (Optional)',
      companyPlaceholder: 'Your company or organization',
      companyLabel: 'Company / Organization (Optional)',
      messagePlaceholder: 'Tell us about your needs, timeline, or any specific questions...',
      messageLabel: 'Message (Optional)',
      submitButton: 'Submit Inquiry',
      successTitle: 'Inquiry Submitted!',
      successMessage: 'Thank you for your interest. Our team will review your inquiry and contact you within 24-48 hours.',
      closeButton: 'Close',
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number'
    },
    ar: {
      title: 'استفسار عن',
      subtitle: 'املأ النموذج أدناه وسيتواصل معك فريقنا خلال 24-48 ساعة.',
      namePlaceholder: 'اسمك الكامل',
      nameLabel: 'الاسم الكامل',
      emailPlaceholder: 'your.email@example.com',
      emailLabel: 'البريد الإلكتروني',
      phonePlaceholder: '+967 XXX XXX XXX',
      phoneLabel: 'رقم الهاتف (اختياري)',
      companyPlaceholder: 'شركتك أو مؤسستك',
      companyLabel: 'الشركة / المؤسسة (اختياري)',
      messagePlaceholder: 'أخبرنا عن احتياجاتك، الجدول الزمني، أو أي أسئلة محددة...',
      messageLabel: 'الرسالة (اختياري)',
      submitButton: 'إرسال الاستفسار',
      successTitle: 'تم إرسال الاستفسار!',
      successMessage: 'شكراً لاهتمامك. سيراجع فريقنا استفسارك ويتواصل معك خلال 24-48 ساعة.',
      closeButton: 'إغلاق',
      requiredField: 'هذا الحقل مطلوب',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صالح',
      invalidPhone: 'يرجى إدخال رقم هاتف صالح'
    }
  };

  const t = content[language];
  const displayServiceName = language === 'ar' && serviceNameAr ? serviceNameAr : serviceName;

  // Handle input change
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate on change if field was touched
    if (touched[field]) {
      const validation = validateInquiry({ ...formData, [field]: value });
      setErrors(validation.errors);
    }
  };

  // Handle blur - mark field as touched and validate
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const validation = validateInquiry(formData);
    setErrors(validation.errors);
  };

  // Get error message for a field
  const getError = (field: keyof ValidationErrors): string | undefined => {
    if (!touched[field]) return undefined;
    return language === 'ar' ? errors[`${field}Ar` as keyof ValidationErrors] : errors[field];
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, company: true, message: true });
    
    // Validate
    const validation = validateInquiry(formData);
    setErrors(validation.errors);
    
    if (!validation.valid) {
      return;
    }

    setIsSubmitting(true);
    
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = submitInquiry({
      serviceName,
      serviceNameAr,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      message: formData.message || undefined,
      language: language as 'en' | 'ar'
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      toast.success(language === 'ar' ? result.messageAr : result.message);
    } else {
      toast.error(language === 'ar' ? result.messageAr : result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose} 
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-lg bg-gradient-to-br from-[#133129] via-[#1a3d33] to-[#224B40] rounded-2xl border border-white/10 shadow-2xl overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Close button */}
          <button 
            onClick={onClose} 
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-gray-400 hover:text-white z-10 transition-colors`}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Success State */}
          {isSuccess ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.successTitle}</h3>
              <p className="text-gray-400 mb-6">{t.successMessage}</p>
              <Button 
                onClick={onClose}
                className="bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold"
              >
                {t.closeButton}
              </Button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 pb-4 border-b border-white/10">
                <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-[#d4a84b]/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-[#d4a84b]" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-gray-400 text-sm">{t.title}</p>
                    <h3 className="text-xl font-bold text-white">{displayServiceName}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{t.subtitle}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name Field */}
                <div>
                  <label className={`block text-sm font-medium text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.nameLabel} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder={t.namePlaceholder}
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                        getError('name') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-[#d4a84b]'
                      }`}
                    />
                  </div>
                  {getError('name') && (
                    <p className={`text-red-400 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <AlertCircle className="w-3 h-3" />
                      {getError('name')}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className={`block text-sm font-medium text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.emailLabel} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder={t.emailPlaceholder}
                      dir="ltr"
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                        getError('email') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-[#d4a84b]'
                      }`}
                    />
                  </div>
                  {getError('email') && (
                    <p className={`text-red-400 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <AlertCircle className="w-3 h-3" />
                      {getError('email')}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className={`block text-sm font-medium text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder={t.phonePlaceholder}
                      dir="ltr"
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-colors ${
                        getError('phone') 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-white/20 focus:border-[#d4a84b]'
                      }`}
                    />
                  </div>
                  {getError('phone') && (
                    <p className={`text-red-400 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <AlertCircle className="w-3 h-3" />
                      {getError('phone')}
                    </p>
                  )}
                </div>

                {/* Company Field */}
                <div>
                  <label className={`block text-sm font-medium text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.companyLabel}
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      placeholder={t.companyPlaceholder}
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a84b] transition-colors`}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className={`block text-sm font-medium text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.messageLabel}
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute top-3 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder={t.messagePlaceholder}
                      rows={3}
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a84b] transition-colors resize-none`}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold py-3"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t.submitButton}
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
