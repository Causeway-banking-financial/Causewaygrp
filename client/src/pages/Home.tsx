/**
 * CauseWay Home Page
 * Design: Institutional Arabesque Modernism
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Sections: Hero, Services Preview, Observatory Preview, Insights, Newsletter
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Building2, 
  Shield, 
  Server, 
  Users, 
  GraduationCap, 
  Palette,
  Calendar,
  ChevronRight,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';
import { useLanguage } from '@/contexts/LanguageContext';

const services = [
  {
    icon: Building2,
    title: 'Islamic Finance Engineering',
    titleAr: 'هندسة التمويل الإسلامي',
    description: 'Sharia-compliant product development, Sukuk structuring, and Islamic banking transformation.',
    descriptionAr: 'تطوير المنتجات المتوافقة مع الشريعة، هيكلة الصكوك، وتحويل البنوك الإسلامية.',
    href: '/services/islamic-finance'
  },
  {
    icon: Shield,
    title: 'Risk & Compliance',
    titleAr: 'المخاطر والامتثال',
    description: 'AML/CFT frameworks, regulatory compliance, internal audit, and risk assessment.',
    descriptionAr: 'أطر مكافحة غسل الأموال وتمويل الإرهاب، الامتثال التنظيمي، التدقيق الداخلي، وتقييم المخاطر.',
    href: '/services/risk-compliance'
  },
  {
    icon: Server,
    title: 'Core Banking Systems',
    titleAr: 'الأنظمة المصرفية الأساسية',
    description: 'System selection, digital transformation, integration services, and legacy modernization.',
    descriptionAr: 'اختيار الأنظمة، التحول الرقمي، خدمات التكامل، وتحديث الأنظمة القديمة.',
    href: '/services/core-banking'
  },
  {
    icon: Users,
    title: 'Microfinance Development',
    titleAr: 'تطوير التمويل الأصغر',
    description: 'MFI establishment, capacity building, product development, and regulatory licensing.',
    descriptionAr: 'إنشاء مؤسسات التمويل الأصغر، بناء القدرات، تطوير المنتجات، والترخيص التنظيمي.',
    href: '/services/microfinance'
  },
  {
    icon: GraduationCap,
    title: 'Capacity Building',
    titleAr: 'بناء القدرات',
    description: 'Board training, executive development, staff certification, and workshops.',
    descriptionAr: 'تدريب مجالس الإدارة، تطوير القيادات، شهادات الموظفين، وورش العمل.',
    href: '/services/capacity-building'
  },
  {
    icon: Palette,
    title: 'Branding & Identity',
    titleAr: 'العلامة التجارية والهوية',
    description: 'Financial sector branding, corporate identity, marketing strategy, and digital presence.',
    descriptionAr: 'العلامة التجارية للقطاع المالي، الهوية المؤسسية، استراتيجية التسويق، والحضور الرقمي.',
    href: '/services/branding'
  }
];

const insights = [
  {
    category: 'Governance',
    categoryAr: 'الحوكمة',
    title: 'Governance in Fragile Markets: Building Audit-Ready Systems',
    titleAr: 'الحوكمة في الأسواق الهشة: بناء أنظمة جاهزة للتدقيق',
    excerpt: 'A deep dive into compliance frameworks for high-risk environments and emerging market banks.',
    date: 'January 28, 2026',
    dateAr: '28 يناير 2026',
    readTime: '12 min',
    image: '/images/aden-aerial.jpg',
    href: '/insights/governance-fragile-markets'
  },
  {
    category: 'Islamic Finance',
    categoryAr: 'التمويل الإسلامي',
    title: 'Islamic Finance Product Engineering: From Concept to Execution',
    titleAr: 'هندسة منتجات التمويل الإسلامي: من المفهوم إلى التنفيذ',
    excerpt: 'Structuring innovative, compliant financial solutions for modern banking needs.',
    date: 'January 25, 2026',
    dateAr: '25 يناير 2026',
    readTime: '8 min',
    image: '/images/financial-district.png',
    href: '/insights/islamic-finance-engineering'
  },
  {
    category: 'Compliance',
    categoryAr: 'الامتثال',
    title: 'AML/CFT in Development Finance: Practical Frameworks',
    titleAr: 'مكافحة غسل الأموال في تمويل التنمية: أطر عملية',
    excerpt: 'Implementing robust anti-money laundering strategies in challenging environments.',
    date: 'January 20, 2026',
    dateAr: '20 يناير 2026',
    readTime: '10 min',
    image: '/images/business-district.jpg',
    href: '/insights/aml-development-finance'
  },
  {
    category: 'Risk Management',
    categoryAr: 'إدارة المخاطر',
    title: 'Treasury Governance for Emerging Market Banks',
    titleAr: 'حوكمة الخزينة للبنوك في الأسواق الناشئة',
    excerpt: 'Optimizing liquidity and risk management in volatile economic conditions.',
    date: 'January 15, 2026',
    dateAr: '15 يناير 2026',
    readTime: '9 min',
    image: '/images/aden-harbor.jpg',
    href: '/insights/treasury-governance'
  }
];

const newsTicker = [
  { text: 'New AML/CFT Framework Released', textAr: 'إصدار إطار جديد لمكافحة غسل الأموال' },
  { text: 'Yemen Banking Sector Update', textAr: 'تحديث القطاع المصرفي اليمني' },
  { text: 'Observatory Q1 Report Available', textAr: 'تقرير المرصد للربع الأول متاح' },
  { text: 'YETO Platform Launch Announced', textAr: 'الإعلان عن إطلاق منصة يتو' }
];

// YETO Data Sectors from reference images
const yetoSectors = [
  { id: 1, nameAr: 'الأمن الغذائي', nameEn: 'Food Security', image: '/images/yeto-sector-1.jpeg', position: 'top-left' },
  { id: 2, nameAr: 'العملة والصرف', nameEn: 'Currency & Exchange', image: '/images/yeto-sector-1.jpeg', position: 'top-right' },
  { id: 3, nameAr: 'تدفقات المساعدات', nameEn: 'Aid Flows', image: '/images/yeto-sector-1.jpeg', position: 'bottom-left' },
  { id: 4, nameAr: 'الطاقة والوقود', nameEn: 'Energy & Fuel', image: '/images/yeto-sector-1.jpeg', position: 'bottom-right' },
  { id: 5, nameAr: 'سوق العمل', nameEn: 'Labor Market', image: '/images/yeto-sector-2.jpeg', position: 'top-left' },
  { id: 6, nameAr: 'الفقر والتنمية', nameEn: 'Poverty & Development', image: '/images/yeto-sector-2.jpeg', position: 'top-right' },
  { id: 7, nameAr: 'اقتصاد الصراع', nameEn: 'Conflict Economy', image: '/images/yeto-sector-2.jpeg', position: 'bottom-left' },
  { id: 8, nameAr: 'البنية التحتية', nameEn: 'Infrastructure', image: '/images/yeto-sector-2.jpeg', position: 'bottom-right' },
  { id: 9, nameAr: 'الاستثمار', nameEn: 'Investment', image: '/images/yeto-sector-3.jpeg', position: 'top-left' },
  { id: 10, nameAr: 'المالية العامة', nameEn: 'Public Finance', image: '/images/yeto-sector-3.jpeg', position: 'top-right' },
  { id: 11, nameAr: 'الأسعار وتكاليف المعيشة', nameEn: 'Prices & Cost of Living', image: '/images/yeto-sector-3.jpeg', position: 'bottom-right' }
];

export default function Home() {
  const { language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen" id="main-content" role="main" dir={isRTL ? 'rtl' : 'ltr'}>
      <YetoBanner variant="top" />
      <Header />
      
      {/* Hero Section - Matching Reference Design with Centered Layout */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image - Yemen Cityscape */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/hero-yemen-aden.jpg)',
              filter: 'brightness(0.4) saturate(0.8)'
            }}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-[#133129]/50" />
        </div>
        
        {/* Centered Hero Content */}
        <div className="container relative z-10 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Headline - Centered */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#faf9f6] leading-tight mb-6 md:mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? (
                <>
                  حيث يصبح التمويل<br />
                  <span className="text-[#d4a84b] italic">بنية تحتية</span>
                </>
              ) : (
                <>
                  Where Finance Becomes<br />
                  <span className="text-[#d4a84b] italic">Infrastructure</span>
                </>
              )}
            </h1>
            
            {/* Sub-headline - Sharia-grounded tagline */}
            <p className="text-lg sm:text-xl md:text-2xl text-[#faf9f6]/90 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'بناء أنظمة مالية قائمة على الشريعة وآمنة حوكميًا للبنوك والمؤسسات وشركاء التنمية.'
                : 'Building Sharia-grounded, governance-safe financial systems for banks, institutions, and development partners.'
              }
            </p>
            
            {/* CTA Buttons - Centered */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all min-w-[200px]">
                  {language === 'ar' ? 'استكشف خدماتنا' : 'Explore Our Services'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#faf9f6]/60 text-[#faf9f6] hover:bg-[#faf9f6]/10 hover:border-[#faf9f6] text-base px-8 py-6 min-w-[200px]">
                  {language === 'ar' ? 'طلب إحاطة' : 'Request a Briefing'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Governance Pulse Ticker - Matching Reference Design */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#224B40]/95 backdrop-blur-sm border-t border-[#406D61]/30">
          <div className="container py-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[#d4a84b] font-semibold text-sm whitespace-nowrap">
                  {language === 'ar' ? 'نبض الحوكمة' : 'Governance Pulse'}
                </span>
              </div>
              <span className="text-[#faf9f6]/50 text-sm">|</span>
              <span className="text-[#faf9f6]/60 text-sm whitespace-nowrap">
                {language === 'ar' ? 'آخر:' : 'Latest:'}
              </span>
              <div className="ticker-wrapper flex-1 overflow-hidden">
                <div className="ticker-content">
                  {[...newsTicker, ...newsTicker].map((item, index) => (
                    <span key={index} className="text-[#faf9f6]/90 text-sm whitespace-nowrap flex items-center">
                      {language === 'ar' ? item.textAr : item.text}
                      <span className="text-[#faf9f6]/40 mx-4">|</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="container">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {language === 'ar' ? 'خبراتنا' : 'Our Expertise'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#133129] mt-2 sm:mt-3 mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'استشارات مالية شاملة' : 'Comprehensive Financial Advisory'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto text-sm sm:text-base px-4">
              {language === 'ar' 
                ? 'من هندسة التمويل الإسلامي إلى التحول الرقمي، نقدم حلولاً متكاملة للمؤسسات المالية.'
                : 'From Islamic finance engineering to digital transformation, we provide end-to-end solutions for financial institutions.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <div className="group bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-transparent hover:border-[#d4a84b]/20">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#133129]/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#d4a84b]/20 transition-colors">
                      <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#224B40] group-hover:text-[#d4a84b] transition-colors" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif text-[#133129] mb-1 sm:mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {language === 'ar' ? service.titleAr : service.title}
                    </h3>
                    <p className="text-[#1e6b5a]/80 text-xs sm:text-sm mb-2 sm:mb-3" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Source Sans Pro', sans-serif" }}>
                      {language === 'ar' ? service.title : service.titleAr}
                    </p>
                    <p className="text-[#406D61] text-xs sm:text-sm leading-relaxed">
                      {language === 'ar' ? service.descriptionAr : service.description}
                    </p>
                    <div className={`mt-3 sm:mt-4 flex items-center text-[#d4a84b] font-medium text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {language === 'ar' ? 'اعرف المزيد' : 'Learn More'} 
                      <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/services">
              <Button variant="outline" className="border-[#133129] text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6] text-sm sm:text-base">
                {language === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-16 bg-[#faf9f6] border-y border-[#133129]/10">
        <div className="container">
          <blockquote className="text-center max-w-3xl mx-auto px-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#133129] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' 
                ? '"الحوكمة ليست قيداً؛ إنها أساس المصداقية."'
                : '"Governance is not a constraint; it is the foundation of credibility."'
              }
            </p>
            <cite className="text-[#406D61] mt-3 sm:mt-4 block not-italic text-sm sm:text-base">
              — {language === 'ar' ? 'قيادة كوزواي' : 'CauseWay Leadership'}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <span className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                {language === 'ar' ? 'أحدث الرؤى' : 'Latest Insights'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#133129] mt-2 sm:mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'تحليلات الخبراء والقيادة الفكرية' : 'Expert Analysis & Thought Leadership'}
              </h2>
            </div>
            <Link href="/insights">
              <Button variant="outline" className="mt-4 md:mt-0 border-[#133129] text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6] text-sm">
                {language === 'ar' ? 'عرض جميع الرؤى' : 'View All Insights'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Link href={insights[0].href}>
                <div className="group relative h-[300px] sm:h-[400px] md:h-full md:min-h-[450px] rounded-lg overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${insights[0].image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#133129] via-[#133129]/70 to-transparent" />
                  <div className={`absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 ${isRTL ? 'text-right' : ''}`}>
                    <span className="inline-block bg-[#d4a84b] text-[#133129] text-xs font-semibold px-3 py-1 rounded mb-3 sm:mb-4">
                      {language === 'ar' ? insights[0].categoryAr : insights[0].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#faf9f6] mb-2 sm:mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {language === 'ar' ? insights[0].titleAr : insights[0].title}
                    </h3>
                    <p className="text-[#faf9f6]/80 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {insights[0].excerpt}
                    </p>
                    <div className={`flex items-center gap-3 sm:gap-4 text-[#faf9f6]/60 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {language === 'ar' ? insights[0].dateAr : insights[0].date}
                      </span>
                      <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {insights[0].readTime}
                      </span>
                    </div>
                    <div className={`mt-3 sm:mt-4 flex items-center text-[#d4a84b] font-medium text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {language === 'ar' ? 'قراءة التحليل' : 'Read Analysis'} 
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Secondary Articles */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {insights.slice(1).map((article, index) => (
                <motion.div
                  key={article.href}
                  initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={article.href}>
                    <div className={`group bg-[#faf9f6]/50 rounded-lg p-4 sm:p-5 md:p-6 hover:bg-[#faf9f6] transition-colors border border-transparent hover:border-[#d4a84b]/20 ${isRTL ? 'text-right' : ''}`}>
                      <span className="text-[#d4a84b] text-xs font-semibold uppercase tracking-wider">
                        {language === 'ar' ? article.categoryAr : article.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-serif text-[#133129] mt-1 sm:mt-2 mb-1 sm:mb-2 group-hover:text-[#224B40] transition-colors line-clamp-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {language === 'ar' ? article.titleAr : article.title}
                      </h4>
                      <p className="text-[#406D61] text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className={`flex items-center text-[#d4a84b] font-medium text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {language === 'ar' ? 'اقرأ المزيد' : 'Read More'} 
                        <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Observatory Preview */}
      <section className="py-16 md:py-24 bg-[#133129] relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/aden-city.jpg)',
              filter: 'brightness(0.25) saturate(0.6)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#133129] via-[#133129]/90 to-[#133129]/70" />
        </div>
        
        <div className="container relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={isRTL ? 'lg:col-start-2 text-right' : ''}
            >
              <span className="text-[#d4a84b] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                {language === 'ar' ? 'المرصد' : 'Observatory'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#faf9f6] mt-2 sm:mt-3 mb-3 sm:mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'المرصد اليمني للشفافية الاقتصادية' : 'Yemen Economic Transparency Observatory'}
              </h2>
              <p className="text-[#faf9f6]/80 text-lg sm:text-xl mb-3 sm:mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'Yemen Economic Transparency Observatory' : 'المرصد اليمني للشفافية الاقتصادية'}
              </p>
              <p className="text-[#faf9f6]/70 mb-3 leading-relaxed text-sm sm:text-base">
                {language === 'ar' 
                  ? 'كوزواي شركة استشارية تقدم خدمات آمنة حوكمياً. يتو منصة مستقلة (قيد الإطلاق قريباً) توفر بيانات اقتصادية منظمة وتحليلات.'
                  : 'CauseWay is an advisory firm offering governance-safe services. YETO is an independent platform (launching soon) providing structured economic data and analysis.'
                }
              </p>
              <p className="text-[#faf9f6]/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {language === 'ar' 
                  ? 'الوصول إلى المؤشرات الاقتصادية الآنية، تحليل القطاعات، تتبع أسعار الصرف، والتقارير المعمقة.'
                  : 'Access real-time economic indicators, sector analysis, exchange rate tracking, and in-depth reports.'
                }
              </p>
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Link href="/observatory">
                  <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold w-full sm:w-auto">
                    {language === 'ar' ? 'استكشف المرصد' : 'Explore Observatory'}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`hidden md:block ${isRTL ? 'lg:col-start-1' : ''}`}
            >
              {/* YETO Teaser Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-[#d4a84b]/20">
                <img 
                  src="/images/yeto-teaser.jpg" 
                  alt="YETO - Yemen Economic Transparency Observatory"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Matching Reference Design */}
      <section className="py-8 sm:py-10 bg-[#133129] border-t border-[#224B40]/30">
        <div className="container">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <h3 className="text-lg sm:text-xl font-serif text-[#faf9f6] whitespace-nowrap" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'اشترك في رؤى كوزواي' : 'Subscribe to CauseWay Insights'}
            </h3>
            <form className={`flex flex-col sm:flex-row gap-3 w-full md:flex-1 md:max-w-lg ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <input
                type="email"
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address'}
                className="flex-1 px-4 py-2.5 bg-white border border-[#e5e5e5] rounded text-[#133129] placeholder:text-[#133129]/40 focus:outline-none focus:border-[#d4a84b] text-sm"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold whitespace-nowrap px-6">
                {language === 'ar' ? 'اشترك' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
