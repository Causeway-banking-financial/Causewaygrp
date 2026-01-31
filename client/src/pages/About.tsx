/**
 * CauseWay About Page
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Sections: Story, Mission, Leadership, Approach, Partners
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Target, Eye, Compass, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';
import { useLanguage } from '@/contexts/LanguageContext';

const values = [
  {
    icon: Target,
    title: 'Amanah (Trust)',
    titleAr: 'الأمانة',
    description: 'We uphold the highest standards of integrity and trust in all our dealings.',
    descriptionAr: 'نحافظ على أعلى معايير النزاهة والثقة في كل تعاملاتنا.'
  },
  {
    icon: Eye,
    title: 'Clarity',
    titleAr: 'الوضوح',
    description: 'We deliver clear, straightforward insights that enable informed decisions.',
    descriptionAr: 'نقدم رؤى واضحة ومباشرة تمكّن من اتخاذ قرارات مستنيرة.'
  },
  {
    icon: Compass,
    title: 'Accountability',
    titleAr: 'المساءلة',
    description: 'We take full responsibility for our work and its impact.',
    descriptionAr: 'نتحمل المسؤولية الكاملة عن نتائج عملنا وتأثيره.'
  },
  {
    icon: Users,
    title: 'Practicality',
    titleAr: 'الواقعية',
    description: 'We focus on actionable solutions that deliver tangible results.',
    descriptionAr: 'نركز على الحلول العملية القابلة للتنفيذ والتي تحقق نتائج ملموسة.'
  }
];

const affiliations = [
  { name: 'AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)', nameAr: 'أيوفي (هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية)' },
  { name: 'Yemen Microfinance Network', nameAr: 'شبكة التمويل الأصغر اليمنية' },
  { name: 'Central Bank of Yemen - Registered Consultant', nameAr: 'البنك المركزي اليمني - مستشار مسجل' },
  { name: 'Arab Federation for Capital Markets', nameAr: 'الاتحاد العربي لأسواق المال' }
];

const phases = [
  { name: 'Discovery', nameAr: 'الاكتشاف' },
  { name: 'Assessment', nameAr: 'التقييم' },
  { name: 'Design', nameAr: 'التصميم' },
  { name: 'Implementation', nameAr: 'التنفيذ' },
  { name: 'Handover', nameAr: 'التسليم' }
];

export default function About() {
  const { language, isRTL } = useLanguage();

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <YetoBanner variant="top" />
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
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'بناء البنية التحتية المالية للغد' : 'Building Financial Infrastructure for Tomorrow'}
            </h1>
            <p className="text-xl text-[#faf9f6]/80 leading-relaxed">
              {language === 'ar' 
                ? 'كوزواي للاستشارات والخدمات والتطوير هي شركة استشارات مالية متخصصة مكرسة لتعزيز الأنظمة المصرفية وتعزيز التمويل الإسلامي وتعزيز الشفافية الاقتصادية في اليمن والمنطقة.'
                : 'CauseWay Consulting, Services & Development Group is a specialized financial advisory firm dedicated to strengthening banking systems, promoting Islamic finance, and fostering economic transparency in Yemen and the region.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`bg-white p-10 rounded-lg shadow-sm border-${isRTL ? 'r' : 'l'}-4 border-[#d4a84b]`}
            >
              <div className="w-14 h-14 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#d4a84b]" />
              </div>
              <h2 className="text-2xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <p className="text-[#406D61] leading-relaxed">
                {language === 'ar' 
                  ? 'تزويد المؤسسات بحلول مالية مبنية على الأدلة ومؤسسة على الشريعة تبني الثقة والحوكمة والبنية التحتية المستدامة.'
                  : 'To provide institutions with evidence-based, Sharia-grounded financial solutions that build trust, governance, and sustainable infrastructure.'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`bg-white p-10 rounded-lg shadow-sm border-${isRTL ? 'r' : 'l'}-4 border-[#224B40]`}
            >
              <div className="w-14 h-14 bg-[#224B40]/20 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#224B40]" />
              </div>
              <h2 className="text-2xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h2>
              <p className="text-[#406D61] leading-relaxed">
                {language === 'ar' 
                  ? 'أن نكون المؤسسة الرائدة في منطقتنا في تحويل البيانات المالية المجزأة إلى معلومات منظمة، وتعزيز الشفافية والمرونة.'
                  : 'To be the leading institution in our region for turning fragmented financial data into structured intelligence, fostering transparency and resilience.'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
                {language === 'ar' ? 'قصتنا' : 'Our Story'}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'التزام بالتميز' : 'A Commitment to Excellence'}
              </h2>
              <div className="space-y-4 text-[#406D61] leading-relaxed">
                {language === 'ar' ? (
                  <>
                    <p>
                      تأسست كوزواي للاستشارات والخدمات والتطوير في عدن، اليمن، انطلاقاً من إدراك أن القطاع المالي في المنطقة يحتاج إلى خبرة متخصصة تفهم كلاً من أفضل الممارسات الدولية والسياق المحلي.
                    </p>
                    <p>
                      يضم فريقنا محترفين متمرسين يتمتعون بخبرة واسعة في الأعمال المصرفية والتمويل الإسلامي والامتثال التنظيمي. أسسنا كوزواي لسد الفجوة بين المعايير المالية العالمية وتحديات التنفيذ الإقليمية.
                    </p>
                    <p>
                      اليوم، نخدم البنوك ومؤسسات التمويل الأصغر ومنظمات التنمية والهيئات الحكومية، ونقدم حلولاً شاملة تتراوح من تطوير المنتجات الإسلامية إلى التحول الرقمي وبناء القدرات.
                    </p>
                    <p>
                      إن التزامنا بالأنظمة المالية المؤسسة على الشريعة والآمنة حوكمياً قد وضعنا كشريك موثوق للمؤسسات التي تسعى إلى تعزيز عملياتها مع الحفاظ على الامتثال لكل من المبادئ الإسلامية والمعايير التنظيمية الدولية.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      CauseWay Consulting, Services & Development Group was established in Aden, Yemen, emerging from a recognition that the region's financial sector needed specialized expertise that understood both international best practices and local context.
                    </p>
                    <p>
                      Our team comprises seasoned professionals with extensive experience in banking, Islamic finance, and regulatory compliance. We established CauseWay to bridge the gap between global financial standards and regional implementation challenges.
                    </p>
                    <p>
                      Today, we serve banks, microfinance institutions, development organizations, and government bodies, providing comprehensive solutions that range from Islamic product development to digital transformation and capacity building.
                    </p>
                    <p>
                      Our commitment to Sharia-grounded, governance-safe financial systems has positioned us as a trusted partner for institutions seeking to strengthen their operations while maintaining compliance with both Islamic principles and international regulatory standards.
                    </p>
                  </>
                )}
              </div>
              
              {/* YETO Bridge Paragraph */}
              <div className="mt-8 p-6 bg-[#133129]/5 rounded-lg border-l-4 border-[#d4a84b]">
                <h3 className="text-xl font-serif text-[#133129] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? 'كوزواي ويتو: مبادرتان متكاملتان' : 'CauseWay & YETO: Two Complementary Initiatives'}
                </h3>
                <p className="text-[#406D61] leading-relaxed">
                  {language === 'ar' 
                    ? 'كوزواي هي شركة استشارية تقدم خدمات آمنة حوكمياً للمؤسسات المالية. يتو (المرصد اليمني للشفافية الاقتصادية) هو منصة مستقلة قيد الإطلاق توفر بيانات اقتصادية منظمة وتحليلات. رؤى استشاراتنا تغذي يتو، بينما يوفر يتو قاعدة أدلة محايدة - وليس أداة تسويقية - لصناع القرار في جميع أنحاء المنطقة.'
                    : 'CauseWay is an advisory firm offering governance-safe services to financial institutions. YETO (Yemen Economic Transparency Observatory) is an independent platform launching soon that provides structured economic data and analysis. Our consultancy\'s insights feed into YETO, while YETO serves as a neutral evidence base—not a marketing tool—for decision-makers across the region.'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="approach" className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'نهجنا' : 'Our Approach'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'القيم التي توجه عملنا' : 'Values That Guide Our Work'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'كل مشاركة تسترشد بقيمنا الأساسية، مما يضمن جودة متسقة وممارسة أخلاقية عبر جميع خدماتنا.'
                : 'Every engagement is guided by our core values, ensuring consistent quality and ethical practice across all our services.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-[#133129]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#224B40]" />
                </div>
                <h3 className="text-xl font-serif text-[#133129] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? value.titleAr : value.title}
                </h3>
                <p className="text-[#406D61] text-sm leading-relaxed">
                  {language === 'ar' ? value.descriptionAr : value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'منهجيتنا' : 'Our Methodology'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'نهج مثبت للتنفيذ' : 'A Proven Approach to Delivery'}
            </h2>
          </div>

          <div className="bg-[#133129] rounded-lg p-8 md:p-12">
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${isRTL ? 'md:grid-flow-col-dense' : ''}`}>
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#d4a84b] rounded-full flex items-center justify-center text-[#133129] font-semibold mb-3">
                      {isRTL ? phases.length - index : index + 1}
                    </div>
                    <span className="text-[#faf9f6] font-medium text-center">
                      {language === 'ar' ? phase.nameAr : phase.name}
                    </span>
                  </div>
                  {index < 4 && (
                    <div className={`hidden md:block absolute top-6 ${isRTL ? 'right-[60%]' : 'left-[60%]'} w-[80%] h-0.5 bg-[#d4a84b]/30`} />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-[#224B40]/30">
              <p className="text-[#faf9f6]/80 text-center max-w-3xl mx-auto">
                {language === 'ar' 
                  ? 'تضمن منهجيتنا المنظمة جودة متسقة ومعالم واضحة ونتائج قابلة للقياس. تتضمن كل مرحلة مخرجات محددة ومشاركة أصحاب المصلحة ونقاط فحص ضمان الجودة.'
                  : 'Our structured methodology ensures consistent quality, clear milestones, and measurable outcomes. Each phase includes defined deliverables, stakeholder engagement, and quality assurance checkpoints.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section id="partners" className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'الانتماءات والشركاء' : 'Affiliations & Partners'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'شبكتنا المهنية' : 'Our Professional Network'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {affiliations.map((affiliation, index) => (
              <motion.div
                key={affiliation.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-10 h-10 bg-[#133129]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-[#224B40]" />
                </div>
                <span className="text-[#406D61] text-sm">
                  {language === 'ar' ? affiliation.nameAr : affiliation.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#133129]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هل أنت مستعد للعمل معنا؟' : 'Ready to Work Together?'}
            </h2>
            <p className="text-[#faf9f6]/70 mb-8">
              {language === 'ar' 
                ? 'دعنا نناقش كيف يمكن لكوزواي دعم أهداف مؤسستك.'
                : 'Let\'s discuss how CauseWay can support your institution\'s goals.'
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
