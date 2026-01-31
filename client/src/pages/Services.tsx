/**
 * CauseWay Services Page
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Enhanced with What we do/don't do sections
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Building2, 
  Shield, 
  Server, 
  Users, 
  GraduationCap, 
  Palette,
  CheckCircle,
  XCircle,
  ChevronRight,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const services = [
  {
    id: 'islamic-finance',
    icon: Building2,
    title: 'Islamic Finance Engineering',
    titleAr: 'هندسة التمويل الإسلامي',
    description: 'We design Sharia-compliant financial products that bridge the gap between theoretical compliance and operational reality. Our engineering process ensures every product is audit-ready and governance-safe.',
    descriptionAr: 'نصمم منتجات مالية متوافقة مع الشريعة تسد الفجوة بين الامتثال النظري والواقع التشغيلي. تضمن عمليتنا الهندسية أن كل منتج جاهز للتدقيق وآمن حوكمياً.',
    whatWeDo: [
      'Sharia-compliant product development',
      'Sukuk structuring and issuance',
      'Islamic banking transformation',
      'Fatwa coordination with Sharia boards',
      'Product manuals and SOPs',
      'SSB briefing packs',
      'Core banking configuration',
      'Staff training programs'
    ],
    whatWeDont: [
      'Provide religious rulings (fatwas) directly',
      'Replace your Sharia Supervisory Board',
      'Guarantee regulatory approval'
    ],
    href: '/services/islamic-finance'
  },
  {
    id: 'risk-compliance',
    icon: Shield,
    title: 'Risk & Compliance',
    titleAr: 'المخاطر والامتثال',
    description: 'Comprehensive risk management and regulatory compliance solutions designed for the unique challenges of emerging markets and fragile economies.',
    descriptionAr: 'حلول شاملة لإدارة المخاطر والامتثال التنظيمي مصممة للتحديات الفريدة للأسواق الناشئة والاقتصادات الهشة.',
    whatWeDo: [
      'AML/CFT frameworks development',
      'Regulatory compliance assessment',
      'Internal audit establishment',
      'Risk assessment methodologies',
      'Compliance monitoring systems',
      'Regulatory reporting frameworks',
      'Policy and procedure development',
      'Compliance training programs'
    ],
    whatWeDont: [
      'Act as your internal compliance officer',
      'Guarantee immunity from regulatory penalties',
      'Provide legal advice or representation'
    ],
    href: '/services/risk-compliance'
  },
  {
    id: 'core-banking',
    icon: Server,
    title: 'Core Banking Systems',
    titleAr: 'الأنظمة المصرفية الأساسية',
    description: 'End-to-end core banking system services from selection to implementation. Our system (under development, expected mid-2027) will include IFRS 9 expected credit-loss calculations, AML/CFT, CRM, general ledger, deposits, financing/loans, treasury management, payments, and reporting modules.',
    descriptionAr: 'خدمات أنظمة مصرفية أساسية شاملة من الاختيار إلى التنفيذ. نظامنا (قيد التطوير، متوقع منتصف 2027) سيشمل حسابات الخسائر الائتمانية المتوقعة IFRS 9، مكافحة غسل الأموال، إدارة علاقات العملاء، دفتر الأستاذ العام، الودائع، التمويل/القروض، إدارة الخزينة، المدفوعات، ووحدات التقارير.',
    whatWeDo: [
      'System selection and evaluation',
      'Implementation project management',
      'Digital transformation strategy',
      'Integration services',
      'Legacy system modernization',
      'Data migration planning',
      'User acceptance testing',
      'Post-deployment support and migration'
    ],
    whatWeDont: [
      'Sell or license third-party software',
      'Provide ongoing IT infrastructure management',
      'Replace your internal IT team'
    ],
    timeline: 'Core Banking System: Under development, expected delivery mid-2027',
    href: '/services/core-banking'
  },
  {
    id: 'microfinance',
    icon: Users,
    title: 'Microfinance Development',
    titleAr: 'تطوير التمويل الأصغر',
    description: 'Supporting the establishment and growth of microfinance institutions with comprehensive development services. We help MFIs adopt digital tools and client-centric approaches to remain resilient in challenging environments.',
    descriptionAr: 'دعم إنشاء ونمو مؤسسات التمويل الأصغر بخدمات تطوير شاملة. نساعد مؤسسات التمويل الأصغر على تبني الأدوات الرقمية والنهج المتمحور حول العميل للبقاء مرنة في البيئات الصعبة.',
    whatWeDo: [
      'MFI establishment support',
      'Capacity building programs',
      'Product development',
      'Regulatory licensing assistance',
      'Social performance management',
      'Client protection implementation',
      'Operational efficiency improvement',
      'Impact measurement frameworks'
    ],
    whatWeDont: [
      'Promise immediate transformation to commercial banks',
      'Provide direct lending capital',
      'Guarantee regulatory licensing approval'
    ],
    href: '/services/microfinance'
  },
  {
    id: 'capacity-building',
    icon: GraduationCap,
    title: 'Capacity Building',
    titleAr: 'بناء القدرات',
    description: 'Comprehensive training and development programs designed to strengthen institutional capabilities at all levels of your organization.',
    descriptionAr: 'برامج تدريب وتطوير شاملة مصممة لتعزيز القدرات المؤسسية على جميع مستويات مؤسستك.',
    whatWeDo: [
      'Board training and governance',
      'Executive development programs',
      'Staff certification programs',
      'Workshops and seminars',
      'Technical skills training',
      'Leadership development',
      'Change management training',
      'Customized learning solutions'
    ],
    whatWeDont: [
      'Provide accredited university degrees',
      'Replace ongoing HR development functions',
      'Guarantee individual career advancement'
    ],
    href: '/services/capacity-building'
  },
  {
    id: 'branding',
    icon: Palette,
    title: 'Branding & Identity',
    titleAr: 'العلامة التجارية والهوية',
    description: 'We help banks and corporates align their public image with Sharia principles, governance standards, and local regulations. Our branding services focus on visual identity, naming, messaging, and brand governance—developing brand systems rather than marketing campaigns.',
    descriptionAr: 'نساعد البنوك والشركات على مواءمة صورتها العامة مع مبادئ الشريعة ومعايير الحوكمة واللوائح المحلية. تركز خدمات العلامة التجارية لدينا على الهوية البصرية والتسمية والرسائل وحوكمة العلامة التجارية - تطوير أنظمة العلامة التجارية بدلاً من الحملات التسويقية.',
    whatWeDo: [
      'Financial sector branding strategy',
      'Corporate identity development',
      'Visual identity systems',
      'Brand guidelines creation',
      'Naming and messaging frameworks',
      'Brand governance policies',
      'Stakeholder communication strategy',
      'Digital presence optimization'
    ],
    whatWeDont: [
      'Run advertising or marketing campaigns',
      'Manage social media accounts',
      'Provide ongoing PR services'
    ],
    href: '/services/branding'
  }
];

export default function Services() {
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
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'خدمات استشارية مالية شاملة' : 'Comprehensive Financial Advisory Services'}
            </h1>
            <p className="text-xl text-[#faf9f6]/80 leading-relaxed">
              {language === 'ar' 
                ? 'من هندسة التمويل الإسلامي إلى التحول الرقمي، نقدم حلولاً متكاملة تعزز المؤسسات وتبني بنية تحتية مالية مستدامة.'
                : 'From Islamic finance engineering to digital transformation, we provide end-to-end solutions that strengthen institutions and build sustainable financial infrastructure.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-14 h-14 bg-[#133129]/10 rounded-lg flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-[#224B40]" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h2 className="text-2xl md:text-3xl font-serif text-[#133129]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {language === 'ar' ? service.titleAr : service.title}
                      </h2>
                      <p className="text-[#224B40]/80">
                        {language === 'ar' ? service.title : service.titleAr}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`text-[#406D61] leading-relaxed mb-6 ${isRTL ? 'text-right' : ''}`}>
                    {language === 'ar' ? service.descriptionAr : service.description}
                  </p>

                  {service.timeline && (
                    <div className={`flex items-center gap-2 mb-6 p-3 bg-[#d4a84b]/10 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-5 h-5 text-[#d4a84b]" />
                      <span className="text-[#133129] text-sm font-medium">
                        {service.timeline}
                      </span>
                    </div>
                  )}

                  <Link href={service.href}>
                    <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                      {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </Button>
                  </Link>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* What We Do */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-[#133129]/10">
                    <h3 className={`text-lg font-semibold text-[#133129] mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle className="w-5 h-5 text-[#224B40]" />
                      {language === 'ar' ? 'ما نقدمه' : 'What We Do'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.whatWeDo.map((feature) => (
                        <div key={feature} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <CheckCircle className="w-4 h-4 text-[#224B40] flex-shrink-0 mt-0.5" />
                          <span className="text-[#406D61] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What We Don't Do */}
                  <div className="bg-[#133129]/5 p-6 rounded-lg border border-[#133129]/10">
                    <h3 className={`text-lg font-semibold text-[#133129] mb-4 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <XCircle className="w-5 h-5 text-[#406D61]" />
                      {language === 'ar' ? 'ما لا نقدمه' : 'What We Don\'t Do'}
                    </h3>
                    <div className="space-y-2">
                      {service.whatWeDont.map((item) => (
                        <div key={item} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                          <XCircle className="w-4 h-4 text-[#406D61]/60 flex-shrink-0 mt-0.5" />
                          <span className="text-[#406D61]/80 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'عمليتنا' : 'Our Process'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'كيف نحقق النتائج' : 'How We Deliver Results'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'تضمن منهجيتنا المنظمة جودة متسقة ونتائج قابلة للقياس عبر جميع المشاريع.'
                : 'Our structured methodology ensures consistent quality and measurable outcomes across all engagements.'
              }
            </p>
          </div>

          <div className="bg-[#133129] rounded-lg p-8 md:p-12">
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-6 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
              {[
                { phase: 'Discovery', phaseAr: 'الاكتشاف', desc: 'Understanding your needs and context', descAr: 'فهم احتياجاتك وسياقك' },
                { phase: 'Assessment', phaseAr: 'التقييم', desc: 'Analyzing current state and gaps', descAr: 'تحليل الوضع الحالي والفجوات' },
                { phase: 'Design', phaseAr: 'التصميم', desc: 'Developing tailored solutions', descAr: 'تطوير حلول مخصصة' },
                { phase: 'Implementation', phaseAr: 'التنفيذ', desc: 'Executing with precision', descAr: 'التنفيذ بدقة' },
                { phase: 'Handover', phaseAr: 'التسليم', desc: 'Ensuring sustainable outcomes', descAr: 'ضمان نتائج مستدامة' }
              ].map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="w-12 h-12 bg-[#d4a84b] rounded-full flex items-center justify-center mx-auto mb-3 text-[#133129] font-semibold">
                    {isRTL ? 5 - index : index + 1}
                  </div>
                  <h4 className="text-[#faf9f6] font-medium mb-1">
                    {language === 'ar' ? item.phaseAr : item.phase}
                  </h4>
                  <p className="text-[#faf9f6]/60 text-sm">
                    {language === 'ar' ? item.descAr : item.desc}
                  </p>
                  {index < 4 && (
                    <ChevronRight className={`hidden md:block absolute top-6 ${isRTL ? '-left-3 rotate-180' : '-right-3'} w-6 h-6 text-[#d4a84b]/50`} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#133129]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
            </h2>
            <p className="text-[#faf9f6]/70 mb-8">
              {language === 'ar' 
                ? 'اطلب إحاطة لمناقشة كيف يمكن لخدماتنا دعم مؤسستك.'
                : 'Request a briefing to discuss how our services can support your institution.'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/contact">
                <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                  {language === 'ar' ? 'طلب إحاطة' : 'Request a Briefing'}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10">
                  {language === 'ar' ? 'تعرف علينا' : 'Learn About Us'}
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
