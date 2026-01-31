/**
 * CauseWay Resources Page
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Curated links to standards, regulations, and research
 */

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
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

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
        description: 'International Financial Reporting Standards including IFRS 9 expected credit-loss models',
        descriptionAr: 'معايير التقارير المالية الدولية بما في ذلك نماذج الخسائر الائتمانية المتوقعة IFRS 9',
        url: 'https://www.ifrs.org'
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
        description: 'International Monetary Fund country reports and assessments',
        descriptionAr: 'تقارير وتقييمات صندوق النقد الدولي للبلد',
        url: 'https://www.imf.org/en/Countries/YEM'
      },
      {
        name: 'UN OCHA Yemen',
        nameAr: 'مكتب الأمم المتحدة لتنسيق الشؤون الإنسانية - اليمن',
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
    description: 'Academic research and industry publications on relevant topics.',
    descriptionAr: 'البحوث الأكاديمية والمنشورات الصناعية حول المواضيع ذات الصلة.',
    resources: [
      {
        name: 'Microfinance Transformation Research',
        nameAr: 'بحوث تحول التمويل الأصغر',
        description: 'Studies on MFI digital transformation and client-centric approaches',
        descriptionAr: 'دراسات حول التحول الرقمي لمؤسسات التمويل الأصغر والنهج المتمحور حول العميل',
        url: 'https://www.cgap.org'
      },
      {
        name: 'IFRS 9 Implementation Guides',
        nameAr: 'أدلة تطبيق IFRS 9',
        description: 'Expected credit-loss modeling and implementation resources',
        descriptionAr: 'موارد نمذجة الخسائر الائتمانية المتوقعة والتطبيق',
        url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/'
      }
    ]
  }
];

export default function Resources() {
  const { language, isRTL } = useLanguage();

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
            <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'المعايير والمراجع' : 'Standards & References'}
            </h1>
            <p className="text-xl text-[#faf9f6]/80 leading-relaxed">
              {language === 'ar' 
                ? 'روابط منسقة للمعايير واللوائح والأبحاث الرئيسية ذات الصلة بالتمويل الإسلامي والامتثال التنظيمي والقطاع المالي اليمني.'
                : 'Curated links to key standards, regulations, and research relevant to Islamic finance, regulatory compliance, and Yemen\'s financial sector.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="space-y-16">
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
                  {category.resources.map((resource, index) => (
                    <motion.a
                      key={resource.name}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#d4a84b]/30 ${isRTL ? 'text-right' : ''}`}
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
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
