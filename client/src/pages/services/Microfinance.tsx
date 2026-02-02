/**
 * Microfinance Development Service Page
 * Design: Community Empowerment Theme with Financial Inclusion Visuals
 * Features: Animated hero, impact statistics, colorful service cards, journey timeline
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Users, 
  ChevronRight,
  Heart,
  TrendingUp,
  Building,
  GraduationCap,
  FileCheck,
  Shield,
  Target,
  BarChart3,
  Sparkles,
  HandHeart,
  Landmark,
  Briefcase,
  Award,
  Globe
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
    id: 'establishment',
    icon: Building,
    titleEn: 'MFI Establishment',
    titleAr: 'تأسيس مؤسسات التمويل الأصغر',
    descEn: 'Complete support for establishing new microfinance institutions from concept to operation.',
    descAr: 'دعم شامل لتأسيس مؤسسات التمويل الأصغر الجديدة من الفكرة إلى التشغيل.',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    id: 'capacity',
    icon: GraduationCap,
    titleEn: 'Capacity Building',
    titleAr: 'بناء القدرات',
    descEn: 'Comprehensive training programs for staff, management, and board members.',
    descAr: 'برامج تدريبية شاملة للموظفين والإدارة وأعضاء مجلس الإدارة.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'products',
    icon: Briefcase,
    titleEn: 'Product Development',
    titleAr: 'تطوير المنتجات',
    descEn: 'Design innovative financial products tailored to client needs and market demands.',
    descAr: 'تصميم منتجات مالية مبتكرة مصممة لاحتياجات العملاء ومتطلبات السوق.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 'licensing',
    icon: FileCheck,
    titleEn: 'Regulatory Licensing',
    titleAr: 'الترخيص التنظيمي',
    descEn: 'Navigate regulatory requirements and obtain necessary licenses for operation.',
    descAr: 'التنقل في المتطلبات التنظيمية والحصول على التراخيص اللازمة للتشغيل.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    id: 'social',
    icon: Heart,
    titleEn: 'Social Performance',
    titleAr: 'الأداء الاجتماعي',
    descEn: 'Implement social performance management systems aligned with global standards.',
    descAr: 'تنفيذ أنظمة إدارة الأداء الاجتماعي المتوافقة مع المعايير العالمية.',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
  {
    id: 'protection',
    icon: Shield,
    titleEn: 'Client Protection',
    titleAr: 'حماية العملاء',
    descEn: 'Ensure adherence to client protection principles and responsible finance practices.',
    descAr: 'ضمان الالتزام بمبادئ حماية العملاء وممارسات التمويل المسؤول.',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600'
  },
  {
    id: 'efficiency',
    icon: Target,
    titleEn: 'Operational Efficiency',
    titleAr: 'الكفاءة التشغيلية',
    descEn: 'Optimize processes and systems for sustainable and scalable operations.',
    descAr: 'تحسين العمليات والأنظمة لعمليات مستدامة وقابلة للتوسع.',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600'
  },
  {
    id: 'impact',
    icon: BarChart3,
    titleEn: 'Impact Measurement',
    titleAr: 'قياس الأثر',
    descEn: 'Develop frameworks to measure and report social and financial impact.',
    descAr: 'تطوير أطر لقياس والإبلاغ عن الأثر الاجتماعي والمالي.',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  }
];

// Journey steps
const journeySteps = [
  {
    step: 1,
    titleEn: 'Assessment',
    titleAr: 'التقييم',
    descEn: 'Evaluate market opportunity and institutional readiness',
    descAr: 'تقييم فرصة السوق والجاهزية المؤسسية'
  },
  {
    step: 2,
    titleEn: 'Design',
    titleAr: 'التصميم',
    descEn: 'Develop business model and operational framework',
    descAr: 'تطوير نموذج العمل والإطار التشغيلي'
  },
  {
    step: 3,
    titleEn: 'Build',
    titleAr: 'البناء',
    descEn: 'Establish systems, train staff, and obtain licenses',
    descAr: 'إنشاء الأنظمة وتدريب الموظفين والحصول على التراخيص'
  },
  {
    step: 4,
    titleEn: 'Launch',
    titleAr: 'الإطلاق',
    descEn: 'Begin operations with pilot programs',
    descAr: 'بدء العمليات مع البرامج التجريبية'
  },
  {
    step: 5,
    titleEn: 'Scale',
    titleAr: 'التوسع',
    descEn: 'Expand reach and deepen impact',
    descAr: 'توسيع الوصول وتعميق الأثر'
  }
];

// Impact statistics
const impactStats = [
  { 
    value: '50K+', 
    labelEn: 'Lives Impacted', 
    labelAr: 'حياة تأثرت',
    icon: Users,
    color: 'text-emerald-500'
  },
  { 
    value: '12+', 
    labelEn: 'MFIs Supported', 
    labelAr: 'مؤسسة مدعومة',
    icon: Building,
    color: 'text-blue-500'
  },
  { 
    value: '85%', 
    labelEn: 'Women Clients', 
    labelAr: 'عملاء نساء',
    icon: Heart,
    color: 'text-rose-500'
  },
  { 
    value: '98%', 
    labelEn: 'Repayment Rate', 
    labelAr: 'معدل السداد',
    icon: TrendingUp,
    color: 'text-amber-500'
  }
];

export default function Microfinance() {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEOHead pageKey="microfinance" />
      <SEO 
        title={language === 'ar' ? 'تطوير التمويل الأصغر' : 'Microfinance Development'}
        description={language === 'ar' 
          ? 'تأسيس مؤسسات التمويل الأصغر، بناء القدرات، تطوير المنتجات، والترخيص التنظيمي في اليمن.'
          : 'MFI establishment, capacity building, product development, and regulatory licensing for microfinance institutions in Yemen.'
        }
        keywords="Microfinance, MFI, Financial Inclusion, Capacity Building, Yemen, Social Performance"
      />
      <Header />
      
      {/* Hero Section with Community Theme */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#133129] via-[#1a4a3d] to-[#224B40]">
        {/* Animated Background Elements - People/Community Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating community icons */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0]
              }}
              transition={{ 
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
              }}
            >
              {i % 4 === 0 ? (
                <Users className="w-6 h-6 text-[#d4a84b]/30" />
              ) : i % 4 === 1 ? (
                <Heart className="w-5 h-5 text-rose-400/30" />
              ) : i % 4 === 2 ? (
                <HandHeart className="w-6 h-6 text-emerald-400/30" />
              ) : (
                <Sparkles className="w-5 h-5 text-[#d4a84b]/30" />
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
                {language === 'ar' ? 'تطوير التمويل الأصغر' : 'Microfinance Development'}
              </h1>
              <p className="text-xl md:text-2xl text-[#d4a84b] mb-6 font-medium">
                {language === 'ar' ? 'Microfinance Development' : 'تطوير التمويل الأصغر'}
              </p>
              <p className="text-lg text-[#faf9f6]/80 mb-8 leading-relaxed max-w-xl">
                {language === 'ar' 
                  ? 'تمكين المجتمعات من خلال الشمول المالي. ندعم مؤسسات التمويل الأصغر في كل مرحلة من رحلتها لتحقيق التأثير الاجتماعي المستدام.'
                  : 'Empowering communities through financial inclusion. We support microfinance institutions at every stage of their journey to achieve sustainable social impact.'
                }
              </p>
              
              <div className={`flex flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button 
                  onClick={() => openBooking('consultation')}
                  className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6 text-lg"
                >
                  {language === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10 px-8 py-6 text-lg">
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right - Animated Community Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-80 h-80">
                {/* Central icon */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-full flex items-center justify-center shadow-2xl">
                    <HandHeart className="w-16 h-16 text-[#133129]" />
                  </div>
                </motion.div>
                
                {/* Orbiting elements */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute w-14 h-14 bg-[#faf9f6]/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#faf9f6]/20"
                    animate={{ 
                      rotate: [angle, angle + 360],
                    }}
                    transition={{ 
                      duration: 20,
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
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      {i === 0 && <Users className="w-6 h-6 text-emerald-400" />}
                      {i === 1 && <Heart className="w-6 h-6 text-rose-400" />}
                      {i === 2 && <Building className="w-6 h-6 text-blue-400" />}
                      {i === 3 && <TrendingUp className="w-6 h-6 text-amber-400" />}
                      {i === 4 && <Globe className="w-6 h-6 text-cyan-400" />}
                      {i === 5 && <Award className="w-6 h-6 text-purple-400" />}
                    </motion.div>
                  </motion.div>
                ))}
                
                {/* Outer ring */}
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
              {language === 'ar' ? 'مجالات خدماتنا' : 'Our Service Areas'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'حلول شاملة للتمويل الأصغر' : 'Comprehensive Microfinance Solutions'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'انقر على أي بطاقة لاستكشاف خدماتنا المتخصصة في كل مجال'
                : 'Click any card to explore our specialized services in each area'
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
                  ${expandedCard === service.id ? 'ring-2 ring-offset-2 ring-[#d4a84b] scale-105' : 'hover:scale-102 hover:shadow-lg'}
                `}
              >
                <div className="p-6">
                  <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#133129] mb-2">
                    {language === 'ar' ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-sm text-[#406D61] leading-relaxed">
                    {language === 'ar' ? service.descAr : service.descEn}
                  </p>
                  
                  {/* Expanded content */}
                  <motion.div
                    initial={false}
                    animate={{ height: expandedCard === service.id ? 'auto' : 0, opacity: expandedCard === service.id ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openBooking('consultation');
                        }}
                        className={`w-full bg-gradient-to-r ${service.color} text-white`}
                      >
                        {language === 'ar' ? 'استفسر الآن' : 'Inquire Now'}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Button>
                    </div>
                  </motion.div>
                </div>
                
                {/* Click indicator */}
                <div className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} text-xs ${service.iconColor} opacity-60`}>
                  {language === 'ar' ? 'انقر للتفاصيل' : 'Click for details'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-[#133129] to-[#224B40]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'رحلتك معنا' : 'Your Journey With Us'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'من الفكرة إلى التأثير' : 'From Idea to Impact'}
            </h2>
            <p className="text-[#faf9f6]/70 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'نرافقك في كل خطوة من رحلة بناء مؤسسة تمويل أصغر ناجحة ومستدامة'
                : 'We accompany you at every step of building a successful and sustainable microfinance institution'
              }
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#d4a84b]/30 transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  {/* Step number */}
                  <motion.div 
                    className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-2xl font-bold text-[#133129]">{step.step}</span>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-[#faf9f6] mb-2">
                    {language === 'ar' ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-sm text-[#faf9f6]/70">
                    {language === 'ar' ? step.descAr : step.descEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Partners & Standards Section */}
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
              {language === 'ar' ? 'المعايير والشراكات' : 'Standards & Partnerships'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'معايير عالمية، تأثير محلي' : 'Global Standards, Local Impact'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { nameEn: 'Smart Campaign', nameAr: 'حملة سمارت', icon: Shield },
              { nameEn: 'CGAP Guidelines', nameAr: 'إرشادات CGAP', icon: Globe },
              { nameEn: 'SPI4 Framework', nameAr: 'إطار SPI4', icon: BarChart3 },
              { nameEn: 'Yemen MF Network', nameAr: 'شبكة التمويل الأصغر اليمنية', icon: Landmark }
            ].map((partner, index) => (
              <motion.div
                key={partner.nameEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#133129]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="w-6 h-6 text-[#224B40]" />
                </div>
                <h3 className="font-semibold text-[#133129]">
                  {language === 'ar' ? partner.nameAr : partner.nameEn}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'جاهز لإحداث التأثير؟' : 'Ready to Make an Impact?'}
            </h2>
            <p className="text-white/80 text-lg mb-8">
              {language === 'ar' 
                ? 'دعنا نساعدك في بناء مؤسسة تمويل أصغر تغير حياة المجتمعات وتحقق الاستدامة المالية.'
                : 'Let us help you build a microfinance institution that transforms communities and achieves financial sustainability.'
              }
            </p>
            <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button 
                onClick={() => openBooking('consultation')}
                className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
              >
                {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#faf9f6] border-t border-gray-200">
        <div className="container">
          <h3 className="text-xl font-semibold text-[#133129] mb-6 text-center">
            {language === 'ar' ? 'خدمات ذات صلة' : 'Related Services'}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { href: '/services/islamic-finance', labelEn: 'Islamic Finance', labelAr: 'التمويل الإسلامي' },
              { href: '/services/capacity-building', labelEn: 'Capacity Building', labelAr: 'بناء القدرات' },
              { href: '/services/risk-compliance', labelEn: 'Risk & Compliance', labelAr: 'المخاطر والامتثال' }
            ].map((service) => (
              <Link key={service.href} href={service.href}>
                <Button variant="outline" className="border-[#133129]/20 text-[#133129] hover:bg-[#133129] hover:text-white">
                  {language === 'ar' ? service.labelAr : service.labelEn}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
