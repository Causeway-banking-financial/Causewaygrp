/**
 * Islamic Finance Engineering Service Page - Creative Redesign
 * Features: Animated hero, colorful product cards, impact stats, interactive elements
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Building2, 
  ChevronRight,
  FileText,
  Users,
  Settings,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Scale,
  Landmark,
  HandCoins,
  Handshake,
  PiggyBank,
  Shield,
  Briefcase,
  TrendingUp,
  Award,
  Target,
  Layers,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/App';

// Islamic Finance Products with unique colors
const islamicProducts = [
  {
    id: 'murabaha',
    icon: HandCoins,
    titleEn: 'Murabaha',
    titleAr: 'المرابحة',
    subtitleEn: 'Cost-Plus Financing',
    subtitleAr: 'تمويل التكلفة زائد الربح',
    descEn: 'Transparent cost-plus sale structure for asset financing',
    descAr: 'هيكل بيع شفاف بالتكلفة زائد الربح لتمويل الأصول',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-500/10'
  },
  {
    id: 'ijara',
    icon: Building2,
    titleEn: 'Ijara',
    titleAr: 'الإجارة',
    subtitleEn: 'Islamic Leasing',
    subtitleAr: 'التأجير الإسلامي',
    descEn: 'Sharia-compliant leasing with ownership transfer options',
    descAr: 'تأجير متوافق مع الشريعة مع خيارات نقل الملكية',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'musharaka',
    icon: Handshake,
    titleEn: 'Musharaka',
    titleAr: 'المشاركة',
    subtitleEn: 'Partnership Financing',
    subtitleAr: 'تمويل الشراكة',
    descEn: 'Joint venture partnerships with profit-loss sharing',
    descAr: 'شراكات المشاريع المشتركة مع تقاسم الأرباح والخسائر',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'mudaraba',
    icon: TrendingUp,
    titleEn: 'Mudaraba',
    titleAr: 'المضاربة',
    subtitleEn: 'Profit Sharing',
    subtitleAr: 'تقاسم الأرباح',
    descEn: 'Investment partnership with capital and expertise sharing',
    descAr: 'شراكة استثمارية مع تقاسم رأس المال والخبرة',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 'sukuk',
    icon: Landmark,
    titleEn: 'Sukuk',
    titleAr: 'الصكوك',
    subtitleEn: 'Islamic Bonds',
    subtitleAr: 'السندات الإسلامية',
    descEn: 'Asset-backed securities compliant with Sharia principles',
    descAr: 'أوراق مالية مدعومة بأصول متوافقة مع مبادئ الشريعة',
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-teal-500/10'
  },
  {
    id: 'takaful',
    icon: Shield,
    titleEn: 'Takaful',
    titleAr: 'التكافل',
    subtitleEn: 'Islamic Insurance',
    subtitleAr: 'التأمين الإسلامي',
    descEn: 'Cooperative insurance based on mutual assistance',
    descAr: 'تأمين تعاوني قائم على المساعدة المتبادلة',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10'
  },
  {
    id: 'wakala',
    icon: Briefcase,
    titleEn: 'Wakala',
    titleAr: 'الوكالة',
    subtitleEn: 'Agency Agreement',
    subtitleAr: 'اتفاقية الوكالة',
    descEn: 'Fee-based agency contracts for investment management',
    descAr: 'عقود وكالة قائمة على الرسوم لإدارة الاستثمار',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10'
  },
  {
    id: 'salam',
    icon: PiggyBank,
    titleEn: 'Salam',
    titleAr: 'السلم',
    subtitleEn: 'Forward Sale',
    subtitleAr: 'البيع الآجل',
    descEn: 'Advance payment for future delivery of goods',
    descAr: 'دفع مقدم للتسليم المستقبلي للبضائع',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10'
  }
];

// Key deliverables
const deliverables = [
  { icon: FileText, titleEn: 'Product Manuals & SOPs', titleAr: 'أدلة المنتجات وإجراءات التشغيل', descEn: 'Comprehensive documentation', descAr: 'توثيق شامل' },
  { icon: Users, titleEn: 'SSB Briefing Packs', titleAr: 'حزم إحاطة الهيئة الشرعية', descEn: 'Board presentation materials', descAr: 'مواد العرض للمجلس' },
  { icon: Settings, titleEn: 'Core Banking Config', titleAr: 'تكوين النظام المصرفي', descEn: 'Technical setup', descAr: 'الإعداد التقني' },
  { icon: BookOpen, titleEn: 'Staff Training', titleAr: 'تدريب الموظفين', descEn: 'Comprehensive programs', descAr: 'برامج شاملة' }
];

// Engineering pillars
const pillars = [
  { icon: Scale, titleEn: 'Sharia Compliance First', titleAr: 'الامتثال الشرعي أولاً', descEn: 'AAOIFI standards and local regulatory compliance', descAr: 'معايير أيوفي والامتثال التنظيمي المحلي', color: 'border-[#d4a84b]' },
  { icon: Zap, titleEn: 'Operational Viability', titleAr: 'الجدوى التشغيلية', descEn: 'Products that work in practice, not just theory', descAr: 'منتجات تعمل عملياً وليس نظرياً فقط', color: 'border-[#224B40]' },
  { icon: Target, titleEn: 'Market Competitiveness', titleAr: 'التنافسية السوقية', descEn: 'Attractive pricing and customer experience', descAr: 'تسعير جذاب وتجربة عملاء متميزة', color: 'border-[#406D61]' }
];

// Process steps
const processSteps = [
  { num: 1, titleEn: 'Discovery', titleAr: 'الاكتشاف', descEn: 'Understanding requirements', descAr: 'فهم المتطلبات' },
  { num: 2, titleEn: 'Assessment', titleAr: 'التقييم', descEn: 'Sharia & feasibility review', descAr: 'مراجعة شرعية والجدوى' },
  { num: 3, titleEn: 'Design', titleAr: 'التصميم', descEn: 'Product structuring', descAr: 'هيكلة المنتج' },
  { num: 4, titleEn: 'Implementation', titleAr: 'التنفيذ', descEn: 'Systems & training', descAr: 'الأنظمة والتدريب' },
  { num: 5, titleEn: 'Handover', titleAr: 'التسليم', descEn: 'Launch support', descAr: 'دعم الإطلاق' }
];

// Impact stats
const impactStats = [
  { value: '25+', labelEn: 'Products Engineered', labelAr: 'منتج مهندس' },
  { value: '12+', labelEn: 'Banks Served', labelAr: 'بنك تم خدمته' },
  { value: '100%', labelEn: 'SSB Approval Rate', labelAr: 'نسبة موافقة الهيئة الشرعية' },
  { value: '5+', labelEn: 'Years Experience', labelAr: 'سنوات خبرة' }
];

export default function IslamicFinance() {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO 
        title={language === 'ar' ? 'هندسة التمويل الإسلامي | كوزواي' : 'Islamic Finance Engineering | CauseWay'}
        description={language === 'ar' 
          ? 'تصميم منتجات مالية متوافقة مع الشريعة تجسر الفجوة بين الامتثال النظري والواقع التشغيلي'
          : 'Designing Sharia-compliant financial products that bridge theoretical compliance and operational reality'
        }
        keywords="Islamic Finance, Sharia Compliance, Sukuk, Murabaha, Ijara, Musharaka, Islamic Banking, Yemen"
      />
      <Header />
      
      {/* Hero Section - Animated Gradient with Islamic Pattern */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#133129] via-[#1a4a3d] to-[#224B40]">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-48 h-48 rounded-full bg-[#d4a84b]/5"
                initial={{ x: Math.random() * 100, y: Math.random() * 100, scale: 0.5 }}
                animate={{ 
                  x: [Math.random() * 100, Math.random() * 100 + 50, Math.random() * 100],
                  y: [Math.random() * 100, Math.random() * 100 + 30, Math.random() * 100],
                  scale: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ left: `${i * 15}%`, top: `${i * 12}%` }}
              />
            ))}
          </div>
          {/* Islamic Geometric Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a84b' fill-opacity='0.4'%3E%3Cpath d='M40 0L80 40L40 80L0 40L40 0zm0 10L10 40l30 30 30-30-30-30zm0 10l20 20-20 20-20-20 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Link href="/services" className={`inline-flex items-center text-[#d4a84b] hover:text-[#d4a84b]/80 mb-6 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'ml-1 rotate-180' : 'mr-1 rotate-180'}`} />
              {language === 'ar' ? 'العودة إلى الخدمات' : 'Back to Services'}
            </Link>
            
            {/* Icon Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-2xl flex items-center justify-center shadow-lg shadow-[#d4a84b]/20"
            >
              <Scale className="w-10 h-10 text-[#133129]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هندسة التمويل الإسلامي' : 'Islamic Finance Engineering'}
            </h1>
            <p className="text-lg md:text-xl text-[#faf9f6]/70 font-medium mb-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Source Sans Pro', sans-serif" }}>
              {language === 'ar' ? 'Islamic Finance Engineering' : 'هندسة التمويل الإسلامي'}
            </p>
            <p className="text-lg text-[#faf9f6]/80 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'نصمم منتجات مالية متوافقة مع الشريعة تجسر الفجوة بين الامتثال النظري والواقع التشغيلي. عمليتنا الهندسية تضمن أن كل منتج جاهز للتدقيق وآمن حوكمياً.'
                : 'We design Sharia-compliant financial products that bridge the gap between theoretical compliance and operational reality. Our engineering process ensures every product is audit-ready and governance-safe.'
              }
            </p>
          </motion.div>
          
          {/* Impact Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 max-w-4xl mx-auto"
          >
            {impactStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-center border border-white/10"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#d4a84b] mb-1">{stat.value}</div>
                <div className="text-[#faf9f6]/70 text-sm">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Deliverables */}
      <section className="py-12 bg-[#faf9f6]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {deliverables.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-[#133129]/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#224B40]" />
                </div>
                <h3 className="font-semibold text-[#133129] text-sm mb-1">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-[#406D61] text-xs">
                  {language === 'ar' ? item.descAr : item.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products We Engineer */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'المنتجات التي نهندسها' : 'Products We Engineer'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'حلول التمويل الإسلامي' : 'Islamic Finance Solutions'}
            </h2>
            <p className="text-[#406D61] mt-4 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'منتجات مالية متوافقة مع الشريعة مصممة لتلبية احتياجات المؤسسات المالية الحديثة'
                : 'Sharia-compliant financial products designed to meet the needs of modern financial institutions'
              }
            </p>
          </motion.div>

          {/* Product Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {islamicProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 cursor-pointer ${
                    selectedProduct === product.id ? 'border-[#d4a84b]' : 'border-transparent hover:border-[#d4a84b]/30'
                  }`}
                  onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <product.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-serif text-[#133129] mb-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {language === 'ar' ? product.titleAr : product.titleEn}
                  </h3>
                  <p className="text-[#d4a84b] text-sm font-medium mb-2">
                    {language === 'ar' ? product.subtitleAr : product.subtitleEn}
                  </p>
                  
                  {/* Description */}
                  <p className="text-[#406D61] text-sm leading-relaxed">
                    {language === 'ar' ? product.descAr : product.descEn}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Engineering Approach */}
      <section className="py-16 md:py-20 bg-[#133129]">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'نهجنا الهندسي' : 'Our Engineering Approach'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'ثلاث ركائز للنجاح' : 'Three Pillars of Success'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#224B40]/50 rounded-xl p-6 border-t-4 ${pillar.color}`}
              >
                <div className="w-12 h-12 mb-4 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-[#d4a84b]" />
                </div>
                <h3 className="text-[#faf9f6] font-semibold text-lg mb-2">
                  {language === 'ar' ? pillar.titleAr : pillar.titleEn}
                </h3>
                <p className="text-[#faf9f6]/70 text-sm">
                  {language === 'ar' ? pillar.descAr : pillar.descEn}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Process Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-center text-[#faf9f6] font-semibold text-lg mb-8">
              {language === 'ar' ? 'عمليتنا' : 'Our Process'}
            </h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-[#d4a84b] rounded-full flex items-center justify-center text-[#133129] font-bold">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-[#faf9f6] font-medium text-sm">
                      {language === 'ar' ? step.titleAr : step.titleEn}
                    </p>
                    <p className="text-[#faf9f6]/60 text-xs">
                      {language === 'ar' ? step.descAr : step.descEn}
                    </p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <ChevronRight className={`w-5 h-5 text-[#d4a84b]/50 hidden md:block ${isRTL ? 'rotate-180' : ''}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#d4a84b] to-[#c9a227]">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'جاهز لهندسة منتجاتك الإسلامية؟' : 'Ready to Engineer Your Islamic Products?'}
            </h2>
            <p className="text-[#133129]/80 text-lg mb-8">
              {language === 'ar' 
                ? 'تواصل معنا لمناقشة متطلباتك وتصميم منتجات مالية متوافقة مع الشريعة لمؤسستك.'
                : 'Contact us to discuss your requirements and design Sharia-compliant financial products for your institution.'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                onClick={() => openBooking('islamic-finance')}
                className="bg-[#133129] hover:bg-[#224B40] text-[#faf9f6] font-semibold px-8 py-6 shadow-lg"
              >
                {language === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}
                <Award className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="border-[#133129] text-[#133129] hover:bg-[#133129]/10 px-8 py-6"
                >
                  {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
