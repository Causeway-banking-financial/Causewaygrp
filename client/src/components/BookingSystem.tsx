/**
 * CauseWay Booking System Component
 * Premium consultation booking with Calendly integration
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Briefcase,
  MessageSquare,
  X,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ConsultationType {
  id: string;
  name: string;
  nameAr: string;
  duration: string;
  durationAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  color: string;
}

interface TimeSlot {
  time: string;
  timeAr: string;
  available: boolean;
}

interface BookingFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  consultationType: string;
  date: string;
  time: string;
}

const consultationTypes: ConsultationType[] = [
  {
    id: 'discovery',
    name: 'Discovery Call',
    nameAr: 'مكالمة استكشافية',
    duration: '30 min',
    durationAr: '٣٠ دقيقة',
    description: 'Initial consultation to understand your needs and explore how CauseWay can help.',
    descriptionAr: 'استشارة أولية لفهم احتياجاتكم واستكشاف كيف يمكن لكوزواي المساعدة.',
    icon: <Phone className="w-6 h-6" />,
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
  },
  {
    id: 'strategy',
    name: 'Strategy Session',
    nameAr: 'جلسة استراتيجية',
    duration: '60 min',
    durationAr: '٦٠ دقيقة',
    description: 'In-depth discussion on strategic initiatives, transformation roadmaps, or specific challenges.',
    descriptionAr: 'مناقشة معمقة حول المبادرات الاستراتيجية وخرائط التحول أو التحديات المحددة.',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
  },
  {
    id: 'technical',
    name: 'Technical Briefing',
    nameAr: 'إحاطة تقنية',
    duration: '45 min',
    durationAr: '٤٥ دقيقة',
    description: 'Technical deep-dive on core banking systems, digital transformation, or compliance frameworks.',
    descriptionAr: 'تعمق تقني في الأنظمة المصرفية الأساسية أو التحول الرقمي أو أطر الامتثال.',
    icon: <Building2 className="w-6 h-6" />,
    color: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
  },
  {
    id: 'virtual',
    name: 'Virtual Workshop',
    nameAr: 'ورشة عمل افتراضية',
    duration: '90 min',
    durationAr: '٩٠ دقيقة',
    description: 'Interactive workshop session for teams on specific topics or capability building.',
    descriptionAr: 'جلسة ورشة عمل تفاعلية للفرق حول مواضيع محددة أو بناء القدرات.',
    icon: <Video className="w-6 h-6" />,
    color: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
  }
];

// Generate dates for next 14 days (excluding Fridays)
const generateAvailableDates = () => {
  const dates: { date: Date; formatted: string; formattedAr: string; dayName: string; dayNameAr: string }[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 21 && dates.length < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Fridays (day 5)
    if (date.getDay() === 5) continue;
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayNamesAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNamesAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    dates.push({
      date,
      formatted: `${monthNames[date.getMonth()]} ${date.getDate()}`,
      formattedAr: `${date.getDate()} ${monthNamesAr[date.getMonth()]}`,
      dayName: dayNames[date.getDay()],
      dayNameAr: dayNamesAr[date.getDay()]
    });
  }
  
  return dates;
};

const timeSlots: TimeSlot[] = [
  { time: '09:00 AM', timeAr: '٩:٠٠ ص', available: true },
  { time: '10:00 AM', timeAr: '١٠:٠٠ ص', available: true },
  { time: '11:00 AM', timeAr: '١١:٠٠ ص', available: true },
  { time: '12:00 PM', timeAr: '١٢:٠٠ م', available: false },
  { time: '01:00 PM', timeAr: '١:٠٠ م', available: true },
  { time: '02:00 PM', timeAr: '٢:٠٠ م', available: true },
  { time: '03:00 PM', timeAr: '٣:٠٠ م', available: true },
  { time: '04:00 PM', timeAr: '٤:٠٠ م', available: true },
  { time: '05:00 PM', timeAr: '٥:٠٠ م', available: false },
];

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedType?: string;
}

export default function BookingSystem({ isOpen, onClose, preselectedType }: BookingSystemProps) {
  const { language, isRTL } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>(preselectedType || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    consultationType: '',
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDates = generateAvailableDates();

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setFormData(prev => ({ ...prev, consultationType: typeId }));
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setFormData(prev => ({ ...prev, date: dateStr }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData(prev => ({ ...prev, time }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Create email content for booking
    const consultationType = consultationTypes.find(t => t.id === selectedType);
    const emailSubject = `[CauseWay Booking] ${consultationType?.name || 'Consultation'} - ${formData.name}`;
    const emailBody = `
New Consultation Booking Request
================================

Consultation Type: ${consultationType?.name || 'Not specified'}
Date: ${selectedDate}
Time: ${selectedTime}

Client Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company}
- Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message || 'None'}

================================
Sent from CauseWay Website Booking System
    `.trim();
    
    // Open mailto link to send email to partnerships@causewaygrp.com
    const mailtoLink = `mailto:partnerships@causewaygrp.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
    
    // Short delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast.success(
      language === 'ar' 
        ? 'تم فتح تطبيق البريد. يرجى إرسال الرسالة لتأكيد الحجز.' 
        : 'Email app opened. Please send the message to confirm your booking.'
    );
    
    setIsSubmitting(false);
    setStep(5); // Success step
  };

  const canProceedStep1 = selectedType !== '';
  const canProceedStep2 = selectedDate !== '' && selectedTime !== '';
  const canProceedStep3 = formData.name && formData.email && formData.company;

  const selectedTypeData = consultationTypes.find(t => t.id === selectedType);

  if (!isOpen) return null;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const BackArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-[#faf9f6] rounded-2xl shadow-2xl"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#133129] to-[#224B40] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#faf9f6]">
                {language === 'ar' ? 'حجز استشارة' : 'Book a Consultation'}
              </h2>
              <p className="text-[#faf9f6]/70 text-sm mt-1">
                {language === 'ar' 
                  ? 'اختر نوع الاستشارة والموعد المناسب لك' 
                  : 'Select your consultation type and preferred time'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-[#faf9f6]" />
            </button>
          </div>

          {/* Progress Steps */}
          {step < 5 && (
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step === s 
                      ? 'bg-[#d4a84b] text-[#133129]' 
                      : step > s 
                        ? 'bg-[#d4a84b]/30 text-[#d4a84b]' 
                        : 'bg-white/10 text-white/50'
                  }`}>
                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-12 h-0.5 mx-1 ${
                      step > s ? 'bg-[#d4a84b]/50' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Step 1: Select Consultation Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#133129] mb-4">
                {language === 'ar' ? 'اختر نوع الاستشارة' : 'Select Consultation Type'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`p-5 rounded-xl border-2 text-start transition-all ${
                      selectedType === type.id
                        ? 'border-[#d4a84b] bg-[#d4a84b]/5 shadow-lg'
                        : 'border-[#133129]/10 hover:border-[#133129]/30 hover:bg-[#133129]/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg border ${type.color}`}>
                        {type.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#133129]">
                            {language === 'ar' ? type.nameAr : type.name}
                          </h4>
                          <span className="text-sm text-[#133129]/60 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {language === 'ar' ? type.durationAr : type.duration}
                          </span>
                        </div>
                        <p className="text-sm text-[#133129]/70 mt-2 leading-relaxed">
                          {language === 'ar' ? type.descriptionAr : type.description}
                        </p>
                      </div>
                    </div>
                    {selectedType === type.id && (
                      <div className="mt-3 pt-3 border-t border-[#d4a84b]/20">
                        <span className="text-sm text-[#d4a84b] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          {language === 'ar' ? 'تم الاختيار' : 'Selected'}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#133129] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#d4a84b]" />
                  {language === 'ar' ? 'اختر التاريخ' : 'Select Date'}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {availableDates.map((dateObj, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDateSelect(dateObj.formatted)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        selectedDate === dateObj.formatted
                          ? 'border-[#d4a84b] bg-[#d4a84b] text-[#133129]'
                          : 'border-[#133129]/10 hover:border-[#133129]/30'
                      }`}
                    >
                      <div className="text-xs font-medium opacity-70">
                        {language === 'ar' ? dateObj.dayNameAr : dateObj.dayName.slice(0, 3)}
                      </div>
                      <div className="text-sm font-semibold mt-1">
                        {language === 'ar' ? dateObj.formattedAr : dateObj.formatted}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#133129] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#d4a84b]" />
                  {language === 'ar' ? 'اختر الوقت' : 'Select Time'}
                  <span className="text-sm font-normal text-[#133129]/60">
                    ({language === 'ar' ? 'توقيت صنعاء GMT+3' : 'Sana\'a Time GMT+3'})
                  </span>
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {timeSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        !slot.available
                          ? 'border-[#133129]/5 bg-[#133129]/5 text-[#133129]/30 cursor-not-allowed'
                          : selectedTime === slot.time
                            ? 'border-[#d4a84b] bg-[#d4a84b] text-[#133129]'
                            : 'border-[#133129]/10 hover:border-[#133129]/30'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {language === 'ar' ? slot.timeAr : slot.time}
                      </div>
                      {!slot.available && (
                        <div className="text-xs mt-1 opacity-50">
                          {language === 'ar' ? 'غير متاح' : 'Unavailable'}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Your Details */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-[#133129] mb-4">
                {language === 'ar' ? 'معلوماتك' : 'Your Details'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#133129] mb-2">
                    <User className="w-4 h-4 inline-block mr-1" />
                    {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    className="w-full px-4 py-3 rounded-lg border border-[#133129]/20 focus:border-[#d4a84b] focus:ring-2 focus:ring-[#d4a84b]/20 outline-none transition-all bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#133129] mb-2">
                    <Mail className="w-4 h-4 inline-block mr-1" />
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    className="w-full px-4 py-3 rounded-lg border border-[#133129]/20 focus:border-[#d4a84b] focus:ring-2 focus:ring-[#d4a84b]/20 outline-none transition-all bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#133129] mb-2">
                    <Building2 className="w-4 h-4 inline-block mr-1" />
                    {language === 'ar' ? 'المؤسسة / الشركة' : 'Organization / Company'} *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'اسم المؤسسة أو الشركة' : 'Organization or company name'}
                    className="w-full px-4 py-3 rounded-lg border border-[#133129]/20 focus:border-[#d4a84b] focus:ring-2 focus:ring-[#d4a84b]/20 outline-none transition-all bg-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#133129] mb-2">
                    <Phone className="w-4 h-4 inline-block mr-1" />
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? '+967 xxx xxx xxx' : '+967 xxx xxx xxx'}
                    className="w-full px-4 py-3 rounded-lg border border-[#133129]/20 focus:border-[#d4a84b] focus:ring-2 focus:ring-[#d4a84b]/20 outline-none transition-all bg-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#133129] mb-2">
                  <MessageSquare className="w-4 h-4 inline-block mr-1" />
                  {language === 'ar' ? 'ما الذي تود مناقشته؟' : 'What would you like to discuss?'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={language === 'ar' 
                    ? 'أخبرنا المزيد عن احتياجاتك أو التحديات التي تواجهها...' 
                    : 'Tell us more about your needs or challenges you\'re facing...'}
                  className="w-full px-4 py-3 rounded-lg border border-[#133129]/20 focus:border-[#d4a84b] focus:ring-2 focus:ring-[#d4a84b]/20 outline-none transition-all bg-white resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && selectedTypeData && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#133129] mb-4">
                {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Your Booking'}
              </h3>
              
              <div className="bg-[#133129]/5 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-[#133129]/10">
                  <div className={`p-3 rounded-lg border ${selectedTypeData.color}`}>
                    {selectedTypeData.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#133129]">
                      {language === 'ar' ? selectedTypeData.nameAr : selectedTypeData.name}
                    </h4>
                    <p className="text-sm text-[#133129]/60">
                      {language === 'ar' ? selectedTypeData.durationAr : selectedTypeData.duration}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#133129]/60 mb-1">
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </div>
                    <div className="font-medium text-[#133129] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#d4a84b]" />
                      {selectedDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#133129]/60 mb-1">
                      {language === 'ar' ? 'الوقت' : 'Time'}
                    </div>
                    <div className="font-medium text-[#133129] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#d4a84b]" />
                      {selectedTime}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[#133129]/10">
                  <div className="text-sm text-[#133129]/60 mb-2">
                    {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                  </div>
                  <div className="space-y-1">
                    <div className="text-[#133129]">{formData.name}</div>
                    <div className="text-[#133129]/70 text-sm">{formData.email}</div>
                    <div className="text-[#133129]/70 text-sm">{formData.company}</div>
                  </div>
                </div>

                {formData.message && (
                  <div className="pt-4 border-t border-[#133129]/10">
                    <div className="text-sm text-[#133129]/60 mb-2">
                      {language === 'ar' ? 'ملاحظات' : 'Notes'}
                    </div>
                    <div className="text-[#133129]/80 text-sm">{formData.message}</div>
                  </div>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <Globe className="w-4 h-4 inline-block mr-1" />
                  {language === 'ar' 
                    ? 'ستتلقى رابط اجتماع Google Meet أو Zoom عبر البريد الإلكتروني بعد التأكيد.' 
                    : 'You will receive a Google Meet or Zoom link via email after confirmation.'}
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#133129] mb-3">
                {language === 'ar' ? 'تم الحجز بنجاح!' : 'Booking Confirmed!'}
              </h3>
              <p className="text-[#133129]/70 max-w-md mx-auto mb-6">
                {language === 'ar' 
                  ? 'شكراً لك! تم إرسال تأكيد الحجز إلى بريدك الإلكتروني مع تفاصيل الاجتماع.' 
                  : 'Thank you! A confirmation has been sent to your email with meeting details.'}
              </p>
              <div className="bg-[#133129]/5 rounded-xl p-6 max-w-sm mx-auto">
                <div className="text-sm text-[#133129]/60 mb-2">
                  {language === 'ar' ? 'موعدك القادم' : 'Your upcoming appointment'}
                </div>
                <div className="font-semibold text-[#133129]">
                  {selectedDate} • {selectedTime}
                </div>
                <div className="text-[#133129]/70 text-sm mt-1">
                  {language === 'ar' 
                    ? selectedTypeData?.nameAr 
                    : selectedTypeData?.name}
                </div>
              </div>
              <Button
                onClick={onClose}
                className="mt-8 bg-[#133129] hover:bg-[#224B40] text-white"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </Button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step < 5 && (
          <div className="px-6 py-4 bg-[#133129]/5 border-t border-[#133129]/10 flex items-center justify-between">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="border-[#133129]/20 text-[#133129]"
              >
                <BackArrowIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {language === 'ar' ? 'السابق' : 'Back'}
              </Button>
            ) : (
              <div />
            )}
            
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2) ||
                  (step === 3 && !canProceedStep3)
                }
                className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] disabled:opacity-50"
              >
                {language === 'ar' ? 'التالي' : 'Next'}
                <ArrowIcon className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#133129]/30 border-t-[#133129] rounded-full animate-spin mr-2" />
                    {language === 'ar' ? 'جاري الحجز...' : 'Booking...'}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking'}
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Export a hook for easy integration
export function useBookingSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<string | undefined>();

  const openBooking = (type?: string) => {
    setPreselectedType(type);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setPreselectedType(undefined);
  };

  return {
    isOpen,
    preselectedType,
    openBooking,
    closeBooking
  };
}
