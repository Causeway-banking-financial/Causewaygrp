/**
 * ServiceCardModal Component
 * A reusable modal for service card expansion with inline validation
 * Features: Animated modal, inquiry form, inline validation, bilingual support
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/App';

interface ServiceDetail {
  en: string;
  ar: string;
}

interface ServiceCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    detailsEn: string[];
    detailsAr: string[];
    color: string;
    bgColor: string;
    borderColor: string;
    iconBg: string;
    iconColor: string;
  };
  onInquire?: (data: InquiryFormData) => void;
}

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
  serviceId: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  message?: string;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (international format)
const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;

export default function ServiceCardModal({ 
  isOpen, 
  onClose, 
  service,
  onInquire 
}: ServiceCardModalProps) {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    serviceId: service.id
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowForm(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: '',
        serviceId: service.id
      });
      setErrors({});
      setTouched({});
      setSubmitSuccess(false);
    }
  }, [isOpen, service.id]);

  // Validate a single field
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return language === 'ar' ? 'الاسم مطلوب' : 'Name is required';
        }
        if (value.trim().length < 2) {
          return language === 'ar' ? 'الاسم قصير جداً' : 'Name is too short';
        }
        break;
      case 'email':
        if (!value.trim()) {
          return language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
        }
        if (!emailRegex.test(value)) {
          return language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email format';
        }
        break;
      case 'phone':
        if (value.trim() && !phoneRegex.test(value)) {
          return language === 'ar' ? 'رقم الهاتف غير صالح' : 'Invalid phone number';
        }
        break;
      case 'organization':
        if (!value.trim()) {
          return language === 'ar' ? 'اسم المؤسسة مطلوب' : 'Organization is required';
        }
        break;
      case 'message':
        if (!value.trim()) {
          return language === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
        }
        if (value.trim().length < 10) {
          return language === 'ar' ? 'الرسالة قصيرة جداً' : 'Message is too short';
        }
        break;
    }
    return undefined;
  };

  // Handle field change with inline validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    ['name', 'email', 'phone', 'organization', 'message'].forEach(field => {
      const error = validateField(field, formData[field as keyof InquiryFormData]);
      if (error) {
        newErrors[field as keyof ValidationErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      organization: true,
      message: true
    });

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call or use the onInquire callback
      if (onInquire) {
        await onInquire(formData);
      } else {
        // Default: simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(prev => ({
        ...prev,
        message: language === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className={`relative p-6 ${service.bgColor} border-b ${service.borderColor}`}>
              <button
                onClick={onClose}
                className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 rounded-full hover:bg-black/10 transition-colors`}
                aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h2 className="text-xl font-semibold text-[#133129]">
                    {language === 'ar' ? service.titleAr : service.titleEn}
                  </h2>
                  <p className="text-sm text-[#406D61] mt-1">
                    {language === 'ar' ? service.titleEn : service.titleAr}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#133129] mb-2">
                    {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Successfully Submitted!'}
                  </h3>
                  <p className="text-[#406D61] mb-6">
                    {language === 'ar' 
                      ? 'سيتواصل معك فريقنا قريباً.'
                      : 'Our team will contact you shortly.'
                    }
                  </p>
                  <Button onClick={onClose} className="bg-[#133129] hover:bg-[#224B40]">
                    {language === 'ar' ? 'إغلاق' : 'Close'}
                  </Button>
                </motion.div>
              ) : showForm ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#133129] mb-4">
                    {language === 'ar' ? 'استفسر عن هذه الخدمة' : 'Inquire About This Service'}
                  </h3>
                  
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#133129] mb-1">
                      {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      className={`${errors.name && touched.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.name && touched.name && (
                      <p className={`text-red-500 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#133129] mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={language === 'ar' ? 'example@company.com' : 'example@company.com'}
                      className={`${errors.email && touched.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.email && touched.email && (
                      <p className={`text-red-500 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#133129] mb-1">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={language === 'ar' ? '+967 XXX XXX XXX' : '+967 XXX XXX XXX'}
                      className={`${errors.phone && touched.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.phone && touched.phone && (
                      <p className={`text-red-500 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Organization Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#133129] mb-1">
                      {language === 'ar' ? 'المؤسسة *' : 'Organization *'}
                    </label>
                    <Input
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={language === 'ar' ? 'اسم المؤسسة أو الشركة' : 'Company or institution name'}
                      className={`${errors.organization && touched.organization ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.organization && touched.organization && (
                      <p className={`text-red-500 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <AlertCircle className="w-3 h-3" />
                        {errors.organization}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#133129] mb-1">
                      {language === 'ar' ? 'رسالتك *' : 'Your Message *'}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={language === 'ar' 
                        ? 'أخبرنا عن احتياجاتك ومتطلباتك...'
                        : 'Tell us about your needs and requirements...'
                      }
                      rows={4}
                      className={`${errors.message && touched.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.message && touched.message && (
                      <p className={`text-red-500 text-xs mt-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      {language === 'ar' ? 'رجوع' : 'Back'}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 bg-gradient-to-r ${service.color} text-white hover:opacity-90`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className={`w-4 h-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {language === 'ar' ? 'إرسال الاستفسار' : 'Send Inquiry'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Service Description */}
                  <p className="text-[#406D61] mb-6">
                    {language === 'ar' ? service.descAr : service.descEn}
                  </p>

                  {/* Service Details */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#133129] mb-3">
                      {language === 'ar' ? 'ما نقدمه:' : 'What we deliver:'}
                    </h3>
                    <ul className="space-y-2">
                      {(language === 'ar' ? service.detailsAr : service.detailsEn).map((detail, idx) => (
                        <li 
                          key={idx} 
                          className={`flex items-start gap-2 text-[#406D61] ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                        >
                          <CheckCircle className={`w-5 h-5 ${service.iconColor} flex-shrink-0 mt-0.5`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    <Button
                      onClick={() => setShowForm(true)}
                      className={`flex-1 bg-gradient-to-r ${service.color} text-white hover:opacity-90`}
                    >
                      {language === 'ar' ? 'استفسر الآن' : 'Inquire Now'}
                    </Button>
                    <Button
                      onClick={() => {
                        onClose();
                        openBooking('consultation');
                      }}
                      variant="outline"
                      className="flex-1 border-[#133129] text-[#133129] hover:bg-[#133129] hover:text-white"
                    >
                      {language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Gradient accent at bottom */}
            <div className={`h-1 bg-gradient-to-r ${service.color}`} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Export types for use in other components
export type { ServiceCardModalProps, InquiryFormData };
