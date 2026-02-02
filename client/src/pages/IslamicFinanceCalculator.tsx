/**
 * Islamic Finance Calculator Suite
 * CauseWay - Financial & Banking Consultancies
 * 
 * Design Philosophy: Premium financial tool with complete methodology transparency
 * Features: Murabaha, Ijara, Sukuk Yield, Zakat calculators with AAOIFI references
 */

import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  Building2, 
  TrendingUp, 
  Heart,
  Info,
  Download,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  Landmark,
  Coins,
  FileText
} from 'lucide-react';
import CalculatorPDFExport from '@/components/CalculatorPDFExport';

// ============================================
// CONTENT TRANSLATIONS
// ============================================
const content = {
  en: {
    pageTitle: 'Islamic Finance Calculator Suite',
    pageSubtitle: 'Shariah-compliant financial calculations with full methodology transparency',
    disclaimer: 'These calculators are for educational and estimation purposes only. Please consult with qualified Shariah scholars and financial advisors for actual transactions.',
    
    // Calculator Names
    murabaha: 'Murabaha',
    ijara: 'Ijara',
    sukuk: 'Sukuk Yield',
    zakat: 'Zakat',
    
    // Murabaha
    murabahaTitle: 'Murabaha Calculator',
    murabahaDesc: 'Cost-plus financing calculation based on AAOIFI Shariah Standard No. 8',
    costPrice: 'Cost Price (Principal)',
    profitRate: 'Annual Profit Rate (%)',
    financingPeriod: 'Financing Period (Months)',
    calculate: 'Calculate',
    reset: 'Reset',
    
    // Murabaha Results
    totalSalePrice: 'Total Sale Price',
    profitAmount: 'Profit Amount',
    monthlyPayment: 'Monthly Payment',
    effectiveRate: 'Effective Annual Rate',
    
    // Ijara
    ijaraTitle: 'Ijara Calculator',
    ijaraDesc: 'Islamic lease calculation based on AAOIFI Shariah Standard No. 9',
    assetValue: 'Asset Value',
    leaseTerm: 'Lease Term (Months)',
    residualValue: 'Residual Value (%)',
    managementFee: 'Management Fee (%)',
    
    // Ijara Results
    monthlyRent: 'Monthly Rent',
    totalPayments: 'Total Lease Payments',
    implicitRate: 'Implicit Rate',
    ownershipTransfer: 'Ownership Transfer Value',
    
    // Sukuk
    sukukTitle: 'Sukuk Yield Calculator',
    sukukDesc: 'Islamic bond yield calculation based on AAOIFI Shariah Standard No. 17',
    faceValue: 'Face Value',
    couponRate: 'Coupon Rate (%)',
    currentPrice: 'Current Market Price',
    yearsToMaturity: 'Years to Maturity',
    
    // Sukuk Results
    currentYield: 'Current Yield',
    yieldToMaturity: 'Yield to Maturity (Approx)',
    annualCoupon: 'Annual Coupon Payment',
    totalReturn: 'Total Return at Maturity',
    
    // Zakat
    zakatTitle: 'Zakat Calculator',
    zakatDesc: 'Wealth purification calculation based on Islamic jurisprudence',
    cashSavings: 'Cash & Bank Savings',
    goldValue: 'Gold Value',
    silverValue: 'Silver Value',
    investments: 'Stocks & Investments',
    businessAssets: 'Business Assets',
    liabilities: 'Liabilities (Debts)',
    
    // Zakat Results
    totalAssets: 'Total Zakatable Assets',
    netWealth: 'Net Zakatable Wealth',
    nisabThreshold: 'Nisab Threshold (Gold)',
    zakatDue: 'Zakat Due (2.5%)',
    zakatStatus: 'Zakat Status',
    zakatRequired: 'Zakat is obligatory',
    zakatNotRequired: 'Below Nisab - Zakat not required',
    
    // Methodology
    methodology: 'Methodology',
    formula: 'Formula',
    shariahBasis: 'Shariah Basis',
    aaoifiReference: 'AAOIFI Reference',
    showMethodology: 'Show Methodology',
    hideMethodology: 'Hide Methodology',
    
    // Export
    exportPdf: 'Export Report',
    printResults: 'Print Results',
    
    // Nisab info
    goldNisab: '87.48 grams of gold',
    silverNisab: '612.36 grams of silver',
    currentGoldPrice: 'Current Gold Price (per gram)',
    
    // Units
    currency: 'USD',
    perMonth: '/month',
    perYear: '/year',
  },
  ar: {
    pageTitle: 'حاسبة التمويل الإسلامي',
    pageSubtitle: 'حسابات مالية متوافقة مع الشريعة مع شفافية منهجية كاملة',
    disclaimer: 'هذه الحاسبات للأغراض التعليمية والتقديرية فقط. يرجى استشارة علماء الشريعة المؤهلين والمستشارين الماليين للمعاملات الفعلية.',
    
    // Calculator Names
    murabaha: 'المرابحة',
    ijara: 'الإجارة',
    sukuk: 'عائد الصكوك',
    zakat: 'الزكاة',
    
    // Murabaha
    murabahaTitle: 'حاسبة المرابحة',
    murabahaDesc: 'حساب التمويل بالتكلفة زائد الربح وفق معيار أيوفي الشرعي رقم 8',
    costPrice: 'سعر التكلفة (المبلغ الأصلي)',
    profitRate: 'معدل الربح السنوي (%)',
    financingPeriod: 'فترة التمويل (أشهر)',
    calculate: 'احسب',
    reset: 'إعادة تعيين',
    
    // Murabaha Results
    totalSalePrice: 'إجمالي سعر البيع',
    profitAmount: 'مبلغ الربح',
    monthlyPayment: 'القسط الشهري',
    effectiveRate: 'المعدل الفعلي السنوي',
    
    // Ijara
    ijaraTitle: 'حاسبة الإجارة',
    ijaraDesc: 'حساب الإجارة الإسلامية وفق معيار أيوفي الشرعي رقم 9',
    assetValue: 'قيمة الأصل',
    leaseTerm: 'مدة الإجارة (أشهر)',
    residualValue: 'القيمة المتبقية (%)',
    managementFee: 'رسوم الإدارة (%)',
    
    // Ijara Results
    monthlyRent: 'الإيجار الشهري',
    totalPayments: 'إجمالي مدفوعات الإجارة',
    implicitRate: 'المعدل الضمني',
    ownershipTransfer: 'قيمة نقل الملكية',
    
    // Sukuk
    sukukTitle: 'حاسبة عائد الصكوك',
    sukukDesc: 'حساب عائد الصكوك الإسلامية وفق معيار أيوفي الشرعي رقم 17',
    faceValue: 'القيمة الاسمية',
    couponRate: 'معدل الكوبون (%)',
    currentPrice: 'السعر السوقي الحالي',
    yearsToMaturity: 'سنوات حتى الاستحقاق',
    
    // Sukuk Results
    currentYield: 'العائد الحالي',
    yieldToMaturity: 'العائد حتى الاستحقاق (تقريبي)',
    annualCoupon: 'دفعة الكوبون السنوية',
    totalReturn: 'إجمالي العائد عند الاستحقاق',
    
    // Zakat
    zakatTitle: 'حاسبة الزكاة',
    zakatDesc: 'حساب تزكية المال وفق الفقه الإسلامي',
    cashSavings: 'النقد والمدخرات البنكية',
    goldValue: 'قيمة الذهب',
    silverValue: 'قيمة الفضة',
    investments: 'الأسهم والاستثمارات',
    businessAssets: 'أصول الأعمال',
    liabilities: 'الالتزامات (الديون)',
    
    // Zakat Results
    totalAssets: 'إجمالي الأصول الزكوية',
    netWealth: 'صافي الثروة الزكوية',
    nisabThreshold: 'نصاب الزكاة (الذهب)',
    zakatDue: 'الزكاة المستحقة (2.5%)',
    zakatStatus: 'حالة الزكاة',
    zakatRequired: 'الزكاة واجبة',
    zakatNotRequired: 'أقل من النصاب - الزكاة غير واجبة',
    
    // Methodology
    methodology: 'المنهجية',
    formula: 'المعادلة',
    shariahBasis: 'الأساس الشرعي',
    aaoifiReference: 'مرجع أيوفي',
    showMethodology: 'عرض المنهجية',
    hideMethodology: 'إخفاء المنهجية',
    
    // Export
    exportPdf: 'تصدير التقرير',
    printResults: 'طباعة النتائج',
    
    // Nisab info
    goldNisab: '87.48 جرام من الذهب',
    silverNisab: '612.36 جرام من الفضة',
    currentGoldPrice: 'سعر الذهب الحالي (للجرام)',
    
    // Units
    currency: 'دولار',
    perMonth: '/شهر',
    perYear: '/سنة',
  }
};

