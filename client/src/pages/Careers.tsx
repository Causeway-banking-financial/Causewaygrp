/**
 * CauseWay Careers Page
 * Design: Institutional Arabesque Modernism
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  GraduationCap,
  Building2,
  ChevronRight,
  ChevronDown,
  Send,
  Upload,
  CheckCircle,
  Globe,
  Heart,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/FileUpload';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Islamic Finance Consultant',
    titleAr: 'مستشار أول للتمويل الإسلامي',
    department: 'Islamic Finance',
    departmentAr: 'التمويل الإسلامي',
    location: 'Aden, Yemen',
    locationAr: 'عدن، اليمن',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    experience: '7+ years',
    experienceAr: '+7 سنوات',
    description: 'Lead Sharia-compliant product development and Islamic banking transformation projects for regional financial institutions.',
    descriptionAr: 'قيادة مشاريع تطوير المنتجات المتوافقة مع الشريعة وتحويل البنوك الإسلامية للمؤسسات المالية الإقليمية.',
    requirements: [
      'Master\'s degree in Islamic Finance, Economics, or related field',
      'AAOIFI certification or equivalent',
      'Experience with Sukuk structuring and Islamic treasury products',
      'Fluency in Arabic and English'
    ],
    requirementsAr: [
      'درجة الماجستير في التمويل الإسلامي أو الاقتصاد أو مجال ذي صلة',
      'شهادة أيوفي أو ما يعادلها',
      'خبرة في هيكلة الصكوك ومنتجات الخزينة الإسلامية',
      'إتقان اللغتين العربية والإنجليزية'
    ]
  },
  {
    id: 2,
    title: 'AML/CFT Compliance Specialist',
    titleAr: 'أخصائي امتثال مكافحة غسل الأموال',
    department: 'Risk & Compliance',
    departmentAr: 'المخاطر والامتثال',
    location: 'Aden, Yemen / Remote',
    locationAr: 'عدن، اليمن / عن بُعد',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    experience: '5+ years',
    experienceAr: '+5 سنوات',
    description: 'Develop and implement AML/CFT frameworks for banks and financial institutions operating in high-risk environments.',
    descriptionAr: 'تطوير وتنفيذ أطر مكافحة غسل الأموال وتمويل الإرهاب للبنوك والمؤسسات المالية العاملة في بيئات عالية المخاطر.',
    requirements: [
      'Bachelor\'s degree in Law, Finance, or related field',
      'CAMS or equivalent certification',
      'Experience with FATF guidelines and regional regulations',
      'Strong analytical and report writing skills'
    ],
    requirementsAr: [
      'درجة البكالوريوس في القانون أو المالية أو مجال ذي صلة',
      'شهادة CAMS أو ما يعادلها',
      'خبرة في إرشادات فاتف واللوائح الإقليمية',
      'مهارات تحليلية قوية وكتابة التقارير'
    ]
  },
  {
    id: 3,
    title: 'Core Banking Systems Analyst',
    titleAr: 'محلل أنظمة مصرفية أساسية',
    department: 'Technology',
    departmentAr: 'التكنولوجيا',
    location: 'Aden, Yemen',
    locationAr: 'عدن، اليمن',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    experience: '4+ years',
    experienceAr: '+4 سنوات',
    description: 'Support digital transformation initiatives and core banking system implementations for regional banks.',
    descriptionAr: 'دعم مبادرات التحول الرقمي وتنفيذ أنظمة البنوك الأساسية للبنوك الإقليمية.',
    requirements: [
      'Bachelor\'s degree in Computer Science or Information Systems',
      'Experience with T24, Flexcube, or similar CBS platforms',
      'Knowledge of banking operations and workflows',
      'Project management experience preferred'
    ],
    requirementsAr: [
      'درجة البكالوريوس في علوم الحاسوب أو نظم المعلومات',
      'خبرة في T24 أو Flexcube أو منصات CBS مماثلة',
      'معرفة بالعمليات المصرفية وسير العمل',
      'يفضل خبرة في إدارة المشاريع'
    ]
  },
  {
    id: 4,
    title: 'Research Analyst - YETO Observatory',
    titleAr: 'محلل أبحاث - مرصد يتو',
    department: 'Research',
    departmentAr: 'الأبحاث',
    location: 'Remote',
    locationAr: 'عن بُعد',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    experience: '3+ years',
    experienceAr: '+3 سنوات',
    description: 'Conduct economic research and data analysis for the Yemen Economic Transparency Observatory (YETO) platform.',
    descriptionAr: 'إجراء البحوث الاقتصادية وتحليل البيانات لمنصة المرصد اليمني للشفافية الاقتصادية (يتو).',
    requirements: [
      'Master\'s degree in Economics, Development Studies, or related field',
      'Experience with economic data analysis and visualization',
      'Knowledge of Yemen\'s economic landscape',
      'Strong writing skills in Arabic and English'
    ],
    requirementsAr: [
      'درجة الماجستير في الاقتصاد أو دراسات التنمية أو مجال ذي صلة',
      'خبرة في تحليل البيانات الاقتصادية والتصور',
      'معرفة بالمشهد الاقتصادي اليمني',
      'مهارات كتابة قوية بالعربية والإنجليزية'
    ]
  },
  {
    id: 5,
    title: 'Microfinance Development Officer',
    titleAr: 'مسؤول تطوير التمويل الأصغر',
    department: 'Microfinance',
    departmentAr: 'التمويل الأصغر',
    location: 'Aden, Yemen',
    locationAr: 'عدن، اليمن',
    type: 'Full-time',
    typeAr: 'دوام كامل',
    experience: '4+ years',
    experienceAr: '+4 سنوات',
    description: 'Support MFI establishment, capacity building, and product development initiatives across Yemen.',
    descriptionAr: 'دعم إنشاء مؤسسات التمويل الأصغر وبناء القدرات ومبادرات تطوير المنتجات في جميع أنحاء اليمن.',
    requirements: [
      'Bachelor\'s degree in Finance, Economics, or Development Studies',
      'Experience with microfinance operations and regulations',
      'Knowledge of financial inclusion best practices',
      'Field experience in Yemen or similar contexts preferred'
    ],
    requirementsAr: [
      'درجة البكالوريوس في المالية أو الاقتصاد أو دراسات التنمية',
      'خبرة في عمليات ولوائح التمويل الأصغر',
      'معرفة بأفضل ممارسات الشمول المالي',
      'يفضل الخبرة الميدانية في اليمن أو سياقات مماثلة'
    ]
  }
];

const benefits = [
  {
    icon: Globe,
    title: 'Regional Impact',
    titleAr: 'تأثير إقليمي',
    description: 'Work on transformative projects that shape Yemen\'s financial sector.',
    descriptionAr: 'العمل على مشاريع تحويلية تشكل القطاع المالي اليمني.'
  },
  {
    icon: GraduationCap,
    title: 'Professional Development',
    titleAr: 'التطوير المهني',
    description: 'Access to certifications, training, and continuous learning opportunities.',
    descriptionAr: 'الوصول إلى الشهادات والتدريب وفرص التعلم المستمر.'
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    titleAr: 'التوازن بين العمل والحياة',
    description: 'Flexible arrangements and remote work options for eligible roles.',
    descriptionAr: 'ترتيبات مرنة وخيارات العمل عن بُعد للأدوار المؤهلة.'
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    titleAr: 'النمو الوظيفي',
    description: 'Clear progression paths and mentorship from industry experts.',
    descriptionAr: 'مسارات تقدم واضحة وإرشاد من خبراء الصناعة.'
  },
  {
    icon: Shield,
    title: 'Competitive Benefits',
    titleAr: 'مزايا تنافسية',
    description: 'Comprehensive health coverage, retirement plans, and performance bonuses.',
    descriptionAr: 'تغطية صحية شاملة وخطط تقاعد ومكافآت أداء.'
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    titleAr: 'ثقافة تعاونية',
    description: 'Join a diverse team of experts committed to ethical finance.',
    descriptionAr: 'انضم إلى فريق متنوع من الخبراء الملتزمين بالتمويل الأخلاقي.'
  }
];

export default function Careers() {
  const { language, isRTL } = useLanguage();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    linkedin: '',
    coverLetter: '',
    honeypot: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.honeypot) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const toggleJob = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-[#133129]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a84b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'انضم إلى فريقنا' : 'Join Our Team'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#faf9f6] mt-4 mb-6" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'وظائف في كوزواي' : 'Careers at CauseWay'}
            </h1>
            <p className="text-lg md:text-xl text-[#faf9f6]/80 leading-relaxed" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "inherit" }}>
              {language === 'ar' 
                ? 'انضم إلى فريق من الخبراء الملتزمين ببناء أنظمة مالية قائمة على الشريعة وآمنة حوكميًا في المنطقة.'
                : 'Join a team of experts committed to building Sharia-grounded, governance-safe financial systems across the region.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'لماذا كوزواي' : 'Why CauseWay'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'لماذا تنضم إلينا؟' : 'Why Join Us?'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نحن نقدم بيئة عمل فريدة تجمع بين التأثير الإقليمي والنمو المهني.'
                : 'We offer a unique work environment that combines regional impact with professional growth.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-[#e8e7e0] hover:shadow-md hover:border-[#d4a84b]/30 transition-all"
              >
                <div className="w-12 h-12 bg-[#133129]/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#224B40]" />
                </div>
                <h3 className="text-lg font-serif text-[#133129] mb-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? benefit.titleAr : benefit.title}
                </h3>
                <p className="text-[#406D61] text-sm leading-relaxed">
                  {language === 'ar' ? benefit.descriptionAr : benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'الفرص المتاحة' : 'Open Positions'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'الوظائف الشاغرة' : 'Current Openings'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف الفرص الوظيفية المتاحة وانضم إلى فريقنا المتنامي.'
                : 'Explore available opportunities and join our growing team.'
              }
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {jobOpenings.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-[#faf9f6] rounded-lg border border-[#e8e7e0] overflow-hidden"
              >
                <button
                  onClick={() => toggleJob(job.id)}
                  className="w-full p-5 md:p-6 flex items-center justify-between text-left hover:bg-[#f5f5f0] transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-serif text-[#133129] mb-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
                      {language === 'ar' ? job.titleAr : job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-[#406D61]">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {language === 'ar' ? job.departmentAr : job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {language === 'ar' ? job.locationAr : job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {language === 'ar' ? job.typeAr : job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {language === 'ar' ? job.experienceAr : job.experience}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#406D61] transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 md:px-6 pb-5 md:pb-6 border-t border-[#e8e7e0]"
                  >
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[#133129] mb-2">
                          {language === 'ar' ? 'الوصف الوظيفي' : 'Job Description'}
                        </h4>
                        <p className="text-[#406D61] text-sm leading-relaxed">
                          {language === 'ar' ? job.descriptionAr : job.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-[#133129] mb-2">
                          {language === 'ar' ? 'المتطلبات' : 'Requirements'}
                        </h4>
                        <ul className="space-y-2">
                          {(language === 'ar' ? job.requirementsAr : job.requirements).map((req, index) => (
                            <li key={index} className="flex items-start gap-2 text-[#406D61] text-sm">
                              <CheckCircle className="w-4 h-4 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold mt-4"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, position: language === 'ar' ? job.titleAr : job.title }));
                          document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {language === 'ar' ? 'تقدم الآن' : 'Apply Now'}
                        <ChevronRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-16 md:py-24 bg-[#133129]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
                {language === 'ar' ? 'نموذج التقديم' : 'Application Form'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3 mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'قدم طلبك' : 'Submit Your Application'}
              </h2>
              <p className="text-[#faf9f6]/70">
                {language === 'ar' 
                  ? 'أرسل سيرتك الذاتية وسنتواصل معك في أقرب وقت.'
                  : 'Send us your resume and we\'ll get back to you soon.'
                }
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#224B40] rounded-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-[#d4a84b]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#d4a84b]" />
                </div>
                <h3 className="text-xl font-serif text-[#faf9f6] mb-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? 'تم استلام طلبك!' : 'Application Received!'}
                </h3>
                <p className="text-[#faf9f6]/70">
                  {language === 'ar' 
                    ? 'شكرًا لاهتمامك بالانضمام إلى كوزواي. سنراجع طلبك ونتواصل معك قريبًا.'
                    : 'Thank you for your interest in joining CauseWay. We\'ll review your application and get back to you soon.'
                  }
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#224B40]/50 rounded-lg p-6 md:p-8 space-y-6">
                {/* Honeypot field - hidden from users */}
                <div className="hidden" aria-hidden="true">
                  <Input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-[#faf9f6] mb-2 block">
                      {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-[#133129] border-[#406D61] text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:border-[#d4a84b]"
                      placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-[#faf9f6] mb-2 block">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-[#133129] border-[#406D61] text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:border-[#d4a84b]"
                      placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-[#faf9f6] mb-2 block">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-[#133129] border-[#406D61] text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:border-[#d4a84b]"
                      placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position" className="text-[#faf9f6] mb-2 block">
                      {language === 'ar' ? 'الوظيفة المطلوبة' : 'Position Applied For'} *
                    </Label>
                    <Input
                      id="position"
                      type="text"
                      required
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="bg-[#133129] border-[#406D61] text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:border-[#d4a84b]"
                      placeholder={language === 'ar' ? 'اسم الوظيفة' : 'Position title'}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedin" className="text-[#faf9f6] mb-2 block">
                    {language === 'ar' ? 'رابط LinkedIn' : 'LinkedIn Profile'}
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="bg-[#133129] border-[#406D61] text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:border-[#d4a84b]"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Resume/CV Upload */}
                <div className="bg-[#133129] border border-[#406D61] rounded-xl p-6">
                  <FileUpload
                    onFileSelect={(file) => setResumeFile(file)}
                    acceptedTypes={['.pdf', '.doc', '.docx']}
                    maxSizeMB={10}
                    label="Upload your CV/Resume"
                    labelAr="ارفع سيرتك الذاتية"
                    required={true}
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter" className="text-[#faf9f6] mb-2 block">
                    {language === 'ar' ? 'خطاب التقديم' : 'Cover Letter'} *
                  </Label>
                  <Textarea
                    id="coverLetter"
                    required
                    rows={5}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    className="bg-[#133129] border-[#406D61] text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:border-[#d4a84b] resize-none"
                    placeholder={language === 'ar' 
                      ? 'أخبرنا عن نفسك ولماذا تريد الانضمام إلى كوزواي...'
                      : 'Tell us about yourself and why you want to join CauseWay...'
                    }
                  />
                </div>

                <div className="text-center pt-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6 text-base min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-[#faf9f6]/50 text-xs mt-4">
                    {language === 'ar' 
                      ? 'بإرسال هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا.'
                      : 'By submitting this form, you agree to our Privacy Policy.'
                    }
                    <Link href="/privacy" className="text-[#d4a84b] hover:underline mx-1">
                      {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                    </Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'لم تجد الوظيفة المناسبة؟' : 'Don\'t See the Right Role?'}
            </h2>
            <p className="text-[#406D61] mb-6">
              {language === 'ar' 
                ? 'نحن دائمًا نبحث عن مواهب استثنائية. أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرص مناسبة.'
                : 'We\'re always looking for exceptional talent. Send us your resume and we\'ll reach out when the right opportunity arises.'
              }
            </p>
            <Link href="/contact">
              <Button variant="outline" className="border-[#224B40] text-[#224B40] hover:bg-[#224B40] hover:text-[#faf9f6]">
                {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
