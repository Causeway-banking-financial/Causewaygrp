/**
 * Regulatory Calendar Page
 * Key compliance dates and deadlines for financial institutions
 * Self-maintaining with recurring annual dates
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Bell, Filter, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface RegulatoryEvent {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  month: number; // 1-12
  day?: number; // Optional specific day
  recurring: boolean;
  priority: 'high' | 'medium' | 'low';
  sourceEn: string;
  sourceAr: string;
}

// Key regulatory dates - recurring annually
const regulatoryEvents: RegulatoryEvent[] = [
  // Q1 Events
  {
    id: '1',
    titleEn: 'Annual Financial Statements Deadline',
    titleAr: 'الموعد النهائي للبيانات المالية السنوية',
    descriptionEn: 'Banks must submit audited annual financial statements to the Central Bank within 3 months of fiscal year end.',
    descriptionAr: 'يجب على البنوك تقديم البيانات المالية السنوية المدققة للبنك المركزي خلال 3 أشهر من نهاية السنة المالية.',
    category: 'Reporting',
    categoryAr: 'التقارير',
    month: 3,
    day: 31,
    recurring: true,
    priority: 'high',
    sourceEn: 'Central Bank Regulations',
    sourceAr: 'لوائح البنك المركزي'
  },
  {
    id: '2',
    titleEn: 'Q1 Prudential Returns',
    titleAr: 'التقارير الاحترازية للربع الأول',
    descriptionEn: 'Quarterly prudential returns including capital adequacy, liquidity ratios, and asset quality reports.',
    descriptionAr: 'التقارير الاحترازية الفصلية بما في ذلك كفاية رأس المال ونسب السيولة وتقارير جودة الأصول.',
    category: 'Reporting',
    categoryAr: 'التقارير',
    month: 4,
    day: 15,
    recurring: true,
    priority: 'high',
    sourceEn: 'Basel III Framework',
    sourceAr: 'إطار بازل 3'
  },
  {
    id: '3',
    titleEn: 'Zakat Calculation Period',
    titleAr: 'فترة حساب الزكاة',
    descriptionEn: 'Islamic financial institutions must calculate and distribute Zakat based on lunar calendar (varies annually).',
    descriptionAr: 'يجب على المؤسسات المالية الإسلامية حساب وتوزيع الزكاة بناءً على التقويم الهجري (يختلف سنوياً).',
    category: 'Islamic Finance',
    categoryAr: 'التمويل الإسلامي',
    month: 3,
    recurring: true,
    priority: 'medium',
    sourceEn: 'AAOIFI Standards',
    sourceAr: 'معايير أيوفي'
  },
  
  // Q2 Events
  {
    id: '4',
    titleEn: 'Annual General Meeting',
    titleAr: 'الجمعية العمومية السنوية',
    descriptionEn: 'Banks must hold AGM within 4 months of fiscal year end to approve financial statements and elect board members.',
    descriptionAr: 'يجب على البنوك عقد الجمعية العمومية خلال 4 أشهر من نهاية السنة المالية للموافقة على البيانات المالية وانتخاب أعضاء مجلس الإدارة.',
    category: 'Governance',
    categoryAr: 'الحوكمة',
    month: 4,
    day: 30,
    recurring: true,
    priority: 'high',
    sourceEn: 'Corporate Governance Code',
    sourceAr: 'قانون حوكمة الشركات'
  },
  {
    id: '5',
    titleEn: 'FATF Mutual Evaluation Updates',
    titleAr: 'تحديثات التقييم المتبادل لمجموعة العمل المالي',
    descriptionEn: 'Review period for FATF recommendations implementation and mutual evaluation follow-up reports.',
    descriptionAr: 'فترة مراجعة تنفيذ توصيات مجموعة العمل المالي وتقارير متابعة التقييم المتبادل.',
    category: 'AML/CFT',
    categoryAr: 'مكافحة غسل الأموال',
    month: 6,
    recurring: true,
    priority: 'high',
    sourceEn: 'FATF Guidelines',
    sourceAr: 'إرشادات فاتف'
  },
  {
    id: '6',
    titleEn: 'Q2 Prudential Returns',
    titleAr: 'التقارير الاحترازية للربع الثاني',
    descriptionEn: 'Quarterly prudential returns including capital adequacy, liquidity ratios, and asset quality reports.',
    descriptionAr: 'التقارير الاحترازية الفصلية بما في ذلك كفاية رأس المال ونسب السيولة وتقارير جودة الأصول.',
    category: 'Reporting',
    categoryAr: 'التقارير',
    month: 7,
    day: 15,
    recurring: true,
    priority: 'high',
    sourceEn: 'Basel III Framework',
    sourceAr: 'إطار بازل 3'
  },
  
  // Q3 Events
  {
    id: '7',
    titleEn: 'Semi-Annual Financial Statements',
    titleAr: 'البيانات المالية نصف السنوية',
    descriptionEn: 'Listed banks must publish reviewed semi-annual financial statements.',
    descriptionAr: 'يجب على البنوك المدرجة نشر البيانات المالية نصف السنوية المراجعة.',
    category: 'Reporting',
    categoryAr: 'التقارير',
    month: 8,
    day: 31,
    recurring: true,
    priority: 'medium',
    sourceEn: 'Securities Regulations',
    sourceAr: 'لوائح الأوراق المالية'
  },
  {
    id: '8',
    titleEn: 'Internal Capital Adequacy Assessment (ICAAP)',
    titleAr: 'تقييم كفاية رأس المال الداخلي',
    descriptionEn: 'Annual ICAAP submission to demonstrate capital planning and stress testing capabilities.',
    descriptionAr: 'تقديم تقييم كفاية رأس المال الداخلي السنوي لإثبات قدرات تخطيط رأس المال واختبار الضغط.',
    category: 'Risk Management',
    categoryAr: 'إدارة المخاطر',
    month: 9,
    day: 30,
    recurring: true,
    priority: 'high',
    sourceEn: 'Basel III Pillar 2',
    sourceAr: 'بازل 3 الركيزة الثانية'
  },
  {
    id: '9',
    titleEn: 'Q3 Prudential Returns',
    titleAr: 'التقارير الاحترازية للربع الثالث',
    descriptionEn: 'Quarterly prudential returns including capital adequacy, liquidity ratios, and asset quality reports.',
    descriptionAr: 'التقارير الاحترازية الفصلية بما في ذلك كفاية رأس المال ونسب السيولة وتقارير جودة الأصول.',
    category: 'Reporting',
    categoryAr: 'التقارير',
    month: 10,
    day: 15,
    recurring: true,
    priority: 'high',
    sourceEn: 'Basel III Framework',
    sourceAr: 'إطار بازل 3'
  },
  
  // Q4 Events
  {
    id: '10',
    titleEn: 'Annual AML/CFT Risk Assessment',
    titleAr: 'تقييم مخاطر مكافحة غسل الأموال السنوي',
    descriptionEn: 'Financial institutions must complete annual enterprise-wide AML/CFT risk assessment.',
    descriptionAr: 'يجب على المؤسسات المالية إكمال تقييم مخاطر مكافحة غسل الأموال على مستوى المؤسسة سنوياً.',
    category: 'AML/CFT',
    categoryAr: 'مكافحة غسل الأموال',
    month: 12,
    day: 31,
    recurring: true,
    priority: 'high',
    sourceEn: 'FATF Recommendation 1',
    sourceAr: 'توصية فاتف رقم 1'
  },
  {
    id: '11',
    titleEn: 'Board Risk Committee Review',
    titleAr: 'مراجعة لجنة المخاطر بمجلس الإدارة',
    descriptionEn: 'Annual review of risk appetite framework and risk management policies by the Board Risk Committee.',
    descriptionAr: 'المراجعة السنوية لإطار الرغبة في المخاطر وسياسات إدارة المخاطر من قبل لجنة المخاطر بمجلس الإدارة.',
    category: 'Governance',
    categoryAr: 'الحوكمة',
    month: 12,
    recurring: true,
    priority: 'medium',
    sourceEn: 'Corporate Governance Code',
    sourceAr: 'قانون حوكمة الشركات'
  },
  {
    id: '12',
    titleEn: 'Sharia Audit Report',
    titleAr: 'تقرير التدقيق الشرعي',
    descriptionEn: 'Islamic financial institutions must submit annual Sharia compliance audit report.',
    descriptionAr: 'يجب على المؤسسات المالية الإسلامية تقديم تقرير التدقيق الشرعي السنوي.',
    category: 'Islamic Finance',
    categoryAr: 'التمويل الإسلامي',
    month: 12,
    day: 31,
    recurring: true,
    priority: 'high',
    sourceEn: 'AAOIFI Governance Standard 3',
    sourceAr: 'معيار حوكمة أيوفي رقم 3'
  },
  {
    id: '13',
    titleEn: 'Q4 Prudential Returns',
    titleAr: 'التقارير الاحترازية للربع الرابع',
    descriptionEn: 'Quarterly prudential returns including capital adequacy, liquidity ratios, and asset quality reports.',
    descriptionAr: 'التقارير الاحترازية الفصلية بما في ذلك كفاية رأس المال ونسب السيولة وتقارير جودة الأصول.',
    category: 'Reporting',
    categoryAr: 'التقارير',
    month: 1,
    day: 15,
    recurring: true,
    priority: 'high',
    sourceEn: 'Basel III Framework',
    sourceAr: 'إطار بازل 3'
  },
  
  // Monthly recurring
  {
    id: '14',
    titleEn: 'Monthly Liquidity Reports',
    titleAr: 'تقارير السيولة الشهرية',
    descriptionEn: 'Monthly submission of LCR and NSFR reports to the Central Bank.',
    descriptionAr: 'التقديم الشهري لتقارير نسبة تغطية السيولة ونسبة صافي التمويل المستقر للبنك المركزي.',
    category: 'Reporting',
    categoryAr: 'التقارير',
    month: 0, // Every month
    day: 10,
    recurring: true,
    priority: 'medium',
    sourceEn: 'Basel III Framework',
    sourceAr: 'إطار بازل 3'
  },
  {
    id: '15',
    titleEn: 'STR Filing Deadline',
    titleAr: 'الموعد النهائي لتقديم تقارير المعاملات المشبوهة',
    descriptionEn: 'Suspicious Transaction Reports must be filed within 24-48 hours of detection.',
    descriptionAr: 'يجب تقديم تقارير المعاملات المشبوهة خلال 24-48 ساعة من الاكتشاف.',
    category: 'AML/CFT',
    categoryAr: 'مكافحة غسل الأموال',
    month: 0, // Ongoing
    recurring: true,
    priority: 'high',
    sourceEn: 'FATF Recommendation 20',
    sourceAr: 'توصية فاتف رقم 20'
  },
];

const categories = [
  { en: 'All', ar: 'الكل' },
  { en: 'Reporting', ar: 'التقارير' },
  { en: 'Governance', ar: 'الحوكمة' },
  { en: 'AML/CFT', ar: 'مكافحة غسل الأموال' },
  { en: 'Risk Management', ar: 'إدارة المخاطر' },
  { en: 'Islamic Finance', ar: 'التمويل الإسلامي' },
];

const months = [
  { en: 'January', ar: 'يناير' },
  { en: 'February', ar: 'فبراير' },
  { en: 'March', ar: 'مارس' },
  { en: 'April', ar: 'أبريل' },
  { en: 'May', ar: 'مايو' },
  { en: 'June', ar: 'يونيو' },
  { en: 'July', ar: 'يوليو' },
  { en: 'August', ar: 'أغسطس' },
  { en: 'September', ar: 'سبتمبر' },
  { en: 'October', ar: 'أكتوبر' },
  { en: 'November', ar: 'نوفمبر' },
  { en: 'December', ar: 'ديسمبر' },
];

export default function RegulatoryCalendar() {
  const { language, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [viewMode, setViewMode] = useState<'month' | 'quarter' | 'year'>('quarter');

  const currentYear = new Date().getFullYear();

  const filteredEvents = useMemo(() => {
    let filtered = regulatoryEvents;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by view mode
    if (viewMode === 'month') {
      filtered = filtered.filter(event => event.month === selectedMonth || event.month === 0);
    } else if (viewMode === 'quarter') {
      const quarterStart = Math.floor((selectedMonth - 1) / 3) * 3 + 1;
      const quarterEnd = quarterStart + 2;
      filtered = filtered.filter(event => 
        (event.month >= quarterStart && event.month <= quarterEnd) || event.month === 0
      );
    }

    // Sort by month and day
    return filtered.sort((a, b) => {
      if (a.month === 0) return 1;
      if (b.month === 0) return 1;
      if (a.month !== b.month) return a.month - b.month;
      return (a.day || 1) - (b.day || 1);
    });
  }, [selectedCategory, selectedMonth, viewMode]);

  const getQuarterLabel = (month: number) => {
    const quarter = Math.ceil(month / 3);
    return language === 'ar' ? `الربع ${quarter}` : `Q${quarter}`;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Info className="w-4 h-4 text-[#d4a84b]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#133129] via-[#1a3d32] to-[#224B40] py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 30% 70%, #d4a84b 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4a84b]/20 border border-[#d4a84b]/30 rounded-full mb-6">
                <Calendar className="w-4 h-4 text-[#d4a84b]" />
                <span className="text-[#d4a84b] text-sm font-medium">
                  {language === 'ar' ? `${currentYear} التقويم التنظيمي` : `${currentYear} Regulatory Calendar`}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'التقويم التنظيمي' : 'Regulatory Calendar'}
              </h1>
              <p className="text-[#faf9f6]/80 text-lg mb-8">
                {language === 'ar' 
                  ? 'المواعيد النهائية الرئيسية للامتثال والتقارير للمؤسسات المالية'
                  : 'Key compliance and reporting deadlines for financial institutions'
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="py-8 bg-white border-b border-[#133129]/10 sticky top-16 z-20">
          <div className="container">
            <div className={`flex flex-wrap items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-[#133129]/5 rounded-lg p-1">
                {(['month', 'quarter', 'year'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-[#133129] text-[#faf9f6]'
                        : 'text-[#133129] hover:bg-[#133129]/10'
                    }`}
                  >
                    {language === 'ar' 
                      ? mode === 'month' ? 'شهري' : mode === 'quarter' ? 'ربع سنوي' : 'سنوي'
                      : mode === 'month' ? 'Month' : mode === 'quarter' ? 'Quarter' : 'Year'
                    }
                  </button>
                ))}
              </div>

              {/* Month/Quarter Navigation */}
              {viewMode !== 'year' && (
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => setSelectedMonth(prev => prev > 1 ? prev - (viewMode === 'quarter' ? 3 : 1) : 12)}
                    className="p-2 rounded-lg bg-[#133129]/5 hover:bg-[#133129]/10 transition-colors"
                  >
                    {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                  </button>
                  <span className="text-lg font-semibold text-[#133129] min-w-[120px] text-center">
                    {viewMode === 'month' 
                      ? (language === 'ar' ? months[selectedMonth - 1].ar : months[selectedMonth - 1].en)
                      : getQuarterLabel(selectedMonth)
                    }
                  </span>
                  <button
                    onClick={() => setSelectedMonth(prev => prev < 12 ? prev + (viewMode === 'quarter' ? 3 : 1) : 1)}
                    className="p-2 rounded-lg bg-[#133129]/5 hover:bg-[#133129]/10 transition-colors"
                  >
                    {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              )}

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.en}
                    onClick={() => setSelectedCategory(cat.en)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat.en
                        ? 'bg-[#133129] text-[#faf9f6]'
                        : 'bg-[#133129]/5 text-[#133129] hover:bg-[#133129]/10'
                    }`}
                  >
                    {language === 'ar' ? cat.ar : cat.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-4">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-xl border ${getPriorityBg(event.priority)} p-5 sm:p-6 hover:shadow-md transition-shadow`}
                >
                  <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#133129] rounded-lg flex flex-col items-center justify-center text-center">
                        {event.month === 0 ? (
                          <>
                            <Clock className="w-5 h-5 text-[#d4a84b]" />
                            <span className="text-[#faf9f6]/70 text-xs mt-1">
                              {language === 'ar' ? 'مستمر' : 'Ongoing'}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#d4a84b] text-xs font-medium">
                              {language === 'ar' ? months[event.month - 1].ar.slice(0, 3) : months[event.month - 1].en.slice(0, 3)}
                            </span>
                            <span className="text-[#faf9f6] text-xl font-bold">
                              {event.day || '—'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {getPriorityIcon(event.priority)}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          event.priority === 'high' ? 'bg-red-100 text-red-700' :
                          event.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {language === 'ar' 
                            ? event.priority === 'high' ? 'أولوية عالية' : event.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'
                            : event.priority === 'high' ? 'High Priority' : event.priority === 'medium' ? 'Medium' : 'Low'
                          }
                        </span>
                        <span className="px-2 py-0.5 bg-[#133129]/10 text-[#133129] rounded-full text-xs">
                          {language === 'ar' ? event.categoryAr : event.category}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-[#133129] mb-2">
                        {language === 'ar' ? event.titleAr : event.titleEn}
                      </h3>
                      <p className="text-[#406D61] text-sm mb-3">
                        {language === 'ar' ? event.descriptionAr : event.descriptionEn}
                      </p>
                      
                      <div className={`flex items-center gap-2 text-xs text-[#406D61]/70 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{language === 'ar' ? 'المصدر:' : 'Source:'}</span>
                        <span className="font-medium">{language === 'ar' ? event.sourceAr : event.sourceEn}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-[#406D61]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#133129] mb-2">
                  {language === 'ar' ? 'لا توجد أحداث' : 'No events found'}
                </h3>
                <p className="text-[#406D61]">
                  {language === 'ar' ? 'جرب تغيير الفلاتر' : 'Try changing the filters'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-[#133129]/5">
          <div className="container">
            <div className={`flex items-start gap-3 max-w-3xl mx-auto ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <Info className="w-5 h-5 text-[#406D61] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#406D61]">
                {language === 'ar'
                  ? 'هذا التقويم للأغراض المرجعية فقط. يرجى التحقق من المواعيد النهائية الفعلية مع الجهات التنظيمية المعنية. قد تختلف المواعيد حسب الولاية القضائية ونوع المؤسسة.'
                  : 'This calendar is for reference purposes only. Please verify actual deadlines with relevant regulatory authorities. Dates may vary by jurisdiction and institution type.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-[#133129]">
          <div className="container text-center">
            <h2 className="text-2xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هل تحتاج مساعدة في الامتثال التنظيمي؟' : 'Need Help with Regulatory Compliance?'}
            </h2>
            <p className="text-[#faf9f6]/70 mb-6 max-w-xl mx-auto">
              {language === 'ar'
                ? 'فريقنا من الخبراء يمكنه مساعدتك في ضمان الامتثال لجميع المتطلبات التنظيمية.'
                : 'Our team of experts can help you ensure compliance with all regulatory requirements.'
              }
            </p>
            <Button asChild className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
              <a href="/contact">{language === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
