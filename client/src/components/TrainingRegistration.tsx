import { useState, createContext, useContext } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, GraduationCap, Calendar, Clock, Users, MapPin, CheckCircle2, Building2, User, Mail, Phone, Briefcase, FileText, ChevronLeft, ChevronRight, Award, Globe, Video } from 'lucide-react';

// Training Registration Context
interface TrainingRegistrationContextType {
  isOpen: boolean;
  openRegistration: (program?: TrainingProgram) => void;
  closeRegistration: () => void;
  selectedProgram: TrainingProgram | null;
}

const TrainingRegistrationContext = createContext<TrainingRegistrationContextType | null>(null);

export const useTrainingRegistration = () => {
  const context = useContext(TrainingRegistrationContext);
  if (!context) {
    throw new Error('useTrainingRegistration must be used within TrainingRegistrationProvider');
  }
  return context;
};

interface TrainingProgram {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  durationAr: string;
  durationEn: string;
  formatAr: string;
  formatEn: string;
  dateAr: string;
  dateEn: string;
  locationAr: string;
  locationEn: string;
  price: number;
  currency: string;
  maxParticipants: number;
  currentParticipants: number;
  certification?: string;
  prerequisites?: string[];
}

// Sample training programs
const trainingPrograms: TrainingProgram[] = [
  {
    id: 'ifc-board',
    titleAr: 'برنامج عضو مجلس الإدارة المعتمد',
    titleEn: 'IFC Certified Board Director Program',
    categoryAr: 'القيادة والحوكمة',
    categoryEn: 'Leadership & Governance',
    descriptionAr: 'برنامج شامل لتأهيل أعضاء مجالس الإدارة وفق أفضل الممارسات الدولية ومعايير مؤسسة التمويل الدولية',
    descriptionEn: 'Comprehensive program to qualify board members according to international best practices and IFC standards',
    durationAr: '٥ أيام',
    durationEn: '5 Days',
    formatAr: 'حضوري',
    formatEn: 'In-Person',
    dateAr: '١٥-١٩ مارس ٢٠٢٦',
    dateEn: 'March 15-19, 2026',
    locationAr: 'دبي، الإمارات',
    locationEn: 'Dubai, UAE',
    price: 3500,
    currency: 'USD',
    maxParticipants: 25,
    currentParticipants: 18,
    certification: 'IFC Board Director Certificate',
    prerequisites: ['5+ years executive experience', 'Current or prospective board member']
  },
  {
    id: 'islamic-finance',
    titleAr: 'هندسة المنتجات المالية الإسلامية',
    titleEn: 'Islamic Financial Product Engineering',
    categoryAr: 'التمويل الإسلامي',
    categoryEn: 'Islamic Finance',
    descriptionAr: 'تصميم وهيكلة المنتجات المتوافقة مع الشريعة الإسلامية وفق معايير أيوفي',
    descriptionEn: 'Design and structure Sharia-compliant products according to AAOIFI standards',
    durationAr: '٣ أيام',
    durationEn: '3 Days',
    formatAr: 'هجين',
    formatEn: 'Hybrid',
    dateAr: '٢٢-٢٤ أبريل ٢٠٢٦',
    dateEn: 'April 22-24, 2026',
    locationAr: 'صنعاء / افتراضي',
    locationEn: 'Sanaa / Virtual',
    price: 1800,
    currency: 'USD',
    maxParticipants: 30,
    currentParticipants: 12,
    certification: 'CauseWay Islamic Finance Certificate',
    prerequisites: ['Banking or finance background']
  },
  {
    id: 'aml-cft',
    titleAr: 'مكافحة غسل الأموال وتمويل الإرهاب',
    titleEn: 'AML/CFT Compliance Framework',
    categoryAr: 'الامتثال والمخاطر',
    categoryEn: 'Compliance & Risk',
    descriptionAr: 'بناء أطر فعالة لمكافحة غسل الأموال وتمويل الإرهاب وفق معايير فاتف',
    descriptionEn: 'Building effective AML/CFT frameworks according to FATF standards',
    durationAr: '٤ أيام',
    durationEn: '4 Days',
    formatAr: 'افتراضي',
    formatEn: 'Virtual',
    dateAr: '٥-٨ مايو ٢٠٢٦',
    dateEn: 'May 5-8, 2026',
    locationAr: 'عبر الإنترنت',
    locationEn: 'Online',
    price: 1500,
    currency: 'USD',
    maxParticipants: 40,
    currentParticipants: 28,
    certification: 'ACAMS Preparation',
    prerequisites: ['Compliance or audit background']
  },
  {
    id: 'digital-banking',
    titleAr: 'التحول الرقمي للمؤسسات المالية',
    titleEn: 'Digital Transformation for Financial Institutions',
    categoryAr: 'التكنولوجيا المالية',
    categoryEn: 'FinTech',
    descriptionAr: 'استراتيجيات التحول الرقمي والأنظمة المصرفية الأساسية والأمن السيبراني',
    descriptionEn: 'Digital transformation strategies, core banking systems, and cybersecurity',
    durationAr: '٣ أيام',
    durationEn: '3 Days',
    formatAr: 'حضوري',
    formatEn: 'In-Person',
    dateAr: '١٠-١٢ يونيو ٢٠٢٦',
    dateEn: 'June 10-12, 2026',
    locationAr: 'عمّان، الأردن',
    locationEn: 'Amman, Jordan',
    price: 2200,
    currency: 'USD',
    maxParticipants: 20,
    currentParticipants: 8,
    certification: 'CauseWay Digital Banking Certificate'
  }
];

