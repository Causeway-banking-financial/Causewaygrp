/**
 * CauseWay Resources Page - Enhanced
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Curated links to standards, regulations, research, tools, and live data
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  ExternalLink,
  BookOpen,
  Scale,
  Shield,
  Globe,
  FileText,
  Building2,
  Calculator,
  TrendingUp,
  Download,
  Play,
  Newspaper,
  GraduationCap,
  BarChart3,
  Database,
  Zap,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

// Resource categories with enhanced content
const resourceCategories = [
  {
    icon: Scale,
    title: 'Islamic Finance Standards',
    titleAr: 'معايير التمويل الإسلامي',
    description: 'Authoritative standards for Sharia-compliant financial products and services.',
    descriptionAr: 'معايير موثوقة للمنتجات والخدمات المالية المتوافقة مع الشريعة.',
    resources: [
      {
        name: 'AAOIFI Standards',
        nameAr: 'معايير أيوفي',
        description: 'Accounting and Auditing Organization for Islamic Financial Institutions',
        descriptionAr: 'هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية',
        url: 'https://aaoifi.com'
      },
      {
        name: 'IFSB Standards',
        nameAr: 'معايير مجلس الخدمات المالية الإسلامية',
        description: 'Islamic Financial Services Board prudential standards',
        descriptionAr: 'المعايير الاحترازية لمجلس الخدمات المالية الإسلامية',
        url: 'https://www.ifsb.org'
      },
      {
        name: 'IsDB Institute',
        nameAr: 'معهد البنك الإسلامي للتنمية',
        description: 'Research and capacity building for Islamic finance',
        descriptionAr: 'البحث وبناء القدرات في التمويل الإسلامي',
        url: 'https://isdbinstitute.org'
      }
    ]
  },
  {
    icon: Shield,
    title: 'Regulatory Frameworks',
    titleAr: 'الأطر التنظيمية',
    description: 'International regulatory standards and compliance frameworks.',
    descriptionAr: 'المعايير التنظيمية الدولية وأطر الامتثال.',
    resources: [
      {
        name: 'Basel Framework',
        nameAr: 'إطار بازل',
        description: 'Bank for International Settlements regulatory framework',
        descriptionAr: 'الإطار التنظيمي لبنك التسويات الدولية',
        url: 'https://www.bis.org/basel_framework/'
      },
      {
        name: 'FATF Guidelines',
        nameAr: 'إرشادات فاتف',
        description: 'Financial Action Task Force AML/CFT standards',
        descriptionAr: 'معايير مكافحة غسل الأموال وتمويل الإرهاب لمجموعة العمل المالي',
        url: 'https://www.fatf-gafi.org'
      },
      {
        name: 'IFRS Standards',
        nameAr: 'معايير IFRS',
        description: 'International Financial Reporting Standards including IFRS 9',
        descriptionAr: 'معايير التقارير المالية الدولية بما في ذلك IFRS 9',
        url: 'https://www.ifrs.org'
      },
      {
        name: 'FSB Publications',
        nameAr: 'منشورات مجلس الاستقرار المالي',
        description: 'Financial Stability Board reports and recommendations',
        descriptionAr: 'تقارير وتوصيات مجلس الاستقرار المالي',
        url: 'https://www.fsb.org'
      }
    ]
  },
  {
    icon: Building2,
    title: 'Yemen Financial Sector',
    titleAr: 'القطاع المالي اليمني',
    description: 'Key institutions and resources for Yemen\'s financial sector.',
    descriptionAr: 'المؤسسات والموارد الرئيسية للقطاع المالي اليمني.',
    resources: [
      {
        name: 'Central Bank of Yemen',
        nameAr: 'البنك المركزي اليمني',
        description: 'Official central bank regulations and circulars',
        descriptionAr: 'اللوائح والتعميمات الرسمية للبنك المركزي',
        url: 'https://www.centralbank.gov.ye'
      },
      {
        name: 'Yemen Microfinance Network',
        nameAr: 'شبكة التمويل الأصغر اليمنية',
        description: 'Network supporting microfinance development in Yemen',
        descriptionAr: 'شبكة دعم تطوير التمويل الأصغر في اليمن',
        url: '#'
      },
      {
        name: 'YETO Observatory',
        nameAr: 'مرصد يتو',
        description: 'Yemen Economic Transparency Observatory - Coming Soon',
        descriptionAr: 'المرصد اليمني للشفافية الاقتصادية - قريباً',
        url: '/observatory',
        internal: true
      }
    ]
  },
  {
    icon: Globe,
    title: 'International Organizations',
    titleAr: 'المنظمات الدولية',
    description: 'Reports and data from international development organizations.',
    descriptionAr: 'تقارير وبيانات من منظمات التنمية الدولية.',
    resources: [
      {
        name: 'World Bank Yemen',
        nameAr: 'البنك الدولي - اليمن',
        description: 'World Bank country data and development reports',
        descriptionAr: 'بيانات البلد وتقارير التنمية من البنك الدولي',
        url: 'https://www.worldbank.org/en/country/yemen'
      },
      {
        name: 'IMF Yemen Reports',
        nameAr: 'تقارير صندوق النقد الدولي - اليمن',
        description: 'International Monetary Fund country reports',
        descriptionAr: 'تقارير صندوق النقد الدولي للبلد',
        url: 'https://www.imf.org/en/Countries/YEM'
      },
      {
        name: 'IFC Fragile States',
        nameAr: 'مؤسسة التمويل الدولية - الدول الهشة',
        description: 'Private sector development in fragile contexts',
        descriptionAr: 'تنمية القطاع الخاص في السياقات الهشة',
        url: 'https://www.ifc.org/en/what-we-do/sector-expertise/fragile-and-conflict-affected-situations'
      },
      {
        name: 'UN OCHA Yemen',
        nameAr: 'مكتب الأمم المتحدة - اليمن',
        description: 'Humanitarian and economic situation reports',
        descriptionAr: 'تقارير الوضع الإنساني والاقتصادي',
        url: 'https://www.unocha.org/yemen'
      }
    ]
  },
  {
    icon: BookOpen,
    title: 'Research & Publications',
    titleAr: 'البحوث والمنشورات',
    description: 'Academic research and industry publications.',
    descriptionAr: 'البحوث الأكاديمية والمنشورات الصناعية.',
    resources: [
      {
        name: 'CGAP Research',
        nameAr: 'أبحاث CGAP',
        description: 'Consultative Group to Assist the Poor - microfinance research',
        descriptionAr: 'المجموعة الاستشارية لمساعدة الفقراء - أبحاث التمويل الأصغر',
        url: 'https://www.cgap.org'
      },
      {
        name: 'BIS Research Hub',
        nameAr: 'مركز أبحاث BIS',
        description: 'Central banking and financial stability research',
        descriptionAr: 'أبحاث البنوك المركزية والاستقرار المالي',
        url: 'https://www.bis.org/research/index.htm'
      },
      {
        name: 'Trading Economics',
        nameAr: 'تريدينغ إيكونوميكس',
        description: 'Global economic indicators and forecasts',
        descriptionAr: 'المؤشرات الاقتصادية العالمية والتوقعات',
        url: 'https://tradingeconomics.com'
      }
    ]
  }
];

// Tools and calculators
const toolsAndCalculators = [
  {
    icon: Calculator,
    title: 'Islamic Finance Calculator',
    titleAr: 'حاسبة التمويل الإسلامي',
    description: 'Calculate Murabaha, Ijara, Sukuk, and Zakat with full methodology',
    descriptionAr: 'احسب المرابحة والإجارة والصكوك والزكاة مع المنهجية الكاملة',
    status: 'active',
    statusAr: 'متاح',
    url: '/tools/islamic-finance-calculator'
  },
  {
    icon: BarChart3,
    title: 'Risk Assessment Tool',
    titleAr: 'أداة تقييم المخاطر',
    description: 'Evaluate credit and operational risk profiles',
    descriptionAr: 'تقييم ملفات المخاطر الائتمانية والتشغيلية',
    status: 'coming-soon',
    statusAr: 'قريباً'
  },
  {
    icon: Shield,
    title: 'AML/CFT Compliance Checker',
    titleAr: 'مدقق الامتثال لمكافحة غسل الأموال',
    description: 'Self-assessment against FATF recommendations',
    descriptionAr: 'تقييم ذاتي وفق توصيات فاتف',
    status: 'coming-soon',
    statusAr: 'قريباً'
  },
  {
    icon: TrendingUp,
    title: 'Digital Maturity Assessment',
    titleAr: 'تقييم النضج الرقمي',
    description: 'Evaluate your institution\'s digital readiness',
    descriptionAr: 'قيّم جاهزية مؤسستك الرقمية',
    status: 'coming-soon',
    statusAr: 'قريباً'
  }
];

// Downloadable resources
const downloadableResources = [
  {
    icon: FileText,
    title: 'Islamic Finance Product Guide',
    titleAr: 'دليل منتجات التمويل الإسلامي',
    description: 'Comprehensive guide to Sharia-compliant products',
    descriptionAr: 'دليل شامل للمنتجات المتوافقة مع الشريعة',
    type: 'PDF',
    pages: '45',
    status: 'coming-soon'
  },
  {
    icon: FileText,
    title: 'AML/CFT Framework Template',
    titleAr: 'قالب إطار مكافحة غسل الأموال',
    description: 'Ready-to-use compliance framework template',
    descriptionAr: 'قالب إطار امتثال جاهز للاستخدام',
    type: 'DOCX',
    pages: '28',
    status: 'coming-soon'
  },
  {
    icon: FileText,
    title: 'Board Governance Checklist',
    titleAr: 'قائمة مراجعة حوكمة مجلس الإدارة',
    description: 'Essential governance practices for financial institutions',
    descriptionAr: 'ممارسات الحوكمة الأساسية للمؤسسات المالية',
    type: 'PDF',
    pages: '12',
    status: 'coming-soon'
  }
];

// Live data feeds preview
const liveDataFeeds = [
  {
    title: 'Exchange Rates',
    titleAr: 'أسعار الصرف',
    description: 'YER/USD, YER/SAR real-time tracking',
    descriptionAr: 'تتبع فوري لسعر الريال مقابل الدولار والسعودي',
    icon: TrendingUp
  },
  {
    title: 'Inflation Tracker',
    titleAr: 'متتبع التضخم',
    description: 'Monthly CPI and inflation analysis',
    descriptionAr: 'تحليل مؤشر أسعار المستهلك والتضخم الشهري',
    icon: BarChart3
  },
  {
    title: 'Sector Performance',
    titleAr: 'أداء القطاعات',
    description: 'Banking, MFI, and trade sector indices',
    descriptionAr: 'مؤشرات قطاعات البنوك والتمويل الأصغر والتجارة',
    icon: Database
  }
];

export default function Resources() {
  const { language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'standards' | 'tools' | 'downloads' | 'data'>('standards');

  const tabs = [
    { id: 'standards', label: language === 'ar' ? 'المعايير والمراجع' : 'Standards & References', icon: BookOpen },
    { id: 'tools', label: language === 'ar' ? 'الأدوات والحاسبات' : 'Tools & Calculators', icon: Calculator },
    { id: 'downloads', label: language === 'ar' ? 'التحميلات' : 'Downloads', icon: Download },
    { id: 'data', label: language === 'ar' ? 'البيانات الحية' : 'Live Data', icon: Zap }
  ];

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#133129]">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url(/images/hero-services.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#133129] via-[#133129]/95 to-[#133129]" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'مركز الموارد' : 'Resource Hub'}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mt-3 mb-6" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', serif" }}>
              {language === 'ar' ? 'المعايير والأدوات والبيانات' : 'Standards, Tools & Data'}
            </h1>
            <p className="text-xl text-[#faf9f6]/80 leading-relaxed" style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}>
              {language === 'ar' 
                ? 'موارد منسقة للمعايير واللوائح والأدوات والبيانات الحية لدعم القطاع المالي اليمني.'
                : 'Curated resources including standards, regulations, tools, and live data to support Yemen\'s financial sector.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-white border-b border-[#133129]/10 shadow-sm">
        <div className="container">
          <div className={`flex overflow-x-auto py-4 gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#133129] text-[#faf9f6]'
                    : 'bg-[#133129]/5 text-[#133129] hover:bg-[#133129]/10'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & References Tab */}
      {activeTab === 'standards' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className="space-y-12">
              {resourceCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-[#133129]/10 rounded-lg flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-[#224B40]" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h2 className="text-2xl font-serif text-[#133129]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {language === 'ar' ? category.titleAr : category.title}
                      </h2>
                      <p className="text-[#406D61] text-sm">
                        {language === 'ar' ? category.descriptionAr : category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.resources.map((resource, index) => {
                      const isInternal = 'internal' in resource && resource.internal;
                      const Component = isInternal ? Link : 'a';
                      const linkProps = isInternal 
                        ? { href: resource.url }
                        : { href: resource.url, target: '_blank', rel: 'noopener noreferrer' };
                      
                      return (
                        <motion.div
                          key={resource.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Component
                            {...linkProps}
                            className={`group block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#d4a84b]/30 h-full ${isRTL ? 'text-right' : ''}`}
                          >
                            <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <h3 className="text-lg font-semibold text-[#133129] group-hover:text-[#224B40] transition-colors">
                                {language === 'ar' ? resource.nameAr : resource.name}
                              </h3>
                              <ExternalLink className="w-4 h-4 text-[#406D61] group-hover:text-[#d4a84b] transition-colors flex-shrink-0" />
                            </div>
                            <p className="text-[#406D61] text-sm">
                              {language === 'ar' ? resource.descriptionAr : resource.description}
                            </p>
                          </Component>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools & Calculators Tab */}
      {activeTab === 'tools' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className={`text-center mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'الأدوات والحاسبات' : 'Tools & Calculators'}
              </h2>
              <p className="text-[#406D61] max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'أدوات تفاعلية لمساعدتك في تقييم الامتثال وحساب الهياكل المالية وتقييم الجاهزية المؤسسية.'
                  : 'Interactive tools to help you assess compliance, calculate financial structures, and evaluate institutional readiness.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {toolsAndCalculators.map((tool, index) => {
                const isActive = tool.status === 'active' && 'url' in tool;
                
                const content = (
                  <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-12 h-12 ${isActive ? 'bg-[#133129]' : 'bg-[#d4a84b]/10'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <tool.icon className={`w-6 h-6 ${isActive ? 'text-[#d4a84b]' : 'text-[#d4a84b]'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <h3 className="text-lg font-semibold text-[#133129]">
                          {language === 'ar' ? tool.titleAr : tool.title}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-[#d4a84b]/20 text-[#d4a84b]'}`}>
                          {language === 'ar' ? tool.statusAr : (isActive ? 'Live' : tool.status)}
                        </span>
                      </div>
                      <p className="text-[#406D61] text-sm">
                        {language === 'ar' ? tool.descriptionAr : tool.description}
                      </p>
                      {isActive && (
                        <div className={`flex items-center gap-1 mt-3 text-[#133129] font-medium text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {language === 'ar' ? 'افتح الحاسبة' : 'Open Calculator'}
                          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                      )}
                    </div>
                  </div>
                );
                
                return (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {isActive && 'url' in tool ? (
                      <Link
                        href={tool.url as string}
                        className={`block bg-white p-6 rounded-xl shadow-sm border border-[#d4a84b]/30 hover:border-[#d4a84b] hover:shadow-md cursor-pointer transition-all ${isRTL ? 'text-right' : ''}`}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div
                        className={`block bg-white p-6 rounded-xl shadow-sm border border-[#133129]/10 transition-all ${isRTL ? 'text-right' : ''}`}
                      >
                        {content}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <p className="text-[#406D61] mb-4">
                {language === 'ar' 
                  ? 'هل تريد إشعارك عند إطلاق هذه الأدوات؟'
                  : 'Want to be notified when these tools launch?'
                }
              </p>
              <Link href="/contact">
                <Button className="bg-[#133129] hover:bg-[#224B40] text-[#faf9f6]">
                  {language === 'ar' ? 'انضم لقائمة الانتظار' : 'Join the Waitlist'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Downloads Tab */}
      {activeTab === 'downloads' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className={`text-center mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'الموارد القابلة للتحميل' : 'Downloadable Resources'}
              </h2>
              <p className="text-[#406D61] max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'أدلة وقوالب وقوائم مراجعة مجانية لدعم عملياتك.'
                  : 'Free guides, templates, and checklists to support your operations.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {downloadableResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white p-6 rounded-xl shadow-sm border border-[#133129]/10 ${isRTL ? 'text-right' : ''}`}
                >
                  <div className="w-12 h-12 bg-[#133129]/10 rounded-lg flex items-center justify-center mb-4">
                    <resource.icon className="w-6 h-6 text-[#133129]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#133129] mb-2">
                    {language === 'ar' ? resource.titleAr : resource.title}
                  </h3>
                  <p className="text-[#406D61] text-sm mb-4">
                    {language === 'ar' ? resource.descriptionAr : resource.description}
                  </p>
                  <div className={`flex items-center gap-3 text-xs text-[#406D61] mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="px-2 py-1 bg-[#133129]/5 rounded">{resource.type}</span>
                    <span>{resource.pages} {language === 'ar' ? 'صفحة' : 'pages'}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#133129]/20 text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6]"
                    disabled
                  >
                    <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'قريباً' : 'Coming Soon'}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live Data Tab */}
      {activeTab === 'data' && (
        <section className="py-16 bg-[#faf9f6]">
          <div className="container">
            <div className={`text-center mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'البيانات الحية من مرصد يتو' : 'Live Data from YETO Observatory'}
              </h2>
              <p className="text-[#406D61] max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'مؤشرات اقتصادية في الوقت الفعلي وتحليلات لدعم اتخاذ القرار.'
                  : 'Real-time economic indicators and analytics to support decision-making.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {liveDataFeeds.map((feed, index) => (
                <motion.div
                  key={feed.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white p-6 rounded-xl shadow-sm border border-[#133129]/10 text-center`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#133129] to-[#224B40] rounded-full flex items-center justify-center mx-auto mb-4">
                    <feed.icon className="w-8 h-8 text-[#d4a84b]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#133129] mb-2">
                    {language === 'ar' ? feed.titleAr : feed.title}
                  </h3>
                  <p className="text-[#406D61] text-sm">
                    {language === 'ar' ? feed.descriptionAr : feed.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* YETO Preview */}
            <div className="bg-gradient-to-br from-[#133129] to-[#224B40] rounded-2xl p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-[#d4a84b]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database className="w-10 h-10 text-[#d4a84b]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'المرصد اليمني للشفافية الاقتصادية' : 'Yemen Economic Transparency Observatory'}
              </h3>
              <p className="text-[#faf9f6]/80 max-w-2xl mx-auto mb-8">
                {language === 'ar' 
                  ? 'منصة بيانات شاملة توفر مؤشرات اقتصادية في الوقت الفعلي وتحليلات القطاعات وأدوات التصور التفاعلي.'
                  : 'A comprehensive data platform providing real-time economic indicators, sector analytics, and interactive visualization tools.'
                }
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Link href="/observatory">
                  <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                    {language === 'ar' ? 'استكشف المرصد' : 'Explore Observatory'}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10">
                    {language === 'ar' ? 'طلب وصول API' : 'Request API Access'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="py-12 bg-white border-t border-[#133129]/10">
        <div className="container">
          <div className={`max-w-3xl mx-auto text-center ${isRTL ? 'text-right' : ''}`}>
            <FileText className="w-8 h-8 text-[#406D61] mx-auto mb-4" />
            <p className="text-[#406D61] text-sm leading-relaxed">
              {language === 'ar' 
                ? 'إخلاء المسؤولية: الروابط المقدمة هي لأغراض مرجعية فقط. كوزواي غير مسؤولة عن المحتوى الموجود على المواقع الخارجية. تحقق دائماً من المعلومات مع المصادر الرسمية واستشر المتخصصين المؤهلين للحصول على مشورة محددة.'
                : 'Disclaimer: Links provided are for reference purposes only. CauseWay is not responsible for content on external websites. Always verify information with official sources and consult qualified professionals for specific advice.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#133129]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هل تحتاج إلى إرشادات خبير؟' : 'Need Expert Guidance?'}
            </h2>
            <p className="text-[#faf9f6]/70 mb-8">
              {language === 'ar' 
                ? 'يمكن لفريقنا مساعدتك في التنقل عبر هذه المعايير وتطبيقها على سياقك المحدد.'
                : 'Our team can help you navigate these standards and apply them to your specific context.'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/contact">
                <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                  {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10">
                  {language === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
