/**
 * Insights Page - Articles, Publications, News
 * Premium design with unique timely content from Yemen and global sources
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
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
  Search,
  ExternalLink,
  BookOpen,
  Globe,
  TrendingUp,
  Building2,
  Shield,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';
import { useLanguage } from '@/contexts/LanguageContext';

const categories = [
  { en: 'All', ar: 'الكل' },
  { en: 'Governance', ar: 'الحوكمة' },
  { en: 'Islamic Finance', ar: 'التمويل الإسلامي' },
  { en: 'Compliance', ar: 'الامتثال' },
  { en: 'Risk Management', ar: 'إدارة المخاطر' },
  { en: 'Economic Analysis', ar: 'التحليل الاقتصادي' },
  { en: 'Central Bank Reports', ar: 'تقارير البنك المركزي' }
];

// Unique timely articles with Yemen focus and global best practices
const articles = [
  {
    id: 'governance-fragile-markets',
    category: 'Governance',
    categoryAr: 'الحوكمة',
    title: 'Governance in Fragile Markets: Building Audit-Ready Systems',
    titleAr: 'الحوكمة في الأسواق الهشة: بناء أنظمة جاهزة للتدقيق',
    excerpt: 'A deep dive into compliance frameworks for high-risk environments and emerging market banks. This analysis explores practical approaches to establishing robust governance structures.',
    excerptAr: 'نظرة معمقة في أطر الامتثال للبيئات عالية المخاطر والبنوك في الأسواق الناشئة. يستكشف هذا التحليل المناهج العملية لإنشاء هياكل حوكمة قوية.',
    date: 'January 28, 2026',
    dateAr: '28 يناير 2026',
    readTime: '12 min',
    readTimeAr: '12 دقيقة',
    image: '/images/aden-aerial.jpg',
    type: 'article',
    featured: true,
    author: 'Dr. Ahmed Al-Rashid',
    authorAr: 'د. أحمد الراشد'
  },
  {
    id: 'islamic-finance-engineering',
    category: 'Islamic Finance',
    categoryAr: 'التمويل الإسلامي',
    title: 'Islamic Finance Product Engineering: From Concept to Execution',
    titleAr: 'هندسة منتجات التمويل الإسلامي: من المفهوم إلى التنفيذ',
    excerpt: 'Structuring innovative, compliant financial solutions for modern banking needs. A comprehensive guide to developing Sharia-compliant products aligned with AAOIFI standards.',
    excerptAr: 'هيكلة حلول مالية مبتكرة ومتوافقة لاحتياجات البنوك الحديثة. دليل شامل لتطوير منتجات متوافقة مع الشريعة وفقاً لمعايير أيوفي.',
    date: 'January 25, 2026',
    dateAr: '25 يناير 2026',
    readTime: '8 min',
    readTimeAr: '8 دقائق',
    image: '/images/financial-district.png',
    type: 'article',
    author: 'Sarah Al-Mansour',
    authorAr: 'سارة المنصور'
  },
  {
    id: 'yemen-central-bank-q4-2025',
    category: 'Central Bank Reports',
    categoryAr: 'تقارير البنك المركزي',
    title: 'Yemen Central Bank Q4 2025 Analysis: Key Takeaways',
    titleAr: 'تحليل البنك المركزي اليمني للربع الرابع 2025: النقاط الرئيسية',
    excerpt: 'Analysis of the latest Central Bank of Yemen quarterly report. Exchange rate trends, monetary policy decisions, and banking sector health indicators.',
    excerptAr: 'تحليل أحدث تقرير ربع سنوي للبنك المركزي اليمني. اتجاهات أسعار الصرف، قرارات السياسة النقدية، ومؤشرات صحة القطاع المصرفي.',
    date: 'January 22, 2026',
    dateAr: '22 يناير 2026',
    readTime: '15 min',
    readTimeAr: '15 دقيقة',
    image: '/images/aden-city.jpg',
    type: 'report',
    author: 'CauseWay Research',
    authorAr: 'أبحاث كوزواي'
  },
  {
    id: 'aml-development-finance',
    category: 'Compliance',
    categoryAr: 'الامتثال',
    title: 'AML/CFT in Development Finance: Practical Frameworks',
    titleAr: 'مكافحة غسل الأموال في تمويل التنمية: أطر عملية',
    excerpt: 'Implementing robust anti-money laundering strategies in challenging environments. Best practices for financial institutions aligned with FATF recommendations.',
    excerptAr: 'تنفيذ استراتيجيات قوية لمكافحة غسل الأموال في البيئات الصعبة. أفضل الممارسات للمؤسسات المالية المتوافقة مع توصيات فاتف.',
    date: 'January 20, 2026',
    dateAr: '20 يناير 2026',
    readTime: '10 min',
    readTimeAr: '10 دقائق',
    image: '/images/business-district.jpg',
    type: 'article',
    author: 'Mohammed Al-Hadrami',
    authorAr: 'محمد الحضرمي'
  },
  {
    id: 'treasury-governance',
    category: 'Risk Management',
    categoryAr: 'إدارة المخاطر',
    title: 'Treasury Governance for Emerging Market Banks',
    titleAr: 'حوكمة الخزينة للبنوك في الأسواق الناشئة',
    excerpt: 'Optimizing liquidity and risk management in volatile markets. Strategic approaches to treasury operations in fragile economies.',
    excerptAr: 'تحسين السيولة وإدارة المخاطر في الأسواق المتقلبة. المناهج الاستراتيجية لعمليات الخزينة في الاقتصادات الهشة.',
    date: 'January 15, 2026',
    dateAr: '15 يناير 2026',
    readTime: '9 min',
    readTimeAr: '9 دقائق',
    image: '/images/aden-harbor.jpg',
    type: 'article',
    author: 'Fatima Al-Zubairi',
    authorAr: 'فاطمة الزبيري'
  },
  {
    id: 'basel-iv-mena-implementation',
    category: 'Compliance',
    categoryAr: 'الامتثال',
    title: 'Basel IV Implementation in MENA: A Roadmap for Regional Banks',
    titleAr: 'تطبيق بازل IV في منطقة الشرق الأوسط: خارطة طريق للبنوك الإقليمية',
    excerpt: 'How banks in the Middle East and North Africa are preparing for Basel IV requirements. Timeline, challenges, and strategic considerations.',
    excerptAr: 'كيف تستعد البنوك في الشرق الأوسط وشمال أفريقيا لمتطلبات بازل IV. الجدول الزمني والتحديات والاعتبارات الاستراتيجية.',
    date: 'January 12, 2026',
    dateAr: '12 يناير 2026',
    readTime: '14 min',
    readTimeAr: '14 دقيقة',
    image: '/images/hero-yemen-aden.jpg',
    type: 'article',
    author: 'CauseWay Research',
    authorAr: 'أبحاث كوزواي'
  },
  {
    id: 'microfinance-resilience-yemen',
    category: 'Economic Analysis',
    categoryAr: 'التحليل الاقتصادي',
    title: 'Microfinance Resilience in Crisis Economies: Yemen Case Study',
    titleAr: 'مرونة التمويل الأصغر في اقتصادات الأزمات: دراسة حالة اليمن',
    excerpt: 'How MFIs in Yemen have adapted to economic challenges and maintained operations. Lessons for the sector from Yemen Microfinance Network data.',
    excerptAr: 'كيف تكيفت مؤسسات التمويل الأصغر في اليمن مع التحديات الاقتصادية وحافظت على عملياتها. دروس للقطاع من بيانات شبكة التمويل الأصغر اليمنية.',
    date: 'January 8, 2026',
    dateAr: '8 يناير 2026',
    readTime: '11 min',
    readTimeAr: '11 دقيقة',
    image: '/images/aden-aerial.jpg',
    type: 'article',
    author: 'Dr. Nadia Hassan',
    authorAr: 'د. نادية حسن'
  },
  {
    id: 'digital-banking-transformation',
    category: 'Risk Management',
    categoryAr: 'إدارة المخاطر',
    title: 'Digital Banking Transformation: Risk Frameworks for Emerging Markets',
    titleAr: 'التحول المصرفي الرقمي: أطر المخاطر للأسواق الناشئة',
    excerpt: 'Managing cybersecurity, operational, and compliance risks during digital transformation. A framework for banks in challenging environments.',
    excerptAr: 'إدارة مخاطر الأمن السيبراني والتشغيل والامتثال أثناء التحول الرقمي. إطار للبنوك في البيئات الصعبة.',
    date: 'January 5, 2026',
    dateAr: '5 يناير 2026',
    readTime: '13 min',
    readTimeAr: '13 دقيقة',
    image: '/images/financial-district.png',
    type: 'article',
    author: 'Omar Al-Kathiri',
    authorAr: 'عمر الكثيري'
  }
];

// Key reports and publications
const publications = [
  {
    title: 'CauseWay Company Profile 2026',
    titleAr: 'ملف شركة كوزواي 2026',
    description: 'Comprehensive overview of our services, expertise, and track record.',
    descriptionAr: 'نظرة شاملة على خدماتنا وخبراتنا وسجلنا الحافل.',
    type: 'PDF',
    size: '2.4 MB',
    icon: FileText
  },
  {
    title: 'Islamic Finance Engineering Guide',
    titleAr: 'دليل هندسة التمويل الإسلامي',
    description: 'Best practices for developing Sharia-compliant financial products.',
    descriptionAr: 'أفضل الممارسات لتطوير المنتجات المالية المتوافقة مع الشريعة.',
    type: 'PDF',
    size: '1.8 MB',
    icon: BookOpen
  },
  {
    title: 'AML/CFT Framework Template',
    titleAr: 'نموذج إطار مكافحة غسل الأموال',
    description: 'Template for establishing anti-money laundering frameworks.',
    descriptionAr: 'نموذج لإنشاء أطر مكافحة غسل الأموال.',
    type: 'PDF',
    size: '1.2 MB',
    icon: Shield
  },
  {
    title: 'YETO Overview Brochure',
    titleAr: 'كتيب نظرة عامة على يتو',
    description: 'Introduction to the Yemen Economic Transparency Observatory.',
    descriptionAr: 'مقدمة عن مرصد الشفافية الاقتصادية اليمني.',
    type: 'PDF',
    size: '0.8 MB',
    icon: BarChart3
  }
];

// External resources - key standards and reports
const externalResources = [
  {
    title: 'Central Bank of Yemen',
    titleAr: 'البنك المركزي اليمني',
    description: 'Official monetary policy and banking regulations',
    descriptionAr: 'السياسة النقدية الرسمية واللوائح المصرفية',
    url: 'https://www.centralbank.gov.ye',
    type: 'Central Bank'
  },
  {
    title: 'AAOIFI Sharia Standards',
    titleAr: 'معايير أيوفي الشرعية',
    description: 'Accounting and Auditing Organization for Islamic Financial Institutions',
    descriptionAr: 'هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية',
    url: 'https://aaoifi.com',
    type: 'Standards'
  },
  {
    title: 'FATF Recommendations',
    titleAr: 'توصيات فاتف',
    description: 'Financial Action Task Force AML/CFT Guidelines',
    descriptionAr: 'إرشادات مجموعة العمل المالي لمكافحة غسل الأموال',
    url: 'https://www.fatf-gafi.org',
    type: 'Compliance'
  },
  {
    title: 'Basel Committee Standards',
    titleAr: 'معايير لجنة بازل',
    description: 'Banking supervision and regulatory framework',
    descriptionAr: 'الرقابة المصرفية والإطار التنظيمي',
    url: 'https://www.bis.org/bcbs',
    type: 'Regulation'
  },
  {
    title: 'IFSB Standards',
    titleAr: 'معايير مجلس الخدمات المالية الإسلامية',
    description: 'Islamic Financial Services Board prudential standards',
    descriptionAr: 'معايير الحيطة لمجلس الخدمات المالية الإسلامية',
    url: 'https://www.ifsb.org',
    type: 'Standards'
  },
  {
    title: 'World Bank Yemen Data',
    titleAr: 'بيانات البنك الدولي عن اليمن',
    description: 'Economic indicators and development data for Yemen',
    descriptionAr: 'المؤشرات الاقتصادية وبيانات التنمية لليمن',
    url: 'https://data.worldbank.org/country/yemen-rep',
    type: 'Data'
  }
];

export default function Insights() {
  const { language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const searchText = language === 'ar' 
      ? (article.titleAr + article.excerptAr).toLowerCase()
      : (article.title + article.excerpt).toLowerCase();
    const matchesSearch = searchText.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured);

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <YetoBanner variant="top" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 bg-[#133129]">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/aden-aerial.jpg)',
              filter: 'brightness(0.25) saturate(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#133129] via-[#133129]/80 to-[#133129]" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`max-w-3xl ${isRTL ? 'mr-0 ml-auto text-right' : ''}`}
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'الرؤى والتحليلات' : 'Insights & Analysis'}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#faf9f6] mt-4 mb-6" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
              {language === 'ar' ? 'القيادة الفكرية' : 'Thought Leadership'}
            </h1>
            <p className="text-lg sm:text-xl text-[#faf9f6]/80 leading-relaxed" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
              {language === 'ar' 
                ? 'تحليلات الخبراء وأبحاث السوق ورؤى القطاع المالي من فريق كوزواي. تغطية شاملة للقطاع المصرفي اليمني والمعايير الدولية.'
                : 'Expert analysis, market research, and financial sector insights from the CauseWay team. Comprehensive coverage of Yemen\'s banking sector and international standards.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-[#faf9f6] border-b border-[#133129]/10 sticky top-0 z-40">
        <div className="container">
          <div className={`flex flex-col md:flex-row gap-4 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-[#406D61] ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث في الرؤى...' : 'Search insights...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-3 border border-[#133129]/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d4a84b]/50 focus:border-[#d4a84b] ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
                style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
              />
            </div>
            
            {/* Categories */}
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
              {categories.map((cat) => (
                <button
                  key={cat.en}
                  onClick={() => setActiveCategory(cat.en)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.en
                      ? 'bg-[#133129] text-[#faf9f6]'
                      : 'bg-white text-[#133129] hover:bg-[#133129]/10 border border-[#133129]/20'
                  }`}
                  style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
                >
                  {language === 'ar' ? cat.ar : cat.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && activeCategory === 'All' && !searchQuery && (
        <section className="py-12 bg-[#faf9f6]">
          <div className="container">
            <Link href={`/insights/${featuredArticle.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${featuredArticle.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#133129] via-[#133129]/60 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 ${isRTL ? 'text-right' : ''}`}>
                  <span className="inline-block bg-[#d4a84b] text-[#133129] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                    {language === 'ar' ? 'مقال مميز' : 'Featured'}
                  </span>
                  <span className={`inline-block bg-[#224B40] text-[#faf9f6] text-xs font-medium px-3 py-1 rounded-full mb-4 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                    {language === 'ar' ? featuredArticle.categoryAr : featuredArticle.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                    {language === 'ar' ? featuredArticle.titleAr : featuredArticle.title}
                  </h2>
                  <p className="text-[#faf9f6]/80 text-base md:text-lg mb-6 max-w-2xl line-clamp-2" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                    {language === 'ar' ? featuredArticle.excerptAr : featuredArticle.excerpt}
                  </p>
                  <div className={`flex items-center gap-6 text-[#faf9f6]/70 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Calendar className="w-4 h-4" />
                      {language === 'ar' ? featuredArticle.dateAr : featuredArticle.date}
                    </span>
                    <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-4 h-4" />
                      {language === 'ar' ? featuredArticle.readTimeAr : featuredArticle.readTime}
                    </span>
                    <span className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {language === 'ar' ? featuredArticle.authorAr : featuredArticle.author}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-2xl font-serif text-[#133129]" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
              {language === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
            </h2>
            <span className="text-[#406D61] text-sm">
              {filteredArticles.length} {language === 'ar' ? 'مقال' : 'articles'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.filter(a => !a.featured || activeCategory !== 'All' || searchQuery).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/insights/${article.id}`}>
                  <article className="group bg-[#faf9f6] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-transparent hover:border-[#d4a84b]/30">
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${article.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#133129]/60 to-transparent" />
                      <span className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'} bg-[#d4a84b] text-[#133129] text-xs font-bold px-3 py-1 rounded-full`}>
                        {language === 'ar' ? article.categoryAr : article.category}
                      </span>
                    </div>
                    <div className={`p-5 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className="text-lg font-serif text-[#133129] mb-2 line-clamp-2 group-hover:text-[#224B40] transition-colors" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                        {language === 'ar' ? article.titleAr : article.title}
                      </h3>
                      <p className="text-[#406D61] text-sm mb-4 line-clamp-2" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                        {language === 'ar' ? article.excerptAr : article.excerpt}
                      </p>
                      <div className={`flex items-center justify-between text-xs text-[#406D61]/70 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Calendar className="w-3 h-3" />
                          {language === 'ar' ? article.dateAr : article.date}
                        </span>
                        <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Clock className="w-3 h-3" />
                          {language === 'ar' ? article.readTimeAr : article.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications & Downloads */}
      <section className="py-12 md:py-16 bg-[#133129]">
        <div className="container">
          <div className={`mb-10 ${isRTL ? 'text-right' : ''}`}>
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'المنشورات' : 'Publications'}
            </span>
            <h2 className="text-3xl font-serif text-[#faf9f6] mt-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
              {language === 'ar' ? 'التقارير والأدلة' : 'Reports & Guides'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-[#224B40] p-6 rounded-xl hover:bg-[#1e6b5a] transition-all cursor-pointer ${isRTL ? 'text-right' : ''}`}
              >
                <div className={`w-12 h-12 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`}>
                  <pub.icon className="w-6 h-6 text-[#d4a84b]" />
                </div>
                <h3 className="text-lg font-semibold text-[#faf9f6] mb-2" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                  {language === 'ar' ? pub.titleAr : pub.title}
                </h3>
                <p className="text-[#faf9f6]/70 text-sm mb-4" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                  {language === 'ar' ? pub.descriptionAr : pub.description}
                </p>
                <div className={`flex items-center gap-2 text-[#d4a84b] text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Download className="w-4 h-4" />
                  <span>{pub.type} • {pub.size}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-12 md:py-16 bg-[#faf9f6]">
        <div className="container">
          <div className={`mb-10 ${isRTL ? 'text-right' : ''}`}>
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'الموارد الخارجية' : 'External Resources'}
            </span>
            <h2 className="text-3xl font-serif text-[#133129] mt-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
              {language === 'ar' ? 'المعايير والتقارير الرئيسية' : 'Key Standards & Reports'}
            </h2>
            <p className="text-[#406D61] mt-3 max-w-2xl" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
              {language === 'ar' 
                ? 'روابط مختارة للمعايير الدولية وتقارير البنوك المركزية والموارد التنظيمية.'
                : 'Curated links to international standards, central bank reports, and regulatory resources.'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalResources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`group flex items-start gap-4 p-5 bg-white rounded-xl border border-[#133129]/10 hover:border-[#d4a84b]/50 hover:shadow-lg transition-all ${isRTL ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className="w-10 h-10 bg-[#133129]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4a84b]/20 transition-colors">
                  <Globe className="w-5 h-5 text-[#224B40] group-hover:text-[#d4a84b] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="font-semibold text-[#133129] group-hover:text-[#224B40] transition-colors truncate" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                      {language === 'ar' ? resource.titleAr : resource.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-[#406D61] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[#406D61] text-sm mt-1" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                    {language === 'ar' ? resource.descriptionAr : resource.description}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium text-[#d4a84b] bg-[#d4a84b]/10 px-2 py-0.5 rounded">
                    {resource.type}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-[#224B40]">
        <div className="container">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className="text-2xl font-serif text-[#faf9f6] mb-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
                {language === 'ar' ? 'ابق على اطلاع' : 'Stay Informed'}
              </h3>
              <p className="text-[#faf9f6]/80" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
                {language === 'ar' 
                  ? 'اشترك في نشرتنا الإخبارية للحصول على أحدث الرؤى والتحليلات.'
                  : 'Subscribe to our newsletter for the latest insights and analysis.'
                }
              </p>
            </div>
            <div className={`flex gap-3 w-full md:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
              <input
                type="email"
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                className={`flex-1 md:w-72 px-4 py-3 rounded-lg bg-white/10 border border-[#faf9f6]/20 text-[#faf9f6] placeholder-[#faf9f6]/50 focus:outline-none focus:ring-2 focus:ring-[#d4a84b]/50 ${isRTL ? 'text-right' : ''}`}
                style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
              />
              <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-6">
                {language === 'ar' ? 'اشترك' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
