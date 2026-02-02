/**
 * Brand Strategy & Corporate Identity Service Page
 * Design: Creative Professional Theme with Portfolio Focus
 * Features: Animated hero, brand process visualization, service cards, case studies
 */

import { useState } from 'react';
import InquiryModal from '@/components/InquiryModal';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Palette, 
  ChevronRight,
  Target,
  Eye,
  MessageSquare,
  Layers,
  FileText,
  Monitor,
  Users,
  Award,
  Sparkles,
  PenTool,
  Lightbulb,
  Megaphone,
  Building2,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/App';

// Service areas with unique colors and icons
const serviceAreas = [
  {
    id: 'strategy',
    icon: Target,
    titleEn: 'Brand Strategy Development',
    titleAr: 'تطوير استراتيجية العلامة التجارية',
    descEn: 'Define your institution\'s positioning, values, and competitive differentiation in the financial marketplace.',
    descAr: 'تحديد موقع مؤسستك وقيمها وتميزها التنافسي في السوق المالي.',
    detailsEn: [
      'Market positioning analysis',
      'Competitive landscape assessment',
      'Brand architecture development',
      'Value proposition definition',
      'Target audience profiling'
    ],
    detailsAr: [
      'تحليل الموقع السوقي',
      'تقييم المشهد التنافسي',
      'تطوير هيكل العلامة التجارية',
      'تحديد عرض القيمة',
      'تحديد ملف الجمهور المستهدف'
    ],
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600'
  },
  {
    id: 'identity',
    icon: PenTool,
    titleEn: 'Visual Identity Design',
    titleAr: 'تصميم الهوية البصرية',
    descEn: 'Create distinctive visual elements that communicate trust, professionalism, and your unique brand personality.',
    descAr: 'إنشاء عناصر بصرية مميزة تعبر عن الثقة والاحترافية وشخصية علامتك التجارية الفريدة.',
    detailsEn: [
      'Logo design and variations',
      'Color palette development',
      'Typography selection',
      'Iconography and imagery style',
      'Brand pattern and texture design'
    ],
    detailsAr: [
      'تصميم الشعار وتنويعاته',
      'تطوير لوحة الألوان',
      'اختيار الخطوط',
      'أسلوب الأيقونات والصور',
      'تصميم الأنماط والقوام'
    ],
    color: 'from-fuchsia-500 to-fuchsia-600',
    bgColor: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-200',
    iconBg: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-600'
  },
  {
    id: 'guidelines',
    icon: FileText,
    titleEn: 'Brand Guidelines & Standards',
    titleAr: 'دليل ومعايير العلامة التجارية',
    descEn: 'Comprehensive documentation ensuring consistent brand application across all touchpoints and channels.',
    descAr: 'توثيق شامل يضمن تطبيق العلامة التجارية بشكل متسق عبر جميع نقاط الاتصال والقنوات.',
    detailsEn: [
      'Brand usage guidelines',
      'Application specifications',
      'Do\'s and don\'ts documentation',
      'Template library creation',
      'Quality control standards'
    ],
    detailsAr: [
      'إرشادات استخدام العلامة التجارية',
      'مواصفات التطبيق',
      'توثيق ما يجب وما لا يجب',
      'إنشاء مكتبة القوالب',
      'معايير ضبط الجودة'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'digital',
    icon: Monitor,
    titleEn: 'Digital Presence & Experience',
    titleAr: 'الحضور والتجربة الرقمية',
    descEn: 'Optimize your digital touchpoints to deliver consistent, engaging brand experiences across all platforms.',
    descAr: 'تحسين نقاط الاتصال الرقمية لتقديم تجارب علامة تجارية متسقة وجذابة عبر جميع المنصات.',
    detailsEn: [
      'Website design direction',
      'Mobile app visual design',
      'Social media brand presence',
      'Digital marketing assets',
      'User interface guidelines'
    ],
    detailsAr: [
      'توجيه تصميم الموقع',
      'التصميم البصري للتطبيقات',
      'حضور العلامة التجارية على وسائل التواصل',
      'أصول التسويق الرقمي',
      'إرشادات واجهة المستخدم'
    ],
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600'
  },
  {
    id: 'communications',
    icon: MessageSquare,
    titleEn: 'Brand Communications',
    titleAr: 'اتصالات العلامة التجارية',
    descEn: 'Develop compelling messaging frameworks and communication strategies that resonate with your audiences.',
    descAr: 'تطوير أطر رسائل مقنعة واستراتيجيات اتصال تتوافق مع جمهورك.',
    detailsEn: [
      'Key messaging development',
      'Tone of voice guidelines',
      'Content strategy framework',
      'Internal communications',
      'External PR guidelines'
    ],
    detailsAr: [
      'تطوير الرسائل الرئيسية',
      'إرشادات نبرة الصوت',
      'إطار استراتيجية المحتوى',
      'الاتصالات الداخلية',
      'إرشادات العلاقات العامة الخارجية'
    ],
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    id: 'marketing',
    icon: Megaphone,
    titleEn: 'Marketing Strategy & Collateral',
    titleAr: 'استراتيجية التسويق والمواد الترويجية',
    descEn: 'Strategic marketing planning and creation of branded materials that drive engagement and business growth.',
    descAr: 'التخطيط التسويقي الاستراتيجي وإنشاء مواد تحمل العلامة التجارية تدفع التفاعل ونمو الأعمال.',
    detailsEn: [
      'Marketing strategy development',
      'Campaign creative direction',
      'Print and digital collateral',
      'Presentation templates',
      'Event and exhibition materials'
    ],
    detailsAr: [
      'تطوير استراتيجية التسويق',
      'التوجيه الإبداعي للحملات',
      'المواد المطبوعة والرقمية',
      'قوالب العروض التقديمية',
      'مواد الفعاليات والمعارض'
    ],
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    id: 'stakeholder',
    icon: Users,
    titleEn: 'Stakeholder Engagement',
    titleAr: 'إشراك أصحاب المصلحة',
    descEn: 'Build meaningful connections with investors, regulators, partners, and communities through strategic engagement.',
    descAr: 'بناء علاقات هادفة مع المستثمرين والمنظمين والشركاء والمجتمعات من خلال المشاركة الاستراتيجية.',
    detailsEn: [
      'Stakeholder mapping',
      'Engagement strategy development',
      'Annual report design',
      'Investor relations materials',
      'CSR communication'
    ],
    detailsAr: [
      'رسم خريطة أصحاب المصلحة',
      'تطوير استراتيجية المشاركة',
      'تصميم التقرير السنوي',
      'مواد علاقات المستثمرين',
      'اتصالات المسؤولية الاجتماعية'
    ],
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
  {
    id: 'rebrand',
    icon: Sparkles,
    titleEn: 'Brand Refresh & Repositioning',
    titleAr: 'تجديد وإعادة تموضع العلامة التجارية',
    descEn: 'Revitalize existing brands to reflect evolved business strategies, market changes, or merger integrations.',
    descAr: 'تنشيط العلامات التجارية الحالية لتعكس استراتيجيات الأعمال المتطورة أو تغيرات السوق أو عمليات الدمج.',
    detailsEn: [
      'Brand audit and assessment',
      'Repositioning strategy',
      'Visual identity evolution',
      'Transition planning',
      'Launch and rollout support'
    ],
    detailsAr: [
      'تدقيق وتقييم العلامة التجارية',
      'استراتيجية إعادة التموضع',
      'تطور الهوية البصرية',
      'تخطيط الانتقال',
      'دعم الإطلاق والتنفيذ'
    ],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  }
];

// Brand development process
const brandProcess = [
  {
    phase: 1,
    titleEn: 'Discover',
    titleAr: 'الاكتشاف',
    descEn: 'Research, stakeholder interviews, and market analysis',
    descAr: 'البحث ومقابلات أصحاب المصلحة وتحليل السوق'
  },
  {
    phase: 2,
    titleEn: 'Define',
    titleAr: 'التحديد',
    descEn: 'Strategy development and positioning framework',
    descAr: 'تطوير الاستراتيجية وإطار التموضع'
  },
  {
    phase: 3,
    titleEn: 'Design',
    titleAr: 'التصميم',
    descEn: 'Visual identity creation and brand expression',
    descAr: 'إنشاء الهوية البصرية والتعبير عن العلامة التجارية'
  },
  {
    phase: 4,
    titleEn: 'Develop',
    titleAr: 'التطوير',
    descEn: 'Guidelines, templates, and asset creation',
    descAr: 'الإرشادات والقوالب وإنشاء الأصول'
  },
  {
    phase: 5,
    titleEn: 'Deploy',
    titleAr: 'النشر',
    descEn: 'Launch support and implementation guidance',
    descAr: 'دعم الإطلاق وتوجيه التنفيذ'
  }
];

// Impact statistics
const impactStats = [
  { 
    value: '20+', 
    labelEn: 'Brands Developed', 
    labelAr: 'علامة تجارية تم تطويرها',
    icon: Award,
    color: 'text-violet-500'
  },
  { 
    value: '15+', 
    labelEn: 'Financial Institutions', 
    labelAr: 'مؤسسة مالية',
    icon: Building2,
    color: 'text-blue-500'
  },
  { 
    value: '100%', 
    labelEn: 'Client Satisfaction', 
    labelAr: 'رضا العملاء',
    icon: Star,
    color: 'text-amber-500'
  },
  { 
    value: '5+', 
    labelEn: 'Years Experience', 
    labelAr: 'سنوات خبرة',
    icon: TrendingUp,
    color: 'text-emerald-500'
  }
];

// Why financial sector branding matters
const whyBrandingMatters = [
  {
    titleEn: 'Trust is Your Currency',
    titleAr: 'الثقة هي عملتك',
    descEn: 'In financial services, your brand is a promise of reliability and security. Strong branding builds the trust that drives customer loyalty and business growth.',
    descAr: 'في الخدمات المالية، علامتك التجارية هي وعد بالموثوقية والأمان. العلامة التجارية القوية تبني الثقة التي تدفع ولاء العملاء ونمو الأعمال.'
  },
  {
    titleEn: 'Differentiation in a Crowded Market',
    titleAr: 'التميز في سوق مزدحم',
    descEn: 'With increasing competition, a distinctive brand identity helps you stand out and communicate your unique value proposition clearly.',
    descAr: 'مع تزايد المنافسة، تساعدك الهوية التجارية المميزة على التميز وإيصال عرض القيمة الفريد الخاص بك بوضوح.'
  },
  {
    titleEn: 'Regulatory Credibility',
    titleAr: 'المصداقية التنظيمية',
    descEn: 'Professional branding signals institutional maturity and compliance readiness to regulators, partners, and stakeholders.',
    descAr: 'العلامة التجارية الاحترافية تشير إلى النضج المؤسسي والاستعداد للامتثال للمنظمين والشركاء وأصحاب المصلحة.'
  }
];

export default function Branding() {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [inquiryModal, setInquiryModal] = useState<{ isOpen: boolean; serviceName: string; serviceNameAr: string }>({ isOpen: false, serviceName: '', serviceNameAr: '' });

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEOHead pageKey="branding" />
      <SEO 
        title={language === 'ar' ? 'استراتيجية العلامة التجارية والهوية المؤسسية' : 'Brand Strategy & Corporate Identity'}
        description={language === 'ar' 
          ? 'استراتيجية العلامة التجارية، تصميم الهوية البصرية، والاتصالات المؤسسية للبنوك والمؤسسات المالية.'
          : 'Brand strategy, visual identity design, and corporate communications for banks and financial institutions.'
        }
        keywords="Brand Strategy, Corporate Identity, Visual Identity, Financial Branding, Marketing Strategy, Yemen, MENA"
      />
      <Header />
      
      {/* Hero Section with Creative Theme */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#133129] via-[#1a4a3d] to-[#224B40]">
        {/* Animated Background Elements - Creative/Design Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Abstract shapes */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="creative" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="20" stroke="#d4a84b" strokeWidth="1" fill="none"/>
                <rect x="20" y="20" width="40" height="40" stroke="#d4a84b" strokeWidth="0.5" fill="none" transform="rotate(45 40 40)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#creative)"/>
          </svg>
          
          {/* Floating creative icons */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -15, 0],
                rotate: [0, 10, 0]
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
                <Palette className="w-6 h-6 text-[#d4a84b]/30" />
              ) : i % 5 === 1 ? (
                <PenTool className="w-5 h-5 text-violet-400/30" />
              ) : i % 5 === 2 ? (
                <Lightbulb className="w-6 h-6 text-amber-400/30" />
              ) : i % 5 === 3 ? (
                <Eye className="w-5 h-5 text-[#d4a84b]/30" />
              ) : (
                <Sparkles className="w-5 h-5 text-fuchsia-400/30" />
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
                {language === 'ar' ? 'استراتيجية العلامة التجارية' : 'Brand Strategy'}
                <br />
                <span className="text-[#d4a84b]">{language === 'ar' ? 'والهوية المؤسسية' : '& Corporate Identity'}</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#faf9f6]/80 mb-6 font-medium">
                {language === 'ar' ? 'Brand Strategy & Corporate Identity' : 'استراتيجية العلامة التجارية والهوية المؤسسية'}
              </p>
              <p className="text-lg text-[#faf9f6]/80 mb-8 leading-relaxed max-w-xl">
                {language === 'ar' 
                  ? 'نساعد المؤسسات المالية على بناء علامات تجارية قوية تعكس قيمها وتبني الثقة وتميزها في السوق التنافسي.'
                  : 'We help financial institutions build powerful brands that reflect their values, establish trust, and differentiate them in competitive markets.'
                }
              </p>
              
              <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button 
                  onClick={() => openBooking('consultation')}
                  className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6 text-lg"
                >
                  {language === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10 px-8 py-6 text-lg">
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right - Animated Brand Elements Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-80 h-80">
                {/* Central palette icon */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-2xl flex items-center justify-center shadow-2xl rotate-12">
                    <Palette className="w-16 h-16 text-[#133129] -rotate-12" />
                  </div>
                </motion.div>
                
                {/* Orbiting brand elements */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
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
                      {i === 0 && <PenTool className="w-6 h-6 text-violet-400" />}
                      {i === 1 && <Eye className="w-6 h-6 text-blue-400" />}
                      {i === 2 && <Lightbulb className="w-6 h-6 text-amber-400" />}
                      {i === 3 && <MessageSquare className="w-6 h-6 text-emerald-400" />}
                      {i === 4 && <Layers className="w-6 h-6 text-fuchsia-400" />}
                      {i === 5 && <Target className="w-6 h-6 text-rose-400" />}
                    </motion.div>
                  </motion.div>
                ))}
                
                {/* Decorative rings */}
                <div className="absolute inset-0 border-2 border-dashed border-[#d4a84b]/30 rounded-full" />
                <motion.div 
                  className="absolute inset-[-20px] border border-[#faf9f6]/10 rounded-full"
                  animate={{ rotate: -360 }}
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

      {/* Why Branding Matters Section */}
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
              {language === 'ar' ? 'لماذا العلامة التجارية مهمة' : 'Why Branding Matters'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'في القطاع المالي، العلامة التجارية هي الثقة' : 'In Financial Services, Brand is Trust'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyBrandingMatters.map((item, index) => (
              <motion.div
                key={item.titleEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-[#133129] mb-4">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-[#406D61]">
                  {language === 'ar' ? item.descAr : item.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-white">
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
              {language === 'ar' ? 'حلول شاملة للعلامة التجارية' : 'Comprehensive Brand Solutions'}
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

      {/* Brand Development Process Section */}
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
              {language === 'ar' ? 'منهجيتنا' : 'Our Process'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'من الرؤية إلى الهوية' : 'From Vision to Identity'}
            </h2>
            <p className="text-[#faf9f6]/70 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نتبع منهجية مثبتة لتطوير علامات تجارية قوية ومستدامة'
                : 'We follow a proven methodology to develop strong, sustainable brands'
              }
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#d4a84b]/30 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {brandProcess.map((phase, index) => (
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

      {/* CTA Section */}
      <section className="py-20 bg-[#faf9f6]">
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
                {language === 'ar' ? 'خبرة متخصصة في القطاع المالي' : 'Financial Sector Expertise'}
              </h2>
              <div className="space-y-4">
                {[
                  { en: 'Deep understanding of financial services market dynamics', ar: 'فهم عميق لديناميكيات سوق الخدمات المالية' },
                  { en: 'Experience with regulatory and compliance requirements', ar: 'خبرة في المتطلبات التنظيمية والامتثال' },
                  { en: 'Bilingual capabilities for Arabic and English markets', ar: 'قدرات ثنائية اللغة للأسواق العربية والإنجليزية' },
                  { en: 'Track record with banks, MFIs, and financial institutions', ar: 'سجل حافل مع البنوك ومؤسسات التمويل الأصغر والمؤسسات المالية' },
                  { en: 'End-to-end brand development and implementation', ar: 'تطوير وتنفيذ العلامة التجارية من البداية للنهاية' }
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
                {language === 'ar' ? 'ابدأ مشروع علامتك التجارية' : 'Start Your Brand Project'}
              </h3>
              <p className="text-[#faf9f6]/80 mb-6">
                {language === 'ar' 
                  ? 'ناقش احتياجات علامتك التجارية مع خبرائنا واحصل على استشارة مجانية.'
                  : 'Discuss your branding needs with our experts and get a free consultation.'
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
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container">
          <h3 className="text-xl font-serif text-[#133129] mb-8 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'خدمات ذات صلة' : 'Related Services'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: '/services/capacity-building', titleEn: 'Capacity Building', titleAr: 'بناء القدرات' },
              { href: '/services/microfinance', titleEn: 'Microfinance Development', titleAr: 'تطوير التمويل الأصغر' },
              { href: '/services/islamic-finance', titleEn: 'Islamic Finance', titleAr: 'التمويل الإسلامي' }
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