export const TrainingRegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);

  const openRegistration = (program?: TrainingProgram) => {
    setSelectedProgram(program || null);
    setIsOpen(true);
  };

  const closeRegistration = () => {
    setIsOpen(false);
    setSelectedProgram(null);
  };

  return (
    <TrainingRegistrationContext.Provider value={{ isOpen, openRegistration, closeRegistration, selectedProgram }}>
      {children}
      {isOpen && <TrainingRegistrationModal />}
    </TrainingRegistrationContext.Provider>
  );
};

const TrainingRegistrationModal = () => {
  const { language } = useLanguage();
  const { closeRegistration, selectedProgram } = useTrainingRegistration();
  const isArabic = language === 'ar';
  
  const [step, setStep] = useState(selectedProgram ? 2 : 1);
  const [selectedProgramState, setSelectedProgramState] = useState<TrainingProgram | null>(selectedProgram);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    participantCount: 1,
    specialRequirements: '',
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const content = {
    ar: {
      title: 'التسجيل في البرنامج التدريبي',
      subtitle: 'انضم إلى برامج أكاديمية كوزواي للتطوير المهني',
      step1: 'اختر البرنامج',
      step2: 'تفاصيل المشارك',
      step3: 'المراجعة والتأكيد',
      selectProgram: 'اختر البرنامج التدريبي',
      duration: 'المدة',
      format: 'الصيغة',
      date: 'التاريخ',
      location: 'الموقع',
      price: 'الرسوم',
      seats: 'المقاعد المتاحة',
      certification: 'الشهادة',
      prerequisites: 'المتطلبات',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      organization: 'المؤسسة',
      jobTitle: 'المسمى الوظيفي',
      participantCount: 'عدد المشاركين',
      specialRequirements: 'متطلبات خاصة (اختياري)',
      agreeTerms: 'أوافق على شروط التسجيل وسياسة الإلغاء',
      next: 'التالي',
      previous: 'السابق',
      submit: 'تأكيد التسجيل',
      submitting: 'جاري التسجيل...',
      reviewTitle: 'مراجعة التسجيل',
      programDetails: 'تفاصيل البرنامج',
      participantDetails: 'تفاصيل المشارك',
      totalCost: 'التكلفة الإجمالية',
      successTitle: 'تم التسجيل بنجاح!',
      successMessage: 'شكراً لتسجيلك في برنامج',
      successNote: 'سيتم إرسال تفاصيل الدفع والتأكيد إلى بريدك الإلكتروني خلال ٢٤ ساعة.',
      referenceNumber: 'رقم المرجع',
      close: 'إغلاق',
      inPerson: 'حضوري',
      virtual: 'افتراضي',
      hybrid: 'هجين',
      perPerson: 'للشخص'
    },
    en: {
      title: 'Training Program Registration',
      subtitle: 'Join CauseWay Academy professional development programs',
      step1: 'Select Program',
      step2: 'Participant Details',
      step3: 'Review & Confirm',
      selectProgram: 'Select Training Program',
      duration: 'Duration',
      format: 'Format',
      date: 'Date',
      location: 'Location',
      price: 'Fee',
      seats: 'Available Seats',
      certification: 'Certification',
      prerequisites: 'Prerequisites',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      organization: 'Organization',
      jobTitle: 'Job Title',
      participantCount: 'Number of Participants',
      specialRequirements: 'Special Requirements (Optional)',
      agreeTerms: 'I agree to the registration terms and cancellation policy',
      next: 'Next',
      previous: 'Previous',
      submit: 'Confirm Registration',
      submitting: 'Registering...',
      reviewTitle: 'Review Registration',
      programDetails: 'Program Details',
      participantDetails: 'Participant Details',
      totalCost: 'Total Cost',
      successTitle: 'Registration Successful!',
      successMessage: 'Thank you for registering for',
      successNote: 'Payment details and confirmation will be sent to your email within 24 hours.',
      referenceNumber: 'Reference Number',
      close: 'Close',
      inPerson: 'In-Person',
      virtual: 'Virtual',
      hybrid: 'Hybrid',
      perPerson: 'per person'
    }
  };

  const t = content[isArabic ? 'ar' : 'en'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const generateReferenceNumber = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'CW-TRN-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const getFormatIcon = (format: string) => {
    if (format.includes('حضوري') || format.includes('In-Person')) return <Building2 className="w-4 h-4" />;
    if (format.includes('افتراضي') || format.includes('Virtual')) return <Video className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  const canProceedStep1 = selectedProgramState !== null;
  const canProceedStep2 = formData.fullName && formData.email && formData.phone && formData.organization && formData.jobTitle && formData.agreeTerms;

  if (isComplete) {
    const refNumber = generateReferenceNumber();
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden ${isArabic ? 'rtl' : 'ltr'}`}>
          {/* Success Header */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t.successTitle}</h2>
            <p className="text-emerald-100">
              {t.successMessage} {isArabic ? selectedProgramState?.titleAr : selectedProgramState?.titleEn}
            </p>
          </div>
          
          {/* Success Body */}
          <div className="p-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-emerald-800 font-medium mb-2">{t.referenceNumber}</p>
              <p className="text-2xl font-mono font-bold text-emerald-900">{refNumber}</p>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">{t.successNote}</p>
            
            <button
              onClick={closeRegistration}
              className="w-full py-3 bg-[#1a4d3e] text-white rounded-xl font-medium hover:bg-[#143d31] transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden ${isArabic ? 'rtl' : 'ltr'}`}>
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a4d3e] to-[#2d6a4f] p-6 text-white relative">
          <button
            onClick={closeRegistration}
            className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">{t.title}</h2>
            <p className="text-emerald-200 text-sm mt-1">{t.subtitle}</p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= s ? 'bg-[#c9a227] text-[#1a4d3e]' : 'bg-white/20 text-white/60'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-1 rounded ${step > s ? 'bg-[#c9a227]' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 gap-8 text-xs text-emerald-200">
            <span className={step >= 1 ? 'text-white' : ''}>{t.step1}</span>
            <span className={step >= 2 ? 'text-white' : ''}>{t.step2}</span>
            <span className={step >= 3 ? 'text-white' : ''}>{t.step3}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Step 1: Select Program */}
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.selectProgram}</h3>
              <div className="grid gap-4">
                {trainingPrograms.map((program) => {
                  const isSelected = selectedProgramState?.id === program.id;
                  const availableSeats = program.maxParticipants - program.currentParticipants;
                  const isFull = availableSeats <= 0;
                  
                  return (
                    <button
                      key={program.id}
                      onClick={() => !isFull && setSelectedProgramState(program)}
                      disabled={isFull}
                      className={`p-4 rounded-xl border-2 text-start transition-all ${
                        isSelected 
                          ? 'border-[#1a4d3e] bg-emerald-50' 
                          : isFull 
                            ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                            : 'border-gray-200 hover:border-[#1a4d3e]/50 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs font-medium text-[#c9a227] bg-[#c9a227]/10 px-2 py-1 rounded">
                            {isArabic ? program.categoryAr : program.categoryEn}
                          </span>
                          <h4 className="font-semibold text-gray-900 mt-2">
                            {isArabic ? program.titleAr : program.titleEn}
                          </h4>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-[#1a4d3e]" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {isArabic ? program.descriptionAr : program.descriptionEn}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{isArabic ? program.durationAr : program.durationEn}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          {getFormatIcon(isArabic ? program.formatAr : program.formatEn)}
                          <span>{isArabic ? program.formatAr : program.formatEn}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{isArabic ? program.dateAr : program.dateEn}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{isArabic ? program.locationAr : program.locationEn}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-[#1a4d3e]">
                            ${program.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">{t.perPerson}</span>
                          </span>
                          {program.certification && (
                            <span className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
                              <Award className="w-3 h-3" />
                              {program.certification}
                            </span>
                          )}
                        </div>
                        <span className={`flex items-center gap-1 text-xs ${isFull ? 'text-red-600' : 'text-emerald-600'}`}>
                          <Users className="w-3.5 h-3.5" />
                          {isFull ? (isArabic ? 'مكتمل' : 'Full') : `${availableSeats} ${t.seats}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Participant Details */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.participantDetails}</h3>
              
              {/* Selected Program Summary */}
              {selectedProgramState && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#1a4d3e] rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {isArabic ? selectedProgramState.titleAr : selectedProgramState.titleEn}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {isArabic ? selectedProgramState.dateAr : selectedProgramState.dateEn} • {isArabic ? selectedProgramState.locationAr : selectedProgramState.locationEn}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <User className="w-4 h-4 inline mr-1" />
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Mail className="w-4 h-4 inline mr-1" />
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Building2 className="w-4 h-4 inline mr-1" />
                    {t.organization} *
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Briefcase className="w-4 h-4 inline mr-1" />
                    {t.jobTitle} *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Users className="w-4 h-4 inline mr-1" />
                    {t.participantCount}
                  </label>
                  <select
                    name="participantCount"
                    value={formData.participantCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <FileText className="w-4 h-4 inline mr-1" />
                  {t.specialRequirements}
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] focus:border-transparent resize-none"
                />
              </div>
              
              <div className="mt-4">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-[#1a4d3e] border-gray-300 rounded focus:ring-[#1a4d3e]"
                  />
                  <span className="text-sm text-gray-600">{t.agreeTerms}</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && selectedProgramState && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.reviewTitle}</h3>
              
              {/* Program Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">{t.programDetails}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isArabic ? 'البرنامج' : 'Program'}</span>
                    <span className="font-medium">{isArabic ? selectedProgramState.titleAr : selectedProgramState.titleEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.date}</span>
                    <span>{isArabic ? selectedProgramState.dateAr : selectedProgramState.dateEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.location}</span>
                    <span>{isArabic ? selectedProgramState.locationAr : selectedProgramState.locationEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.format}</span>
                    <span>{isArabic ? selectedProgramState.formatAr : selectedProgramState.formatEn}</span>
                  </div>
                </div>
              </div>
              
              {/* Participant Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">{t.participantDetails}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.fullName}</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.email}</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.organization}</span>
                    <span>{formData.organization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.participantCount}</span>
                    <span>{formData.participantCount}</span>
                  </div>
                </div>
              </div>
              
              {/* Total Cost */}
              <div className="bg-[#1a4d3e] text-white rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-200">{t.totalCost}</span>
                  <span className="text-2xl font-bold">
                    ${(selectedProgramState.price * formData.participantCount).toLocaleString()} {selectedProgramState.currency}
                  </span>
                </div>
                <p className="text-xs text-emerald-300 mt-1">
                  ${selectedProgramState.price.toLocaleString()} × {formData.participantCount} {isArabic ? 'مشارك' : 'participant(s)'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isArabic ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              {t.previous}
            </button>
          ) : (
            <div />
          )}
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a4d3e] text-white rounded-lg font-medium hover:bg-[#143d31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.next}
              {isArabic ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a227] text-[#1a4d3e] rounded-lg font-medium hover:bg-[#b8922a] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? t.submitting : t.submit}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingRegistrationModal;