// ============================================
// METHODOLOGY CONTENT
// ============================================
const methodologyContent = {
  en: {
    murabaha: {
      title: 'Murabaha Methodology',
      description: 'Murabaha is a cost-plus-profit sale where the seller discloses the actual cost and adds a known profit margin. It is one of the most widely used Islamic financing structures.',
      formula: `Total Sale Price = Cost Price + Profit Amount
Profit Amount = Cost Price × (Profit Rate / 100) × (Period / 12)
Monthly Payment = Total Sale Price / Number of Months
Effective Rate = (Profit / Cost) × (12 / Period) × 100`,
      shariahBasis: 'Based on the principle of Bay\' (sale) where the seller must disclose the cost and profit margin. The Prophet (PBUH) said: "The seller and buyer have the option to cancel or confirm the bargain as long as they have not separated."',
      aaoifiRef: 'AAOIFI Shariah Standard No. 8: Murabaha to the Purchase Orderer',
      keyPoints: [
        'Cost and profit must be clearly disclosed',
        'The bank must own the asset before selling',
        'Profit rate is fixed at contract inception',
        'No penalty for early payment (recommended)'
      ]
    },
    ijara: {
      title: 'Ijara Methodology',
      description: 'Ijara is an Islamic lease contract where the lessor transfers the usufruct (right to use) of an asset to the lessee for an agreed rental. In Ijara Muntahia Bittamleek, ownership transfers at the end.',
      formula: `Monthly Rent = (Asset Value - Residual Value + Total Profit) / Lease Term
Total Profit = (Asset Value × Management Fee Rate × Lease Years)
Residual Value = Asset Value × Residual Percentage
Implicit Rate = ((Total Payments - Asset Value) / Asset Value) × (12 / Term) × 100`,
      shariahBasis: 'Based on the Hadith: "Give the worker his wages before his sweat dries." Ijara involves the sale of usufruct, which is permissible in Islam as long as the asset and its use are halal.',
      aaoifiRef: 'AAOIFI Shariah Standard No. 9: Ijarah and Ijarah Muntahia Bittamleek',
      keyPoints: [
        'Lessor bears ownership risks (maintenance, insurance)',
        'Rental must be known and agreed upon',
        'Asset must be deliverable and usable',
        'Ownership transfer must be through separate contract'
      ]
    },
    sukuk: {
      title: 'Sukuk Yield Methodology',
      description: 'Sukuk are Shariah-compliant investment certificates representing proportionate ownership in underlying assets. Unlike bonds, sukuk holders share in the asset\'s returns rather than receiving interest.',
      formula: `Current Yield = (Annual Coupon / Current Price) × 100
Yield to Maturity ≈ [C + (F - P) / n] / [(F + P) / 2] × 100
Where: C = Annual Coupon, F = Face Value, P = Price, n = Years
Total Return = (Coupons × Years) + (Face Value - Purchase Price)`,
      shariahBasis: 'Sukuk represent ownership in real assets or services, making returns halal as they come from legitimate business activities rather than interest (riba).',
      aaoifiRef: 'AAOIFI Shariah Standard No. 17: Investment Sukuk',
      keyPoints: [
        'Must be backed by tangible assets or services',
        'Returns come from asset performance, not interest',
        'Sukuk holders share profits and risks',
        'Cannot be traded below par if Murabaha-based'
      ]
    },
    zakat: {
      title: 'Zakat Methodology',
      description: 'Zakat is one of the Five Pillars of Islam, requiring Muslims to give 2.5% of their wealth above the nisab threshold annually. It purifies wealth and supports those in need.',
      formula: `Net Zakatable Wealth = Total Assets - Liabilities
Nisab (Gold) = 87.48 grams × Current Gold Price
If Net Wealth ≥ Nisab: Zakat Due = Net Wealth × 2.5%
If Net Wealth < Nisab: No Zakat Required`,
      shariahBasis: 'Allah says: "Take from their wealth a charity by which you purify them and cause them increase." (Quran 9:103). The Prophet (PBUH) set the nisab at 20 dinars of gold or 200 dirhams of silver.',
      aaoifiRef: 'AAOIFI Shariah Standard No. 35: Zakah',
      keyPoints: [
        'Must possess wealth for one lunar year (hawl)',
        'Nisab based on gold (87.48g) or silver (612.36g)',
        'Rate is 2.5% for most assets',
        'Agricultural produce has different rates (5-10%)'
      ]
    }
  },
  ar: {
    murabaha: {
      title: 'منهجية المرابحة',
      description: 'المرابحة هي بيع بالتكلفة زائد الربح حيث يفصح البائع عن التكلفة الفعلية ويضيف هامش ربح معلوم. وهي من أكثر هياكل التمويل الإسلامي استخداماً.',
      formula: `إجمالي سعر البيع = سعر التكلفة + مبلغ الربح
مبلغ الربح = سعر التكلفة × (معدل الربح / 100) × (الفترة / 12)
القسط الشهري = إجمالي سعر البيع / عدد الأشهر
المعدل الفعلي = (الربح / التكلفة) × (12 / الفترة) × 100`,
      shariahBasis: 'مبني على مبدأ البيع حيث يجب على البائع الإفصاح عن التكلفة وهامش الربح. قال النبي ﷺ: "البيّعان بالخيار ما لم يتفرقا."',
      aaoifiRef: 'معيار أيوفي الشرعي رقم 8: المرابحة للآمر بالشراء',
      keyPoints: [
        'يجب الإفصاح عن التكلفة والربح بوضوح',
        'يجب أن يمتلك البنك الأصل قبل البيع',
        'معدل الربح ثابت عند إبرام العقد',
        'لا غرامة على السداد المبكر (مستحب)'
      ]
    },
    ijara: {
      title: 'منهجية الإجارة',
      description: 'الإجارة هي عقد إيجار إسلامي ينقل فيه المؤجر منفعة (حق الاستخدام) للأصل إلى المستأجر مقابل أجرة متفق عليها. في الإجارة المنتهية بالتمليك، تنتقل الملكية في النهاية.',
      formula: `الإيجار الشهري = (قيمة الأصل - القيمة المتبقية + إجمالي الربح) / مدة الإجارة
إجمالي الربح = (قيمة الأصل × معدل رسوم الإدارة × سنوات الإجارة)
القيمة المتبقية = قيمة الأصل × نسبة القيمة المتبقية
المعدل الضمني = ((إجمالي المدفوعات - قيمة الأصل) / قيمة الأصل) × (12 / المدة) × 100`,
      shariahBasis: 'مبني على الحديث: "أعطوا الأجير أجره قبل أن يجف عرقه." الإجارة تتضمن بيع المنفعة، وهو جائز في الإسلام طالما أن الأصل واستخدامه حلال.',
      aaoifiRef: 'معيار أيوفي الشرعي رقم 9: الإجارة والإجارة المنتهية بالتمليك',
      keyPoints: [
        'المؤجر يتحمل مخاطر الملكية (الصيانة، التأمين)',
        'يجب أن تكون الأجرة معلومة ومتفق عليها',
        'يجب أن يكون الأصل قابلاً للتسليم والاستخدام',
        'نقل الملكية يجب أن يتم بعقد منفصل'
      ]
    },
    sukuk: {
      title: 'منهجية عائد الصكوك',
      description: 'الصكوك هي شهادات استثمار متوافقة مع الشريعة تمثل ملكية نسبية في الأصول الأساسية. على عكس السندات، يشارك حاملو الصكوك في عوائد الأصل بدلاً من تلقي الفائدة.',
      formula: `العائد الحالي = (الكوبون السنوي / السعر الحالي) × 100
العائد حتى الاستحقاق ≈ [ك + (ق - س) / ن] / [(ق + س) / 2] × 100
حيث: ك = الكوبون السنوي، ق = القيمة الاسمية، س = السعر، ن = السنوات
إجمالي العائد = (الكوبونات × السنوات) + (القيمة الاسمية - سعر الشراء)`,
      shariahBasis: 'الصكوك تمثل ملكية في أصول أو خدمات حقيقية، مما يجعل العوائد حلالاً لأنها تأتي من أنشطة تجارية مشروعة وليس من الفائدة (الربا).',
      aaoifiRef: 'معيار أيوفي الشرعي رقم 17: صكوك الاستثمار',
      keyPoints: [
        'يجب أن تكون مدعومة بأصول أو خدمات ملموسة',
        'العوائد تأتي من أداء الأصل، وليس الفائدة',
        'حاملو الصكوك يتشاركون الأرباح والمخاطر',
        'لا يمكن تداولها بأقل من القيمة الاسمية إذا كانت قائمة على المرابحة'
      ]
    },
    zakat: {
      title: 'منهجية الزكاة',
      description: 'الزكاة هي أحد أركان الإسلام الخمسة، تتطلب من المسلمين إخراج 2.5% من ثروتهم فوق النصاب سنوياً. تطهر المال وتدعم المحتاجين.',
      formula: `صافي الثروة الزكوية = إجمالي الأصول - الالتزامات
النصاب (الذهب) = 87.48 جرام × سعر الذهب الحالي
إذا كان صافي الثروة ≥ النصاب: الزكاة المستحقة = صافي الثروة × 2.5%
إذا كان صافي الثروة < النصاب: لا زكاة مستحقة`,
      shariahBasis: 'قال تعالى: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا" (التوبة: 103). حدد النبي ﷺ النصاب بـ 20 ديناراً من الذهب أو 200 درهم من الفضة.',
      aaoifiRef: 'معيار أيوفي الشرعي رقم 35: الزكاة',
      keyPoints: [
        'يجب حيازة المال لسنة قمرية كاملة (الحول)',
        'النصاب مبني على الذهب (87.48 جم) أو الفضة (612.36 جم)',
        'المعدل 2.5% لمعظم الأصول',
        'المنتجات الزراعية لها معدلات مختلفة (5-10%)'
      ]
    }
  }
};

