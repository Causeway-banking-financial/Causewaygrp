/**
 * Core Banking Systems Service Page
 * Design: Professional Banking Technology Theme
 * Features: Animated hero, impact statistics, colorful service cards, implementation timeline
 */

import { useState } from 'react';
import InquiryModal from '@/components/InquiryModal';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Server, 
  ChevronRight,
  Database,
  Cpu,
  Cloud,
  Shield,
  RefreshCw,
  Layers,
  Settings,
  CheckCircle,
  Building2,
  Globe,
  Lock,
  Zap,
  BarChart3,
  Users,
  Clock,
  Award,
  Workflow
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/App';

// Service areas with unique colors and icons
const serviceAreas = [
  {
    id: 'selection',
    icon: CheckCircle,
    titleEn: 'System Selection & Evaluation',
    titleAr: 'اختيار وتقييم الأنظمة',
    descEn: 'Vendor-neutral assessment and selection of core banking platforms tailored to your institution\'s needs and growth strategy.',
    descAr: 'تقييم واختيار محايد للأنظمة المصرفية الأساسية المصممة لاحتياجات مؤسستك واستراتيجية النمو.',
    detailsEn: [
      'Requirements analysis and documentation',
      'Vendor shortlisting and RFP management',
      'Technical and functional evaluation',
      'Total cost of ownership analysis',
      'Reference site visits and due diligence'
    ],
    detailsAr: [
      'تحليل وتوثيق المتطلبات',
      'إعداد قائمة الموردين وإدارة طلبات العروض',
      'التقييم الفني والوظيفي',
      'تحليل التكلفة الإجمالية للملكية',
      'زيارات المواقع المرجعية والعناية الواجبة'
    ],
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    id: 'implementation',
    icon: Workflow,
    titleEn: 'Implementation Management',
    titleAr: 'إدارة التنفيذ',
    descEn: 'End-to-end project management ensuring on-time, on-budget delivery with minimal operational disruption.',
    descAr: 'إدارة مشاريع شاملة تضمن التسليم في الوقت المحدد وضمن الميزانية مع الحد الأدنى من التعطيل التشغيلي.',
    detailsEn: [
      'Project planning and governance',
      'Stakeholder management',
      'Risk and issue management',
      'Quality assurance and testing',
      'Go-live planning and support'
    ],
    detailsAr: [
      'تخطيط المشروع والحوكمة',
      'إدارة أصحاب المصلحة',
      'إدارة المخاطر والمشكلات',
      'ضمان الجودة والاختبار',
      'تخطيط الإطلاق والدعم'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'digital',
    icon: Cloud,
    titleEn: 'Digital Transformation',
    titleAr: 'التحول الرقمي',
    descEn: 'Strategic roadmap for modernizing banking operations through digital channels, automation, and customer experience enhancement.',
    descAr: 'خارطة طريق استراتيجية لتحديث العمليات المصرفية من خلال القنوات الرقمية والأتمتة وتحسين تجربة العملاء.',
    detailsEn: [
      'Digital strategy development',
      'Channel integration (mobile, internet, ATM)',
      'Process automation and optimization',
      'Customer journey mapping',
      'Digital product development'
    ],
    detailsAr: [
      'تطوير الاستراتيجية الرقمية',
      'تكامل القنوات (الجوال، الإنترنت، الصراف الآلي)',
      'أتمتة وتحسين العمليات',
      'رسم خريطة رحلة العميل',
      'تطوير المنتجات الرقمية'
    ],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 'integration',
    icon: Layers,
    titleEn: 'System Integration',
    titleAr: 'تكامل الأنظمة',
    descEn: 'Seamless connectivity between core banking and peripheral systems including payments, treasury, and regulatory reporting.',
    descAr: 'ربط سلس بين النظام المصرفي الأساسي والأنظمة الفرعية بما في ذلك المدفوعات والخزينة والتقارير التنظيمية.',
    detailsEn: [
      'API design and development',
      'Middleware implementation',
      'Payment gateway integration',
      'Regulatory reporting interfaces',
      'Third-party system connectivity'
    ],
    detailsAr: [
      'تصميم وتطوير واجهات برمجة التطبيقات',
      'تنفيذ البرمجيات الوسيطة',
      'تكامل بوابات الدفع',
      'واجهات التقارير التنظيمية',
      'الاتصال بأنظمة الطرف الثالث'
    ],
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    id: 'legacy',
    icon: RefreshCw,
    titleEn: 'Legacy Modernization',
    titleAr: 'تحديث الأنظمة القديمة',
    descEn: 'Strategic approach to replacing or upgrading aging systems while maintaining business continuity and data integrity.',
    descAr: 'نهج استراتيجي لاستبدال أو ترقية الأنظمة القديمة مع الحفاظ على استمرارية الأعمال وسلامة البيانات.',
    detailsEn: [
      'Legacy system assessment',
      'Modernization roadmap development',
      'Phased migration planning',
      'Parallel running strategies',
      'Decommissioning support'
    ],
    detailsAr: [
      'تقييم الأنظمة القديمة',
      'تطوير خارطة طريق التحديث',
      'تخطيط الترحيل المرحلي',
      'استراتيجيات التشغيل المتوازي',
      'دعم إيقاف التشغيل'
    ],
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
  {
    id: 'migration',
    icon: Database,
    titleEn: 'Data Migration',
    titleAr: 'ترحيل البيانات',
    descEn: 'Comprehensive data migration services ensuring accuracy, completeness, and regulatory compliance throughout the transition.',
    descAr: 'خدمات ترحيل بيانات شاملة تضمن الدقة والاكتمال والامتثال التنظيمي طوال فترة الانتقال.',
    detailsEn: [
      'Data mapping and cleansing',
      'Migration strategy and planning',
      'Automated migration tools',
      'Data validation and reconciliation',
      'Historical data archiving'
    ],
    detailsAr: [
      'رسم خرائط البيانات وتنظيفها',
      'استراتيجية وتخطيط الترحيل',
      'أدوات الترحيل الآلية',
      'التحقق من البيانات والمطابقة',
      'أرشفة البيانات التاريخية'
    ],
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600'
  },
  {
    id: 'testing',
    icon: Shield,
    titleEn: 'Testing & Quality Assurance',
    titleAr: 'الاختبار وضمان الجودة',
    descEn: 'Rigorous testing methodologies covering functional, integration, performance, and user acceptance testing.',
    descAr: 'منهجيات اختبار صارمة تغطي الاختبار الوظيفي والتكامل والأداء واختبار قبول المستخدم.',
    detailsEn: [
      'Test strategy and planning',
      'Functional and regression testing',
      'Performance and stress testing',
      'Security testing',
      'User acceptance testing coordination'
    ],
    detailsAr: [
      'استراتيجية وتخطيط الاختبار',
      'الاختبار الوظيفي والانحدار',
      'اختبار الأداء والضغط',
      'اختبار الأمان',
      'تنسيق اختبار قبول المستخدم'
    ],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  },
  {
    id: 'support',
    icon: Settings,
    titleEn: 'Post-Implementation Support',
    titleAr: 'دعم ما بعد التنفيذ',
    descEn: 'Ongoing technical and functional support to ensure system stability, optimization, and continuous improvement.',
    descAr: 'دعم فني ووظيفي مستمر لضمان استقرار النظام والتحسين والتطوير المستمر.',
    detailsEn: [
      'Hypercare support',
      'Issue resolution and troubleshooting',
      'System optimization',
      'Knowledge transfer and training',
      'Continuous improvement recommendations'
    ],
    detailsAr: [
      'دعم الرعاية المكثفة',
      'حل المشكلات واستكشاف الأخطاء',
      'تحسين النظام',
      'نقل المعرفة والتدريب',
      'توصيات التحسين المستمر'
    ],
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600'
  }
];

// Implementation phases
const implementationPhases = [
  {
    phase: 1,
    titleEn: 'Discovery',
    titleAr: 'الاكتشاف',
    descEn: 'Requirements gathering and current state analysis',
    descAr: 'جمع المتطلبات وتحليل الوضع الحالي'
  },
  {
    phase: 2,
    titleEn: 'Design',
    titleAr: 'التصميم',
    descEn: 'Solution architecture and detailed specifications',
    descAr: 'هندسة الحلول والمواصفات التفصيلية'
  },
  {
    phase: 3,
    titleEn: 'Build',
    titleAr: 'البناء',
    descEn: 'Configuration, customization, and integration',
    descAr: 'التكوين والتخصيص والتكامل'
  },
  {
    phase: 4,
    titleEn: 'Test',
    titleAr: 'الاختبار',
    descEn: 'Comprehensive testing and quality assurance',
    descAr: 'الاختبار الشامل وضمان الجودة'
  },
  {
    phase: 5,
    titleEn: 'Deploy',
    titleAr: 'النشر',
    descEn: 'Go-live execution and stabilization',
    descAr: 'تنفيذ الإطلاق والاستقرار'
  }
];

// Impact statistics
const impactStats = [
  { 
    value: '15+', 
    labelEn: 'Banks Transformed', 
    labelAr: 'بنك تم تحويله',
    icon: Building2,
    color: 'text-emerald-500'
  },
  { 
    value: '99.9%', 
    labelEn: 'System Uptime', 
    labelAr: 'وقت تشغيل النظام',
    icon: Zap,
    color: 'text-blue-500'
  },
  { 
    value: '50+', 
    labelEn: 'Projects Delivered', 
    labelAr: 'مشروع تم تسليمه',
    icon: Award,
    color: 'text-amber-500'
  },
  { 
    value: '100%', 
    labelEn: 'On-Time Delivery', 
    labelAr: 'التسليم في الوقت المحدد',
    icon: Clock,
    color: 'text-purple-500'
  }
];

// Technology partners
const technologyPartners = [
  { nameEn: 'Temenos', nameAr: 'تيمينوس', icon: Server },
  { nameEn: 'Infosys Finacle', nameAr: 'إنفوسيس فيناكل', icon: Database },
  { nameEn: 'Oracle FLEXCUBE', nameAr: 'أوراكل فليكس كيوب', icon: Cpu },
  { nameEn: 'Path Solutions', nameAr: 'باث سوليوشنز', icon: Globe }
];

export default function CoreBanking() {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [inquiryModal, setInquiryModal] = useState<{ isOpen: boolean; serviceName: string; serviceNameAr: string }>({ isOpen: false, serviceName: '', serviceNameAr: '' });

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO 
        title={language === 'ar' ? 'الأنظمة المصرفية الأساسية' : 'Core Banking Systems'}
        description={language === 'ar' 
          ? 'اختيار الأنظمة، التحول الرقمي، خدمات التكامل، وتحديث الأنظمة القديمة للبنوك في اليمن والمنطقة.'
          : 'System selection, digital transformation, integration services, and legacy modernization for banks in Yemen and MENA.'
        }
        keywords="Core Banking, Digital Transformation, Banking Systems, Integration, Legacy Modernization, Yemen, MENA"
      />
      <Header />
      
      {/* Hero Section with Banking Technology Theme */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#133129] via-[#1a4a3d] to-[#224B40]">
        {/* Animated Background Elements - Banking/Technology Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Circuit-like pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 50 30 M 50 70 L 50 100 M 0 50 L 30 50 M 70 50 L 100 50" stroke="#d4a84b" strokeWidth="1" fill="none"/>
                <circle cx="50" cy="50" r="5" fill="#d4a84b"/>
                <circle cx="50" cy="30" r="3" fill="#d4a84b"/>
                <circle cx="50" cy="70" r="3" fill="#d4a84b"/>
                <circle cx="30" cy="50" r="3" fill="#d4a84b"/>
                <circle cx="70" cy="50" r="3" fill="#d4a84b"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
          
          {/* Floating technology icons */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4
              }}
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
              }}
            >
              {i % 5 === 0 ? (
                <Server className="w-6 h-6 text-[#d4a84b]/30" />
              ) : i % 5 === 1 ? (
                <Database className="w-5 h-5 text-emerald-400/30" />
              ) : i % 5 === 2 ? (
                <Cloud className="w-6 h-6 text-blue-400/30" />
              ) : i % 5 === 3 ? (
                <Lock className="w-5 h-5 text-[#d4a84b]/30" />
              ) : (
                <Cpu className="w-5 h-5 text-purple-400/30" />
              )}
            </motion.div>
          ))}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#133129] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/services" className={`inline-flex items-center text-[#d4a84b] hover:text-[#d4a84b]/80 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'ml-1 rotate-180' : 'mr-1 rotate-180'}`} />
                {language === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
              </Link>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'الأنظمة المصرفية الأساسية' : 'Core Banking Systems'}
              </h1>
              <p className="text-xl md:text-2xl text-[#d4a84b] mb-6 font-medium">
                {language === 'ar' ? 'Core Banking Systems' : 'الأنظمة المصرفية الأساسية'}
              </p>
              <p className="text-lg text-[#faf9f6]/80 mb-8 leading-relaxed max-w-xl">
                {language === 'ar' 
                  ? 'شريكك الموثوق في تحويل البنية التحتية المصرفية. من اختيار النظام إلى التنفيذ والدعم، نضمن أن تقنيتك تدعم أهداف أعمالك.'
                  : 'Your trusted partner in banking infrastructure transformation. From system selection to implementation and support, we ensure your technology enables your business objectives.'
                }
              </p>
              
              <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button 
                  onClick={() => openBooking('consultation')}
                  className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6 text-lg"
                >
                  {language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10 px-8 py-6 text-lg">
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right - Animated Server/Database Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-80 h-80">
                {/* Central server icon */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-2xl flex items-center justify-center shadow-2xl">
                    <Server className="w-16 h-16 text-[#133129]" />
                  </div>
                </motion.div>
                
                {/* Orbiting elements */}
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute w-14 h-14 bg-[#faf9f6]/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[#faf9f6]/20"
                    animate={{ 
                      rotate: [angle, angle + 360],
                    }}
                    transition={{ 
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      top: '50%',
                      left: '50%',
                      marginTop: '-28px',
                      marginLeft: '-28px',
                      transformOrigin: '28px 140px'
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [-angle, -angle - 360] }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                      {i === 0 && <Database className="w-6 h-6 text-emerald-400" />}
                      {i === 1 && <Cloud className="w-6 h-6 text-blue-400" />}
                      {i === 2 && <Shield className="w-6 h-6 text-amber-400" />}
                      {i === 3 && <Layers className="w-6 h-6 text-purple-400" />}
                      {i === 4 && <Globe className="w-6 h-6 text-cyan-400" />}
                    </motion.div>
                  </motion.div>
                ))}
                
                {/* Connection lines */}
                <div className="absolute inset-0 border-2 border-dashed border-[#d4a84b]/30 rounded-full" />
                <motion.div 
                  className="absolute inset-[-20px] border border-[#faf9f6]/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Impact Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#faf9f6]">
          <div className="container py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={stat.labelEn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#133129] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#406D61]">
                    {language === 'ar' ? stat.labelAr : stat.labelEn}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'حلول مصرفية شاملة' : 'Comprehensive Banking Solutions'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'انقر على أي بطاقة لاستكشاف تفاصيل خدماتنا المتخصصة'
                : 'Click any card to explore details of our specialized services'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAreas.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
                className={`
                  relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300
                  ${service.bgColor} ${service.borderColor} border-2
                  ${expandedCard === service.id ? 'ring-2 ring-offset-2 ring-[#d4a84b] scale-105 col-span-1 sm:col-span-2' : 'hover:scale-102 hover:shadow-lg'}
                `}
              >
                <div className="p-6">
                  <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#133129] mb-2">
                    {language === 'ar' ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-sm text-[#406D61] mb-4">
                    {language === 'ar' ? service.descAr : service.descEn}
                  </p>
                  
                  {/* Expanded Details */}
                  {expandedCard === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <h4 className="font-semibold text-[#133129] mb-3">
                        {language === 'ar' ? 'ما نقدمه:' : 'What we deliver:'}
                      </h4>
                      <ul className="space-y-2">
                        {(language === 'ar' ? service.detailsAr : service.detailsEn).map((detail, idx) => (
                          <li key={idx} className={`flex items-start gap-2 text-sm text-[#406D61] ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                            <CheckCircle className={`w-4 h-4 ${service.iconColor} flex-shrink-0 mt-0.5`} />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setInquiryModal({ isOpen: true, serviceName: service.titleEn, serviceNameAr: service.titleAr });
                        }}
                        className={`mt-4 bg-gradient-to-r ${service.color} text-white hover:opacity-90`}
                      >
                        {language === 'ar' ? 'استفسر الآن' : 'Inquire Now'}
                      </Button>
                    </motion.div>
                  )}
                  
                  {expandedCard !== service.id && (
                    <button className={`text-sm font-medium ${service.iconColor} hover:underline`}>
                      {language === 'ar' ? 'انقر للتفاصيل' : 'Click for details'}
                    </button>
                  )}
                </div>
                
                {/* Gradient accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-[#133129] via-[#1a4a3d] to-[#224B40]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'منهجيتنا' : 'Our Methodology'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'من الرؤية إلى التنفيذ' : 'From Vision to Execution'}
            </h2>
            <p className="text-[#faf9f6]/70 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نتبع منهجية مثبتة لضمان نجاح مشاريع التحول المصرفي'
                : 'We follow a proven methodology to ensure successful banking transformation projects'
              }
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#d4a84b]/30 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {implementationPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  {/* Phase number */}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-[#133129]">{phase.phase}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#faf9f6] mb-2">
                    {language === 'ar' ? phase.titleAr : phase.titleEn}
                  </h3>
                  <p className="text-sm text-[#faf9f6]/70">
                    {language === 'ar' ? phase.descAr : phase.descEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partners Section */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'خبرتنا التقنية' : 'Technical Expertise'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'منصات نعمل معها' : 'Platforms We Work With'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologyPartners.map((partner, index) => (
              <motion.div
                key={partner.nameEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-[#133129]/5 rounded-xl flex items-center justify-center">
                  <partner.icon className="w-7 h-7 text-[#224B40]" />
                </div>
                <h3 className="font-semibold text-[#133129]">
                  {language === 'ar' ? partner.nameAr : partner.nameEn}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
                {language === 'ar' ? 'لماذا نحن' : 'Why Choose Us'}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'شريكك في التحول المصرفي' : 'Your Banking Transformation Partner'}
              </h2>
              <div className="space-y-4">
                {[
                  { en: 'Vendor-neutral advisory with no platform bias', ar: 'استشارات محايدة بدون تحيز لأي منصة' },
                  { en: 'Deep expertise in Islamic banking modules', ar: 'خبرة عميقة في وحدات الصيرفة الإسلامية' },
                  { en: 'Regional market knowledge and regulatory understanding', ar: 'معرفة بالسوق الإقليمي وفهم التنظيمات' },
                  { en: 'End-to-end project delivery capability', ar: 'قدرة على تسليم المشاريع من البداية للنهاية' },
                  { en: 'Proven track record in challenging environments', ar: 'سجل حافل في البيئات الصعبة' }
                ].map((item, index) => (
                  <div key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                    <span className="text-[#406D61]">{language === 'ar' ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#133129] to-[#224B40] p-8 rounded-2xl"
            >
              <h3 className="text-xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
              </h3>
              <p className="text-[#faf9f6]/80 mb-6">
                {language === 'ar' 
                  ? 'ناقش احتياجات نظامك المصرفي مع خبرائنا واحصل على تقييم مجاني.'
                  : 'Discuss your core banking needs with our experts and get a free assessment.'
                }
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => openBooking('consultation')}
                  className="w-full bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold py-6"
                >
                  {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10 py-6">
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#faf9f6] border-t border-gray-200">
        <div className="container">
          <h3 className="text-xl font-serif text-[#133129] mb-8 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'خدمات ذات صلة' : 'Related Services'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/services/islamic-finance', titleEn: 'Islamic Finance', titleAr: 'التمويل الإسلامي' },
              { href: '/services/risk-compliance', titleEn: 'Risk & Compliance', titleAr: 'المخاطر والامتثال' },
              { href: '/services/capacity-building', titleEn: 'Capacity Building', titleAr: 'بناء القدرات' }
            ].map((service) => (
              <Link key={service.href} href={service.href}>
                <Button variant="outline" className="w-full border-[#133129]/20 text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6] py-6">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal({ isOpen: false, serviceName: '', serviceNameAr: '' })}
        serviceName={inquiryModal.serviceName}
        serviceNameAr={inquiryModal.serviceNameAr}
      />
    </div>
  );
}
