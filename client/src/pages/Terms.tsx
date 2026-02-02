import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Shield, FileText, Scale, AlertTriangle, Globe, Clock, Mail, ChevronUp, Printer } from 'lucide-react';

export default function Terms() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const [activeSection, setActiveSection] = useState<string>('acceptance');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['acceptance']));

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setExpandedSections(prev => {
        const arr = Array.from(prev);
        arr.push(sectionId);
        return new Set(arr);
      });
    }
  };

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
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    {
      id: 'acceptance',
      icon: FileText,
      title: isArabic ? 'قبول الشروط' : 'Acceptance of Terms',
      content: isArabic ? `
        <p class="mb-4">باستخدامك لموقع كوزواي الإلكتروني وخدماتنا الاستشارية، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.</p>
        <p class="mb-4">تشكل هذه الشروط اتفاقية ملزمة قانونياً بينك وبين مجموعة كوزواي للاستشارات المالية والمصرفية ("كوزواي"، "نحن"، "لنا"). تنطبق هذه الشروط على جميع الزوار والمستخدمين والعملاء الذين يصلون إلى موقعنا الإلكتروني أو يستخدمون خدماتنا.</p>
        <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستصبح التغييرات سارية المفعول فور نشرها على هذه الصفحة. استمرارك في استخدام خدماتنا بعد أي تعديلات يشكل قبولك للشروط المعدلة.</p>
      ` : `
        <p class="mb-4">By accessing and using the CauseWay website and our consultancy services, you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, please do not use our services.</p>
        <p class="mb-4">These Terms constitute a legally binding agreement between you and CauseWay Group for Financial and Banking Consultancies ("CauseWay", "we", "us", "our"). These terms apply to all visitors, users, and clients who access our website or use our services.</p>
        <p>We reserve the right to modify these terms at any time. Changes will become effective immediately upon posting on this page. Your continued use of our services following any modifications constitutes acceptance of the revised terms.</p>
      `
    },
    {
      id: 'services',
      icon: Shield,
      title: isArabic ? 'وصف الخدمات' : 'Description of Services',
      content: isArabic ? `
        <p class="mb-4">تقدم كوزواي خدمات استشارية متخصصة في القطاع المالي والمصرفي، تشمل على سبيل المثال لا الحصر:</p>
        <ul class="list-disc pr-6 mb-4 space-y-2">
          <li><strong>هندسة التمويل الإسلامي:</strong> تطوير المنتجات المتوافقة مع الشريعة، هيكلة الصكوك، وتحويل البنوك الإسلامية</li>
          <li><strong>المخاطر والامتثال:</strong> أطر مكافحة غسل الأموال وتمويل الإرهاب، الامتثال التنظيمي، والتدقيق الداخلي</li>
          <li><strong>الأنظمة المصرفية الأساسية:</strong> اختيار الأنظمة، التحول الرقمي، وتحديث الأنظمة القديمة</li>
          <li><strong>تطوير التمويل الأصغر:</strong> إنشاء مؤسسات التمويل الأصغر وبناء القدرات</li>
          <li><strong>بناء القدرات:</strong> تدريب مجالس الإدارة، تطوير القيادات، وورش العمل</li>
          <li><strong>العلامة التجارية والهوية:</strong> العلامة التجارية للقطاع المالي والهوية المؤسسية</li>
        </ul>
        <p>جميع الخدمات تخضع لاتفاقيات منفصلة تحدد النطاق والتسليمات والشروط المحددة لكل مشاركة.</p>
      ` : `
        <p class="mb-4">CauseWay provides specialized consultancy services in the financial and banking sector, including but not limited to:</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Islamic Finance Engineering:</strong> Sharia-compliant product development, Sukuk structuring, and Islamic bank transformation</li>
          <li><strong>Risk & Compliance:</strong> AML/CFT frameworks, regulatory compliance, and internal audit</li>
          <li><strong>Core Banking Systems:</strong> System selection, digital transformation, and legacy modernization</li>
          <li><strong>Microfinance Development:</strong> MFI establishment and capacity building</li>
          <li><strong>Capacity Building:</strong> Board training, leadership development, and workshops</li>
          <li><strong>Branding & Identity:</strong> Financial sector branding and corporate identity</li>
        </ul>
        <p>All services are subject to separate agreements that define the scope, deliverables, and specific terms of each engagement.</p>
      `
    },
    {
      id: 'intellectual-property',
      icon: Scale,
      title: isArabic ? 'الملكية الفكرية' : 'Intellectual Property',
      content: isArabic ? `
        <p class="mb-4">جميع المحتويات والمواد والملكية الفكرية المعروضة على هذا الموقع، بما في ذلك على سبيل المثال لا الحصر النصوص والرسومات والشعارات والصور والبرمجيات، هي ملك لمجموعة كوزواي أو مرخصيها ومحمية بموجب قوانين حقوق النشر والعلامات التجارية الدولية.</p>
        <p class="mb-4"><strong>الاستخدام المسموح:</strong> يجوز لك عرض وتنزيل وطباعة المواد من هذا الموقع للاستخدام الشخصي غير التجاري فقط، بشرط الحفاظ على جميع إشعارات حقوق النشر والملكية.</p>
        <p class="mb-4"><strong>الاستخدام المحظور:</strong> لا يجوز لك تعديل أو نسخ أو توزيع أو نقل أو عرض أو أداء أو إعادة إنتاج أو نشر أو ترخيص أو إنشاء أعمال مشتقة من أو نقل أو بيع أي معلومات أو برامج أو منتجات أو خدمات تم الحصول عليها من هذا الموقع دون إذن كتابي مسبق.</p>
        <p><strong>علامة كوزواي التجارية:</strong> "كوزواي" و"CauseWay" وشعارنا هي علامات تجارية مسجلة. أي استخدام غير مصرح به لهذه العلامات محظور تماماً.</p>
      ` : `
        <p class="mb-4">All content, materials, and intellectual property displayed on this website, including but not limited to text, graphics, logos, images, and software, are the property of CauseWay Group or its licensors and are protected under international copyright and trademark laws.</p>
        <p class="mb-4"><strong>Permitted Use:</strong> You may view, download, and print materials from this website for personal, non-commercial use only, provided you maintain all copyright and proprietary notices.</p>
        <p class="mb-4"><strong>Prohibited Use:</strong> You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from this website without prior written permission.</p>
        <p><strong>CauseWay Trademark:</strong> "CauseWay" and our logo are registered trademarks. Any unauthorized use of these marks is strictly prohibited.</p>
      `
    },
    {
      id: 'confidentiality',
      icon: Shield,
      title: isArabic ? 'السرية والخصوصية' : 'Confidentiality & Privacy',
      content: isArabic ? `
        <p class="mb-4">نلتزم بحماية سرية جميع معلومات العملاء. تخضع جميع البيانات المشتركة معنا لسياسة الخصوصية الخاصة بنا واتفاقيات السرية المعمول بها.</p>
        <p class="mb-4"><strong>التزاماتنا:</strong></p>
        <ul class="list-disc pr-6 mb-4 space-y-2">
          <li>حماية جميع معلومات العملاء السرية بإجراءات أمنية مناسبة</li>
          <li>عدم الإفصاح عن معلومات العملاء لأطراف ثالثة دون موافقة</li>
          <li>استخدام المعلومات فقط للأغراض المتفق عليها</li>
          <li>الامتثال لجميع قوانين حماية البيانات المعمول بها</li>
        </ul>
        <p class="mb-4"><strong>التزاماتك:</strong></p>
        <ul class="list-disc pr-6 space-y-2">
          <li>الحفاظ على سرية أي معلومات خاصة نشاركها معك</li>
          <li>عدم مشاركة بيانات اعتماد الوصول مع أطراف غير مصرح لها</li>
          <li>إخطارنا فوراً بأي خرق أمني مشتبه به</li>
        </ul>
      ` : `
        <p class="mb-4">We are committed to protecting the confidentiality of all client information. All data shared with us is subject to our Privacy Policy and applicable confidentiality agreements.</p>
        <p class="mb-4"><strong>Our Commitments:</strong></p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Protect all confidential client information with appropriate security measures</li>
          <li>Not disclose client information to third parties without consent</li>
          <li>Use information only for agreed-upon purposes</li>
          <li>Comply with all applicable data protection laws</li>
        </ul>
        <p class="mb-4"><strong>Your Obligations:</strong></p>
        <ul class="list-disc pl-6 space-y-2">
          <li>Maintain confidentiality of any proprietary information we share with you</li>
          <li>Not share access credentials with unauthorized parties</li>
          <li>Notify us immediately of any suspected security breach</li>
        </ul>
      `
    },
    {
      id: 'liability',
      icon: AlertTriangle,
      title: isArabic ? 'حدود المسؤولية' : 'Limitation of Liability',
      content: isArabic ? `
        <p class="mb-4">إلى أقصى حد يسمح به القانون المعمول به، لن تكون كوزواي مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك على سبيل المثال لا الحصر خسارة الأرباح أو البيانات أو الشهرة أو فرص العمل.</p>
        <p class="mb-4"><strong>إخلاء المسؤولية:</strong></p>
        <ul class="list-disc pr-6 mb-4 space-y-2">
          <li>يتم تقديم المعلومات على هذا الموقع "كما هي" دون أي ضمانات</li>
          <li>لا نضمن دقة أو اكتمال أو ملاءمة المحتوى لأي غرض معين</li>
          <li>لا نتحمل مسؤولية القرارات المتخذة بناءً على المعلومات المقدمة</li>
          <li>الاستشارات المهنية تخضع لاتفاقيات منفصلة مع شروط مسؤولية محددة</li>
        </ul>
        <p><strong>الحد الأقصى للمسؤولية:</strong> في جميع الأحوال، لن تتجاوز مسؤوليتنا الإجمالية المبلغ المدفوع لنا مقابل الخدمات المعنية خلال الاثني عشر شهراً السابقة للمطالبة.</p>
      ` : `
        <p class="mb-4">To the maximum extent permitted by applicable law, CauseWay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or business opportunities.</p>
        <p class="mb-4"><strong>Disclaimers:</strong></p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>Information on this website is provided "as is" without any warranties</li>
          <li>We do not guarantee accuracy, completeness, or suitability of content for any particular purpose</li>
          <li>We are not responsible for decisions made based on provided information</li>
          <li>Professional consultancy is subject to separate agreements with specific liability terms</li>
        </ul>
        <p><strong>Maximum Liability:</strong> In all cases, our total liability shall not exceed the amount paid to us for the relevant services during the twelve months preceding the claim.</p>
      `
    },
    {
      id: 'governing-law',
      icon: Globe,
      title: isArabic ? 'القانون الحاكم' : 'Governing Law',
      content: isArabic ? `
        <p class="mb-4">تخضع هذه الشروط وتفسر وفقاً لقوانين الجمهورية اليمنية، دون اعتبار لمبادئ تنازع القوانين.</p>
        <p class="mb-4"><strong>حل النزاعات:</strong></p>
        <ul class="list-disc pr-6 mb-4 space-y-2">
          <li><strong>التفاوض:</strong> يوافق الطرفان على محاولة حل أي نزاع ودياً من خلال التفاوض بحسن نية</li>
          <li><strong>الوساطة:</strong> إذا لم يتم حل النزاع خلال 30 يوماً، يجوز لأي طرف طلب الوساطة</li>
          <li><strong>التحكيم:</strong> أي نزاع لم يتم حله يخضع للتحكيم الملزم وفقاً لقواعد مركز التحكيم اليمني</li>
        </ul>
        <p><strong>الاختصاص القضائي:</strong> توافق على الاختصاص القضائي الحصري لمحاكم عدن، اليمن، لأي إجراءات قانونية تنشأ عن هذه الشروط.</p>
      ` : `
        <p class="mb-4">These Terms shall be governed by and construed in accordance with the laws of the Republic of Yemen, without regard to conflict of law principles.</p>
        <p class="mb-4"><strong>Dispute Resolution:</strong></p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Negotiation:</strong> Both parties agree to attempt to resolve any dispute amicably through good-faith negotiation</li>
          <li><strong>Mediation:</strong> If not resolved within 30 days, either party may request mediation</li>
          <li><strong>Arbitration:</strong> Any unresolved dispute shall be subject to binding arbitration under the rules of the Yemen Arbitration Center</li>
        </ul>
        <p><strong>Jurisdiction:</strong> You agree to the exclusive jurisdiction of the courts of Aden, Yemen, for any legal proceedings arising from these Terms.</p>
      `
    },
    {
      id: 'modifications',
      icon: Clock,
      title: isArabic ? 'التعديلات والتحديثات' : 'Modifications & Updates',
      content: isArabic ? `
        <p class="mb-4">نحتفظ بالحق في تعديل هذه الشروط في أي وقت وفقاً لتقديرنا الخاص. عند إجراء تغييرات جوهرية:</p>
        <ul class="list-disc pr-6 mb-4 space-y-2">
          <li>سنقوم بتحديث تاريخ "آخر تحديث" في أعلى هذه الصفحة</li>
          <li>قد نرسل إشعاراً بالبريد الإلكتروني للمستخدمين المسجلين</li>
          <li>قد ننشر إشعاراً بارزاً على موقعنا الإلكتروني</li>
        </ul>
        <p class="mb-4"><strong>مسؤوليتك:</strong> يقع على عاتقك مراجعة هذه الشروط بشكل دوري للاطلاع على أي تغييرات. استمرارك في استخدام خدماتنا بعد نشر التغييرات يشكل قبولك للشروط المعدلة.</p>
        <p><strong>الإصدارات السابقة:</strong> يمكن طلب نسخ من الإصدارات السابقة من هذه الشروط عن طريق الاتصال بنا.</p>
      ` : `
        <p class="mb-4">We reserve the right to modify these Terms at any time at our sole discretion. When we make material changes:</p>
        <ul class="list-disc pl-6 mb-4 space-y-2">
          <li>We will update the "Last Updated" date at the top of this page</li>
          <li>We may send an email notification to registered users</li>
          <li>We may post a prominent notice on our website</li>
        </ul>
        <p class="mb-4"><strong>Your Responsibility:</strong> It is your responsibility to review these Terms periodically for any changes. Your continued use of our services after posting of changes constitutes acceptance of the revised terms.</p>
        <p><strong>Previous Versions:</strong> Copies of previous versions of these Terms can be requested by contacting us.</p>
      `
    },
    {
      id: 'contact',
      icon: Mail,
      title: isArabic ? 'اتصل بنا' : 'Contact Us',
      content: isArabic ? `
        <p class="mb-4">إذا كانت لديك أي أسئلة حول شروط الخدمة هذه، يرجى التواصل معنا:</p>
        <div class="bg-[#224B40]/30 rounded-xl p-6 border border-[#406D61]/30">
          <p class="mb-3"><strong>مجموعة كوزواي للاستشارات المالية والمصرفية</strong></p>
          <p class="mb-2">📍 حي كريتر، عدن، اليمن</p>
          <p class="mb-2">📧 legal@causewaygrp.com</p>
          <p class="mb-2">📞 +967 2 236655</p>
          <p class="mb-4">🌐 www.causewaygrp.com</p>
          <p class="text-sm text-[#d4a84b]">ساعات العمل: الأحد - الخميس، 9:00 صباحاً - 5:00 مساءً (توقيت اليمن)</p>
        </div>
        <p class="mt-4">للاستفسارات القانونية العاجلة، يرجى تضمين "عاجل - قانوني" في سطر الموضوع.</p>
      ` : `
        <p class="mb-4">If you have any questions about these Terms of Service, please contact us:</p>
        <div class="bg-[#224B40]/30 rounded-xl p-6 border border-[#406D61]/30">
          <p class="mb-3"><strong>CauseWay Group for Financial and Banking Consultancies</strong></p>
          <p class="mb-2">📍 Crater District, Aden, Yemen</p>
          <p class="mb-2">📧 legal@causewaygrp.com</p>
          <p class="mb-2">📞 +967 2 236655</p>
          <p class="mb-4">🌐 www.causewaygrp.com</p>
          <p class="text-sm text-[#d4a84b]">Business Hours: Sunday - Thursday, 9:00 AM - 5:00 PM (Yemen Time)</p>
        </div>
        <p class="mt-4">For urgent legal inquiries, please include "Urgent - Legal" in the subject line.</p>
      `
    }
  ];

  return (
    <div className={`min-h-screen bg-[#faf9f6] ${isArabic ? 'font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#133129] via-[#1a3d33] to-[#224B40] py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#d4a84b] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#406D61] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d4a84b]/20 rounded-2xl mb-8">
              <Scale className="w-10 h-10 text-[#d4a84b]" />
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${isArabic ? 'font-arabic' : 'font-serif'}`}>
              {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {isArabic 
                ? 'الإطار القانوني الذي يحكم استخدامك لخدماتنا الاستشارية'
                : 'The legal framework governing your use of our consultancy services'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{isArabic ? 'آخر تحديث: 1 فبراير 2026' : 'Last Updated: February 1, 2026'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{isArabic ? 'تاريخ السريان: 1 فبراير 2026' : 'Effective: February 1, 2026'}</span>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
            >
              <Printer className="w-4 h-4" />
              {isArabic ? 'طباعة' : 'Print'}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-lg border border-[#e5e5e5] p-6">
                <h2 className={`text-lg font-bold text-[#133129] mb-6 pb-4 border-b border-[#e5e5e5] ${isArabic ? 'font-arabic' : ''}`}>
                  {isArabic ? 'جدول المحتويات' : 'TABLE OF CONTENTS'}
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                          activeSection === section.id
                            ? 'bg-[#133129] text-white'
                            : 'text-[#133129]/70 hover:bg-[#133129]/5 hover:text-[#133129]'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className={`${isArabic ? 'text-right' : 'text-left'} truncate`}>{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Content Sections */}
            <main className="flex-1 space-y-6">
              {sections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expandedSections.has(section.id);
                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="bg-white rounded-2xl shadow-lg border border-[#e5e5e5] overflow-hidden scroll-mt-24"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-[#faf9f6] transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#133129]/10 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#133129]" />
                        </div>
                        <h2 className={`text-xl font-bold text-[#133129] ${isArabic ? 'font-arabic' : ''}`}>
                          {section.title}
                        </h2>
                      </div>
                      <ChevronUp
                        className={`w-5 h-5 text-[#133129]/50 transition-transform duration-300 ${
                          isExpanded ? '' : 'rotate-180'
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className={`${isArabic ? 'pr-16' : 'pl-16'}`}>
                          <div
                            className="prose prose-lg max-w-none text-[#133129]/80 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                          />
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}

              {/* Agreement Notice */}
              <div className="bg-gradient-to-br from-[#d4a84b]/10 to-[#d4a84b]/5 rounded-2xl p-8 border border-[#d4a84b]/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4a84b]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#d4a84b]" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold text-[#133129] mb-2 ${isArabic ? 'font-arabic' : ''}`}>
                      {isArabic ? 'إقرار بالموافقة' : 'Acknowledgment of Agreement'}
                    </h3>
                    <p className="text-[#133129]/70 leading-relaxed">
                      {isArabic
                        ? 'باستخدامك لموقع كوزواي الإلكتروني أو خدماتنا، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يرجى التوقف عن استخدام خدماتنا فوراً.'
                        : 'By using the CauseWay website or our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our services immediately.'}
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#133129]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`text-3xl font-bold text-white mb-4 ${isArabic ? 'font-arabic' : 'font-serif'}`}>
              {isArabic ? 'هل لديك أسئلة؟' : 'Have Questions?'}
            </h2>
            <p className="text-white/70 mb-8">
              {isArabic
                ? 'فريقنا القانوني متاح للإجابة على أي استفسارات حول شروط الخدمة'
                : 'Our legal team is available to answer any questions about our Terms of Service'}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d4a84b] hover:bg-[#c49a40] text-[#133129] font-semibold rounded-xl transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </a>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#133129] hover:bg-[#224B40] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
          aria-label={isArabic ? 'العودة للأعلى' : 'Scroll to top'}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
