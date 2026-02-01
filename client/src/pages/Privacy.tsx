/**
 * CauseWay Privacy Policy Page
 * Design: Institutional Arabesque Modernism
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 * Standards: GDPR, CCPA, International Privacy Best Practices
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Users, 
  Globe, 
  Mail,
  ChevronRight,
  ChevronDown,
  Calendar,
  Printer,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface Section {
  id: string;
  title: string;
  titleAr: string;
  icon: React.ElementType;
  content: string[];
  contentAr: string[];
}

const sections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    titleAr: 'مقدمة',
    icon: FileText,
    content: [
      'CauseWay Group ("CauseWay", "we", "us", or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in any way.',
      'We operate in accordance with international privacy standards, including the General Data Protection Regulation (GDPR), and applicable local laws in the jurisdictions where we operate, including the Republic of Yemen and the broader MENA region.',
      'By accessing our website or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.'
    ],
    contentAr: [
      'تلتزم مجموعة كوزواي ("كوزواي" أو "نحن" أو "لنا") بحماية خصوصيتك وضمان أمان معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها والإفصاح عنها وحمايتها عند زيارة موقعنا الإلكتروني أو استخدام خدماتنا أو التفاعل معنا بأي شكل.',
      'نعمل وفقًا للمعايير الدولية للخصوصية، بما في ذلك اللائحة العامة لحماية البيانات (GDPR)، والقوانين المحلية المعمول بها في الولايات القضائية التي نعمل فيها، بما في ذلك الجمهورية اليمنية ومنطقة الشرق الأوسط وشمال أفريقيا.',
      'بالوصول إلى موقعنا الإلكتروني أو استخدام خدماتنا، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بسياسة الخصوصية هذه. إذا كنت لا توافق على سياساتنا وممارساتنا، يرجى عدم استخدام خدماتنا.'
    ]
  },
  {
    id: 'information-collected',
    title: 'Information We Collect',
    titleAr: 'المعلومات التي نجمعها',
    icon: Eye,
    content: [
      '**Personal Information**: When you contact us, apply for a position, or engage our services, we may collect personal information including your name, email address, phone number, organization name, job title, and professional background.',
      '**Technical Information**: We automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.',
      '**Cookies and Tracking Technologies**: We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser.',
      '**Communication Data**: We retain records of correspondence when you contact us via email, contact forms, or other communication channels.',
      '**YETO Observatory Data**: If you subscribe to or use the Yemen Economic Transparency Observatory (YETO), we collect subscription preferences and usage analytics to improve the platform.'
    ],
    contentAr: [
      '**المعلومات الشخصية**: عندما تتواصل معنا أو تتقدم لوظيفة أو تستخدم خدماتنا، قد نجمع معلومات شخصية تشمل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك واسم مؤسستك والمسمى الوظيفي والخلفية المهنية.',
      '**المعلومات التقنية**: نجمع تلقائيًا معلومات تقنية معينة عند زيارتك لموقعنا، بما في ذلك عنوان IP ونوع المتصفح ونظام التشغيل وعناوين URL المُحيلة ومعلومات حول كيفية تفاعلك مع موقعنا.',
      '**ملفات تعريف الارتباط وتقنيات التتبع**: نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتحسين تجربة التصفح وتحليل حركة المرور على الموقع وفهم تفضيلات المستخدم. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.',
      '**بيانات الاتصال**: نحتفظ بسجلات المراسلات عندما تتواصل معنا عبر البريد الإلكتروني أو نماذج الاتصال أو قنوات الاتصال الأخرى.',
      '**بيانات مرصد يتو**: إذا اشتركت في المرصد اليمني للشفافية الاقتصادية (يتو) أو استخدمته، فإننا نجمع تفضيلات الاشتراك وتحليلات الاستخدام لتحسين المنصة.'
    ]
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    titleAr: 'كيف نستخدم معلوماتك',
    icon: Users,
    content: [
      '**Service Delivery**: To provide, maintain, and improve our consulting services, respond to inquiries, and fulfill contractual obligations.',
      '**Communication**: To send you relevant updates, newsletters, and information about our services, events, and publications (with your consent where required).',
      '**Recruitment**: To process job applications and evaluate candidates for positions at CauseWay.',
      '**Analytics and Improvement**: To analyze website usage, understand user preferences, and enhance our digital platforms and service offerings.',
      '**Legal Compliance**: To comply with applicable laws, regulations, and legal processes, and to protect our rights and the rights of others.',
      '**Security**: To detect, prevent, and address fraud, security breaches, and other potentially prohibited or illegal activities.'
    ],
    contentAr: [
      '**تقديم الخدمات**: لتقديم خدماتنا الاستشارية وصيانتها وتحسينها، والرد على الاستفسارات، والوفاء بالالتزامات التعاقدية.',
      '**التواصل**: لإرسال التحديثات ذات الصلة والنشرات الإخبارية والمعلومات حول خدماتنا وفعالياتنا ومنشوراتنا (بموافقتك عند الاقتضاء).',
      '**التوظيف**: لمعالجة طلبات التوظيف وتقييم المرشحين للوظائف في كوزواي.',
      '**التحليلات والتحسين**: لتحليل استخدام الموقع وفهم تفضيلات المستخدم وتحسين منصاتنا الرقمية وعروض خدماتنا.',
      '**الامتثال القانوني**: للامتثال للقوانين واللوائح والإجراءات القانونية المعمول بها، ولحماية حقوقنا وحقوق الآخرين.',
      '**الأمان**: للكشف عن الاحتيال والانتهاكات الأمنية والأنشطة الأخرى المحتملة المحظورة أو غير القانونية ومنعها ومعالجتها.'
    ]
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing and Disclosure',
    titleAr: 'مشاركة البيانات والإفصاح عنها',
    icon: Globe,
    content: [
      '**We do not sell your personal information.** We may share your information only in the following circumstances:',
      '**Service Providers**: With trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, subject to confidentiality agreements.',
      '**Legal Requirements**: When required by law, subpoena, court order, or other legal process, or to protect our rights, property, or safety, or that of our users or others.',
      '**Business Transfers**: In connection with any merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction.',
      '**With Your Consent**: We may share your information with third parties when you have given us explicit consent to do so.',
      '**Aggregated Data**: We may share aggregated, anonymized data that cannot reasonably be used to identify you for research, analysis, or business purposes.'
    ],
    contentAr: [
      '**نحن لا نبيع معلوماتك الشخصية.** قد نشارك معلوماتك فقط في الظروف التالية:',
      '**مزودو الخدمات**: مع مزودي خدمات طرف ثالث موثوقين يساعدوننا في تشغيل موقعنا أو إدارة أعمالنا أو خدمتك، وفقًا لاتفاقيات السرية.',
      '**المتطلبات القانونية**: عندما يتطلب القانون أو أمر استدعاء أو أمر محكمة أو إجراء قانوني آخر، أو لحماية حقوقنا أو ممتلكاتنا أو سلامتنا، أو سلامة مستخدمينا أو الآخرين.',
      '**نقل الأعمال**: فيما يتعلق بأي اندماج أو استحواذ أو إعادة تنظيم أو بيع أصول، قد يتم نقل معلوماتك كجزء من تلك المعاملة.',
      '**بموافقتك**: قد نشارك معلوماتك مع أطراف ثالثة عندما تمنحنا موافقة صريحة للقيام بذلك.',
      '**البيانات المجمعة**: قد نشارك بيانات مجمعة ومجهولة الهوية لا يمكن استخدامها بشكل معقول لتحديد هويتك لأغراض البحث أو التحليل أو الأعمال.'
    ]
  },
  {
    id: 'data-security',
    title: 'Data Security',
    titleAr: 'أمان البيانات',
    icon: Lock,
    content: [
      'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:',
      '• Encryption of data in transit and at rest using industry-standard protocols',
      '• Regular security assessments and vulnerability testing',
      '• Access controls and authentication mechanisms',
      '• Employee training on data protection and security practices',
      '• Incident response procedures for potential data breaches',
      'While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest practical standards.'
    ],
    contentAr: [
      'نطبق تدابير أمنية تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو التدمير. تشمل هذه التدابير:',
      '• تشفير البيانات أثناء النقل وفي حالة السكون باستخدام بروتوكولات معيارية في الصناعة',
      '• تقييمات أمنية منتظمة واختبار الثغرات',
      '• ضوابط الوصول وآليات المصادقة',
      '• تدريب الموظفين على ممارسات حماية البيانات والأمان',
      '• إجراءات الاستجابة للحوادث لانتهاكات البيانات المحتملة',
      'بينما نسعى جاهدين لحماية معلوماتك الشخصية، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%. لا يمكننا ضمان الأمان المطلق ولكننا ملتزمون بالحفاظ على أعلى المعايير العملية.'
    ]
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    titleAr: 'حقوقك',
    icon: Shield,
    content: [
      'Depending on your location and applicable laws, you may have the following rights regarding your personal information:',
      '**Right to Access**: You have the right to request a copy of the personal information we hold about you.',
      '**Right to Rectification**: You have the right to request correction of inaccurate or incomplete personal information.',
      '**Right to Erasure**: You have the right to request deletion of your personal information under certain circumstances.',
      '**Right to Restrict Processing**: You have the right to request that we limit how we use your personal information.',
      '**Right to Data Portability**: You have the right to receive your personal information in a structured, commonly used, machine-readable format.',
      '**Right to Object**: You have the right to object to certain processing of your personal information, including direct marketing.',
      '**Right to Withdraw Consent**: Where processing is based on consent, you have the right to withdraw that consent at any time.',
      'To exercise any of these rights, please contact us using the information provided in the Contact section below.'
    ],
    contentAr: [
      'اعتمادًا على موقعك والقوانين المعمول بها، قد تتمتع بالحقوق التالية فيما يتعلق بمعلوماتك الشخصية:',
      '**حق الوصول**: لديك الحق في طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك.',
      '**حق التصحيح**: لديك الحق في طلب تصحيح المعلومات الشخصية غير الدقيقة أو غير المكتملة.',
      '**حق المحو**: لديك الحق في طلب حذف معلوماتك الشخصية في ظروف معينة.',
      '**حق تقييد المعالجة**: لديك الحق في طلب تقييد كيفية استخدامنا لمعلوماتك الشخصية.',
      '**حق نقل البيانات**: لديك الحق في تلقي معلوماتك الشخصية بتنسيق منظم وشائع الاستخدام وقابل للقراءة آليًا.',
      '**حق الاعتراض**: لديك الحق في الاعتراض على معالجة معينة لمعلوماتك الشخصية، بما في ذلك التسويق المباشر.',
      '**حق سحب الموافقة**: حيث تستند المعالجة إلى الموافقة، لديك الحق في سحب تلك الموافقة في أي وقت.',
      'لممارسة أي من هذه الحقوق، يرجى الاتصال بنا باستخدام المعلومات المقدمة في قسم الاتصال أدناه.'
    ]
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    titleAr: 'الاحتفاظ بالبيانات',
    icon: Calendar,
    content: [
      'We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.',
      'The retention period may vary depending on the context and our legal obligations. Generally:',
      '• Contact form submissions: 2 years from last interaction',
      '• Job applications: 2 years from application date (unless hired)',
      '• Client engagement records: 7 years from end of engagement',
      '• Website analytics data: 26 months',
      '• Newsletter subscriptions: Until you unsubscribe',
      'When personal information is no longer needed, we will securely delete or anonymize it in accordance with our data retention policies.'
    ],
    contentAr: [
      'نحتفظ بمعلوماتك الشخصية فقط طالما كان ذلك ضروريًا لتحقيق الأغراض التي جُمعت من أجلها، بما في ذلك تلبية المتطلبات القانونية أو المحاسبية أو متطلبات الإبلاغ.',
      'قد تختلف فترة الاحتفاظ حسب السياق والتزاماتنا القانونية. بشكل عام:',
      '• نماذج الاتصال المقدمة: سنتان من آخر تفاعل',
      '• طلبات التوظيف: سنتان من تاريخ التقديم (ما لم يتم التوظيف)',
      '• سجلات مشاركة العملاء: 7 سنوات من نهاية المشاركة',
      '• بيانات تحليلات الموقع: 26 شهرًا',
      '• اشتراكات النشرة الإخبارية: حتى إلغاء الاشتراك',
      'عندما لا تعد المعلومات الشخصية مطلوبة، سنحذفها أو نجعلها مجهولة الهوية بشكل آمن وفقًا لسياسات الاحتفاظ بالبيانات لدينا.'
    ]
  },
  {
    id: 'international-transfers',
    title: 'International Data Transfers',
    titleAr: 'نقل البيانات الدولي',
    icon: Globe,
    content: [
      'CauseWay operates primarily in Yemen and the MENA region. Your information may be transferred to and processed in countries other than your country of residence, which may have different data protection laws.',
      'When we transfer personal information internationally, we implement appropriate safeguards to ensure your information receives an adequate level of protection, including:',
      '• Standard contractual clauses approved by relevant authorities',
      '• Binding corporate rules where applicable',
      '• Consent for specific transfers where required',
      'By using our services, you consent to the transfer of your information to countries outside your country of residence, including Yemen, where our primary operations are based.'
    ],
    contentAr: [
      'تعمل كوزواي بشكل أساسي في اليمن ومنطقة الشرق الأوسط وشمال أفريقيا. قد يتم نقل معلوماتك ومعالجتها في بلدان غير بلد إقامتك، والتي قد يكون لها قوانين مختلفة لحماية البيانات.',
      'عندما ننقل المعلومات الشخصية دوليًا، نطبق ضمانات مناسبة لضمان حصول معلوماتك على مستوى كافٍ من الحماية، بما في ذلك:',
      '• البنود التعاقدية القياسية المعتمدة من السلطات ذات الصلة',
      '• القواعد المؤسسية الملزمة حيثما ينطبق ذلك',
      '• الموافقة على عمليات نقل محددة عند الاقتضاء',
      'باستخدام خدماتنا، فإنك توافق على نقل معلوماتك إلى بلدان خارج بلد إقامتك، بما في ذلك اليمن، حيث تقع عملياتنا الأساسية.'
    ]
  },
  {
    id: 'children',
    title: 'Children\'s Privacy',
    titleAr: 'خصوصية الأطفال',
    icon: Users,
    content: [
      'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.',
      'If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information as soon as possible.',
      'If you believe we have collected information from a child, please contact us immediately using the information provided below.'
    ],
    contentAr: [
      'خدماتنا غير موجهة للأفراد الذين تقل أعمارهم عن 18 عامًا. نحن لا نجمع معلومات شخصية من الأطفال عن علم.',
      'إذا علمنا أننا جمعنا معلومات شخصية من طفل دون موافقة الوالدين، سنتخذ خطوات لحذف تلك المعلومات في أقرب وقت ممكن.',
      'إذا كنت تعتقد أننا جمعنا معلومات من طفل، يرجى الاتصال بنا فورًا باستخدام المعلومات المقدمة أدناه.'
    ]
  },
  {
    id: 'updates',
    title: 'Policy Updates',
    titleAr: 'تحديثات السياسة',
    icon: FileText,
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors.',
      'When we make material changes, we will notify you by updating the "Last Updated" date at the top of this policy and, where appropriate, provide additional notice (such as a website banner or email notification).',
      'We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.'
    ],
    contentAr: [
      'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو التقنيات أو المتطلبات القانونية أو عوامل أخرى.',
      'عندما نجري تغييرات جوهرية، سنخطرك عن طريق تحديث تاريخ "آخر تحديث" في أعلى هذه السياسة، وحيثما كان ذلك مناسبًا، نقدم إشعارًا إضافيًا (مثل لافتة على الموقع أو إشعار بالبريد الإلكتروني).',
      'نشجعك على مراجعة سياسة الخصوصية هذه بشكل دوري للبقاء على اطلاع بكيفية حماية معلوماتك.'
    ]
  },
  {
    id: 'contact',
    title: 'Contact Us',
    titleAr: 'اتصل بنا',
    icon: Mail,
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
      '**CauseWay Group**',
      'Crater District, Aden, Republic of Yemen',
      'Email: privacy@causewaygrp.com',
      'Phone: +967 2 236655',
      'For data protection inquiries, you may also contact our Data Protection Officer at: dpo@causewaygrp.com',
      'We will respond to your inquiry within 30 days of receipt.'
    ],
    contentAr: [
      'إذا كانت لديك أي أسئلة أو مخاوف أو طلبات بخصوص سياسة الخصوصية هذه أو ممارسات البيانات لدينا، يرجى الاتصال بنا:',
      '**مجموعة كوزواي**',
      'منطقة كريتر، عدن، الجمهورية اليمنية',
      'البريد الإلكتروني: privacy@causewaygrp.com',
      'الهاتف: +967 2 236655',
      'لاستفسارات حماية البيانات، يمكنك أيضًا الاتصال بمسؤول حماية البيانات لدينا على: dpo@causewaygrp.com',
      'سنرد على استفسارك خلال 30 يومًا من استلامه.'
    ]
  }
];

export default function Privacy() {
  const { language, isRTL } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['introduction']));

  const lastUpdated = 'February 1, 2026';
  const lastUpdatedAr = '1 فبراير 2026';
  const effectiveDate = 'February 1, 2026';
  const effectiveDateAr = '1 فبراير 2026';

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
    setActiveSection(sectionId);
  };

  const handlePrint = () => {
    window.print();
  };

  // Scroll to section when clicking table of contents
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setExpandedSections(prev => new Set([...Array.from(prev), sectionId]));
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-[#133129]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a84b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4a84b]/20 mb-6">
              <Shield className="w-8 h-8 text-[#d4a84b]" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </h1>
            <p className="text-[#faf9f6]/70 text-lg">
              {language === 'ar' 
                ? 'التزامنا بحماية خصوصيتك وأمان بياناتك'
                : 'Our commitment to protecting your privacy and data security'
              }
            </p>
            
            {/* Last Updated & Effective Date */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#faf9f6]/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {language === 'ar' ? 'آخر تحديث: ' : 'Last Updated: '}
                  {language === 'ar' ? lastUpdatedAr : lastUpdated}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>
                  {language === 'ar' ? 'تاريخ السريان: ' : 'Effective: '}
                  {language === 'ar' ? effectiveDateAr : effectiveDate}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="border-[#faf9f6]/30 text-[#faf9f6] hover:bg-[#faf9f6]/10"
              >
                <Printer className="w-4 h-4 mx-2" />
                {language === 'ar' ? 'طباعة' : 'Print'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-xl border border-[#406D61]/10 p-6 shadow-sm">
                <h3 className="font-semibold text-[#133129] mb-4 text-sm uppercase tracking-wider">
                  {language === 'ar' ? 'جدول المحتويات' : 'Table of Contents'}
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        w-full text-start px-3 py-2 rounded-lg text-sm transition-all duration-200
                        flex items-center gap-2
                        ${activeSection === section.id 
                          ? 'bg-[#133129] text-[#faf9f6]' 
                          : 'text-[#406D61] hover:bg-[#406D61]/10 hover:text-[#133129]'
                        }
                      `}
                    >
                      <section.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">
                        {language === 'ar' ? section.titleAr : section.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-[#406D61]/10 shadow-sm overflow-hidden">
                {sections.map((section, index) => (
                  <div 
                    key={section.id}
                    id={section.id}
                    className={`border-b border-[#406D61]/10 last:border-b-0 ${
                      index === 0 ? '' : ''
                    }`}
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#faf9f6]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                          ${expandedSections.has(section.id) 
                            ? 'bg-[#133129] text-[#d4a84b]' 
                            : 'bg-[#406D61]/10 text-[#406D61]'
                          }
                        `}>
                          <section.icon className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-[#133129]" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
                          {language === 'ar' ? section.titleAr : section.title}
                        </h2>
                      </div>
                      <ChevronDown className={`
                        w-5 h-5 text-[#406D61] transition-transform duration-300
                        ${expandedSections.has(section.id) ? 'rotate-180' : ''}
                      `} />
                    </button>

                    {/* Section Content */}
                    {expandedSections.has(section.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className={`${isRTL ? 'pr-13' : 'pl-13'} space-y-4`}>
                          {(language === 'ar' ? section.contentAr : section.content).map((paragraph, pIndex) => (
                            <p 
                              key={pIndex} 
                              className="text-[#406D61] leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: paragraph
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#133129] font-semibold">$1</strong>')
                                  .replace(/• /g, '<span class="text-[#d4a84b] mr-2">•</span>')
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 bg-[#133129] rounded-xl p-8 text-center">
                <h3 className="text-xl font-serif text-[#faf9f6] mb-3" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Playfair Display', Georgia, serif" }}>
                  {language === 'ar' ? 'هل لديك أسئلة حول خصوصيتك؟' : 'Have Questions About Your Privacy?'}
                </h3>
                <p className="text-[#faf9f6]/70 mb-6">
                  {language === 'ar' 
                    ? 'فريقنا جاهز للمساعدة في أي استفسارات تتعلق بحماية البيانات.'
                    : 'Our team is ready to help with any data protection inquiries.'
                  }
                </p>
                <Link href="/contact">
                  <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
                    <Mail className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
