/**
 * CauseWay Academy - Premium Executive Training Platform
 * World-class executive education for financial institutions
 * Design: McKinsey Academy / Deloitte University inspired
 * Brand Colors: #1a3a2f (forest), #c9a227 (gold), #fafaf8 (cream)
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Users, Building2, Shield, TrendingUp, Landmark, Monitor,
  UserCog, ClipboardCheck, ChevronRight, ArrowRight, BookOpen, Award,
  Clock, Target, CheckCircle2, Globe, Briefcase, Scale
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useTrainingRegistration } from '@/components/TrainingRegistration';

// Executive Training Tracks based on CauseWay's actual services
const trainingTracks = {
  en: [
    {
      id: 'board-leadership',
      icon: Users,
      title: 'Board & Executive Leadership',
      subtitle: 'Strategic Governance for Decision Makers',
      description: 'Equip board members and C-suite executives with the governance frameworks, fiduciary knowledge, and strategic oversight capabilities required to lead financial institutions in complex environments.',
      audience: 'Board Members, CEOs, Executive Directors',
      duration: '3-5 Days',
      format: 'In-Person / Hybrid',
      programs: [
        'IFC Certified Board Director Program',
        'Strategic Governance & Oversight',
        'Enterprise Risk Management for Boards',
        'Regulatory Relations & Compliance Oversight',
        'Fiduciary Duties & Ethical Leadership'
      ],
      outcomes: [
        'Board-ready governance frameworks',
        'Strategic decision-making confidence',
        'Regulatory relationship management',
        'Risk appetite articulation'
      ],
      color: 'from-emerald-600 to-emerald-800'
    },
    {
      id: 'islamic-finance',
      icon: Scale,
      title: 'Islamic Finance & Sharia Governance',
      subtitle: 'AAOIFI-Aligned Product Engineering',
      description: 'Master the principles of Sharia-compliant finance, from product structuring to SSB relations. Build audit-ready Islamic finance operations aligned with AAOIFI standards.',
      audience: 'Sharia Compliance Officers, Product Managers, SSB Liaisons',
      duration: '5-10 Days',
      format: 'In-Person / Online',
      programs: [
        'Islamic Finance Fundamentals & Structures',
        'Sharia Product Engineering (Murabaha, Ijara, Musharakah)',
        'SSB Relations & Fatwa Documentation',
        'Sharia Audit & Evidence Discipline',
        'AAOIFI Standards Implementation'
      ],
      outcomes: [
        'Sharia-compliant product design capability',
        'SSB briefing pack preparation',
        'Audit-ready documentation standards',
        'Control-point mapping expertise'
      ],
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 'risk-compliance',
      icon: Shield,
      title: 'Risk & Compliance Excellence',
      subtitle: 'AML/CFT, Sanctions & Credit Risk',
      description: 'Build robust compliance frameworks that withstand regulatory scrutiny. From AML/CFT to sanctions screening and credit risk governance—develop audit-defensible systems.',
      audience: 'Compliance Officers, Risk Managers, Internal Auditors',
      duration: '5-7 Days',
      format: 'In-Person / Hybrid',
      programs: [
        'AML/CFT Framework Design & Implementation',
        'Sanctions Screening & Exception Governance',
        'Credit Risk Management & IFRS-9',
        'Operational Risk & Control Matrices',
        'Certified Compliance Manager Preparation'
      ],
      outcomes: [
        'Regulator-ready compliance frameworks',
        'Evidence-based control systems',
        'Risk appetite documentation',
        'Audit trail discipline'
      ],
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'banking-operations',
      icon: Building2,
      title: 'Banking Operations & Transformation',
      subtitle: 'From Microfinance to Bank Readiness',
      description: 'Navigate institutional transformation with confidence. Master process re-engineering, operating model design, and the governance uplift required for regulatory advancement.',
      audience: 'Operations Directors, Branch Managers, Transformation Leads',
      duration: '5-10 Days',
      format: 'In-Person',
      programs: [
        'Institutional Transformation Roadmap',
        'Process Re-engineering (BPR) for Banks',
        'Operating Model Design (HQ vs Branches)',
        'Product Portfolio Modernization',
        'Segregation of Duties & Maker/Checker Controls'
      ],
      outcomes: [
        'Transformation governance capability',
        'Process optimization expertise',
        'Committee architecture design',
        'Scalable operating models'
      ],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'finance-treasury',
      icon: TrendingUp,
      title: 'Finance & Treasury Governance',
      subtitle: 'Investment Policy & Board Reporting',
      description: 'Build treasury and investment functions that stand before boards and regulators. Master investment policy design, portfolio governance, and board-grade reporting.',
      audience: 'CFOs, Treasury Managers, Investment Officers',
      duration: '3-5 Days',
      format: 'In-Person / Online',
      programs: [
        'Investment Policy Statement (IPS) Design',
        'Treasury Committee Governance',
        'Portfolio Architecture & Risk Limits',
        'Sharia Investment Screening',
        'Board-Ready Financial Reporting'
      ],
      outcomes: [
        'Committee-safe treasury governance',
        'Investment mandate documentation',
        'Performance reporting frameworks',
        'Liquidity management discipline'
      ],
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'technology-digital',
      icon: Monitor,
      title: 'Technology & Digital Banking',
      subtitle: 'Core Systems & Cybersecurity',
      description: 'Lead digital transformation with governance discipline. From core banking selection to cybersecurity frameworks—build technology capabilities that support institutional growth.',
      audience: 'CIOs, IT Directors, Digital Transformation Leads',
      duration: '5-7 Days',
      format: 'In-Person / Online',
      programs: [
        'Digital Transformation Governance',
        'Core Banking System Selection (RFP/Vendor)',
        'Cybersecurity for Financial Institutions',
        'IT Governance (ITIL/COBIT)',
        'Data Analytics & Business Intelligence'
      ],
      outcomes: [
        'Technology governance frameworks',
        'Vendor selection discipline',
        'Cybersecurity readiness',
        'Digital audit trails'
      ],
      color: 'from-cyan-600 to-cyan-800'
    },
    {
      id: 'human-capital',
      icon: UserCog,
      title: 'Human Capital & Leadership',
      subtitle: 'HR Excellence for Financial Institutions',
      description: 'Develop HR capabilities tailored for regulated financial institutions. From talent acquisition to performance management—build people systems that support institutional excellence.',
      audience: 'HR Directors, Training Managers, Organizational Development',
      duration: '3-5 Days',
      format: 'In-Person / Online',
      programs: [
        'SHRM-CP/SHRM-SCP Preparation',
        'HR for Financial Institutions',
        'Performance Management Systems',
        'Training Needs Assessment & ROI',
        'Organizational Development & Design'
      ],
      outcomes: [
        'HR governance frameworks',
        'Competency-based systems',
        'Training impact measurement',
        'Succession planning capability'
      ],
      color: 'from-pink-600 to-pink-800'
    },
    {
      id: 'audit-assurance',
      icon: ClipboardCheck,
      title: 'Audit & Assurance',
      subtitle: 'CIA, CISA & Evidence Discipline',
      description: 'Build internal audit capabilities that provide assurance to boards and regulators. Master evidence-based auditing, IT audit, and the documentation discipline required for credibility.',
      audience: 'Internal Auditors, IT Auditors, Audit Committee Members',
      duration: '5-10 Days',
      format: 'In-Person / Online',
      programs: [
        'CIA Certification Preparation',
        'CISA (IT Audit) Certification Preparation',
        'Evidence-Based Internal Auditing',
        'Audit Committee Relations',
        'Risk-Based Audit Planning'
      ],
      outcomes: [
        'Certification readiness',
        'Evidence discipline mastery',
        'Audit report excellence',
        'Committee presentation skills'
      ],
      color: 'from-slate-600 to-slate-800'
    }
  ],
  ar: [
    {
      id: 'board-leadership',
      icon: Users,
      title: 'القيادة التنفيذية ومجلس الإدارة',
      subtitle: 'الحوكمة الاستراتيجية لصناع القرار',
      description: 'تزويد أعضاء مجلس الإدارة والمديرين التنفيذيين بأطر الحوكمة والمعرفة الائتمانية وقدرات الرقابة الاستراتيجية المطلوبة لقيادة المؤسسات المالية في البيئات المعقدة.',
      audience: 'أعضاء مجلس الإدارة، الرؤساء التنفيذيون، المديرون التنفيذيون',
      duration: '٣-٥ أيام',
      format: 'حضوري / هجين',
      programs: [
        'برنامج عضو مجلس إدارة معتمد من IFC',
        'الحوكمة والرقابة الاستراتيجية',
        'إدارة المخاطر المؤسسية لمجالس الإدارة',
        'العلاقات التنظيمية والرقابة على الامتثال',
        'الواجبات الائتمانية والقيادة الأخلاقية'
      ],
      outcomes: [
        'أطر حوكمة جاهزة لمجلس الإدارة',
        'ثقة في اتخاذ القرارات الاستراتيجية',
        'إدارة العلاقات التنظيمية',
        'صياغة شهية المخاطر'
      ],
      color: 'from-emerald-600 to-emerald-800'
    },
    {
      id: 'islamic-finance',
      icon: Scale,
      title: 'التمويل الإسلامي والحوكمة الشرعية',
      subtitle: 'هندسة المنتجات وفق معايير أيوفي',
      description: 'إتقان مبادئ التمويل المتوافق مع الشريعة، من هيكلة المنتجات إلى العلاقات مع الهيئة الشرعية. بناء عمليات تمويل إسلامي جاهزة للتدقيق ومتوافقة مع معايير أيوفي.',
      audience: 'مسؤولو الالتزام الشرعي، مديرو المنتجات، منسقو الهيئة الشرعية',
      duration: '٥-١٠ أيام',
      format: 'حضوري / عن بُعد',
      programs: [
        'أساسيات وهياكل التمويل الإسلامي',
        'هندسة المنتجات الشرعية (المرابحة، الإجارة، المشاركة)',
        'العلاقات مع الهيئة الشرعية وتوثيق الفتاوى',
        'التدقيق الشرعي وانضباط الأدلة',
        'تطبيق معايير أيوفي'
      ],
      outcomes: [
        'قدرة تصميم المنتجات المتوافقة شرعياً',
        'إعداد حزم عرض الهيئة الشرعية',
        'معايير التوثيق الجاهز للتدقيق',
        'خبرة رسم نقاط التحقق'
      ],
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 'risk-compliance',
      icon: Shield,
      title: 'التميز في المخاطر والامتثال',
      subtitle: 'مكافحة غسل الأموال والعقوبات ومخاطر الائتمان',
      description: 'بناء أطر امتثال قوية تصمد أمام التدقيق التنظيمي. من مكافحة غسل الأموال إلى فحص العقوبات وحوكمة مخاطر الائتمان—تطوير أنظمة قابلة للدفاع أمام التدقيق.',
      audience: 'مسؤولو الامتثال، مديرو المخاطر، المدققون الداخليون',
      duration: '٥-٧ أيام',
      format: 'حضوري / هجين',
      programs: [
        'تصميم وتنفيذ إطار مكافحة غسل الأموال',
        'فحص العقوبات وحوكمة الاستثناءات',
        'إدارة مخاطر الائتمان ومعيار IFRS-9',
        'المخاطر التشغيلية ومصفوفات الضوابط',
        'التحضير لشهادة مدير امتثال معتمد'
      ],
      outcomes: [
        'أطر امتثال جاهزة للجهات الرقابية',
        'أنظمة ضوابط مبنية على الأدلة',
        'توثيق شهية المخاطر',
        'انضباط مسارات التدقيق'
      ],
      color: 'from-red-600 to-red-800'
    },
    {
      id: 'banking-operations',
      icon: Building2,
      title: 'العمليات المصرفية والتحول',
      subtitle: 'من التمويل الأصغر إلى الجاهزية المصرفية',
      description: 'التنقل في التحول المؤسسي بثقة. إتقان إعادة هندسة العمليات وتصميم النموذج التشغيلي والارتقاء بالحوكمة المطلوبة للتقدم التنظيمي.',
      audience: 'مديرو العمليات، مديرو الفروع، قادة التحول',
      duration: '٥-١٠ أيام',
      format: 'حضوري',
      programs: [
        'خارطة طريق التحول المؤسسي',
        'إعادة هندسة العمليات للبنوك',
        'تصميم النموذج التشغيلي (المركز مقابل الفروع)',
        'تحديث محفظة المنتجات',
        'فصل المهام وضوابط Maker/Checker'
      ],
      outcomes: [
        'قدرة حوكمة التحول',
        'خبرة تحسين العمليات',
        'تصميم هيكل اللجان',
        'نماذج تشغيلية قابلة للتوسع'
      ],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'finance-treasury',
      icon: TrendingUp,
      title: 'حوكمة المالية والخزينة',
      subtitle: 'سياسات الاستثمار وتقارير مجلس الإدارة',
      description: 'بناء وظائف الخزينة والاستثمار التي تصمد أمام مجالس الإدارة والجهات الرقابية. إتقان تصميم سياسات الاستثمار وحوكمة المحافظ والتقارير الجاهزة لمجلس الإدارة.',
      audience: 'المديرون الماليون، مديرو الخزينة، مسؤولو الاستثمار',
      duration: '٣-٥ أيام',
      format: 'حضوري / عن بُعد',
      programs: [
        'تصميم بيان سياسة الاستثمار (IPS)',
        'حوكمة لجنة الخزينة',
        'هيكلة المحفظة وحدود المخاطر',
        'فحص الاستثمار الشرعي',
        'التقارير المالية الجاهزة لمجلس الإدارة'
      ],
      outcomes: [
        'حوكمة خزينة آمنة للجان',
        'توثيق تفويضات الاستثمار',
        'أطر تقارير الأداء',
        'انضباط إدارة السيولة'
      ],
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'technology-digital',
      icon: Monitor,
      title: 'التكنولوجيا والخدمات المصرفية الرقمية',
      subtitle: 'الأنظمة الأساسية والأمن السيبراني',
      description: 'قيادة التحول الرقمي بانضباط حوكمي. من اختيار النظام المصرفي الأساسي إلى أطر الأمن السيبراني—بناء قدرات تقنية تدعم النمو المؤسسي.',
      audience: 'مديرو تقنية المعلومات، قادة التحول الرقمي',
      duration: '٥-٧ أيام',
      format: 'حضوري / عن بُعد',
      programs: [
        'حوكمة التحول الرقمي',
        'اختيار النظام المصرفي الأساسي (RFP/الموردين)',
        'الأمن السيبراني للمؤسسات المالية',
        'حوكمة تقنية المعلومات (ITIL/COBIT)',
        'تحليلات البيانات وذكاء الأعمال'
      ],
      outcomes: [
        'أطر حوكمة التكنولوجيا',
        'انضباط اختيار الموردين',
        'الجاهزية للأمن السيبراني',
        'مسارات التدقيق الرقمي'
      ],
      color: 'from-cyan-600 to-cyan-800'
    },
    {
      id: 'human-capital',
      icon: UserCog,
      title: 'رأس المال البشري والقيادة',
      subtitle: 'التميز في الموارد البشرية للمؤسسات المالية',
      description: 'تطوير قدرات الموارد البشرية المصممة للمؤسسات المالية الخاضعة للرقابة. من استقطاب المواهب إلى إدارة الأداء—بناء أنظمة بشرية تدعم التميز المؤسسي.',
      audience: 'مديرو الموارد البشرية، مديرو التدريب، التطوير التنظيمي',
      duration: '٣-٥ أيام',
      format: 'حضوري / عن بُعد',
      programs: [
        'التحضير لشهادة SHRM-CP/SHRM-SCP',
        'الموارد البشرية للمؤسسات المالية',
        'أنظمة إدارة الأداء',
        'تقييم الاحتياجات التدريبية والعائد على الاستثمار',
        'التطوير والتصميم التنظيمي'
      ],
      outcomes: [
        'أطر حوكمة الموارد البشرية',
        'أنظمة قائمة على الجدارات',
        'قياس أثر التدريب',
        'قدرة تخطيط التعاقب'
      ],
      color: 'from-pink-600 to-pink-800'
    },
    {
      id: 'audit-assurance',
      icon: ClipboardCheck,
      title: 'التدقيق والتأكيد',
      subtitle: 'CIA وCISA وانضباط الأدلة',
      description: 'بناء قدرات التدقيق الداخلي التي توفر التأكيد لمجالس الإدارة والجهات الرقابية. إتقان التدقيق المبني على الأدلة وتدقيق تقنية المعلومات وانضباط التوثيق المطلوب للمصداقية.',
      audience: 'المدققون الداخليون، مدققو تقنية المعلومات، أعضاء لجنة التدقيق',
      duration: '٥-١٠ أيام',
      format: 'حضوري / عن بُعد',
      programs: [
        'التحضير لشهادة CIA',
        'التحضير لشهادة CISA (تدقيق تقنية المعلومات)',
        'التدقيق الداخلي المبني على الأدلة',
        'العلاقات مع لجنة التدقيق',
        'التخطيط للتدقيق المبني على المخاطر'
      ],
      outcomes: [
        'الجاهزية للشهادات',
        'إتقان انضباط الأدلة',
        'التميز في تقارير التدقيق',
        'مهارات العرض أمام اللجان'
      ],
      color: 'from-slate-600 to-slate-800'
    }
  ]
};

const deliveryFormats = {
  en: [
    { icon: Building2, title: 'In-House Programs', description: 'Customized training delivered at your institution, tailored to your specific context, systems, and governance requirements.' },
    { icon: Globe, title: 'Open Enrollment', description: 'Join executives from peer institutions in structured programs at our regional training centers.' },
    { icon: Monitor, title: 'Virtual Delivery', description: 'Live, instructor-led sessions with interactive workshops, case studies, and real-time Q&A.' },
    { icon: Briefcase, title: 'Executive Retreats', description: 'Intensive multi-day programs for senior leadership teams, combining learning with strategic planning.' }
  ],
  ar: [
    { icon: Building2, title: 'البرامج الداخلية', description: 'تدريب مخصص يُقدم في مؤسستك، مصمم وفق سياقكم وأنظمتكم ومتطلبات الحوكمة الخاصة بكم.' },
    { icon: Globe, title: 'التسجيل المفتوح', description: 'انضم إلى تنفيذيين من مؤسسات مماثلة في برامج منظمة بمراكزنا التدريبية الإقليمية.' },
    { icon: Monitor, title: 'التقديم الافتراضي', description: 'جلسات حية بقيادة مدربين مع ورش عمل تفاعلية ودراسات حالة وأسئلة وأجوبة فورية.' },
    { icon: Briefcase, title: 'الخلوات التنفيذية', description: 'برامج مكثفة متعددة الأيام لفرق القيادة العليا، تجمع بين التعلم والتخطيط الاستراتيجي.' }
  ]
};

const stats = {
  en: [
    { value: '8', label: 'Specialized Tracks' },
    { value: '40+', label: 'Training Programs' },
    { value: 'MENA', label: 'Regional Focus' },
    { value: 'IFC', label: 'Certified Programs' }
  ],
  ar: [
    { value: '٨', label: 'مسارات متخصصة' },
    { value: '+٤٠', label: 'برنامج تدريبي' },
    { value: 'الشرق الأوسط', label: 'التركيز الإقليمي' },
    { value: 'IFC', label: 'برامج معتمدة' }
  ]
};

export default function Academy() {
  const { language, isRTL } = useLanguage();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const tracks = trainingTracks[language];
  const formats = deliveryFormats[language];
  const statsData = stats[language];

  const content = {
    en: {
      badge: 'Executive Education',
      title: 'CauseWay Academy',
      subtitle: 'Building Institutional Excellence Through Capability',
      description: 'World-class executive training designed for financial institutions operating in complex, compliance-intensive environments. Our programs build the governance, technical, and leadership capabilities that boards and regulators expect.',
      cta: 'Request Program Catalog',
      ctaSecondary: 'Schedule Consultation',
      tracksTitle: 'Executive Training Tracks',
      tracksSubtitle: 'Specialized programs aligned with CauseWay\'s core practice areas',
      viewPrograms: 'View Programs',
      hidePrograms: 'Hide Programs',
      programs: 'Programs',
      outcomes: 'Learning Outcomes',
      audience: 'Target Audience',
      duration: 'Duration',
      format: 'Format',
      deliveryTitle: 'Delivery Formats',
      deliverySubtitle: 'Flexible options to meet your institutional needs',
      whyTitle: 'Why CauseWay Academy',
      whySubtitle: 'What sets our executive education apart',
      whyPoints: [
        { title: 'Practitioner-Led', description: 'Our faculty are active consultants who bring real-world experience from current engagements with banks and financial institutions.' },
        { title: 'Governance-Grade', description: 'Every program is designed to produce outcomes that satisfy board scrutiny, regulatory review, and audit requirements.' },
        { title: 'Context-Aware', description: 'We understand the unique challenges of operating in fragile, compliance-intensive markets—our content reflects this reality.' },
        { title: 'Evidence-Based', description: 'Participants leave with templates, frameworks, and documentation standards they can implement immediately.' }
      ],
      inquiryTitle: 'Ready to Build Capability?',
      inquirySubtitle: 'Contact us to discuss your institution\'s training needs',
      inquiryButton: 'Request Information',
      certifications: 'Certification Preparation',
      certificationsDesc: 'We prepare candidates for internationally recognized certifications including CIA, CISA, CPA, CMA, SHRM, and IFC Board Director programs.'
    },
    ar: {
      badge: 'التعليم التنفيذي',
      title: 'أكاديمية كوزواي',
      subtitle: 'بناء التميز المؤسسي من خلال القدرات',
      description: 'تدريب تنفيذي عالمي المستوى مصمم للمؤسسات المالية العاملة في بيئات معقدة وعالية الامتثال. برامجنا تبني قدرات الحوكمة والتقنية والقيادة التي تتوقعها مجالس الإدارة والجهات الرقابية.',
      cta: 'طلب كتالوج البرامج',
      ctaSecondary: 'جدولة استشارة',
      tracksTitle: 'مسارات التدريب التنفيذي',
      tracksSubtitle: 'برامج متخصصة متوافقة مع مجالات ممارسة كوزواي الأساسية',
      viewPrograms: 'عرض البرامج',
      hidePrograms: 'إخفاء البرامج',
      programs: 'البرامج',
      outcomes: 'مخرجات التعلم',
      audience: 'الفئة المستهدفة',
      duration: 'المدة',
      format: 'الصيغة',
      deliveryTitle: 'صيغ التقديم',
      deliverySubtitle: 'خيارات مرنة لتلبية احتياجات مؤسستك',
      whyTitle: 'لماذا أكاديمية كوزواي',
      whySubtitle: 'ما يميز تعليمنا التنفيذي',
      whyPoints: [
        { title: 'بقيادة ممارسين', description: 'أعضاء هيئتنا التدريسية مستشارون نشطون يجلبون خبرة واقعية من مشاريع حالية مع البنوك والمؤسسات المالية.' },
        { title: 'بمستوى الحوكمة', description: 'كل برنامج مصمم لإنتاج مخرجات ترضي تدقيق مجلس الإدارة والمراجعة التنظيمية ومتطلبات التدقيق.' },
        { title: 'واعٍ بالسياق', description: 'نفهم التحديات الفريدة للعمل في أسواق هشة وعالية الامتثال—محتوانا يعكس هذا الواقع.' },
        { title: 'مبني على الأدلة', description: 'يغادر المشاركون بقوالب وأطر ومعايير توثيق يمكنهم تطبيقها فوراً.' }
      ],
      inquiryTitle: 'مستعد لبناء القدرات؟',
      inquirySubtitle: 'تواصل معنا لمناقشة احتياجات مؤسستك التدريبية',
      inquiryButton: 'طلب معلومات',
      certifications: 'التحضير للشهادات',
      certificationsDesc: 'نُعد المرشحين للشهادات المعترف بها دولياً بما في ذلك CIA وCISA وCPA وCMA وSHRM وبرامج عضو مجلس إدارة IFC.'
    }
  };

  const t = content[language];

  return (
    <div className={`min-h-screen bg-[#fafaf8] ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section - Premium McKinsey-style */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2f] via-[#1e4d3d] to-[#1a3a2f]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#c9a227]/30" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#c9a227]/30" />
        
        <div className="container relative z-10 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a227]/20 text-[#c9a227] rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              {t.badge}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">{t.title}</h1>
            <p className="text-2xl md:text-3xl text-[#c9a227] font-light mb-6">{t.subtitle}</p>
            <p className="text-lg text-white/80 max-w-2xl mb-10 leading-relaxed">{t.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#c9a227] hover:bg-[#b8922a] text-[#1a3a2f] font-medium px-8 py-6 text-lg">
                {t.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                {t.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-light text-[#1a3a2f] mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Tracks */}
      <section className="py-20 bg-[#fafaf8]">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#1a3a2f] mb-4">{t.tracksTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.tracksSubtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, index) => (
              <motion.div key={track.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group">
                <div 
                  className={`relative h-full bg-white rounded-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#c9a227]/30 cursor-pointer ${selectedTrack === track.id ? 'ring-2 ring-[#c9a227]' : ''}`}
                  onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                >
                  <div className={`bg-gradient-to-r ${track.color} p-6 text-white`}>
                    <track.icon className="w-10 h-10 mb-4 opacity-90" />
                    <h3 className="text-xl font-medium mb-1">{track.title}</h3>
                    <p className="text-sm opacity-80">{track.subtitle}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{track.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {track.duration}
                      </span>
                      <button className="text-[#1a3a2f] font-medium flex items-center gap-1 group-hover:text-[#c9a227] transition-colors">
                        {selectedTrack === track.id ? t.hidePrograms : t.viewPrograms}
                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedTrack === track.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expanded Track Details */}
          <AnimatePresence>
            {selectedTrack && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-8 overflow-hidden">
                {tracks.filter(t => t.id === selectedTrack).map(track => (
                  <div key={track.id} className="bg-white rounded-lg border border-gray-100 p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div>
                        <h4 className="text-lg font-medium text-[#1a3a2f] mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[#c9a227]" />
                          {t.programs}
                        </h4>
                        <ul className="space-y-2">
                          {track.programs.map((program, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <CheckCircle2 className="w-4 h-4 text-[#c9a227] mt-1 flex-shrink-0" />
                              <span className="text-sm">{program}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-[#1a3a2f] mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-[#c9a227]" />
                          {t.outcomes}
                        </h4>
                        <ul className="space-y-2">
                          {track.outcomes.map((outcome, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                              <ArrowRight className={`w-4 h-4 text-[#c9a227] mt-1 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                              <span className="text-sm">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{t.audience}</h4>
                          <p className="text-gray-700">{track.audience}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{t.duration}</h4>
                          <p className="text-gray-700">{track.duration}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{t.format}</h4>
                          <p className="text-gray-700">{track.format}</p>
                        </div>
                        <Button className="w-full bg-[#1a3a2f] hover:bg-[#2a4a3f] mt-4">{t.cta}</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Delivery Formats */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#1a3a2f] mb-4">{t.deliveryTitle}</h2>
            <p className="text-lg text-gray-600">{t.deliverySubtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {formats.map((format, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center p-8 rounded-lg bg-[#fafaf8] hover:bg-[#f5f5f3] transition-colors">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a3a2f]/10 flex items-center justify-center">
                  <format.icon className="w-8 h-8 text-[#1a3a2f]" />
                </div>
                <h3 className="text-xl font-medium text-[#1a3a2f] mb-3">{format.title}</h3>
                <p className="text-gray-600 text-sm">{format.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CauseWay Academy */}
      <section className="py-20 bg-[#1a3a2f]">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">{t.whyTitle}</h2>
            <p className="text-lg text-white/70">{t.whySubtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyPoints.map((point, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative">
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-[#c9a227]/30" />
                <div className="pt-8 pl-8">
                  <h3 className="text-xl font-medium text-[#c9a227] mb-3">{point.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 p-8 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-start gap-4">
              <Award className="w-12 h-12 text-[#c9a227] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-medium text-white mb-2">{t.certifications}</h3>
                <p className="text-white/70">{t.certificationsDesc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#fafaf8]">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-light text-[#1a3a2f] mb-4">{t.inquiryTitle}</h2>
            <p className="text-lg text-gray-600 mb-8">{t.inquirySubtitle}</p>
            <Link href="/contact">
              <Button size="lg" className="bg-[#c9a227] hover:bg-[#b8922a] text-[#1a3a2f] font-medium px-12 py-6 text-lg">
                {t.inquiryButton}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
