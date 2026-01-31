/**
 * CauseWay How We Work Page
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Detailed methodology and approach
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Search,
  ClipboardCheck,
  PenTool,
  Cog,
  HandshakeIcon,
  Users,
  Shield,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const phases = [
  {
    icon: Search,
    phase: 'Discovery',
    phaseAr: 'الاكتشاف',
    duration: '2-4 weeks',
    durationAr: '2-4 أسابيع',
    description: 'We begin by deeply understanding your institution, its context, challenges, and objectives. This phase establishes the foundation for all subsequent work.',
    descriptionAr: 'نبدأ بفهم عميق لمؤسستك وسياقها وتحدياتها وأهدافها. تؤسس هذه المرحلة الأساس لجميع الأعمال اللاحقة.',
    deliverables: [
      'Stakeholder interviews and mapping',
      'Current state documentation',
      'Regulatory landscape analysis',
      'Initial risk assessment',
      'Project scope definition'
    ],
    deliverablesAr: [
      'مقابلات وتخطيط أصحاب المصلحة',
      'توثيق الوضع الحالي',
      'تحليل المشهد التنظيمي',
      'تقييم المخاطر الأولي',
      'تحديد نطاق المشروع'
    ]
  },
  {
    icon: ClipboardCheck,
    phase: 'Assessment',
    phaseAr: 'التقييم',
    duration: '3-6 weeks',
    durationAr: '3-6 أسابيع',
    description: 'We conduct a thorough analysis of your current state, identifying gaps, opportunities, and areas requiring immediate attention.',
    descriptionAr: 'نجري تحليلاً شاملاً لوضعك الحالي، محددين الفجوات والفرص والمجالات التي تتطلب اهتماماً فورياً.',
    deliverables: [
      'Gap analysis report',
      'Compliance assessment',
      'Process mapping',
      'Benchmark comparison',
      'Prioritized recommendations'
    ],
    deliverablesAr: [
      'تقرير تحليل الفجوات',
      'تقييم الامتثال',
      'تخطيط العمليات',
      'مقارنة معيارية',
      'توصيات مرتبة حسب الأولوية'
    ]
  },
  {
    icon: PenTool,
    phase: 'Design',
    phaseAr: 'التصميم',
    duration: '4-8 weeks',
    durationAr: '4-8 أسابيع',
    description: 'We develop tailored solutions that address identified gaps while aligning with your strategic objectives and regulatory requirements.',
    descriptionAr: 'نطور حلولاً مخصصة تعالج الفجوات المحددة مع التوافق مع أهدافك الاستراتيجية والمتطلبات التنظيمية.',
    deliverables: [
      'Solution architecture',
      'Policy and procedure drafts',
      'Implementation roadmap',
      'Resource requirements',
      'Risk mitigation strategies'
    ],
    deliverablesAr: [
      'هندسة الحلول',
      'مسودات السياسات والإجراءات',
      'خارطة طريق التنفيذ',
      'متطلبات الموارد',
      'استراتيجيات تخفيف المخاطر'
    ]
  },
  {
    icon: Cog,
    phase: 'Implementation',
    phaseAr: 'التنفيذ',
    duration: '8-16 weeks',
    durationAr: '8-16 أسبوعاً',
    description: 'We execute the designed solutions with precision, working alongside your team to ensure successful adoption and integration.',
    descriptionAr: 'ننفذ الحلول المصممة بدقة، نعمل جنباً إلى جنب مع فريقك لضمان التبني والتكامل الناجح.',
    deliverables: [
      'Phased rollout execution',
      'Staff training programs',
      'System configuration',
      'Process documentation',
      'Progress reporting'
    ],
    deliverablesAr: [
      'تنفيذ الطرح المرحلي',
      'برامج تدريب الموظفين',
      'تكوين النظام',
      'توثيق العمليات',
      'تقارير التقدم'
    ]
  },
  {
    icon: HandshakeIcon,
    phase: 'Handover',
    phaseAr: 'التسليم',
    duration: '2-4 weeks',
    durationAr: '2-4 أسابيع',
    description: 'We ensure sustainable outcomes by transferring knowledge, documenting processes, and establishing ongoing support mechanisms.',
    descriptionAr: 'نضمن نتائج مستدامة من خلال نقل المعرفة وتوثيق العمليات وإنشاء آليات الدعم المستمر.',
    deliverables: [
      'Complete documentation package',
      'Knowledge transfer sessions',
      'Sustainability assessment',
      'Post-implementation review',
      'Ongoing support framework'
    ],
    deliverablesAr: [
      'حزمة التوثيق الكاملة',
      'جلسات نقل المعرفة',
      'تقييم الاستدامة',
      'مراجعة ما بعد التنفيذ',
      'إطار الدعم المستمر'
    ]
  }
];

const principles = [
  {
    icon: Users,
    title: 'Stakeholder Alignment',
    titleAr: 'توافق أصحاب المصلحة',
    description: 'Every phase includes defined stakeholder engagement to ensure alignment and buy-in.',
    descriptionAr: 'كل مرحلة تتضمن مشاركة محددة لأصحاب المصلحة لضمان التوافق والقبول.'
  },
  {
    icon: Shield,
    title: 'Governance Focus',
    titleAr: 'التركيز على الحوكمة',
    description: 'Rigorous governance and accountability checkpoints at every stage.',
    descriptionAr: 'نقاط فحص صارمة للحوكمة والمساءلة في كل مرحلة.'
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    titleAr: 'ضمان الجودة',
    description: 'Each phase includes defined deliverables and quality assurance checkpoints.',
    descriptionAr: 'كل مرحلة تتضمن مخرجات محددة ونقاط فحص ضمان الجودة.'
  }
];

export default function HowWeWork() {
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
              {language === 'ar' ? 'منهجيتنا' : 'Our Methodology'}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'كيف نعمل' : 'How We Work'}
            </h1>
            <p className="text-xl text-[#faf9f6]/80 leading-relaxed">
              {language === 'ar' 
                ? 'منهجيتنا المنظمة تضمن جودة متسقة ومعالم واضحة ونتائج قابلة للقياس. كل مرحلة تتضمن مخرجات محددة ومشاركة أصحاب المصلحة ونقاط فحص ضمان الجودة.'
                : 'Our structured methodology ensures consistent quality, clear milestones, and measurable outcomes. Each phase includes defined deliverables, stakeholder engagement, and quality assurance checkpoints.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-16 bg-[#faf9f6]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white p-6 rounded-lg shadow-sm text-center ${isRTL ? 'text-right' : ''}`}
              >
                <div className="w-14 h-14 bg-[#d4a84b]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-7 h-7 text-[#d4a84b]" />
                </div>
                <h3 className="text-lg font-serif text-[#133129] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? principle.titleAr : principle.title}
                </h3>
                <p className="text-[#406D61] text-sm">
                  {language === 'ar' ? principle.descriptionAr : principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Phases */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'نهجنا المكون من خمس مراحل' : 'Our Five-Phase Approach'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'من الاكتشاف إلى التسليم' : 'From Discovery to Handover'}
            </h2>
          </div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Phase Number & Icon */}
                <div className={`lg:col-span-2 ${index % 2 === 1 ? 'lg:order-3' : ''}`}>
                  <div className="flex lg:flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-[#133129] rounded-full flex items-center justify-center text-[#d4a84b] font-bold text-2xl">
                      {isRTL ? 5 - index : index + 1}
                    </div>
                    <phase.icon className="w-8 h-8 text-[#224B40]" />
                  </div>
                </div>

                {/* Phase Content */}
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-2xl font-serif text-[#133129]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {language === 'ar' ? phase.phaseAr : phase.phase}
                    </h3>
                    <span className="px-3 py-1 bg-[#d4a84b]/20 text-[#133129] text-sm rounded-full">
                      {language === 'ar' ? phase.durationAr : phase.duration}
                    </span>
                  </div>
                  <p className={`text-[#406D61] leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {language === 'ar' ? phase.descriptionAr : phase.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className={`lg:col-span-5 bg-[#faf9f6] p-6 rounded-lg ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h4 className={`text-sm font-semibold text-[#133129] uppercase tracking-wider mb-4 ${isRTL ? 'text-right' : ''}`}>
                    {language === 'ar' ? 'المخرجات' : 'Deliverables'}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'ar' ? phase.deliverablesAr : phase.deliverables).map((item, i) => (
                      <li key={i} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <CheckCircle className="w-4 h-4 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                        <span className="text-[#406D61] text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
              {language === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Begin?'}
            </h2>
            <p className="text-[#faf9f6]/70 mb-8">
              {language === 'ar' 
                ? 'دعنا نناقش كيف يمكن لمنهجيتنا المثبتة أن تدعم أهداف مؤسستك.'
                : 'Let\'s discuss how our proven methodology can support your institution\'s goals.'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/contact">
                <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                  {language === 'ar' ? 'طلب إحاطة' : 'Request a Briefing'}
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
