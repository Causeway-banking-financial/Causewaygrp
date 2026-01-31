/**
 * CauseWay FAQ Page
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Common questions about CauseWay and YETO
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  ChevronDown,
  HelpCircle,
  Building2,
  Globe,
  Shield,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const faqCategories = [
  {
    icon: Building2,
    title: 'About CauseWay',
    titleAr: 'عن كوزواي',
    faqs: [
      {
        question: 'What is CauseWay?',
        questionAr: 'ما هي كوزواي؟',
        answer: 'CauseWay is a financial advisory consultancy specializing in governance-safe services for banks, microfinance institutions, development organizations, and government bodies. We provide evidence-based, Sharia-grounded financial solutions that build trust, governance, and sustainable infrastructure.',
        answerAr: 'كوزواي هي شركة استشارية مالية متخصصة في الخدمات الآمنة حوكمياً للبنوك ومؤسسات التمويل الأصغر ومنظمات التنمية والهيئات الحكومية. نقدم حلولاً مالية مبنية على الأدلة ومؤسسة على الشريعة تبني الثقة والحوكمة والبنية التحتية المستدامة.'
      },
      {
        question: 'What services does CauseWay offer?',
        questionAr: 'ما الخدمات التي تقدمها كوزواي؟',
        answer: 'We offer six core service areas: Islamic Finance Engineering, Risk & Compliance, Core Banking Systems, Microfinance Development, Capacity Building, and Branding & Identity. Each service is designed to strengthen institutional governance and build sustainable financial infrastructure.',
        answerAr: 'نقدم ست مجالات خدمة أساسية: هندسة التمويل الإسلامي، المخاطر والامتثال، الأنظمة المصرفية الأساسية، تطوير التمويل الأصغر، بناء القدرات، والعلامة التجارية والهوية. كل خدمة مصممة لتعزيز الحوكمة المؤسسية وبناء بنية تحتية مالية مستدامة.'
      },
      {
        question: 'Who are CauseWay\'s typical clients?',
        questionAr: 'من هم عملاء كوزواي النموذجيون؟',
        answer: 'Our clients include commercial and Islamic banks, microfinance institutions (MFIs), central banks and regulatory authorities, development finance institutions, international development organizations, and government ministries focused on financial sector development.',
        answerAr: 'يشمل عملاؤنا البنوك التجارية والإسلامية، ومؤسسات التمويل الأصغر، والبنوك المركزية والسلطات التنظيمية، ومؤسسات تمويل التنمية، ومنظمات التنمية الدولية، والوزارات الحكومية المركزة على تطوير القطاع المالي.'
      },
      {
        question: 'What makes CauseWay different from other consultancies?',
        questionAr: 'ما الذي يميز كوزواي عن الشركات الاستشارية الأخرى؟',
        answer: 'CauseWay combines deep expertise in Islamic finance with practical experience in fragile and emerging markets. We focus on governance-safe solutions that are audit-ready from day one, and we maintain independence through our evidence-based approach rather than product sales.',
        answerAr: 'تجمع كوزواي بين الخبرة العميقة في التمويل الإسلامي والخبرة العملية في الأسواق الهشة والناشئة. نركز على الحلول الآمنة حوكمياً والجاهزة للتدقيق من اليوم الأول، ونحافظ على الاستقلالية من خلال نهجنا المبني على الأدلة بدلاً من بيع المنتجات.'
      }
    ]
  },
  {
    icon: Globe,
    title: 'About YETO',
    titleAr: 'عن يتو',
    faqs: [
      {
        question: 'What is YETO?',
        questionAr: 'ما هو يتو؟',
        answer: 'YETO (Yemen Economic Transparency Observatory) is an independent platform launching soon that provides structured economic data, analysis, and transparency reporting for Yemen. It serves as a neutral evidence base for decision-makers across the region.',
        answerAr: 'يتو (المرصد اليمني للشفافية الاقتصادية) هو منصة مستقلة قيد الإطلاق قريباً توفر بيانات اقتصادية منظمة وتحليلات وتقارير شفافية لليمن. يعمل كقاعدة أدلة محايدة لصناع القرار في جميع أنحاء المنطقة.'
      },
      {
        question: 'What is the relationship between CauseWay and YETO?',
        questionAr: 'ما العلاقة بين كوزواي ويتو؟',
        answer: 'CauseWay is an advisory firm, while YETO is an independent observatory platform. Our consultancy\'s insights feed into YETO, but YETO operates independently as a neutral evidence base—not a marketing tool. They are complementary initiatives with distinct purposes.',
        answerAr: 'كوزواي شركة استشارية، بينما يتو منصة مرصد مستقلة. رؤى استشاراتنا تغذي يتو، لكن يتو يعمل بشكل مستقل كقاعدة أدلة محايدة - وليس أداة تسويقية. هما مبادرتان متكاملتان بأغراض متميزة.'
      },
      {
        question: 'When will YETO launch?',
        questionAr: 'متى سيتم إطلاق يتو؟',
        answer: 'YETO is currently in development and expected to launch soon. Subscribe to our newsletter to receive updates on the launch date and early access opportunities.',
        answerAr: 'يتو قيد التطوير حالياً ومن المتوقع إطلاقه قريباً. اشترك في نشرتنا الإخبارية لتلقي تحديثات حول تاريخ الإطلاق وفرص الوصول المبكر.'
      },
      {
        question: 'What data will YETO provide?',
        questionAr: 'ما البيانات التي سيوفرها يتو؟',
        answer: 'YETO will provide real-time economic indicators, sector analysis, exchange rate tracking, banking sector data, governance indices, and in-depth analytical reports. All data will be structured, verified, and presented with full methodology transparency.',
        answerAr: 'سيوفر يتو مؤشرات اقتصادية آنية، تحليل القطاعات، تتبع أسعار الصرف، بيانات القطاع المصرفي، مؤشرات الحوكمة، وتقارير تحليلية معمقة. ستكون جميع البيانات منظمة ومتحققة ومقدمة بشفافية منهجية كاملة.'
      }
    ]
  },
  {
    icon: Shield,
    title: 'Services & Engagement',
    titleAr: 'الخدمات والتعاقد',
    faqs: [
      {
        question: 'How does a typical engagement begin?',
        questionAr: 'كيف يبدأ التعاقد النموذجي؟',
        answer: 'Engagements typically begin with a briefing request through our contact form. We then schedule an initial consultation to understand your needs, followed by a proposal outlining scope, timeline, and investment. Our five-phase methodology (Discovery, Assessment, Design, Implementation, Handover) guides all projects.',
        answerAr: 'تبدأ التعاقدات عادةً بطلب إحاطة من خلال نموذج الاتصال. ثم نحدد موعداً لاستشارة أولية لفهم احتياجاتك، يليها اقتراح يوضح النطاق والجدول الزمني والاستثمار. منهجيتنا المكونة من خمس مراحل (الاكتشاف، التقييم، التصميم، التنفيذ، التسليم) توجه جميع المشاريع.'
      },
      {
        question: 'What is the typical project duration?',
        questionAr: 'ما المدة النموذجية للمشروع؟',
        answer: 'Project duration varies based on scope and complexity. A focused assessment might take 6-8 weeks, while a comprehensive transformation program could span 6-12 months. We provide detailed timelines in our proposals and maintain regular progress reporting throughout.',
        answerAr: 'تختلف مدة المشروع بناءً على النطاق والتعقيد. قد يستغرق التقييم المركز 6-8 أسابيع، بينما قد يمتد برنامج التحول الشامل من 6-12 شهراً. نقدم جداول زمنية مفصلة في مقترحاتنا ونحافظ على تقارير تقدم منتظمة طوال الفترة.'
      },
      {
        question: 'Do you work with organizations outside Yemen?',
        questionAr: 'هل تعملون مع منظمات خارج اليمن؟',
        answer: 'Yes, while we have deep expertise in Yemen\'s financial sector, our services are applicable to financial institutions across the MENA region and beyond. Our Islamic finance and governance expertise is particularly relevant for institutions in emerging and frontier markets.',
        answerAr: 'نعم، بينما لدينا خبرة عميقة في القطاع المالي اليمني، خدماتنا قابلة للتطبيق على المؤسسات المالية في جميع أنحاء منطقة الشرق الأوسط وشمال أفريقيا وما بعدها. خبرتنا في التمويل الإسلامي والحوكمة ذات صلة خاصة بالمؤسسات في الأسواق الناشئة والحدودية.'
      },
      {
        question: 'What does "governance-safe" mean?',
        questionAr: 'ماذا يعني "آمن حوكمياً"؟',
        answer: 'Governance-safe means our solutions are designed to be audit-ready, compliant with regulatory requirements, and aligned with international best practices from the start. We build in accountability, transparency, and risk management at every stage.',
        answerAr: 'آمن حوكمياً يعني أن حلولنا مصممة لتكون جاهزة للتدقيق، متوافقة مع المتطلبات التنظيمية، ومتوافقة مع أفضل الممارسات الدولية من البداية. نبني المساءلة والشفافية وإدارة المخاطر في كل مرحلة.'
      }
    ]
  },
  {
    icon: Users,
    title: 'Working With Us',
    titleAr: 'العمل معنا',
    faqs: [
      {
        question: 'How can I request a briefing?',
        questionAr: 'كيف يمكنني طلب إحاطة؟',
        answer: 'You can request a briefing through our Contact page. Fill out the form with your organization details and areas of interest, and our team will respond within 2 business days to schedule an initial consultation.',
        answerAr: 'يمكنك طلب إحاطة من خلال صفحة الاتصال. املأ النموذج بتفاصيل مؤسستك ومجالات الاهتمام، وسيرد فريقنا خلال يومي عمل لتحديد موعد استشارة أولية.'
      },
      {
        question: 'Do you offer remote services?',
        questionAr: 'هل تقدمون خدمات عن بُعد؟',
        answer: 'Yes, we offer both on-site and remote engagement models. Many of our services can be delivered remotely, while certain phases (particularly implementation and training) may benefit from on-site presence. We tailor our approach to each client\'s needs and circumstances.',
        answerAr: 'نعم، نقدم نماذج تعاقد في الموقع وعن بُعد. يمكن تقديم العديد من خدماتنا عن بُعد، بينما قد تستفيد مراحل معينة (خاصة التنفيذ والتدريب) من التواجد في الموقع. نخصص نهجنا لاحتياجات وظروف كل عميل.'
      },
      {
        question: 'What languages do you work in?',
        questionAr: 'ما اللغات التي تعملون بها؟',
        answer: 'Our team is fully bilingual in Arabic and English. All deliverables, documentation, and training can be provided in either language or both, ensuring accessibility for all stakeholders.',
        answerAr: 'فريقنا ثنائي اللغة بالكامل بالعربية والإنجليزية. يمكن تقديم جميع المخرجات والوثائق والتدريب بأي من اللغتين أو كليهما، مما يضمن إمكانية الوصول لجميع أصحاب المصلحة.'
      },
      {
        question: 'How do you ensure confidentiality?',
        questionAr: 'كيف تضمنون السرية؟',
        answer: 'Confidentiality is fundamental to our practice. We sign NDAs with all clients, maintain strict data security protocols, and never share client information without explicit permission. Our team members are bound by professional ethics standards.',
        answerAr: 'السرية أساسية لممارستنا. نوقع اتفاقيات عدم إفشاء مع جميع العملاء، ونحافظ على بروتوكولات أمان بيانات صارمة، ولا نشارك معلومات العملاء أبداً دون إذن صريح. أعضاء فريقنا ملزمون بمعايير الأخلاق المهنية.'
      }
    ]
  }
];

function FAQItem({ faq, isRTL, language }: { faq: any; isRTL: boolean; language: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#133129]/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-5 flex items-center justify-between gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
      >
        <span className="text-[#133129] font-medium">
          {language === 'ar' ? faq.questionAr : faq.question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-[#406D61] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`pb-5 text-[#406D61] leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? faq.answerAr : faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
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
              {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'الأسئلة المتكررة' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-xl text-[#faf9f6]/80 leading-relaxed">
              {language === 'ar' 
                ? 'إجابات على الأسئلة الشائعة حول كوزواي ويتو وخدماتنا.'
                : 'Answers to common questions about CauseWay, YETO, and our services.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
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
                  <h2 className="text-2xl font-serif text-[#133129]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {language === 'ar' ? category.titleAr : category.title}
                  </h2>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  {category.faqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} isRTL={isRTL} language={language} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <HelpCircle className="w-12 h-12 text-[#d4a84b] mx-auto mb-4" />
            <h2 className="text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هل لديك أسئلة أخرى؟' : 'Still Have Questions?'}
            </h2>
            <p className="text-[#406D61] mb-8">
              {language === 'ar' 
                ? 'لم تجد ما تبحث عنه؟ فريقنا سعيد بالمساعدة.'
                : 'Can\'t find what you\'re looking for? Our team is happy to help.'
              }
            </p>
            <Link href="/contact">
              <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
