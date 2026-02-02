/**
 * CauseWay Learning Hub - Free Training, Capacity Building & Industry Opportunities
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Premium design with image backgrounds matching the Insights cards style
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Download, 
  FileText,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Globe,
  Play,
  ExternalLink,
  Briefcase,
  Building2,
  Target,
  TrendingUp,
  Shield,
  CheckCircle2,
  Star,
  Zap,
  Video,
  Headphones,
  FileCheck,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';
import { useLanguage } from '@/contexts/LanguageContext';

// Free training courses
const freeTrainingCourses = [
  {
    id: 'islamic-finance-fundamentals',
    title: 'Islamic Finance Fundamentals',
    titleAr: 'أساسيات التمويل الإسلامي',
    description: 'Master the core principles of Sharia-compliant finance including Murabaha, Ijara, Musharaka, and Sukuk structures.',
    descriptionAr: 'إتقان المبادئ الأساسية للتمويل المتوافق مع الشريعة بما في ذلك هياكل المرابحة والإجارة والمشاركة والصكوك.',
    duration: '8 hours',
    durationAr: '8 ساعات',
    modules: 12,
    level: 'Beginner',
    levelAr: 'مبتدئ',
    image: '/images/financial-district.png',
    category: 'Islamic Finance',
    categoryAr: 'التمويل الإسلامي',
    instructor: 'Dr. Ahmed Al-Rashid',
    instructorAr: 'د. أحمد الراشد',
    enrolled: 1247,
    rating: 4.8,
    certificate: true,
    topics: [
      'AAOIFI Standards Overview',
      'Murabaha & Tawarruq Structures',
      'Ijara & Ijara Muntahia Bittamleek',
      'Sukuk Types & Issuance',
      'Sharia Board Governance'
    ],
    topicsAr: [
      'نظرة عامة على معايير أيوفي',
      'هياكل المرابحة والتورق',
      'الإجارة والإجارة المنتهية بالتمليك',
      'أنواع الصكوك وإصدارها',
      'حوكمة الهيئة الشرعية'
    ]
  },
  {
    id: 'aml-cft-compliance',
    title: 'AML/CFT Compliance Essentials',
    titleAr: 'أساسيات الامتثال لمكافحة غسل الأموال',
    description: 'Comprehensive training on anti-money laundering and counter-terrorism financing aligned with FATF recommendations.',
    descriptionAr: 'تدريب شامل على مكافحة غسل الأموال وتمويل الإرهاب وفقاً لتوصيات مجموعة العمل المالي.',
    duration: '6 hours',
    durationAr: '6 ساعات',
    modules: 8,
    level: 'Intermediate',
    levelAr: 'متوسط',
    image: '/images/aden-aerial.jpg',
    category: 'Compliance',
    categoryAr: 'الامتثال',
    instructor: 'Sarah Al-Mansour',
    instructorAr: 'سارة المنصور',
    enrolled: 892,
    rating: 4.9,
    certificate: true,
    topics: [
      'FATF 40 Recommendations',
      'Customer Due Diligence (CDD)',
      'Suspicious Transaction Reporting',
      'Sanctions Screening',
      'Risk-Based Approach'
    ],
    topicsAr: [
      'توصيات فاتف الأربعين',
      'العناية الواجبة بالعملاء',
      'الإبلاغ عن المعاملات المشبوهة',
      'فحص العقوبات',
      'النهج القائم على المخاطر'
    ]
  },
  {
    id: 'corporate-governance',
    title: 'Corporate Governance for Banks',
    titleAr: 'الحوكمة المؤسسية للبنوك',
    description: 'Build audit-ready governance frameworks aligned with Basel Committee and local regulatory requirements.',
    descriptionAr: 'بناء أطر حوكمة جاهزة للتدقيق متوافقة مع لجنة بازل والمتطلبات التنظيمية المحلية.',
    duration: '10 hours',
    durationAr: '10 ساعات',
    modules: 15,
    level: 'Advanced',
    levelAr: 'متقدم',
    image: '/images/aden-city.jpg',
    category: 'Governance',
    categoryAr: 'الحوكمة',
    instructor: 'CauseWay Academy',
    instructorAr: 'أكاديمية كوزواي',
    enrolled: 654,
    rating: 4.7,
    certificate: true,
    topics: [
      'Board Composition & Effectiveness',
      'Risk Committee Structure',
      'Internal Audit Function',
      'Regulatory Reporting',
      'Stakeholder Management'
    ],
    topicsAr: [
      'تكوين مجلس الإدارة وفعاليته',
      'هيكل لجنة المخاطر',
      'وظيفة التدقيق الداخلي',
      'التقارير التنظيمية',
      'إدارة أصحاب المصلحة'
    ]
  },
  {
    id: 'microfinance-operations',
    title: 'Microfinance Operations & Impact',
    titleAr: 'عمليات التمويل الأصغر والأثر',
    description: 'Learn to design and manage microfinance programs that create sustainable economic impact in underserved communities.',
    descriptionAr: 'تعلم تصميم وإدارة برامج التمويل الأصغر التي تخلق أثراً اقتصادياً مستداماً في المجتمعات المحرومة.',
    duration: '5 hours',
    durationAr: '5 ساعات',
    modules: 7,
    level: 'Beginner',
    levelAr: 'مبتدئ',
    image: '/images/yemen-market.jpg',
    category: 'Microfinance',
    categoryAr: 'التمويل الأصغر',
    instructor: 'Yemen MFI Network',
    instructorAr: 'شبكة التمويل الأصغر اليمنية',
    enrolled: 1089,
    rating: 4.6,
    certificate: true,
    topics: [
      'Microfinance Business Models',
      'Client Assessment Methods',
      'Portfolio Risk Management',
      'Social Performance Metrics',
      'Digital Financial Services'
    ],
    topicsAr: [
      'نماذج أعمال التمويل الأصغر',
      'طرق تقييم العملاء',
      'إدارة مخاطر المحفظة',
      'مقاييس الأداء الاجتماعي',
      'الخدمات المالية الرقمية'
    ]
  }
];

// Industry opportunities
const industryOpportunities = [
  {
    id: 'cbay-internship',
    type: 'Internship',
    typeAr: 'تدريب',
    title: 'Central Bank of Yemen - Graduate Program',
    titleAr: 'البنك المركزي اليمني - برنامج الخريجين',
    organization: 'Central Bank of Yemen',
    organizationAr: 'البنك المركزي اليمني',
    location: 'Aden, Yemen',
    locationAr: 'عدن، اليمن',
    description: 'Annual graduate recruitment program for banking supervision, monetary policy, and financial stability roles.',
    descriptionAr: 'برنامج توظيف الخريجين السنوي للرقابة المصرفية والسياسة النقدية وأدوار الاستقرار المالي.',
    deadline: 'March 15, 2026',
    deadlineAr: '15 مارس 2026',
    status: 'Open',
    statusAr: 'مفتوح',
    url: 'https://www.centralbank.gov.ye/careers',
    featured: true
  },
  {
    id: 'isdb-fellowship',
    type: 'Fellowship',
    typeAr: 'زمالة',
    title: 'IsDB Young Professionals Program',
    titleAr: 'برنامج المهنيين الشباب - البنك الإسلامي للتنمية',
    organization: 'Islamic Development Bank',
    organizationAr: 'البنك الإسلامي للتنمية',
    location: 'Jeddah, Saudi Arabia',
    locationAr: 'جدة، المملكة العربية السعودية',
    description: 'Two-year rotational program for high-potential graduates in Islamic finance and development economics.',
    descriptionAr: 'برنامج تناوبي لمدة عامين للخريجين ذوي الإمكانات العالية في التمويل الإسلامي واقتصاديات التنمية.',
    deadline: 'April 30, 2026',
    deadlineAr: '30 أبريل 2026',
    status: 'Open',
    statusAr: 'مفتوح',
    url: 'https://www.isdb.org/careers',
    featured: true
  },
  {
    id: 'world-bank-consultant',
    type: 'Consultancy',
    typeAr: 'استشارات',
    title: 'World Bank - Financial Sector Specialist',
    titleAr: 'البنك الدولي - أخصائي القطاع المالي',
    organization: 'World Bank Group',
    organizationAr: 'مجموعة البنك الدولي',
    location: 'Remote / MENA Region',
    locationAr: 'عن بعد / منطقة الشرق الأوسط',
    description: 'Short-term consultancy opportunities for financial sector assessments in fragile and conflict-affected states.',
    descriptionAr: 'فرص استشارية قصيرة المدى لتقييمات القطاع المالي في الدول الهشة والمتأثرة بالصراعات.',
    deadline: 'Rolling',
    deadlineAr: 'مستمر',
    status: 'Ongoing',
    statusAr: 'مستمر',
    url: 'https://www.worldbank.org/en/about/careers',
    featured: false
  },
  {
    id: 'aaoifi-certification',
    type: 'Certification',
    typeAr: 'شهادة',
    title: 'AAOIFI Certified Islamic Professional Accountant',
    titleAr: 'محاسب إسلامي محترف معتمد من أيوفي',
    organization: 'AAOIFI',
    organizationAr: 'هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية',
    location: 'Online / Bahrain',
    locationAr: 'عبر الإنترنت / البحرين',
    description: 'Globally recognized certification for Islamic finance professionals. Exam offered twice yearly.',
    descriptionAr: 'شهادة معترف بها عالمياً لمحترفي التمويل الإسلامي. يُقدم الامتحان مرتين سنوياً.',
    deadline: 'June 1, 2026',
    deadlineAr: '1 يونيو 2026',
    status: 'Registration Open',
    statusAr: 'التسجيل مفتوح',
    url: 'https://aaoifi.com/certification',
    featured: true
  },
  {
    id: 'ifc-analyst',
    type: 'Employment',
    typeAr: 'توظيف',
    title: 'IFC Investment Analyst - MENA',
    titleAr: 'محلل استثمار - مؤسسة التمويل الدولية',
    organization: 'International Finance Corporation',
    organizationAr: 'مؤسسة التمويل الدولية',
    location: 'Cairo / Dubai',
    locationAr: 'القاهرة / دبي',
    description: 'Analyze investment opportunities in financial institutions across the MENA region.',
    descriptionAr: 'تحليل فرص الاستثمار في المؤسسات المالية عبر منطقة الشرق الأوسط وشمال أفريقيا.',
    deadline: 'February 28, 2026',
    deadlineAr: '28 فبراير 2026',
    status: 'Open',
    statusAr: 'مفتوح',
    url: 'https://www.ifc.org/careers',
    featured: false
  }
];

// Downloadable resources
const freeResources = [
  {
    title: 'Islamic Finance Product Structures Guide',
    titleAr: 'دليل هياكل منتجات التمويل الإسلامي',
    description: 'Comprehensive reference for Murabaha, Ijara, Sukuk, and other Sharia-compliant structures.',
    descriptionAr: 'مرجع شامل للمرابحة والإجارة والصكوك والهياكل الأخرى المتوافقة مع الشريعة.',
    type: 'PDF',
    pages: 45,
    icon: BookOpen
  },
  {
    title: 'AML/CFT Policy Template',
    titleAr: 'نموذج سياسة مكافحة غسل الأموال',
    description: 'Ready-to-customize anti-money laundering policy framework aligned with FATF standards.',
    descriptionAr: 'إطار سياسة مكافحة غسل الأموال جاهز للتخصيص ومتوافق مع معايير فاتف.',
    type: 'DOCX',
    pages: 28,
    icon: Shield
  },
  {
    title: 'Board Governance Checklist',
    titleAr: 'قائمة مراجعة حوكمة مجلس الإدارة',
    description: 'Essential governance practices for financial institution boards.',
    descriptionAr: 'ممارسات الحوكمة الأساسية لمجالس إدارة المؤسسات المالية.',
    type: 'PDF',
    pages: 12,
    icon: FileCheck
  },
  {
    title: 'Risk Assessment Matrix Template',
    titleAr: 'نموذج مصفوفة تقييم المخاطر',
    description: 'Operational risk assessment framework for banking institutions.',
    descriptionAr: 'إطار تقييم المخاطر التشغيلية للمؤسسات المصرفية.',
    type: 'XLSX',
    pages: 8,
    icon: Target
  }
];

// Webinars and events
const upcomingEvents = [
  {
    title: 'Yemen Banking Sector Outlook 2026',
    titleAr: 'توقعات القطاع المصرفي اليمني 2026',
    date: 'February 15, 2026',
    dateAr: '15 فبراير 2026',
    time: '2:00 PM GMT+3',
    timeAr: '2:00 مساءً بتوقيت عدن',
    type: 'Webinar',
    typeAr: 'ندوة عبر الإنترنت',
    speakers: ['Dr. Ahmed Al-Rashid', 'Sarah Al-Mansour'],
    speakersAr: ['د. أحمد الراشد', 'سارة المنصور'],
    free: true
  },
  {
    title: 'AAOIFI Standards Update Workshop',
    titleAr: 'ورشة تحديثات معايير أيوفي',
    date: 'March 5, 2026',
    dateAr: '5 مارس 2026',
    time: '10:00 AM GMT+3',
    timeAr: '10:00 صباحاً بتوقيت عدن',
    type: 'Workshop',
    typeAr: 'ورشة عمل',
    speakers: ['AAOIFI Technical Team'],
    speakersAr: ['الفريق الفني لأيوفي'],
    free: true
  },
  {
    title: 'Digital Transformation in MENA Banking',
    titleAr: 'التحول الرقمي في البنوك بمنطقة الشرق الأوسط',
    date: 'March 20, 2026',
    dateAr: '20 مارس 2026',
    time: '3:00 PM GMT+3',
    timeAr: '3:00 مساءً بتوقيت عدن',
    type: 'Panel Discussion',
    typeAr: 'حلقة نقاش',
    speakers: ['Industry Leaders Panel'],
    speakersAr: ['لجنة قادة الصناعة'],
    free: true
  }
];

export default function Learning() {
  const { language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'courses' | 'opportunities' | 'resources' | 'events'>('courses');

  const tabs = [
    { id: 'courses', label: 'Free Courses', labelAr: 'دورات مجانية', icon: GraduationCap },
    { id: 'opportunities', label: 'Industry Opportunities', labelAr: 'فرص الصناعة', icon: Briefcase },
    { id: 'resources', label: 'Free Resources', labelAr: 'موارد مجانية', icon: Download },
    { id: 'events', label: 'Events & Webinars', labelAr: 'الفعاليات والندوات', icon: Video }
  ];

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <YetoBanner variant="top" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-20 sm:pb-28">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/aden-aerial.jpg)',
              filter: 'brightness(0.3) saturate(0.8)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#133129]/90 via-[#133129]/70 to-[#133129]" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`max-w-4xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}
          >
            <span className="inline-block bg-[#d4a84b] text-[#133129] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              {language === 'ar' ? 'مجاني بالكامل' : '100% Free'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#faf9f6] mb-6" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
              {language === 'ar' ? 'مركز التعلم والفرص' : 'Learning & Opportunities Hub'}
            </h1>
            <p className="text-lg sm:text-xl text-[#faf9f6]/80 leading-relaxed max-w-3xl mx-auto mb-8" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
              {language === 'ar' 
                ? 'بناء القدرات المهنية في القطاع المالي والمصرفي. دورات مجانية، شهادات معتمدة، وفرص وظيفية من المؤسسات الرائدة إقليمياً ودولياً.'
                : 'Build your professional capabilities in the financial and banking sector. Free courses, recognized certifications, and career opportunities from leading regional and international institutions.'
              }
            </p>
            
            {/* Stats */}
            <div className={`flex flex-wrap justify-center gap-8 mt-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#d4a84b]">4+</div>
                <div className="text-[#faf9f6]/70 text-sm mt-1">{language === 'ar' ? 'دورات مجانية' : 'Free Courses'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#d4a84b]">3,800+</div>
                <div className="text-[#faf9f6]/70 text-sm mt-1">{language === 'ar' ? 'متعلم مسجل' : 'Enrolled Learners'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#d4a84b]">15+</div>
                <div className="text-[#faf9f6]/70 text-sm mt-1">{language === 'ar' ? 'فرصة متاحة' : 'Open Opportunities'}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#d4a84b]">100%</div>
                <div className="text-[#faf9f6]/70 text-sm mt-1">{language === 'ar' ? 'مجاني' : 'Free Access'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-4 bg-[#faf9f6] border-b border-[#133129]/10 sticky top-0 z-40">
        <div className="container">
          <div className={`flex flex-wrap gap-2 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#133129] text-[#faf9f6]'
                    : 'bg-white text-[#406D61] hover:bg-[#133129]/10 border border-[#133129]/20'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <tab.icon className="w-4 h-4" />
                {language === 'ar' ? tab.labelAr : tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Free Courses Tab */}
      {activeTab === 'courses' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                {language === 'ar' ? 'الدورات التدريبية المجانية' : 'Free Training Courses'}
              </h2>
              <p className="text-[#406D61] max-w-2xl">
                {language === 'ar' 
                  ? 'دورات احترافية مصممة من خبراء الصناعة. احصل على شهادة إتمام معتمدة مجاناً.'
                  : 'Professional courses designed by industry experts. Earn a recognized certificate of completion for free.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {freeTrainingCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${course.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#133129] via-[#133129]/70 to-[#133129]/30" />
                    
                    {/* Content */}
                    <div className={`absolute inset-0 p-6 flex flex-col justify-between ${isRTL ? 'text-right' : ''}`}>
                      {/* Top badges */}
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="bg-[#d4a84b] text-[#133129] text-xs font-bold px-3 py-1 rounded-full uppercase">
                          {language === 'ar' ? 'مجاني' : 'Free'}
                        </span>
                        <span className="bg-[#224B40] text-[#faf9f6] text-xs font-medium px-3 py-1 rounded-full">
                          {language === 'ar' ? course.categoryAr : course.category}
                        </span>
                        {course.certificate && (
                          <span className="bg-white/20 backdrop-blur-sm text-[#faf9f6] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {language === 'ar' ? 'شهادة' : 'Certificate'}
                          </span>
                        )}
                      </div>
                      
                      {/* Bottom content */}
                      <div>
                        <h3 className="text-2xl font-serif text-[#faf9f6] mb-3" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                          {language === 'ar' ? course.titleAr : course.title}
                        </h3>
                        <p className="text-[#faf9f6]/80 text-sm mb-4 line-clamp-2" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                          {language === 'ar' ? course.descriptionAr : course.description}
                        </p>
                        
                        {/* Meta info */}
                        <div className={`flex flex-wrap items-center gap-4 text-[#faf9f6]/70 text-sm mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Clock className="w-4 h-4" />
                            {language === 'ar' ? course.durationAr : course.duration}
                          </span>
                          <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <BookOpen className="w-4 h-4" />
                            {course.modules} {language === 'ar' ? 'وحدة' : 'modules'}
                          </span>
                          <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Users className="w-4 h-4" />
                            {course.enrolled.toLocaleString()} {language === 'ar' ? 'متعلم' : 'enrolled'}
                          </span>
                          <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Star className="w-4 h-4 text-[#d4a84b]" />
                            {course.rating}
                          </span>
                        </div>
                        
                        {/* CTA */}
                        <Button className={`bg-[#d4a84b] hover:bg-[#c49a3d] text-[#133129] font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {language === 'ar' ? 'ابدأ التعلم مجاناً' : 'Start Learning Free'}
                          <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industry Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                {language === 'ar' ? 'فرص الصناعة والتوظيف' : 'Industry & Career Opportunities'}
              </h2>
              <p className="text-[#406D61] max-w-2xl">
                {language === 'ar' 
                  ? 'فرص وظيفية وتدريبية وشهادات مهنية من المؤسسات المالية الرائدة إقليمياً ودولياً.'
                  : 'Career opportunities, internships, and professional certifications from leading regional and international financial institutions.'
                }
              </p>
            </div>

            {/* Featured Opportunities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {industryOpportunities.filter(o => o.featured).map((opportunity, index) => (
                <motion.a
                  key={opportunity.id}
                  href={opportunity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative bg-[#133129] p-6 rounded-2xl overflow-hidden hover:shadow-xl transition-all ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a84b]/10 rounded-full blur-3xl" />
                  
                  <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="bg-[#d4a84b] text-[#133129] text-xs font-bold px-3 py-1 rounded-full">
                        {language === 'ar' ? opportunity.typeAr : opportunity.type}
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full">
                        {language === 'ar' ? opportunity.statusAr : opportunity.status}
                      </span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-[#faf9f6]/50 group-hover:text-[#d4a84b] transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-serif text-[#faf9f6] mb-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                    {language === 'ar' ? opportunity.titleAr : opportunity.title}
                  </h3>
                  
                  <p className="text-[#faf9f6]/70 text-sm mb-4">
                    {language === 'ar' ? opportunity.descriptionAr : opportunity.description}
                  </p>
                  
                  <div className={`flex flex-wrap items-center gap-4 text-[#faf9f6]/60 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Building2 className="w-4 h-4" />
                      {language === 'ar' ? opportunity.organizationAr : opportunity.organization}
                    </span>
                    <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-4 h-4" />
                      {language === 'ar' ? opportunity.locationAr : opportunity.location}
                    </span>
                    <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      {language === 'ar' ? opportunity.deadlineAr : opportunity.deadline}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* All Opportunities List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`p-4 bg-[#133129]/5 border-b border-[#133129]/10 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="font-semibold text-[#133129]">
                  {language === 'ar' ? 'جميع الفرص المتاحة' : 'All Available Opportunities'}
                </h3>
              </div>
              <div className="divide-y divide-[#133129]/10">
                {industryOpportunities.map((opportunity) => (
                  <a
                    key={opportunity.id}
                    href={opportunity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-4 hover:bg-[#faf9f6] transition-colors ${isRTL ? 'text-right' : ''}`}
                  >
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="flex-1">
                        <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="text-xs font-medium text-[#d4a84b] bg-[#d4a84b]/10 px-2 py-0.5 rounded">
                            {language === 'ar' ? opportunity.typeAr : opportunity.type}
                          </span>
                          <span className={`text-xs ${opportunity.status === 'Open' || opportunity.status === 'Registration Open' ? 'text-emerald-600' : 'text-[#406D61]'}`}>
                            {language === 'ar' ? opportunity.statusAr : opportunity.status}
                          </span>
                        </div>
                        <h4 className="font-medium text-[#133129] mb-1">
                          {language === 'ar' ? opportunity.titleAr : opportunity.title}
                        </h4>
                        <div className={`flex items-center gap-3 text-xs text-[#406D61] ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span>{language === 'ar' ? opportunity.organizationAr : opportunity.organization}</span>
                          <span>•</span>
                          <span>{language === 'ar' ? opportunity.locationAr : opportunity.location}</span>
                          <span>•</span>
                          <span>{language === 'ar' ? `الموعد النهائي: ${opportunity.deadlineAr}` : `Deadline: ${opportunity.deadline}`}</span>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-[#406D61] ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Free Resources Tab */}
      {activeTab === 'resources' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                {language === 'ar' ? 'الموارد المجانية القابلة للتحميل' : 'Free Downloadable Resources'}
              </h2>
              <p className="text-[#406D61] max-w-2xl">
                {language === 'ar' 
                  ? 'قوالب وأدلة وأطر عمل احترافية لدعم عملك في القطاع المالي.'
                  : 'Professional templates, guides, and frameworks to support your work in the financial sector.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {freeResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-[#d4a84b]/30 cursor-pointer ${isRTL ? 'text-right' : ''}`}
                >
                  <div className={`w-14 h-14 bg-[#133129] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#224B40] transition-colors ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                    <resource.icon className="w-7 h-7 text-[#d4a84b]" />
                  </div>
                  <h3 className="font-semibold text-[#133129] mb-2">
                    {language === 'ar' ? resource.titleAr : resource.title}
                  </h3>
                  <p className="text-[#406D61] text-sm mb-4">
                    {language === 'ar' ? resource.descriptionAr : resource.description}
                  </p>
                  <div className={`flex items-center justify-between text-xs text-[#406D61] ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="bg-[#133129]/10 px-2 py-1 rounded">{resource.type}</span>
                    <span>{resource.pages} {language === 'ar' ? 'صفحة' : 'pages'}</span>
                  </div>
                  <Button variant="outline" className={`w-full mt-4 border-[#133129]/20 hover:bg-[#133129] hover:text-[#faf9f6] ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'تحميل مجاني' : 'Free Download'}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                {language === 'ar' ? 'الفعاليات والندوات القادمة' : 'Upcoming Events & Webinars'}
              </h2>
              <p className="text-[#406D61] max-w-2xl">
                {language === 'ar' 
                  ? 'انضم إلى ندواتنا المجانية وورش العمل مع خبراء الصناعة.'
                  : 'Join our free webinars and workshops with industry experts.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="bg-[#133129] p-4">
                    <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="bg-[#d4a84b] text-[#133129] text-xs font-bold px-3 py-1 rounded-full">
                        {language === 'ar' ? event.typeAr : event.type}
                      </span>
                      {event.free && (
                        <span className="text-emerald-400 text-xs font-medium">
                          {language === 'ar' ? 'مجاني' : 'Free'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-serif text-[#faf9f6] mt-3" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                      {language === 'ar' ? event.titleAr : event.title}
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className={`flex items-center gap-2 text-sm text-[#406D61] mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      {language === 'ar' ? event.dateAr : event.date}
                    </div>
                    <div className={`flex items-center gap-2 text-sm text-[#406D61] mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-4 h-4" />
                      {language === 'ar' ? event.timeAr : event.time}
                    </div>
                    <div className={`flex items-center gap-2 text-sm text-[#406D61] mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Users className="w-4 h-4" />
                      {(language === 'ar' ? event.speakersAr : event.speakers).join(', ')}
                    </div>
                    <Button className="w-full bg-[#133129] hover:bg-[#224B40] text-[#faf9f6]">
                      {language === 'ar' ? 'سجل الآن' : 'Register Now'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#133129]">
        <div className="container">
          <div className={`max-w-3xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}>
            <h2 className="text-3xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
              {language === 'ar' ? 'هل لديك فرصة للمشاركة؟' : 'Have an Opportunity to Share?'}
            </h2>
            <p className="text-[#faf9f6]/80 mb-8">
              {language === 'ar' 
                ? 'إذا كنت تمثل مؤسسة مالية أو تعليمية وترغب في نشر فرص وظيفية أو تدريبية، تواصل معنا.'
                : 'If you represent a financial or educational institution and want to post job or training opportunities, get in touch.'
              }
            </p>
            <Link href="/contact">
              <Button className="bg-[#d4a84b] hover:bg-[#c49a3d] text-[#133129] font-semibold px-8 py-3">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