// ============================================
// CALCULATOR COMPONENTS
// ============================================

// Murabaha Calculator
function MurabahaCalculator({ t, isRTL }: { t: typeof content.en; isRTL: boolean }) {
  const [costPrice, setCostPrice] = useState<string>('100000');
  const [profitRate, setProfitRate] = useState<string>('8');
  const [period, setPeriod] = useState<string>('36');
  const [showMethodology, setShowMethodology] = useState(false);
  
  const methodology = isRTL ? methodologyContent.ar.murabaha : methodologyContent.en.murabaha;
  
  const results = useMemo(() => {
    const cost = parseFloat(costPrice) || 0;
    const rate = parseFloat(profitRate) || 0;
    const months = parseFloat(period) || 1;
    
    const profitAmount = cost * (rate / 100) * (months / 12);
    const totalSalePrice = cost + profitAmount;
    const monthlyPayment = totalSalePrice / months;
    const effectiveRate = cost > 0 ? (profitAmount / cost) * (12 / months) * 100 : 0;
    
    return {
      profitAmount,
      totalSalePrice,
      monthlyPayment,
      effectiveRate
    };
  }, [costPrice, profitRate, period]);
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-primary" />
            {t.murabahaTitle}
          </CardTitle>
          <CardDescription>{t.murabahaDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="costPrice">{t.costPrice}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="costPrice"
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="pl-7"
                  placeholder="100,000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profitRate">{t.profitRate}</Label>
              <div className="relative">
                <Input
                  id="profitRate"
                  type="number"
                  step="0.1"
                  value={profitRate}
                  onChange={(e) => setProfitRate(e.target.value)}
                  className="pr-7"
                  placeholder="8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">{t.financingPeriod}</Label>
              <Input
                id="period"
                type="number"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="36"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Results Section */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.totalSalePrice}</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(results.totalSalePrice)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.profitAmount}</p>
              <p className="text-2xl font-bold text-amber-600">${formatNumber(results.profitAmount)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.monthlyPayment}</p>
              <p className="text-2xl font-bold text-emerald-600">${formatNumber(results.monthlyPayment)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.effectiveRate}</p>
              <p className="text-2xl font-bold text-blue-600">{formatNumber(results.effectiveRate)}%</p>
            </div>
          </div>
          
          {/* Export Button */}
          <div className="mt-6 flex justify-center">
            <CalculatorPDFExport 
              data={{
                type: 'murabaha',
                inputs: {
                  costPrice: parseFloat(costPrice) || 0,
                  profitRate: parseFloat(profitRate) || 0,
                  period: parseFloat(period) || 0,
                },
                results: {
                  totalSalePrice: results.totalSalePrice,
                  profitAmount: results.profitAmount,
                  monthlyPayment: results.monthlyPayment,
                  effectiveRate: results.effectiveRate,
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Methodology Section */}
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setShowMethodology(!showMethodology)}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {showMethodology ? t.hideMethodology : t.showMethodology}
            </span>
            {showMethodology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        {showMethodology && (
          <CardContent className="space-y-4 pt-0">
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.methodology}</h4>
              <p className="text-sm text-muted-foreground">{methodology.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.formula}</h4>
              <pre className="bg-muted/50 p-3 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                {methodology.formula}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.shariahBasis}</h4>
              <p className="text-sm text-muted-foreground italic">{methodology.shariahBasis}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.aaoifiReference}</h4>
              <p className="text-sm font-medium">{methodology.aaoifiRef}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">Key Points</h4>
              <ul className="space-y-1">
                {methodology.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// Ijara Calculator
function IjaraCalculator({ t, isRTL }: { t: typeof content.en; isRTL: boolean }) {
  const [assetValue, setAssetValue] = useState<string>('250000');
  const [leaseTerm, setLeaseTerm] = useState<string>('60');
  const [residualPercent, setResidualPercent] = useState<string>('10');
  const [managementFee, setManagementFee] = useState<string>('6');
  const [showMethodology, setShowMethodology] = useState(false);
  
  const methodology = isRTL ? methodologyContent.ar.ijara : methodologyContent.en.ijara;
  
  const results = useMemo(() => {
    const asset = parseFloat(assetValue) || 0;
    const term = parseFloat(leaseTerm) || 1;
    const residualPct = parseFloat(residualPercent) || 0;
    const fee = parseFloat(managementFee) || 0;
    
    const residualValue = asset * (residualPct / 100);
    const years = term / 12;
    const totalProfit = asset * (fee / 100) * years;
    const monthlyRent = (asset - residualValue + totalProfit) / term;
    const totalPayments = monthlyRent * term;
    const implicitRate = asset > 0 ? ((totalPayments - asset) / asset) * (12 / term) * 100 : 0;
    
    return {
      monthlyRent,
      totalPayments,
      implicitRate,
      residualValue
    };
  }, [assetValue, leaseTerm, residualPercent, managementFee]);
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-primary" />
            {t.ijaraTitle}
          </CardTitle>
          <CardDescription>{t.ijaraDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assetValue">{t.assetValue}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="assetValue"
                  type="number"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leaseTerm">{t.leaseTerm}</Label>
              <Input
                id="leaseTerm"
                type="number"
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="residualPercent">{t.residualValue}</Label>
              <div className="relative">
                <Input
                  id="residualPercent"
                  type="number"
                  step="0.1"
                  value={residualPercent}
                  onChange={(e) => setResidualPercent(e.target.value)}
                  className="pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="managementFee">{t.managementFee}</Label>
              <div className="relative">
                <Input
                  id="managementFee"
                  type="number"
                  step="0.1"
                  value={managementFee}
                  onChange={(e) => setManagementFee(e.target.value)}
                  className="pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.monthlyRent}</p>
              <p className="text-2xl font-bold text-emerald-600">${formatNumber(results.monthlyRent)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.totalPayments}</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(results.totalPayments)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.implicitRate}</p>
              <p className="text-2xl font-bold text-blue-600">{formatNumber(results.implicitRate)}%</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.ownershipTransfer}</p>
              <p className="text-2xl font-bold text-amber-600">${formatNumber(results.residualValue)}</p>
            </div>
          </div>
          
          {/* Export Button */}
          <div className="mt-6 flex justify-center">
            <CalculatorPDFExport 
              data={{
                type: 'ijara',
                inputs: {
                  assetValue: parseFloat(assetValue) || 0,
                  leaseTerm: parseFloat(leaseTerm) || 0,
                  residualPercent: parseFloat(residualPercent) || 0,
                  managementFee: parseFloat(managementFee) || 0,
                },
                results: {
                  monthlyRent: results.monthlyRent,
                  totalPayments: results.totalPayments,
                  implicitRate: results.implicitRate,
                  ownershipTransfer: results.residualValue,
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setShowMethodology(!showMethodology)}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {showMethodology ? t.hideMethodology : t.showMethodology}
            </span>
            {showMethodology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        {showMethodology && (
          <CardContent className="space-y-4 pt-0">
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.methodology}</h4>
              <p className="text-sm text-muted-foreground">{methodology.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.formula}</h4>
              <pre className="bg-muted/50 p-3 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                {methodology.formula}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.shariahBasis}</h4>
              <p className="text-sm text-muted-foreground italic">{methodology.shariahBasis}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.aaoifiReference}</h4>
              <p className="text-sm font-medium">{methodology.aaoifiRef}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">Key Points</h4>
              <ul className="space-y-1">
                {methodology.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// Sukuk Calculator
function SukukCalculator({ t, isRTL }: { t: typeof content.en; isRTL: boolean }) {
  const [faceValue, setFaceValue] = useState<string>('1000');
  const [couponRate, setCouponRate] = useState<string>('5');
  const [currentPrice, setCurrentPrice] = useState<string>('980');
  const [yearsToMaturity, setYearsToMaturity] = useState<string>('5');
  const [showMethodology, setShowMethodology] = useState(false);
  
  const methodology = isRTL ? methodologyContent.ar.sukuk : methodologyContent.en.sukuk;
  
  const results = useMemo(() => {
    const face = parseFloat(faceValue) || 0;
    const coupon = parseFloat(couponRate) || 0;
    const price = parseFloat(currentPrice) || 0;
    const years = parseFloat(yearsToMaturity) || 1;
    
    const annualCoupon = face * (coupon / 100);
    const currentYield = price > 0 ? (annualCoupon / price) * 100 : 0;
    // Approximate YTM formula
    const ytm = price > 0 ? ((annualCoupon + (face - price) / years) / ((face + price) / 2)) * 100 : 0;
    const totalReturn = (annualCoupon * years) + (face - price);
    
    return {
      annualCoupon,
      currentYield,
      ytm,
      totalReturn
    };
  }, [faceValue, couponRate, currentPrice, yearsToMaturity]);
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            {t.sukukTitle}
          </CardTitle>
          <CardDescription>{t.sukukDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faceValue">{t.faceValue}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="faceValue"
                  type="number"
                  value={faceValue}
                  onChange={(e) => setFaceValue(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="couponRate">{t.couponRate}</Label>
              <div className="relative">
                <Input
                  id="couponRate"
                  type="number"
                  step="0.1"
                  value={couponRate}
                  onChange={(e) => setCouponRate(e.target.value)}
                  className="pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentPrice">{t.currentPrice}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="currentPrice"
                  type="number"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsToMaturity">{t.yearsToMaturity}</Label>
              <Input
                id="yearsToMaturity"
                type="number"
                step="0.5"
                value={yearsToMaturity}
                onChange={(e) => setYearsToMaturity(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.currentYield}</p>
              <p className="text-2xl font-bold text-blue-600">{formatNumber(results.currentYield)}%</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.yieldToMaturity}</p>
              <p className="text-2xl font-bold text-primary">{formatNumber(results.ytm)}%</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.annualCoupon}</p>
              <p className="text-2xl font-bold text-emerald-600">${formatNumber(results.annualCoupon)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.totalReturn}</p>
              <p className="text-2xl font-bold text-amber-600">${formatNumber(results.totalReturn)}</p>
            </div>
          </div>
          
          {/* Export Button */}
          <div className="mt-6 flex justify-center">
            <CalculatorPDFExport 
              data={{
                type: 'sukuk',
                inputs: {
                  faceValue: parseFloat(faceValue) || 0,
                  couponRate: parseFloat(couponRate) || 0,
                  currentPrice: parseFloat(currentPrice) || 0,
                  yearsToMaturity: parseFloat(yearsToMaturity) || 0,
                },
                results: {
                  currentYield: results.currentYield,
                  ytm: results.ytm,
                  annualCoupon: results.annualCoupon,
                  totalReturn: results.totalReturn,
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setShowMethodology(!showMethodology)}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {showMethodology ? t.hideMethodology : t.showMethodology}
            </span>
            {showMethodology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        {showMethodology && (
          <CardContent className="space-y-4 pt-0">
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.methodology}</h4>
              <p className="text-sm text-muted-foreground">{methodology.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.formula}</h4>
              <pre className="bg-muted/50 p-3 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                {methodology.formula}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.shariahBasis}</h4>
              <p className="text-sm text-muted-foreground italic">{methodology.shariahBasis}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.aaoifiReference}</h4>
              <p className="text-sm font-medium">{methodology.aaoifiRef}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">Key Points</h4>
              <ul className="space-y-1">
                {methodology.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// Zakat Calculator
function ZakatCalculator({ t, isRTL }: { t: typeof content.en; isRTL: boolean }) {
  const [cash, setCash] = useState<string>('50000');
  const [gold, setGold] = useState<string>('10000');
  const [silver, setSilver] = useState<string>('0');
  const [investments, setInvestments] = useState<string>('25000');
  const [businessAssets, setBusinessAssets] = useState<string>('0');
  const [liabilities, setLiabilities] = useState<string>('5000');
  const [goldPrice, setGoldPrice] = useState<string>('85'); // per gram
  const [showMethodology, setShowMethodology] = useState(false);
  
  const methodology = isRTL ? methodologyContent.ar.zakat : methodologyContent.en.zakat;
  
  const results = useMemo(() => {
    const totalAssets = 
      (parseFloat(cash) || 0) +
      (parseFloat(gold) || 0) +
      (parseFloat(silver) || 0) +
      (parseFloat(investments) || 0) +
      (parseFloat(businessAssets) || 0);
    
    const netWealth = totalAssets - (parseFloat(liabilities) || 0);
    const nisab = 87.48 * (parseFloat(goldPrice) || 85); // 87.48 grams of gold
    const zakatDue = netWealth >= nisab ? netWealth * 0.025 : 0;
    const isZakatRequired = netWealth >= nisab;
    
    return {
      totalAssets,
      netWealth,
      nisab,
      zakatDue,
      isZakatRequired
    };
  }, [cash, gold, silver, investments, businessAssets, liabilities, goldPrice]);
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-primary" />
            {t.zakatTitle}
          </CardTitle>
          <CardDescription>{t.zakatDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Nisab Reference */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="space-y-2 flex-1">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {t.nisabThreshold}: {t.goldNisab}
                </p>
                <div className="flex items-center gap-2">
                  <Label htmlFor="goldPrice" className="text-xs text-amber-700 dark:text-amber-300 whitespace-nowrap">
                    {t.currentGoldPrice}:
                  </Label>
                  <div className="relative w-32">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                    <Input
                      id="goldPrice"
                      type="number"
                      value={goldPrice}
                      onChange={(e) => setGoldPrice(e.target.value)}
                      className="h-8 text-sm pl-5"
                    />
                  </div>
                  <span className="text-xs text-amber-700 dark:text-amber-300">
                    = ${formatNumber(results.nisab)} Nisab
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cash" className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                {t.cashSavings}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="cash"
                  type="number"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gold" className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                {t.goldValue}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="gold"
                  type="number"
                  value={gold}
                  onChange={(e) => setGold(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="silver">{t.silverValue}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="silver"
                  type="number"
                  value={silver}
                  onChange={(e) => setSilver(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="investments" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {t.investments}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="investments"
                  type="number"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAssets" className="flex items-center gap-2">
                <Landmark className="h-4 w-4" />
                {t.businessAssets}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="businessAssets"
                  type="number"
                  value={businessAssets}
                  onChange={(e) => setBusinessAssets(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="liabilities" className="flex items-center gap-2 text-red-600">
                <FileText className="h-4 w-4" />
                {t.liabilities}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  id="liabilities"
                  type="number"
                  value={liabilities}
                  onChange={(e) => setLiabilities(e.target.value)}
                  className="pl-7 border-red-200 focus:border-red-400"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className={`border-2 ${results.isZakatRequired ? 'bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/30' : 'bg-gradient-to-br from-slate-500/5 to-slate-500/10 border-slate-500/20'}`}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.totalAssets}</p>
              <p className="text-2xl font-bold text-primary">${formatNumber(results.totalAssets)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.netWealth}</p>
              <p className="text-2xl font-bold text-blue-600">${formatNumber(results.netWealth)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.nisabThreshold}</p>
              <p className="text-2xl font-bold text-amber-600">${formatNumber(results.nisab)}</p>
            </div>
            <div className="text-center p-4 bg-background/80 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t.zakatDue}</p>
              <p className="text-2xl font-bold text-emerald-600">${formatNumber(results.zakatDue)}</p>
            </div>
          </div>
          
          {/* Zakat Status Banner */}
          <div className={`flex items-center justify-center gap-3 p-4 rounded-lg ${results.isZakatRequired ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-slate-100 dark:bg-slate-800/30'}`}>
            {results.isZakatRequired ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">{t.zakatRequired}</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-6 w-6 text-slate-500" />
                <span className="font-semibold text-slate-600 dark:text-slate-300">{t.zakatNotRequired}</span>
              </>
            )}
          </div>
          
          {/* Export Button */}
          <div className="mt-6 flex justify-center">
            <CalculatorPDFExport 
              data={{
                type: 'zakat',
                inputs: {
                  cash: parseFloat(cash) || 0,
                  gold: parseFloat(gold) || 0,
                  silver: parseFloat(silver) || 0,
                  investments: parseFloat(investments) || 0,
                  businessAssets: parseFloat(businessAssets) || 0,
                  liabilities: parseFloat(liabilities) || 0,
                  goldPrice: parseFloat(goldPrice) || 0,
                },
                results: {
                  totalAssets: results.totalAssets,
                  netWealth: results.netWealth,
                  nisab: results.nisab,
                  zakatDue: results.zakatDue,
                  isZakatRequired: results.isZakatRequired ? 1 : 0,
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => setShowMethodology(!showMethodology)}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {showMethodology ? t.hideMethodology : t.showMethodology}
            </span>
            {showMethodology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        {showMethodology && (
          <CardContent className="space-y-4 pt-0">
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.methodology}</h4>
              <p className="text-sm text-muted-foreground">{methodology.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.formula}</h4>
              <pre className="bg-muted/50 p-3 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                {methodology.formula}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.shariahBasis}</h4>
              <p className="text-sm text-muted-foreground italic">{methodology.shariahBasis}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">{t.aaoifiReference}</h4>
              <p className="text-sm font-medium">{methodology.aaoifiRef}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2">Key Points</h4>
              <ul className="space-y-1">
                {methodology.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function IslamicFinanceCalculator() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const t = content[language];
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-islamic.svg')] opacity-5" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Scale className="h-4 w-4" />
              AAOIFI Compliant
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t.pageSubtitle}
            </p>
            
            {/* Disclaimer */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className={isRTL ? 'text-right' : 'text-left'}>{t.disclaimer}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Calculator Tabs */}
      <section className="pb-24">
        <div className="container">
          <Tabs defaultValue="murabaha" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="murabaha" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">{t.murabaha}</span>
              </TabsTrigger>
              <TabsTrigger value="ijara" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t.ijara}</span>
              </TabsTrigger>
              <TabsTrigger value="sukuk" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">{t.sukuk}</span>
              </TabsTrigger>
              <TabsTrigger value="zakat" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">{t.zakat}</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="max-w-4xl mx-auto">
              <TabsContent value="murabaha">
                <MurabahaCalculator t={t} isRTL={isRTL} />
              </TabsContent>
              <TabsContent value="ijara">
                <IjaraCalculator t={t} isRTL={isRTL} />
              </TabsContent>
              <TabsContent value="sukuk">
                <SukukCalculator t={t} isRTL={isRTL} />
              </TabsContent>
              <TabsContent value="zakat">
                <ZakatCalculator t={t} isRTL={isRTL} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5 border-t">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              {isRTL ? 'هل تحتاج إلى استشارة متخصصة؟' : 'Need Expert Consultation?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isRTL 
                ? 'فريقنا من خبراء التمويل الإسلامي جاهز لمساعدتك في هيكلة المنتجات المتوافقة مع الشريعة.'
                : 'Our team of Islamic finance experts is ready to help you structure Shariah-compliant products.'}
            </p>
            <Button size="lg" className="gap-2">
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
