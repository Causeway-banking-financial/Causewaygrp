/**
 * Risk & Compliance Service Page
 * Design: Stunning security-themed visuals with animated shields, compliance meters, and risk indicators
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Shield, 
  ShieldCheck,
  ShieldAlert,
  CheckCircle, 
  FileText, 
  AlertTriangle, 
  Search,
  Scale,
  ChevronRight,
  Lock,
  Eye,
  FileSearch,
  Building2,
  Users,
  TrendingUp,
  Award,
  Zap,
  Target,
  Layers,
  BarChart3,
  Globe,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/App';

// Compliance service areas with unique colors and icons
const complianceAreas = [
  {
    id: 'aml-cft',
    icon: ShieldAlert,
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-red-500/10 to-orange-500/10',
    borderColor: 'border-red-500/30',
    title: { en: 'AML/CFT Frameworks', ar: 'أطر مكافحة غسل الأموال وتمويل الإرهاب' },
    description: { 
      en: 'Comprehensive anti-money laundering and counter-terrorism financing programs aligned with FATF standards.',
      ar: 'برامج شاملة لمكافحة غسل الأموال وتمويل الإرهاب متوافقة مع معايير فاتف.'
    },
    features: [
      { en: 'Risk-based approach implementation', ar: 'تطبيق النهج القائم على المخاطر' },
      { en: 'Customer due diligence procedures', ar: 'إجراءات العناية الواجبة للعملاء' },
      { en: 'Transaction monitoring systems', ar: 'أنظمة مراقبة المعاملات' },
      { en: 'Suspicious activity reporting', ar: 'الإبلاغ عن الأنشطة المشبوهة' }
    ]
  },
  {
    id: 'internal-audit',
    icon: FileSearch,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-500/30',
    title: { en: 'Internal Audit', ar: 'التدقيق الداخلي' },
    description: { 
      en: 'Establish and strengthen internal audit functions with risk-based audit methodologies.',
      ar: 'إنشاء وتعزيز وظائف التدقيق الداخلي بمنهجيات تدقيق قائمة على المخاطر.'
    },
    features: [
      { en: 'Audit department establishment', ar: 'إنشاء إدارة التدقيق' },
      { en: 'Risk-based audit planning', ar: 'التخطيط للتدقيق القائم على المخاطر' },
      { en: 'Audit manual development', ar: 'تطوير دليل التدقيق' },
      { en: 'Quality assurance reviews', ar: 'مراجعات ضمان الجودة' }
    ]
  },
  {
    id: 'regulatory',
    icon: Scale,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/30',
    title: { en: 'Regulatory Compliance', ar: 'الامتثال التنظيمي' },
    description: { 
      en: 'Navigate complex regulatory landscapes with expert guidance on local and international requirements.',
      ar: 'التنقل في المشهد التنظيمي المعقد مع إرشادات خبيرة حول المتطلبات المحلية والدولية.'
    },
    features: [
      { en: 'Regulatory gap analysis', ar: 'تحليل الفجوات التنظيمية' },
      { en: 'Compliance program design', ar: 'تصميم برنامج الامتثال' },
      { en: 'Regulatory reporting', ar: 'التقارير التنظيمية' },
      { en: 'License application support', ar: 'دعم طلبات الترخيص' }
    ]
  },
  {
    id: 'risk-assessment',
    icon: Target,
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10',
    borderColor: 'border-amber-500/30',
    title: { en: 'Risk Assessment', ar: 'تقييم المخاطر' },
    description: { 
      en: 'Comprehensive risk identification, assessment, and mitigation strategies for financial institutions.',
      ar: 'استراتيجيات شاملة لتحديد المخاطر وتقييمها والتخفيف منها للمؤسسات المالية.'
    },
    features: [
      { en: 'Enterprise risk management', ar: 'إدارة المخاطر المؤسسية' },
      { en: 'Risk appetite frameworks', ar: 'أطر الرغبة في المخاطرة' },
      { en: 'Key risk indicators', ar: 'مؤشرات المخاطر الرئيسية' },
      { en: 'Stress testing scenarios', ar: 'سيناريوهات اختبار الإجهاد' }
    ]
  },
  {
    id: 'governance',
    icon: Building2,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    title: { en: 'Corporate Governance', ar: 'الحوكمة المؤسسية' },
    description: { 
      en: 'Build robust governance structures that ensure accountability, transparency, and ethical conduct.',
      ar: 'بناء هياكل حوكمة قوية تضمن المساءلة والشفافية والسلوك الأخلاقي.'
    },
    features: [
      { en: 'Board effectiveness reviews', ar: 'مراجعات فعالية مجلس الإدارة' },
      { en: 'Committee charter development', ar: 'تطوير مواثيق اللجان' },
      { en: 'Policy framework design', ar: 'تصميم إطار السياسات' },
      { en: 'Governance training', ar: 'التدريب على الحوكمة' }
    ]
  },
  {
    id: 'training',
    icon: BookOpen,
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-gradient-to-br from-indigo-500/10 to-violet-500/10',
    borderColor: 'border-indigo-500/30',
    title: { en: 'Compliance Training', ar: 'التدريب على الامتثال' },
    description: { 
      en: 'Comprehensive training programs to build compliance culture and awareness across your organization.',
      ar: 'برامج تدريبية شاملة لبناء ثقافة الامتثال والوعي عبر مؤسستك.'
    },
    features: [
      { en: 'AML/CFT awareness training', ar: 'التدريب على التوعية بمكافحة غسل الأموال' },
      { en: 'Board compliance workshops', ar: 'ورش عمل امتثال مجلس الإدارة' },
      { en: 'Staff certification programs', ar: 'برامج شهادات الموظفين' },
      { en: 'E-learning modules', ar: 'وحدات التعلم الإلكتروني' }
    ]
  }
];

// International frameworks we work with
const frameworks = [
  { 
    name: { en: 'FATF Recommendations', ar: 'توصيات فاتف' },
    desc: { en: 'International AML/CFT standards', ar: 'المعايير الدولية لمكافحة غسل الأموال' },
    icon: Globe
  },
  { 
    name: { en: 'Basel III', ar: 'بازل 3' },
    desc: { en: 'Banking supervision framework', ar: 'إطار الرقابة المصرفية' },
    icon: Building2
  },
  { 
    name: { en: 'AAOIFI Standards', ar: 'معايير أيوفي' },
    desc: { en: 'Islamic finance governance', ar: 'حوكمة التمويل الإسلامي' },
    icon: Scale
  },
  { 
    name: { en: 'Central Bank Regulations', ar: 'لوائح البنك المركزي' },
    desc: { en: 'Local regulatory requirements', ar: 'المتطلبات التنظيمية المحلية' },
    icon: Shield
  }
];

// Animated compliance meter component
const ComplianceMeter = ({ value, label, color }: { value: number; label: { en: string; ar: string }; color: string }) => {
  const { language, isRTL } = useLanguage();
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 500);
    return () => clearTimeout(timer);
  }, [value]);
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#133129]">{label[language]}</span>
        <span className={`text-sm font-bold ${color}`}>{animatedValue}%</span>
      </div>
      <div className="h-3 bg-[#133129]/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
};

// Animated shield component
const AnimatedShield = () => {
  return (
    <motion.div
      className="relative w-32 h-32"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 bg-[#d4a84b]/20 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Shield icon */}
      <div className="relative w-full h-full bg-gradient-to-br from-[#d4a84b] to-[#b8942f] rounded-2xl flex items-center justify-center shadow-2xl">
        <ShieldCheck className="w-16 h-16 text-white" />
      </div>
      {/* Orbiting elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 200%" }}
      >
        <CheckCircle className="w-4 h-4 text-white" />
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% -100%" }}
      >
        <Lock className="w-4 h-4 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default function RiskCompliance() {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEOHead pageKey="riskCompliance" />
      <SEO 
        title={language === 'ar' ? 'خدمات المخاطر والامتثال' : 'Risk & Compliance Services'}
        description={language === 'ar' 
          ? 'أطر مكافحة غسل الأموال، الامتثال التنظيمي، التدقيق الداخلي، وخدمات تقييم المخاطر للمؤسسات المالية في اليمن.'
          : 'AML/CFT frameworks, regulatory compliance, internal audit, and risk assessment services for financial institutions in Yemen.'
        }
        keywords="AML/CFT, Risk Management, Compliance, FATF, Basel III, Internal Audit, Yemen"
      />
      <Header />
      
      {/* Hero Section - Stunning Security Theme */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-[#133129] via-[#1a3d33] to-[#224B40]">
        {/* Animated background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(212, 168, 75, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 168, 75, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Floating shield elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              <Shield className="w-12 h-12 text-[#d4a84b]" />
            </motion.div>
          ))}
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#133129] via-transparent to-[#133129]/50" />
        </div>
        
        <div className="container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/services" className={`inline-flex items-center text-[#d4a84b] hover:text-[#d4a84b]/80 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'ml-1 rotate-180' : 'mr-1 rotate-180'}`} />
                {language === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
              </Link>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#faf9f6] leading-tight mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'المخاطر والامتثال' : 'Risk & Compliance'}
              </h1>
              <p className="text-2xl text-[#d4a84b] mb-6" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                {language === 'ar' ? 'Risk & Compliance' : 'المخاطر والامتثال'}
              </p>
              
              <p className="text-lg text-[#faf9f6]/80 leading-relaxed mb-8 max-w-xl">
                {language === 'ar'
                  ? 'حلول شاملة لإدارة المخاطر والامتثال التنظيمي مصممة للتحديات الفريدة للأسواق الناشئة والاقتصادات الهشة.'
                  : 'Comprehensive risk management and regulatory compliance solutions designed for the unique challenges of emerging markets and fragile economies.'
                }
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => openBooking('risk-assessment')}
                  className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6 text-lg"
                >
                  {language === 'ar' ? 'طلب تقييم المخاطر' : 'Request Risk Assessment'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10 px-8 py-6 text-lg">
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Right - Animated Shield */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <AnimatedShield />
            </motion.div>
          </div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#faf9f6"/>
          </svg>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-[#faf9f6]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '100%', label: { en: 'Audit Success Rate', ar: 'نسبة نجاح التدقيق' }, icon: Award },
              { value: '50+', label: { en: 'Compliance Projects', ar: 'مشروع امتثال' }, icon: FileText },
              { value: '15+', label: { en: 'Banks Served', ar: 'بنك تم خدمته' }, icon: Building2 },
              { value: '0', label: { en: 'Regulatory Penalties', ar: 'عقوبات تنظيمية' }, icon: ShieldCheck }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#133129] to-[#224B40] rounded-2xl flex items-center justify-center shadow-lg">
                  <stat.icon className="w-8 h-8 text-[#d4a84b]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#133129] mb-2">{stat.value}</div>
                <div className="text-[#406D61] text-sm">{stat.label[language]}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compliance Meters Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'مؤشرات الامتثال' : 'Compliance Indicators'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'قياس التميز في الامتثال' : 'Measuring Compliance Excellence'}
            </h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#133129] to-[#224B40] rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              <ComplianceMeter 
                value={98} 
                label={{ en: 'AML/CFT Compliance', ar: 'الامتثال لمكافحة غسل الأموال' }}
                color="from-emerald-400 to-emerald-600 text-emerald-400"
              />
              <ComplianceMeter 
                value={95} 
                label={{ en: 'Regulatory Adherence', ar: 'الالتزام التنظيمي' }}
                color="from-blue-400 to-blue-600 text-blue-400"
              />
              <ComplianceMeter 
                value={100} 
                label={{ en: 'Audit Readiness', ar: 'الجاهزية للتدقيق' }}
                color="from-[#d4a84b] to-amber-600 text-[#d4a84b]"
              />
              <ComplianceMeter 
                value={92} 
                label={{ en: 'Risk Mitigation', ar: 'التخفيف من المخاطر' }}
                color="from-purple-400 to-purple-600 text-purple-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Areas - Interactive Cards */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'مجالات خدماتنا' : 'Our Service Areas'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'حلول امتثال شاملة' : 'Comprehensive Compliance Solutions'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar'
                ? 'انقر على أي بطاقة لاستكشاف خدماتنا المتخصصة في كل مجال'
                : 'Click on any card to explore our specialized services in each area'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedArea(selectedArea === area.id ? null : area.id)}
                className={`
                  relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500
                  ${selectedArea === area.id ? 'lg:col-span-2 row-span-2' : ''}
                  ${area.bgColor} ${area.borderColor} border-2
                  hover:shadow-xl hover:scale-[1.02]
                `}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <area.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h3 className="text-xl font-bold text-[#133129] mb-1">
                        {area.title[language]}
                      </h3>
                      <p className="text-sm text-[#406D61]">
                        {area.description[language]}
                      </p>
                    </div>
                  </div>
                  
                  {/* Expanded content */}
                  <AnimatePresence>
                    {selectedArea === area.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6"
                      >
                        <div className={`border-t ${area.borderColor} pt-6`}>
                          <h4 className={`font-semibold text-[#133129] mb-4 ${isRTL ? 'text-right' : ''}`}>
                            {language === 'ar' ? 'ما نقدمه:' : 'What We Deliver:'}
                          </h4>
                          <ul className="space-y-3">
                            {area.features.map((feature, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                              >
                                <CheckCircle className={`w-5 h-5 flex-shrink-0 bg-gradient-to-br ${area.color} text-white rounded-full p-1`} />
                                <span className="text-[#133129]">{feature[language]}</span>
                              </motion.li>
                            ))}
                          </ul>
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openBooking('compliance');
                            }}
                            className={`mt-6 bg-gradient-to-r ${area.color} text-white hover:opacity-90`}
                          >
                            {language === 'ar' ? 'طلب استشارة' : 'Request Consultation'}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Expand indicator */}
                  {selectedArea !== area.id && (
                    <div className={`mt-4 flex items-center text-[#d4a84b] text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{language === 'ar' ? 'انقر للتفاصيل' : 'Click for details'}</span>
                      <ChevronRight className={`w-4 h-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}`} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section className="py-20 bg-gradient-to-br from-[#133129] to-[#224B40]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'الأطر الدولية' : 'International Frameworks'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'معايير عالمية، تطبيق محلي' : 'Global Standards, Local Application'}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((framework, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center mb-4">
                  <framework.icon className="w-6 h-6 text-[#d4a84b]" />
                </div>
                <h3 className="text-lg font-bold text-[#faf9f6] mb-2">{framework.name[language]}</h3>
                <p className="text-[#faf9f6]/70 text-sm">{framework.desc[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#133129] to-[#224B40] rounded-3xl p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a84b]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4a84b]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#d4a84b]/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-[#d4a84b]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'جاهز لتعزيز امتثالك؟' : 'Ready to Strengthen Your Compliance?'}
              </h2>
              <p className="text-[#faf9f6]/80 mb-8 max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'دعنا نساعدك في بناء إطار امتثال قوي يحمي مؤسستك ويعزز ثقة أصحاب المصلحة.'
                  : 'Let us help you build a robust compliance framework that protects your institution and enhances stakeholder confidence.'
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => openBooking('compliance-assessment')}
                  className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6 text-lg"
                >
                  {language === 'ar' ? 'احجز تقييم مجاني' : 'Book Free Assessment'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10 px-8 py-6 text-lg">
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white border-t border-[#133129]/10">
        <div className="container">
          <h3 className={`text-xl font-serif text-[#133129] mb-6 ${isRTL ? 'text-right' : ''}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'خدمات ذات صلة' : 'Related Services'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: '/services/islamic-finance', title: { en: 'Islamic Finance', ar: 'التمويل الإسلامي' } },
              { href: '/services/core-banking', title: { en: 'Core Banking Systems', ar: 'الأنظمة المصرفية الأساسية' } },
              { href: '/services/capacity-building', title: { en: 'Capacity Building', ar: 'بناء القدرات' } }
            ].map((service, index) => (
              <Link key={index} href={service.href}>
                <div className={`flex items-center justify-between p-4 bg-[#faf9f6] rounded-lg hover:bg-[#133129]/5 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="font-medium text-[#133129]">{service.title[language]}</span>
                  <ArrowRight className={`w-5 h-5 text-[#d4a84b] ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
