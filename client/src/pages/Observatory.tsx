/**
 * Observatory Page - YETO (Yemen Economic Transparency Observatory)
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * المرصد اليمني للشفافية الاقتصادية
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  BarChart3, 
  TrendingUp, 
  Globe, 
  FileText,
  Database,
  Bell,
  Calendar,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    icon: BarChart3,
    title: 'Economic Indicators',
    titleAr: 'المؤشرات الاقتصادية',
    description: 'Real-time tracking of key economic metrics including GDP, inflation, and trade data.',
    descriptionAr: 'تتبع آني للمقاييس الاقتصادية الرئيسية بما في ذلك الناتج المحلي الإجمالي والتضخم وبيانات التجارة.'
  },
  {
    icon: TrendingUp,
    title: 'Exchange Rates',
    titleAr: 'أسعار الصرف',
    description: 'Daily exchange rate monitoring and historical trend analysis.',
    descriptionAr: 'مراقبة يومية لأسعار الصرف وتحليل الاتجاهات التاريخية.'
  },
  {
    icon: Globe,
    title: 'Sector Analysis',
    titleAr: 'تحليل القطاعات',
    description: 'In-depth analysis of banking, microfinance, and financial services sectors.',
    descriptionAr: 'تحليل معمق لقطاعات البنوك والتمويل الأصغر والخدمات المالية.'
  },
  {
    icon: FileText,
    title: 'Reports & Publications',
    titleAr: 'التقارير والمنشورات',
    description: 'Quarterly reports, whitepapers, and policy briefs on Yemen\'s economy.',
    descriptionAr: 'تقارير ربع سنوية وأوراق بيضاء وموجزات سياسات حول اقتصاد اليمن.'
  },
  {
    icon: Database,
    title: 'Data Sources',
    titleAr: 'مصادر البيانات',
    description: 'Aggregated data from Central Bank, World Bank, IMF, and UN agencies.',
    descriptionAr: 'بيانات مجمعة من البنك المركزي والبنك الدولي وصندوق النقد الدولي ووكالات الأمم المتحدة.'
  },
  {
    icon: Calendar,
    title: 'Economic Calendar',
    titleAr: 'التقويم الاقتصادي',
    description: 'Upcoming economic events, policy announcements, and report releases.',
    descriptionAr: 'الأحداث الاقتصادية القادمة وإعلانات السياسات وإصدارات التقارير.'
  }
];

const upcomingReports = [
  { title: 'Q1 2026 Banking Sector Review', titleAr: 'مراجعة القطاع المصرفي للربع الأول 2026', date: 'March 2026', dateAr: 'مارس 2026', status: 'In Progress', statusAr: 'قيد التنفيذ' },
  { title: 'Yemen Microfinance Landscape', titleAr: 'مشهد التمويل الأصغر في اليمن', date: 'April 2026', dateAr: 'أبريل 2026', status: 'Planned', statusAr: 'مخطط' },
  { title: 'Exchange Rate Dynamics Analysis', titleAr: 'تحليل ديناميكيات سعر الصرف', date: 'May 2026', dateAr: 'مايو 2026', status: 'Planned', statusAr: 'مخطط' }
];

const dataSources = [
  { name: 'Central Bank of Yemen', nameAr: 'البنك المركزي اليمني', url: 'https://www.centralbank.gov.ye' },
  { name: 'World Bank Yemen', nameAr: 'البنك الدولي - اليمن', url: 'https://www.worldbank.org/en/country/yemen' },
  { name: 'IMF Yemen Reports', nameAr: 'تقارير صندوق النقد الدولي - اليمن', url: 'https://www.imf.org/en/Countries/YEM' },
  { name: 'UN OCHA Yemen', nameAr: 'مكتب الأمم المتحدة لتنسيق الشؤون الإنسانية - اليمن', url: 'https://www.unocha.org/yemen' }
];

// YETO Dashboard mockup images
const dashboardMockups = [
  {
    src: '/images/yeto/bilingual-dashboard.png',
    title: 'Bilingual Dashboard',
    titleAr: 'لوحة القيادة ثنائية اللغة',
    description: 'Full Arabic and English support with seamless language switching',
    descriptionAr: 'دعم كامل للعربية والإنجليزية مع تبديل سلس للغة'
  },
  {
    src: '/images/yeto/system-overview.png',
    title: 'Complete System Overview',
    titleAr: 'نظرة عامة على النظام',
    description: 'Comprehensive view of all economic indicators and data streams',
    descriptionAr: 'عرض شامل لجميع المؤشرات الاقتصادية وتدفقات البيانات'
  },
  {
    src: '/images/yeto/research-portal.png',
    title: 'Research & Academic Portal',
    titleAr: 'بوابة البحث الأكاديمي',
    description: 'Access to research papers, academic publications, and policy briefs',
    descriptionAr: 'الوصول إلى أوراق البحث والمنشورات الأكاديمية وموجزات السياسات'
  },
  {
    src: '/images/yeto/data-pipeline.png',
    title: 'Data Pipeline Architecture',
    titleAr: 'هيكل خط البيانات',
    description: 'Real-time data aggregation from multiple authoritative sources',
    descriptionAr: 'تجميع البيانات في الوقت الفعلي من مصادر موثوقة متعددة'
  },
  {
    src: '/images/yeto/mobile-dashboard.png',
    title: 'Mobile Responsive Dashboard',
    titleAr: 'لوحة القيادة المتجاوبة',
    description: 'Full functionality on mobile devices for on-the-go access',
    descriptionAr: 'وظائف كاملة على الأجهزة المحمولة للوصول أثناء التنقل'
  }
];

export default function Observatory() {
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { language, isRTL } = useLanguage();

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(language === 'ar' 
        ? 'شكراً لك! سنخبرك عند إطلاق يتو.'
        : 'Thank you! We\'ll notify you when YETO launches.'
      );
      setEmail('');
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % dashboardMockups.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + dashboardMockups.length) % dashboardMockups.length);
    }
  };

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <YetoBanner variant="top" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#133129] min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: 'url(/images/hero-observatory.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#133129] via-[#133129]/90 to-[#133129]" />
        </div>
        
        {/* Geometric Decorations */}
        <div className={`absolute top-32 ${isRTL ? 'left-10' : 'right-10'} w-32 h-32 border border-[#d4a84b]/20 rotate-45 hidden lg:block`} />
        <div className={`absolute bottom-20 ${isRTL ? 'right-10' : 'left-10'} w-24 h-24 border border-[#224B40]/20 hidden lg:block`} />
        
        <div className="container relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={isRTL ? 'lg:col-start-2' : ''}
            >
              <div className={`inline-flex items-center gap-2 bg-[#d4a84b]/20 px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Bell className="w-4 h-4 text-[#d4a84b]" />
                <span className="text-[#d4a84b] text-sm font-semibold">
                  {language === 'ar' ? 'قادم في الربع الثاني 2026' : 'Coming Q2 2026'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'المرصد اليمني للشفافية الاقتصادية' : 'Yemen Economic Transparency Observatory'}
              </h1>
              <p className="text-2xl text-[#faf9f6]/80 mb-6" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
                {language === 'ar' ? 'Yemen Economic Transparency Observatory' : 'المرصد اليمني للشفافية الاقتصادية'}
              </p>
              <p className="text-lg text-[#faf9f6]/70 mb-4 leading-relaxed">
                {language === 'ar' 
                  ? 'يتو منصة مستقلة (قيد الإطلاق قريباً) توفر بيانات اقتصادية منظمة وتحليلات لليمن. رؤى كوزواي الاستشارية تغذي يتو، لكنه يعمل كقاعدة أدلة محايدة - وليس أداة تسويقية.'
                  : 'YETO is an independent platform (launching soon) providing structured economic data and analysis for Yemen. CauseWay\'s consultancy insights feed into YETO, but it operates as a neutral evidence base\u2014not a marketing tool.'
                }
              </p>
              <p className="text-[#faf9f6]/60 mb-8 leading-relaxed">
                {language === 'ar' 
                  ? 'ستوفر المنصة مؤشرات اقتصادية آنية، تحليل القطاعات، تتبع أسعار الصرف، وتقارير معمقة لصناع القرار في جميع أنحاء المنطقة.'
                  : 'The platform will provide real-time economic indicators, sector analysis, exchange rate tracking, and in-depth reports for decision-makers across the region.'
                }
              </p>
              
              <blockquote className={`border-${isRTL ? 'r' : 'l'}-4 border-[#d4a84b] ${isRTL ? 'pr-4' : 'pl-4'} mb-8`}>
                <p className="text-[#faf9f6]/80 italic" style={{ fontFamily: "'Amiri', serif" }}>
                  "نحو اقتصاد مبني على الحقائق"
                </p>
                <p className="text-[#faf9f6]/60 text-sm mt-2">
                  "Towards a fact-based economy"
                </p>
              </blockquote>

              <form onSubmit={handleNotify} className={`flex flex-col sm:flex-row gap-3 max-w-md ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني لتحديثات الإطلاق' : 'Enter your email for launch updates'}
                  className="flex-1 px-4 py-3 bg-[#224B40] border border-[#406D61]/30 rounded text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:outline-none focus:border-[#d4a84b]"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold whitespace-nowrap">
                  {language === 'ar' ? 'أخبرني' : 'Notify Me'}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`hidden lg:block ${isRTL ? 'lg:col-start-1' : ''}`}
            >
              {/* YETO Teaser Image - Yemen Map */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl cursor-pointer group" onClick={() => openLightbox(0)}>
                <img 
                  src="/images/yeto-teaser.jpg" 
                  alt="YETO - Yemen Economic Transparency Observatory"
                  className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#133129]/30 to-transparent" />
                <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} bg-[#d4a84b]/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <Maximize2 className="w-5 h-5 text-[#133129]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Preview Gallery */}
      <section className="py-20 bg-[#224B40]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'معاينة المنصة' : 'Platform Preview'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'معاينات لوحة قيادة يتو' : 'YETO Dashboard Previews'}
            </h2>
            <p className="text-[#faf9f6]/70 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'ألق نظرة على أدوات التحليلات والتصور القوية التي ستكون متاحة عند إطلاق يتو.'
                : 'Get a glimpse of the powerful analytics and visualization tools that will be available when YETO launches.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardMockups.map((mockup, index) => (
              <motion.div
                key={mockup.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#133129] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={mockup.src} 
                    alt={language === 'ar' ? mockup.titleAr : mockup.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} bg-[#d4a84b]/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <Maximize2 className="w-4 h-4 text-[#133129]" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-serif text-[#faf9f6] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {language === 'ar' ? mockup.titleAr : mockup.title}
                  </h3>
                  <p className="text-[#d4a84b]/80 text-sm mb-2" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
                    {language === 'ar' ? mockup.title : mockup.titleAr}
                  </p>
                  <p className="text-[#faf9f6]/60 text-sm">
                    {language === 'ar' ? mockup.descriptionAr : mockup.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'ميزات المنصة' : 'Platform Features'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'ما ستقدمه يتو' : 'What YETO Will Offer'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'منصة شاملة للبيانات الاقتصادية والتحليلات وتقارير الشفافية تركز على القطاع المالي في اليمن.'
                : 'A comprehensive platform for economic data, analysis, and transparency reporting focused on Yemen\'s financial sector.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#406D61]/20 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#224B40]" />
                </div>
                <h3 className="text-xl font-serif text-[#133129] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? feature.titleAr : feature.title}
                </h3>
                <p className="text-[#1e6b5a]/80 text-sm mb-3" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
                  {language === 'ar' ? feature.title : feature.titleAr}
                </p>
                <p className="text-[#406D61] text-sm leading-relaxed">
                  {language === 'ar' ? feature.descriptionAr : feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Reports */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            <div className={isRTL ? 'lg:col-start-2' : ''}>
              <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
                {language === 'ar' ? 'قادم' : 'Upcoming'}
              </span>
              <h2 className="text-3xl font-serif text-[#133129] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'التقارير والمنشورات المخططة' : 'Planned Reports & Publications'}
              </h2>
              <p className="text-[#406D61] mb-8">
                {language === 'ar' 
                  ? 'يعد فريق البحث لدينا تقارير شاملة عن المشهد الاقتصادي في اليمن. اشترك لتلقي إشعارات عند نشر هذه التقارير.'
                  : 'Our research team is preparing comprehensive reports on Yemen\'s economic landscape. Subscribe to receive notifications when these reports are published.'
                }
              </p>
              
              <div className="space-y-4">
                {upcomingReports.map((report) => (
                  <div key={report.title} className={`flex items-center justify-between bg-[#406D61]/10 p-4 rounded-lg border border-[#406D61]/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h4 className="font-medium text-[#133129]">{language === 'ar' ? report.titleAr : report.title}</h4>
                      <p className="text-[#406D61] text-sm">{language === 'ar' ? report.dateAr : report.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      report.status === 'In Progress' 
                        ? 'bg-[#d4a84b]/20 text-[#c9a227]' 
                        : 'bg-[#406D61]/20 text-[#224B40]'
                    }`}>
                      {language === 'ar' ? report.statusAr : report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={isRTL ? 'lg:col-start-1' : ''}>
              <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
                {language === 'ar' ? 'مصادر البيانات' : 'Data Sources'}
              </span>
              <h2 className="text-3xl font-serif text-[#133129] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'مصادر موثوقة' : 'Trusted Sources'}
              </h2>
              <p className="text-[#406D61] mb-8">
                {language === 'ar' 
                  ? 'تجمع يتو البيانات من مصادر موثوقة لتوفير معلومات اقتصادية دقيقة وموثوقة.'
                  : 'YETO aggregates data from authoritative sources to provide accurate and reliable economic information.'
                }
              </p>
              
              <div className="space-y-4">
                {dataSources.map((source) => (
                  <a 
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between bg-[#406D61]/10 p-4 rounded-lg border border-[#406D61]/20 hover:bg-[#406D61]/20 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="font-medium text-[#133129]">{language === 'ar' ? source.nameAr : source.name}</span>
                    <ExternalLink className="w-4 h-4 text-[#224B40]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#133129]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'ابق على اطلاع' : 'Stay Informed'}
            </h2>
            <p className="text-[#faf9f6]/70 mb-8">
              {language === 'ar' 
                ? 'كن أول من يعرف عند إطلاق يتو. اشترك للحصول على التحديثات والوصول المبكر إلى تقاريرنا الاقتصادية.'
                : 'Be the first to know when YETO launches. Subscribe for updates and early access to our economic reports.'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/insights">
                <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                  {language === 'ar' ? 'عرض الرؤى الحالية' : 'View Current Insights'}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10">
                  {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-white/80 hover:text-white p-2 z-50`}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className={`absolute ${isRTL ? 'right-4' : 'left-4'} text-white/80 hover:text-white p-2 z-50`}
          >
            <ChevronLeft className={`w-10 h-10 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className={`absolute ${isRTL ? 'left-4' : 'right-4'} text-white/80 hover:text-white p-2 z-50`}
          >
            <ChevronRight className={`w-10 h-10 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
          
          <div 
            className="max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={dashboardMockups[selectedImage].src}
              alt={language === 'ar' ? dashboardMockups[selectedImage].titleAr : dashboardMockups[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-serif text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? dashboardMockups[selectedImage].titleAr : dashboardMockups[selectedImage].title}
              </h3>
              <p className="text-[#d4a84b]" style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}>
                {language === 'ar' ? dashboardMockups[selectedImage].title : dashboardMockups[selectedImage].titleAr}
              </p>
              <p className="text-white/70 text-sm mt-2">
                {language === 'ar' ? dashboardMockups[selectedImage].descriptionAr : dashboardMockups[selectedImage].description}
              </p>
              <p className="text-white/50 text-xs mt-4">
                {selectedImage + 1} / {dashboardMockups.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
