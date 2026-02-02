/**
 * CauseWay Academy Page
 * World-class learning hub with curated free resources from global institutions
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  GraduationCap, BookOpen, Award, Globe, ExternalLink, Clock, Users, Star,
  Building2, Landmark, Shield, Coins, TrendingUp, Smartphone, Calculator,
  FileText, Video, Headphones, Download, ChevronRight, Sparkles, Target,
  CheckCircle2, Play, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

// Learning Tracks - Curated paths for different career goals
const learningTracks = {
  en: [
    {
      id: 'islamic-finance',
      title: 'Islamic Finance Professional',
      description: 'Master Sharia-compliant financial products and AAOIFI standards',
      icon: Landmark,
      duration: '40+ hours',
      courses: 8,
      level: 'Beginner to Advanced',
      color: 'from-emerald-600 to-teal-700',
      featured: true,
      resources: [
        { name: 'Marifa Academy - Full Course Library', provider: 'Marifa Academy', url: 'https://www.marifaacademy.com/', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'Islamic Finance for SDGs', provider: 'IsDB via edX', url: 'https://www.edx.org/learn/sustainable-development/islamic-development-bank-institute-islamic-finance-for-the-sustainable-development-goals', type: 'course', language: 'en', free: true, certificate: false },
        { name: '7-Day Accelerated Course', provider: 'Ethica Institute', url: 'https://www.ethica.institute/free-islamic-banking-finance-course.aspx', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Global Islamic Finance & Banking', provider: 'Alison', url: 'https://alison.com/course/global-islamic-finance-and-banking', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'AAOIFI Standards Library', provider: 'AAOIFI', url: 'https://aaoifi.com/', type: 'reference', language: 'en', free: false, certificate: false },
      ]
    },
    {
      id: 'aml-compliance',
      title: 'AML & Compliance Specialist',
      description: 'FATF recommendations, KYC, sanctions screening, and financial crime prevention',
      icon: Shield,
      duration: '35+ hours',
      courses: 7,
      level: 'Intermediate',
      color: 'from-blue-600 to-indigo-700',
      featured: true,
      resources: [
        { name: 'UNODC Anti-Corruption e-Learning', provider: 'United Nations', url: 'https://www.unodc.org/corruption/en/learn/e-learning-courses.html', type: 'course', language: 'both', free: true, certificate: true },
        { name: 'Basel LEARN Platform', provider: 'Basel Institute', url: 'https://learn.baselgovernance.org/', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'FATF Academy', provider: 'FATF', url: 'https://www.fatf-gafi.org/en/pages/FATF-academy.html', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'مكافحة غسل الأموال', provider: 'Alfaisal via Coursera', url: 'https://www.coursera.org/learn/anti-money-laundering', type: 'course', language: 'ar', free: true, certificate: false },
        { name: 'AML Training with Certificate', provider: 'KYC Lookup', url: 'https://www.kyclookup.com/knowledgebase/how-to-obtain-a-free-aml-certification/', type: 'course', language: 'en', free: true, certificate: true },
      ]
    },
    {
      id: 'financial-literacy',
      title: 'Financial Literacy Educator',
      description: 'Personal finance, budgeting, savings, and investment fundamentals',
      icon: Coins,
      duration: '25+ hours',
      courses: 6,
      level: 'Beginner',
      color: 'from-amber-600 to-orange-700',
      featured: false,
      resources: [
        { name: 'Financial Literacy Complete Course', provider: 'Khan Academy', url: 'https://www.khanacademy.org/college-careers-more/financial-literacy', type: 'course', language: 'both', free: true, certificate: false },
        { name: 'الثقافة المالية', provider: 'Alfaisal via Coursera', url: 'https://www.coursera.org/learn/financial-literacy', type: 'course', language: 'ar', free: true, certificate: false },
        { name: 'مهارات مالية أساسية', provider: 'Edraak', url: 'https://www.edraak.org/en/specialization/fundamental-financial-skills-specialization/', type: 'course', language: 'ar', free: true, certificate: true },
        { name: 'Financial Literacy', provider: 'Al Ghurair Foundation', url: 'https://www.for9a.com/en/courses/Free-Online-Course-in-Financial-Literacy-from-Abdulla-Al-Ghurair-Foundation-for-Education', type: 'course', language: 'both', free: true, certificate: true },
        { name: 'Intuit Financial Education', provider: 'Intuit', url: 'https://www.intuit.com/solutions/education/', type: 'tool', language: 'en', free: true, certificate: false },
      ]
    },
    {
      id: 'governance-risk',
      title: 'Governance & Risk Manager',
      description: 'Basel framework, board governance, internal controls, and audit',
      icon: Building2,
      duration: '45+ hours',
      courses: 9,
      level: 'Advanced',
      color: 'from-purple-600 to-violet-700',
      featured: false,
      resources: [
        { name: 'Basel LEARN Governance Courses', provider: 'Basel Institute', url: 'https://learn.baselgovernance.org/', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'Corporate Governance', provider: 'Coursera', url: 'https://www.coursera.org/learn/corporate-governance-1', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Introduction to Risk Management', provider: 'NYIF via edX', url: 'https://www.edx.org/learn/economics/new-york-institute-of-finance-introduction-to-risk-management', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Basel I to III Implementation', provider: 'IMF', url: 'https://www.imf.org/en/publications/wp/issues/2019/06/14/from-basel-i-to-basel-iii-sequencing-implementation-in-developing-economies-46895', type: 'reference', language: 'en', free: true, certificate: false },
        { name: 'World Bank Corporate Governance', provider: 'World Bank', url: 'https://www.worldbank.org/en/topic/financialsector/brief/corporate-governance', type: 'reference', language: 'en', free: true, certificate: false },
      ]
    },
    {
      id: 'central-banking',
      title: 'Central Banking & Monetary Policy',
      description: 'Monetary economics, inflation, exchange rates, and financial stability',
      icon: Landmark,
      duration: '30+ hours',
      courses: 6,
      level: 'Intermediate to Advanced',
      color: 'from-slate-600 to-gray-700',
      featured: false,
      resources: [
        { name: 'Central Banks and Monetary Policy', provider: 'UIUC via Coursera', url: 'https://www.coursera.org/learn/central-banks-monetary-policies', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'النظام النقدي', provider: 'Alfaisal via Coursera', url: 'https://www.coursera.org/learn/monetary-system', type: 'course', language: 'ar', free: true, certificate: false },
        { name: 'Money, Banking & Central Banks', provider: 'Khan Academy', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking', type: 'course', language: 'both', free: true, certificate: false },
        { name: 'Monetary Policy Analysis', provider: 'IMF via edX', url: 'https://www.edx.org/learn/finance/the-international-monetary-fund-monetary-policy-analysis-and-forecasting', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Govern the Bank Simulator', provider: 'Central Bank Simulation', url: 'https://governthebank.com/', type: 'tool', language: 'en', free: true, certificate: false },
      ]
    },
    {
      id: 'digital-fintech',
      title: 'Digital Banking & Fintech',
      description: 'Mobile banking, blockchain, digital payments, and cybersecurity',
      icon: Smartphone,
      duration: '35+ hours',
      courses: 7,
      level: 'Beginner to Intermediate',
      color: 'from-cyan-600 to-sky-700',
      featured: false,
      resources: [
        { name: 'Fundamentals of Digital Banking', provider: 'Great Learning', url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/fundamentals-of-digital-banking', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'Fintech Foundations', provider: 'UPenn via Coursera', url: 'https://www.coursera.org/specializations/fintech-foundations-applications-financial-technology', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Fintech Innovations', provider: 'UMich via Coursera', url: 'https://www.coursera.org/specializations/financial-technology-innovations', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'FinTech Applications', provider: 'Alison', url: 'https://alison.com/course/fintech-applications-and-future-prospects', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'التكنولوجيا المالية للأعمال', provider: 'Edraak', url: 'https://www.edraak.org/en/programs/course/capitalbank-3-v3/', type: 'course', language: 'ar', free: true, certificate: true },
      ]
    },
    {
      id: 'microfinance',
      title: 'Microfinance & Financial Inclusion',
      description: 'Impact investing, social finance, and MFI operations',
      icon: TrendingUp,
      duration: '25+ hours',
      courses: 5,
      level: 'Intermediate',
      color: 'from-green-600 to-emerald-700',
      featured: false,
      resources: [
        { name: 'مهارات إدارة الأموال بنجاح', provider: 'Edraak', url: 'https://www.edraak.org/programs/course/finlit-v2020/', type: 'course', language: 'ar', free: true, certificate: true },
        { name: 'Financial Inclusion (Digital)', provider: 'IDB via Coursera', url: 'https://www.coursera.org/learn/perspectives-in-digital-transformation-financial-inclusion', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Systemic Approach to Financial Inclusion', provider: 'World Bank', url: 'https://www.worldbank.org/en/olc/course/31634', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Challenges of Global Poverty', provider: 'MIT via edX', url: 'https://www.edx.org/learn/poverty/massachusetts-institute-of-technology-the-challenges-of-global-poverty', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Yemen Microfinance Academy', provider: 'Yemen MF Network', url: 'https://yemennetwork.academy/', type: 'course', language: 'both', free: true, certificate: false },
      ]
    },
    {
      id: 'development-finance',
      title: 'Development Finance & Impact',
      description: 'DFI operations, blended finance, SDGs, and climate finance',
      icon: Globe,
      duration: '30+ hours',
      courses: 6,
      level: 'Intermediate to Advanced',
      color: 'from-teal-600 to-green-700',
      featured: false,
      resources: [
        { name: 'SDG Academy Courses', provider: 'UN SDSN', url: 'https://sdgacademy.org/', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Climate Finance', provider: 'World Bank', url: 'https://olc.worldbank.org/content/climate-finance', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'Blended Finance', provider: 'Convergence', url: 'https://www.convergence.finance/knowledge', type: 'reference', language: 'en', free: true, certificate: false },
        { name: 'Impact Measurement', provider: 'GIIN', url: 'https://thegiin.org/research/', type: 'reference', language: 'en', free: true, certificate: false },
        { name: 'UN SDG Learn', provider: 'United Nations', url: 'https://www.unsdglearn.org/', type: 'course', language: 'both', free: true, certificate: true },
      ]
    },
  ],
  ar: [
    {
      id: 'islamic-finance',
      title: 'محترف التمويل الإسلامي',
      description: 'إتقان المنتجات المالية المتوافقة مع الشريعة ومعايير أيوفي',
      icon: Landmark,
      duration: '+40 ساعة',
      courses: 8,
      level: 'مبتدئ إلى متقدم',
      color: 'from-emerald-600 to-teal-700',
      featured: true,
      resources: [
        { name: 'مكتبة دورات معرفة الكاملة', provider: 'أكاديمية معرفة', url: 'https://www.marifaacademy.com/', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'التمويل الإسلامي لأهداف التنمية المستدامة', provider: 'البنك الإسلامي للتنمية عبر edX', url: 'https://www.edx.org/learn/sustainable-development/islamic-development-bank-institute-islamic-finance-for-the-sustainable-development-goals', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'دورة مكثفة 7 أيام', provider: 'معهد إيثيكا', url: 'https://www.ethica.institute/free-islamic-banking-finance-course.aspx', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'التمويل والبنوك الإسلامية العالمية', provider: 'أليسون', url: 'https://alison.com/course/global-islamic-finance-and-banking', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'مكتبة معايير أيوفي', provider: 'أيوفي', url: 'https://aaoifi.com/', type: 'reference', language: 'en', free: false, certificate: false },
      ]
    },
    {
      id: 'aml-compliance',
      title: 'أخصائي مكافحة غسل الأموال والامتثال',
      description: 'توصيات فاتف، اعرف عميلك، فحص العقوبات، ومنع الجرائم المالية',
      icon: Shield,
      duration: '+35 ساعة',
      courses: 7,
      level: 'متوسط',
      color: 'from-blue-600 to-indigo-700',
      featured: true,
      resources: [
        { name: 'التعلم الإلكتروني لمكافحة الفساد', provider: 'الأمم المتحدة', url: 'https://www.unodc.org/corruption/en/learn/e-learning-courses.html', type: 'course', language: 'both', free: true, certificate: true },
        { name: 'منصة بازل للتعلم', provider: 'معهد بازل', url: 'https://learn.baselgovernance.org/', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'أكاديمية فاتف', provider: 'فاتف', url: 'https://www.fatf-gafi.org/en/pages/FATF-academy.html', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'مكافحة غسل الأموال', provider: 'الفيصل عبر كورسيرا', url: 'https://www.coursera.org/learn/anti-money-laundering', type: 'course', language: 'ar', free: true, certificate: false },
        { name: 'تدريب مكافحة غسل الأموال مع شهادة', provider: 'KYC Lookup', url: 'https://www.kyclookup.com/knowledgebase/how-to-obtain-a-free-aml-certification/', type: 'course', language: 'en', free: true, certificate: true },
      ]
    },
    {
      id: 'financial-literacy',
      title: 'معلم الثقافة المالية',
      description: 'التمويل الشخصي، الميزانية، الادخار، وأساسيات الاستثمار',
      icon: Coins,
      duration: '+25 ساعة',
      courses: 6,
      level: 'مبتدئ',
      color: 'from-amber-600 to-orange-700',
      featured: false,
      resources: [
        { name: 'دورة الثقافة المالية الكاملة', provider: 'أكاديمية خان', url: 'https://www.khanacademy.org/college-careers-more/financial-literacy', type: 'course', language: 'both', free: true, certificate: false },
        { name: 'الثقافة المالية', provider: 'الفيصل عبر كورسيرا', url: 'https://www.coursera.org/learn/financial-literacy', type: 'course', language: 'ar', free: true, certificate: false },
        { name: 'مهارات مالية أساسية', provider: 'إدراك', url: 'https://www.edraak.org/en/specialization/fundamental-financial-skills-specialization/', type: 'course', language: 'ar', free: true, certificate: true },
        { name: 'الثقافة المالية', provider: 'مؤسسة الغرير', url: 'https://www.for9a.com/en/courses/Free-Online-Course-in-Financial-Literacy-from-Abdulla-Al-Ghurair-Foundation-for-Education', type: 'course', language: 'both', free: true, certificate: true },
        { name: 'التعليم المالي من إنتويت', provider: 'إنتويت', url: 'https://www.intuit.com/solutions/education/', type: 'tool', language: 'en', free: true, certificate: false },
      ]
    },
    {
      id: 'governance-risk',
      title: 'مدير الحوكمة والمخاطر',
      description: 'إطار بازل، حوكمة مجلس الإدارة، الضوابط الداخلية، والتدقيق',
      icon: Building2,
      duration: '+45 ساعة',
      courses: 9,
      level: 'متقدم',
      color: 'from-purple-600 to-violet-700',
      featured: false,
      resources: [
        { name: 'دورات الحوكمة من بازل', provider: 'معهد بازل', url: 'https://learn.baselgovernance.org/', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'حوكمة الشركات', provider: 'كورسيرا', url: 'https://www.coursera.org/learn/corporate-governance-1', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'مقدمة في إدارة المخاطر', provider: 'NYIF عبر edX', url: 'https://www.edx.org/learn/economics/new-york-institute-of-finance-introduction-to-risk-management', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'تطبيق بازل I إلى III', provider: 'صندوق النقد الدولي', url: 'https://www.imf.org/en/publications/wp/issues/2019/06/14/from-basel-i-to-basel-iii-sequencing-implementation-in-developing-economies-46895', type: 'reference', language: 'en', free: true, certificate: false },
        { name: 'حوكمة الشركات من البنك الدولي', provider: 'البنك الدولي', url: 'https://www.worldbank.org/en/topic/financialsector/brief/corporate-governance', type: 'reference', language: 'en', free: true, certificate: false },
      ]
    },
    {
      id: 'central-banking',
      title: 'البنوك المركزية والسياسة النقدية',
      description: 'الاقتصاد النقدي، التضخم، أسعار الصرف، والاستقرار المالي',
      icon: Landmark,
      duration: '+30 ساعة',
      courses: 6,
      level: 'متوسط إلى متقدم',
      color: 'from-slate-600 to-gray-700',
      featured: false,
      resources: [
        { name: 'البنوك المركزية والسياسة النقدية', provider: 'UIUC عبر كورسيرا', url: 'https://www.coursera.org/learn/central-banks-monetary-policies', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'النظام النقدي', provider: 'الفيصل عبر كورسيرا', url: 'https://www.coursera.org/learn/monetary-system', type: 'course', language: 'ar', free: true, certificate: false },
        { name: 'النقود والبنوك والبنوك المركزية', provider: 'أكاديمية خان', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking', type: 'course', language: 'both', free: true, certificate: false },
        { name: 'تحليل السياسة النقدية', provider: 'صندوق النقد عبر edX', url: 'https://www.edx.org/learn/finance/the-international-monetary-fund-monetary-policy-analysis-and-forecasting', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'محاكي إدارة البنك المركزي', provider: 'Central Bank Simulation', url: 'https://governthebank.com/', type: 'tool', language: 'en', free: true, certificate: false },
      ]
    },
    {
      id: 'digital-fintech',
      title: 'البنوك الرقمية والتكنولوجيا المالية',
      description: 'الخدمات المصرفية عبر الهاتف، البلوكتشين، المدفوعات الرقمية، والأمن السيبراني',
      icon: Smartphone,
      duration: '+35 ساعة',
      courses: 7,
      level: 'مبتدئ إلى متوسط',
      color: 'from-cyan-600 to-sky-700',
      featured: false,
      resources: [
        { name: 'أساسيات البنوك الرقمية', provider: 'Great Learning', url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/fundamentals-of-digital-banking', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'أساسيات التكنولوجيا المالية', provider: 'UPenn عبر كورسيرا', url: 'https://www.coursera.org/specializations/fintech-foundations-applications-financial-technology', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'ابتكارات التكنولوجيا المالية', provider: 'UMich عبر كورسيرا', url: 'https://www.coursera.org/specializations/financial-technology-innovations', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'تطبيقات التكنولوجيا المالية', provider: 'أليسون', url: 'https://alison.com/course/fintech-applications-and-future-prospects', type: 'course', language: 'en', free: true, certificate: true },
        { name: 'التكنولوجيا المالية للأعمال', provider: 'إدراك', url: 'https://www.edraak.org/en/programs/course/capitalbank-3-v3/', type: 'course', language: 'ar', free: true, certificate: true },
      ]
    },
    {
      id: 'microfinance',
      title: 'التمويل الأصغر والشمول المالي',
      description: 'الاستثمار المؤثر، التمويل الاجتماعي، وعمليات مؤسسات التمويل الأصغر',
      icon: TrendingUp,
      duration: '+25 ساعة',
      courses: 5,
      level: 'متوسط',
      color: 'from-green-600 to-emerald-700',
      featured: false,
      resources: [
        { name: 'مهارات إدارة الأموال بنجاح', provider: 'إدراك', url: 'https://www.edraak.org/programs/course/finlit-v2020/', type: 'course', language: 'ar', free: true, certificate: true },
        { name: 'الشمول المالي الرقمي', provider: 'IDB عبر كورسيرا', url: 'https://www.coursera.org/learn/perspectives-in-digital-transformation-financial-inclusion', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'نهج منظومي للشمول المالي', provider: 'البنك الدولي', url: 'https://www.worldbank.org/en/olc/course/31634', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'تحديات الفقر العالمي', provider: 'MIT عبر edX', url: 'https://www.edx.org/learn/poverty/massachusetts-institute-of-technology-the-challenges-of-global-poverty', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'أكاديمية التمويل الأصغر اليمنية', provider: 'شبكة التمويل الأصغر اليمنية', url: 'https://yemennetwork.academy/', type: 'course', language: 'both', free: true, certificate: false },
      ]
    },
    {
      id: 'development-finance',
      title: 'تمويل التنمية والأثر',
      description: 'عمليات مؤسسات التمويل التنموية، التمويل المختلط، أهداف التنمية المستدامة، وتمويل المناخ',
      icon: Globe,
      duration: '+30 ساعة',
      courses: 6,
      level: 'متوسط إلى متقدم',
      color: 'from-teal-600 to-green-700',
      featured: false,
      resources: [
        { name: 'دورات أكاديمية أهداف التنمية المستدامة', provider: 'UN SDSN', url: 'https://sdgacademy.org/', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'تمويل المناخ', provider: 'البنك الدولي', url: 'https://olc.worldbank.org/content/climate-finance', type: 'course', language: 'en', free: true, certificate: false },
        { name: 'التمويل المختلط', provider: 'Convergence', url: 'https://www.convergence.finance/knowledge', type: 'reference', language: 'en', free: true, certificate: false },
        { name: 'قياس الأثر', provider: 'GIIN', url: 'https://thegiin.org/research/', type: 'reference', language: 'en', free: true, certificate: false },
        { name: 'تعلم أهداف التنمية المستدامة', provider: 'الأمم المتحدة', url: 'https://www.unsdglearn.org/', type: 'course', language: 'both', free: true, certificate: true },
      ]
    },
  ]
};

// Interactive Tools & Simulators
const interactiveTools = {
  en: [
    { name: 'Central Bank Simulator', description: 'Act as a central bank governor and manage monetary policy', url: 'https://governthebank.com/', icon: Landmark, category: 'Simulation' },
    { name: 'Fed Chair Simulator', description: 'Experience the challenges of Federal Reserve decision-making', url: 'https://powellschair.com/simulator', icon: TrendingUp, category: 'Simulation' },
    { name: 'Islamic Finance Calculator', description: 'Calculate Murabaha, Ijara, Sukuk yields, and Zakat', url: '/tools/islamic-finance-calculator', icon: Calculator, category: 'Calculator', internal: true },
    { name: 'Zakat Calculator', description: 'Calculate your annual Zakat obligation', url: 'https://islamic-relief.org/zakat-calculator/', icon: Coins, category: 'Calculator' },
    { name: 'Murabaha Calculator', description: 'Calculate Islamic cost-plus financing', url: 'https://www.imamic.com/calculators/murabaha', icon: Calculator, category: 'Calculator' },
    { name: 'Basel LEARN Interactive', description: 'Learn financial crime investigation through simulations', url: 'https://learn.baselgovernance.org/', icon: Shield, category: 'Interactive' },
  ],
  ar: [
    { name: 'محاكي البنك المركزي', description: 'تصرف كمحافظ بنك مركزي وأدر السياسة النقدية', url: 'https://governthebank.com/', icon: Landmark, category: 'محاكاة' },
    { name: 'محاكي رئيس الاحتياطي الفيدرالي', description: 'اختبر تحديات صنع القرار في الاحتياطي الفيدرالي', url: 'https://powellschair.com/simulator', icon: TrendingUp, category: 'محاكاة' },
    { name: 'حاسبة التمويل الإسلامي', description: 'احسب المرابحة والإجارة وعوائد الصكوك والزكاة', url: '/tools/islamic-finance-calculator', icon: Calculator, category: 'حاسبة', internal: true },
    { name: 'حاسبة الزكاة', description: 'احسب زكاتك السنوية', url: 'https://islamic-relief.org/zakat-calculator/', icon: Coins, category: 'حاسبة' },
    { name: 'حاسبة المرابحة', description: 'احسب التمويل الإسلامي بالتكلفة زائد الربح', url: 'https://www.imamic.com/calculators/murabaha', icon: Calculator, category: 'حاسبة' },
    { name: 'بازل التفاعلي', description: 'تعلم التحقيق في الجرائم المالية من خلال المحاكاة', url: 'https://learn.baselgovernance.org/', icon: Shield, category: 'تفاعلي' },
  ]
};

// Key Partner Institutions
const partnerInstitutions = [
  { name: 'IMF', nameAr: 'صندوق النقد الدولي', logo: '🏛️' },
  { name: 'World Bank', nameAr: 'البنك الدولي', logo: '🌍' },
  { name: 'AAOIFI', nameAr: 'أيوفي', logo: '☪️' },
  { name: 'FATF', nameAr: 'فاتف', logo: '🛡️' },
  { name: 'Basel Institute', nameAr: 'معهد بازل', logo: '⚖️' },
  { name: 'IsDB', nameAr: 'البنك الإسلامي للتنمية', logo: '🏦' },
  { name: 'UN', nameAr: 'الأمم المتحدة', logo: '🇺🇳' },
  { name: 'Edraak', nameAr: 'إدراك', logo: '📚' },
];

export default function Academy() {
  const { language, isRTL } = useLanguage();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tracks' | 'tools' | 'certifications'>('tracks');
  
  const tracks = learningTracks[language];
  const tools = interactiveTools[language];

  const content = {
    en: {
      badge: 'FREE LEARNING PLATFORM',
      title: 'CauseWay Academy',
      subtitle: 'Your Gateway to Financial Excellence',
      description: 'Access world-class training from IMF, World Bank, AAOIFI, and leading global institutions. 50+ curated courses, interactive tools, and professional certifications — all free.',
      stats: {
        courses: '50+',
        coursesLabel: 'Free Courses',
        hours: '300+',
        hoursLabel: 'Learning Hours',
        certs: '15+',
        certsLabel: 'Certifications',
        languages: '2',
        languagesLabel: 'Languages'
      },
      tabs: {
        tracks: 'Learning Tracks',
        tools: 'Interactive Tools',
        certifications: 'Certifications'
      },
      tracksCta: 'Explore Track',
      toolsCta: 'Launch Tool',
      viewAll: 'View All Resources',
      featured: 'Featured',
      free: 'Free',
      certificate: 'Certificate',
      arabic: 'Arabic',
      english: 'English',
      both: 'Bilingual',
      partnersTitle: 'Curated from World-Leading Institutions',
      ctaTitle: 'Start Your Learning Journey Today',
      ctaDescription: 'Join thousands of professionals building their financial expertise with CauseWay Academy.',
      ctaButton: 'Browse All Courses',
      resourceTypes: {
        course: 'Course',
        reference: 'Reference',
        tool: 'Tool'
      }
    },
    ar: {
      badge: 'منصة تعليمية مجانية',
      title: 'أكاديمية كوزواي',
      subtitle: 'بوابتك نحو التميز المالي',
      description: 'احصل على تدريب عالمي المستوى من صندوق النقد الدولي والبنك الدولي وأيوفي والمؤسسات العالمية الرائدة. أكثر من 50 دورة منتقاة وأدوات تفاعلية وشهادات مهنية — كلها مجانية.',
      stats: {
        courses: '+50',
        coursesLabel: 'دورة مجانية',
        hours: '+300',
        hoursLabel: 'ساعة تعليمية',
        certs: '+15',
        certsLabel: 'شهادة',
        languages: '2',
        languagesLabel: 'لغة'
      },
      tabs: {
        tracks: 'مسارات التعلم',
        tools: 'أدوات تفاعلية',
        certifications: 'الشهادات'
      },
      tracksCta: 'استكشف المسار',
      toolsCta: 'ابدأ الأداة',
      viewAll: 'عرض جميع الموارد',
      featured: 'مميز',
      free: 'مجاني',
      certificate: 'شهادة',
      arabic: 'عربي',
      english: 'إنجليزي',
      both: 'ثنائي اللغة',
      partnersTitle: 'منتقاة من المؤسسات العالمية الرائدة',
      ctaTitle: 'ابدأ رحلة تعلمك اليوم',
      ctaDescription: 'انضم إلى آلاف المحترفين الذين يبنون خبراتهم المالية مع أكاديمية كوزواي.',
      ctaButton: 'تصفح جميع الدورات',
      resourceTypes: {
        course: 'دورة',
        reference: 'مرجع',
        tool: 'أداة'
      }
    }
  };

  const t = content[language];

  const getLanguageLabel = (lang: string) => {
    if (lang === 'ar') return t.arabic;
    if (lang === 'en') return t.english;
    return t.both;
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-[#0a1f1a] via-[#133129] to-[#0a1f1a] ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#d4a84b]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#406D61]/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#224B40]/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(212, 168, 75, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 75, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a84b]/20 border border-[#d4a84b]/30 mb-8">
              <Sparkles className="w-4 h-4 text-[#d4a84b]" />
              <span className="text-[#d4a84b] text-sm font-medium">{t.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t.title}
            </h1>
            <p className="text-2xl md:text-3xl text-[#d4a84b] font-light mb-6">
              {t.subtitle}
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
              {t.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: t.stats.courses, label: t.stats.coursesLabel, icon: BookOpen },
                { value: t.stats.hours, label: t.stats.hoursLabel, icon: Clock },
                { value: t.stats.certs, label: t.stats.certsLabel, icon: Award },
                { value: t.stats.languages, label: t.stats.languagesLabel, icon: Globe },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <stat.icon className="w-6 h-6 text-[#d4a84b] mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Institutions */}
      <section className="py-12 border-y border-white/10 bg-black/20">
        <div className="container">
          <p className="text-center text-gray-400 text-sm mb-8">{t.partnersTitle}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partnerInstitutions.map((partner, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">{partner.logo}</span>
                <span className="text-sm font-medium">{language === 'ar' ? partner.nameAr : partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
              {(['tracks', 'tools', 'certifications'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-[#d4a84b] text-[#133129]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {t.tabs[tab]}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Tracks */}
          {activeTab === 'tracks' && (
            <div className="space-y-8">
              {/* Featured Tracks */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {tracks.filter(track => track.featured).map((track) => (
                  <div
                    key={track.id}
                    className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${track.color} p-8 group cursor-pointer`}
                    onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                  >
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium">
                      {t.featured}
                    </div>
                    <track.icon className="w-12 h-12 text-white/80 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">{track.title}</h3>
                    <p className="text-white/80 mb-4">{track.description}</p>
                    <div className="flex items-center gap-4 text-white/60 text-sm mb-6">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {track.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {track.courses} {language === 'ar' ? 'دورات' : 'courses'}</span>
                    </div>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      {t.tracksCta} <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Button>

                    {/* Expanded Resources */}
                    {selectedTrack === track.id && (
                      <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                        {track.resources.map((resource, i) => (
                          <a
                            key={i}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                {resource.type === 'course' ? <Play className="w-4 h-4 text-white" /> : 
                                 resource.type === 'tool' ? <Calculator className="w-4 h-4 text-white" /> :
                                 <FileText className="w-4 h-4 text-white" />}
                              </div>
                              <div>
                                <div className="text-white font-medium text-sm">{resource.name}</div>
                                <div className="text-white/60 text-xs">{resource.provider}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {resource.free && (
                                <span className="px-2 py-0.5 bg-green-500/30 text-green-300 text-xs rounded-full">{t.free}</span>
                              )}
                              {resource.certificate && (
                                <span className="px-2 py-0.5 bg-[#d4a84b]/30 text-[#d4a84b] text-xs rounded-full">{t.certificate}</span>
                              )}
                              <span className="px-2 py-0.5 bg-white/20 text-white/80 text-xs rounded-full">
                                {getLanguageLabel(resource.language)}
                              </span>
                              <ExternalLink className="w-4 h-4 text-white/60" />
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Other Tracks */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracks.filter(track => !track.featured).map((track) => (
                  <div
                    key={track.id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#d4a84b]/50 transition-all cursor-pointer group"
                    onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-4`}>
                      <track.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d4a84b] transition-colors">{track.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{track.description}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {track.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {track.courses}</span>
                    </div>
                    <div className="flex items-center text-[#d4a84b] text-sm font-medium">
                      {t.tracksCta} <ArrowRight className={`w-4 h-4 ml-1 ${isRTL ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Expanded Resources */}
                    {selectedTrack === track.id && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                        {track.resources.map((resource, i) => (
                          <a
                            key={i}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-white text-sm truncate max-w-[200px]">{resource.name}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              {resource.certificate && <Award className="w-3 h-3 text-[#d4a84b]" />}
                              <ExternalLink className="w-3 h-3 text-gray-500" />
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Tools */}
          {activeTab === 'tools' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target={tool.internal ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#d4a84b]/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#b8923f] flex items-center justify-center">
                      <tool.icon className="w-6 h-6 text-[#133129]" />
                    </div>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-400">{tool.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4a84b] transition-colors">{tool.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                  <div className="flex items-center text-[#d4a84b] text-sm font-medium">
                    {t.toolsCta} <ExternalLink className={`w-4 h-4 ${isRTL ? 'mr-1' : 'ml-1'}`} />
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Certifications */}
          {activeTab === 'certifications' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="text-center mb-8">
                  <Award className="w-16 h-16 text-[#d4a84b] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'ar' ? 'شهادات مهنية مجانية' : 'Free Professional Certifications'}
                  </h3>
                  <p className="text-gray-400">
                    {language === 'ar' 
                      ? 'احصل على شهادات معترف بها من مؤسسات عالمية رائدة'
                      : 'Earn recognized credentials from leading global institutions'}
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Basel Institute Governance Certificates', nameAr: 'شهادات الحوكمة من معهد بازل', provider: 'Basel Institute', url: 'https://learn.baselgovernance.org/' },
                    { name: 'UNODC Anti-Corruption Certificate', nameAr: 'شهادة مكافحة الفساد من الأمم المتحدة', provider: 'United Nations', url: 'https://www.unodc.org/corruption/en/learn/e-learning-courses.html' },
                    { name: 'AML Training Certificate', nameAr: 'شهادة تدريب مكافحة غسل الأموال', provider: 'KYC Lookup', url: 'https://www.kyclookup.com/knowledgebase/how-to-obtain-a-free-aml-certification/' },
                    { name: 'Digital Banking Certificate', nameAr: 'شهادة البنوك الرقمية', provider: 'Great Learning', url: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/fundamentals-of-digital-banking' },
                    { name: 'Financial Literacy Certificate', nameAr: 'شهادة الثقافة المالية', provider: 'Al Ghurair Foundation', url: 'https://www.for9a.com/en/courses/Free-Online-Course-in-Financial-Literacy-from-Abdulla-Al-Ghurair-Foundation-for-Education' },
                    { name: 'Edraak Financial Skills Certificate', nameAr: 'شهادة المهارات المالية من إدراك', provider: 'Edraak', url: 'https://www.edraak.org/en/specialization/fundamental-financial-skills-specialization/' },
                  ].map((cert, i) => (
                    <a
                      key={i}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <div>
                          <div className="text-white font-medium">{language === 'ar' ? cert.nameAr : cert.name}</div>
                          <div className="text-gray-500 text-sm">{cert.provider}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">{t.free}</span>
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#d4a84b]/20 via-[#d4a84b]/10 to-[#d4a84b]/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <GraduationCap className="w-16 h-16 text-[#d4a84b] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {t.ctaTitle}
            </h2>
            <p className="text-gray-300 mb-8">
              {t.ctaDescription}
            </p>
            <Link href="/resources">
              <Button size="lg" className="bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold px-8">
                {t.ctaButton} <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
