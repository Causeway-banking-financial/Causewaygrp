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
  Maximize2,

} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

// YETO Data Sectors - matching the reference images exactly
const yetoSectors = [
  { id: 1, nameAr: 'الأمن الغذائي', nameEn: 'Food Security', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80' },
  { id: 2, nameAr: 'العملة والصرف', nameEn: 'Currency & Exchange', image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80' },
  { id: 3, nameAr: 'تدفقات المساعدات', nameEn: 'Aid Flows', image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80' },
  { id: 4, nameAr: 'الطاقة والوقود', nameEn: 'Energy & Fuel', image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80' },
  { id: 5, nameAr: 'سوق العمل', nameEn: 'Labor Market', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  { id: 6, nameAr: 'الفقر والتنمية', nameEn: 'Poverty & Development', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80' },
  { id: 7, nameAr: 'اقتصاد الصراع', nameEn: 'Conflict Economy', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80' },
  { id: 8, nameAr: 'البنية التحتية', nameEn: 'Infrastructure', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 9, nameAr: 'الاستثمار', nameEn: 'Investment', image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80' },
  { id: 10, nameAr: 'المالية العامة', nameEn: 'Public Finance', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80' },
  { id: 11, nameAr: 'الأسعار وتكاليف المعيشة', nameEn: 'Prices & Cost of Living', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80' }
];



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

export default function Observatory() {
  const [email, setEmail] = useState('');
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

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <YetoBanner variant="top" />
      <Header />
      
      {/* Hero Section with YETO Map */}
      <section className="relative pt-32 pb-20 min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/images/yeto-map-hero.jpeg" 
            alt="YETO Yemen Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#133129]/80 via-[#133129]/60 to-[#133129]/90" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <img 
                  src="/images/causeway-logo-main.jpeg" 
                  alt="CauseWay Logo"
                  className="h-24 w-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="inline-flex items-center gap-2 bg-[#d4a84b]/20 px-4 py-2 rounded-full mb-6">
                <Bell className="w-4 h-4 text-[#d4a84b]" />
                <span className="text-[#d4a84b] text-sm font-semibold">
                  {language === 'ar' ? 'قادم قريباً' : 'Coming Soon'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? (
                  <>
                    <span className="block">كوزواي | CauseWay</span>
                    <span className="block text-2xl md:text-3xl mt-4 text-[#d4a84b]">المرصد اليمني للشفافية الاقتصادية</span>
                  </>
                ) : (
                  <>
                    <span className="block">CauseWay | كوزواي</span>
                    <span className="block text-2xl md:text-3xl mt-4 text-[#d4a84b]">Yemen Economic Transparency Observatory</span>
                  </>
                )}
              </h1>
              
              <p className="text-xl md:text-2xl text-[#faf9f6]/80 mb-6" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Source Sans Pro', sans-serif" }}>
                {language === 'ar' 
                  ? '(Yemen Economic Transparency Observatory)'
                  : '(المرصد اليمني للشفافية الاقتصادية)'
                }
              </p>
              
              <blockquote className="mb-8">
                <p className="text-xl text-[#d4a84b] italic" style={{ fontFamily: "'Amiri', serif" }}>
                  {language === 'ar' ? 'نحو اقتصاد مبني على الحقائق' : 'Towards a fact-based economy'}
                </p>
                <p className="text-[#faf9f6]/60 text-sm mt-2">
                  {language === 'ar' ? 'Towards a fact-based economy' : 'نحو اقتصاد مبني على الحقائق'}
                </p>
              </blockquote>
              
              <p className="text-lg text-[#faf9f6]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                {language === 'ar' 
                  ? 'لعقد من الزمن، اتُخذت القرارات في الظلام. شيء ما على وشك التغيير.'
                  : 'For a decade, decisions have been made in the dark. Something is about to change.'
                }
              </p>

              <form onSubmit={handleNotify} className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني لتحديثات الإطلاق' : 'Enter your email for launch updates'}
                  className="flex-1 px-4 py-3 bg-[#224B40] border border-[#406D61]/30 rounded text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:outline-none focus:border-[#d4a84b]"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold whitespace-nowrap">
                  <Bell className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {language === 'ar' ? 'أخبرني عند الإطلاق' : 'Notify Me'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CauseWay vs YETO Explainer */}
      <section className="py-16 bg-[#faf9f6]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm border border-[#133129]/10"
              >
                <div className="w-12 h-12 bg-[#133129] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[#d4a84b] font-bold text-lg">CW</span>
                </div>
                <h3 className="text-xl font-serif text-[#133129] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? 'كوزواي (الاستشارات)' : 'CauseWay (Consultancy)'}
                </h3>
                <p className="text-[#406D61] leading-relaxed">
                  {language === 'ar' 
                    ? 'شركة استشارية تقدم خدمات آمنة حوكمياً للمؤسسات المالية: هندسة التمويل الإسلامي، المخاطر والامتثال، الأنظمة المصرفية، التدريب.'
                    : 'Advisory firm offering governance-safe services to financial institutions: Islamic finance engineering, risk & compliance, core banking systems, training.'
                  }
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-[#133129] p-8 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-[#d4a84b] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-[#133129] font-bold text-lg">YT</span>
                </div>
                <h3 className="text-xl font-serif text-[#faf9f6] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? 'يتو (المرصد)' : 'YETO (Observatory)'}
                </h3>
                <p className="text-[#faf9f6]/80 leading-relaxed">
                  {language === 'ar' 
                    ? 'منصة مستقلة (قيد الإطلاق قريباً) توفر بيانات اقتصادية منظمة وتحليلات. رؤى كوزواي تغذي يتو، لكنه يعمل كقاعدة أدلة محايدة.'
                    : 'Independent platform (launching soon) providing structured economic data and analysis. CauseWay insights feed YETO, but it operates as a neutral evidence base.'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* YETO Data Sectors Grid - Matching Reference Images */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'قطاعات البيانات' : 'Data Sectors'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'القطاعات الاقتصادية المغطاة' : 'Economic Sectors Covered'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'بيانات شاملة وتحليلات عبر 11 قطاعاً اقتصادياً رئيسياً في اليمن'
                : 'Comprehensive data and analysis across 11 key economic sectors in Yemen'
              }
            </p>
          </div>

          {/* Sectors Grid - 2x2 layout like reference images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {yetoSectors.slice(0, 8).map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative h-48 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => toast.info(language === 'ar' ? 'قادم قريباً' : 'Coming Soon')}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${sector.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white text-lg font-semibold" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Source Sans Pro', sans-serif" }}>
                    {language === 'ar' ? sector.nameAr : sector.nameEn}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">
                    {language === 'ar' ? sector.nameEn : sector.nameAr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row - 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {yetoSectors.slice(8).map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 8) * 0.05 }}
                viewport={{ once: true }}
                className="group relative h-48 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => toast.info(language === 'ar' ? 'قادم قريباً' : 'Coming Soon')}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${sector.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white text-lg font-semibold" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Source Sans Pro', sans-serif" }}>
                    {language === 'ar' ? sector.nameAr : sector.nameEn}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">
                    {language === 'ar' ? sector.nameEn : sector.nameAr}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-20 bg-[#133129]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'مميزات المنصة' : 'Platform Features'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'ماذا ستقدم يتو' : 'What YETO Will Offer'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#224B40] p-6 rounded-lg border border-[#406D61]/30"
              >
                <div className="w-12 h-12 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#d4a84b]" />
                </div>
                <h3 className="text-lg font-serif text-[#faf9f6] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? feature.titleAr : feature.title}
                </h3>
                <p className="text-[#faf9f6]/70 text-sm leading-relaxed">
                  {language === 'ar' ? feature.descriptionAr : feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#faf9f6]">
        <div className="container">
          <div className="bg-[#133129] rounded-lg p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'كن أول من يعلم' : 'Be the First to Know'}
            </h3>
            <p className="text-[#faf9f6]/70 mb-8 max-w-xl mx-auto">
              {language === 'ar' 
                ? 'اشترك للحصول على تحديثات حصرية حول إطلاق يتو والوصول المبكر إلى المنصة.'
                : 'Subscribe for exclusive updates on YETO launch and early access to the platform.'
              }
            </p>
            <form onSubmit={handleNotify} className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                className="flex-1 px-4 py-3 bg-[#224B40] border border-[#406D61]/30 rounded text-[#faf9f6] placeholder:text-[#faf9f6]/40 focus:outline-none focus:border-[#d4a84b]"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
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
