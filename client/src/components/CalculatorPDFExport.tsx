/**
 * Calculator PDF Export Component
 * Premium branded PDF export with legal disclaimers and AAOIFI compliance
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { FileText, Download, Eye, Printer, CheckCircle2, AlertTriangle, Table2 } from 'lucide-react';
import { previewAmortizationSchedule, AmortizationScheduleData } from '@/utils/amortizationSchedule';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

// Brand Colors
const COLORS = {
  forest: '#133129',
  teal: '#224B40',
  sage: '#406D61',
  gold: '#d4a84b',
  cream: '#faf9f6',
  white: '#ffffff',
  lightGold: '#f5e6c4',
};

export interface CalculationExportData {
  type: 'murabaha' | 'ijara' | 'sukuk' | 'zakat';
  inputs: Record<string, number | string>;
  results: Record<string, number | string>;
}

// Check if calculator type supports amortization schedule
function supportsAmortization(type: string): boolean {
  return type === 'murabaha' || type === 'ijara';
}

interface Props {
  data: CalculationExportData;
  disabled?: boolean;
}

// Legal Disclaimers
const DISCLAIMERS = {
  en: {
    general: `IMPORTANT DISCLAIMER: This calculation report is provided for educational and estimation purposes only. It does not constitute financial advice, a recommendation, or an offer to enter into any transaction.`,
    regulatory: `REGULATORY NOTICE: This tool is designed to assist in understanding Islamic finance calculations. All actual financial transactions should be conducted through licensed financial institutions in compliance with applicable laws and regulations.`,
    shariah: `SHARIAH COMPLIANCE: While this calculator is based on AAOIFI Shariah Standards, actual Shariah compliance of any transaction must be verified by qualified Shariah scholars. CauseWay does not provide Shariah certification or fatwas.`,
    accuracy: `ACCURACY NOTICE: The calculations provided are based on the inputs entered and standard formulas. Actual financing terms may vary based on creditworthiness, market conditions, and institutional policies.`,
    liability: `LIMITATION OF LIABILITY: CauseWay, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this calculator or reliance on its results.`,
  },
  ar: {
    general: `إخلاء مسؤولية هام: يُقدم تقرير الحساب هذا للأغراض التعليمية والتقديرية فقط. ولا يشكل نصيحة مالية أو توصية أو عرضاً للدخول في أي معاملة.`,
    regulatory: `إشعار تنظيمي: تم تصميم هذه الأداة للمساعدة في فهم حسابات التمويل الإسلامي. يجب إجراء جميع المعاملات المالية الفعلية من خلال مؤسسات مالية مرخصة وفقاً للقوانين واللوائح المعمول بها.`,
    shariah: `الامتثال الشرعي: على الرغم من أن هذه الحاسبة تستند إلى معايير أيوفي الشرعية، إلا أنه يجب التحقق من الامتثال الشرعي الفعلي لأي معاملة من قبل علماء شريعة مؤهلين. لا تقدم كوزواي شهادات شرعية أو فتاوى.`,
    accuracy: `إشعار الدقة: تستند الحسابات المقدمة إلى المدخلات المُدخلة والمعادلات القياسية. قد تختلف شروط التمويل الفعلية بناءً على الجدارة الائتمانية وظروف السوق وسياسات المؤسسة.`,
    liability: `تحديد المسؤولية: لن تكون كوزواي أو مديروها أو موظفوها أو الشركات التابعة لها مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام هذه الحاسبة أو الاعتماد على نتائجها.`,
  }
};

// Calculator Type Labels
const CALCULATOR_LABELS = {
  en: {
    murabaha: 'Murabaha (Cost-Plus Financing)',
    ijara: 'Ijara (Islamic Lease)',
    sukuk: 'Sukuk Yield Analysis',
    zakat: 'Zakat Calculation',
  },
  ar: {
    murabaha: 'المرابحة (التمويل بالتكلفة زائد الربح)',
    ijara: 'الإجارة (التأجير الإسلامي)',
    sukuk: 'تحليل عائد الصكوك',
    zakat: 'حساب الزكاة',
  }
};

// AAOIFI Standards References
const AAOIFI_REFERENCES = {
  murabaha: {
    standard: 'AAOIFI Shariah Standard No. 8',
    title: 'Murabaha to the Purchase Orderer',
    titleAr: 'المرابحة للآمر بالشراء',
  },
  ijara: {
    standard: 'AAOIFI Shariah Standard No. 9',
    title: 'Ijara and Ijara Muntahia Bittamleek',
    titleAr: 'الإجارة والإجارة المنتهية بالتمليك',
  },
  sukuk: {
    standard: 'AAOIFI Shariah Standard No. 17',
    title: 'Investment Sukuk',
    titleAr: 'صكوك الاستثمار',
  },
  zakat: {
    standard: 'AAOIFI Shariah Standard No. 35',
    title: 'Zakat',
    titleAr: 'الزكاة',
  }
};

// Input Labels
const INPUT_LABELS: Record<string, { en: string; ar: string }> = {
  costPrice: { en: 'Cost Price (Principal)', ar: 'سعر التكلفة (المبلغ الأصلي)' },
  profitRate: { en: 'Annual Profit Rate', ar: 'معدل الربح السنوي' },
  period: { en: 'Financing Period (Months)', ar: 'فترة التمويل (أشهر)' },
  assetValue: { en: 'Asset Value', ar: 'قيمة الأصل' },
  leaseTerm: { en: 'Lease Term (Months)', ar: 'مدة الإجارة (أشهر)' },
  residualPercent: { en: 'Residual Value (%)', ar: 'القيمة المتبقية (%)' },
  managementFee: { en: 'Management Fee (%)', ar: 'رسوم الإدارة (%)' },
  faceValue: { en: 'Face Value', ar: 'القيمة الاسمية' },
  couponRate: { en: 'Coupon Rate (%)', ar: 'معدل الكوبون (%)' },
  currentPrice: { en: 'Current Market Price', ar: 'السعر السوقي الحالي' },
  yearsToMaturity: { en: 'Years to Maturity', ar: 'سنوات حتى الاستحقاق' },
  cash: { en: 'Cash & Bank Savings', ar: 'النقد والمدخرات البنكية' },
  gold: { en: 'Gold Value', ar: 'قيمة الذهب' },
  silver: { en: 'Silver Value', ar: 'قيمة الفضة' },
  investments: { en: 'Stocks & Investments', ar: 'الأسهم والاستثمارات' },
  businessAssets: { en: 'Business Assets', ar: 'أصول الأعمال' },
  liabilities: { en: 'Liabilities (Debts)', ar: 'الالتزامات (الديون)' },
  goldPrice: { en: 'Gold Price (per gram)', ar: 'سعر الذهب (للجرام)' },
};

// Result Labels
const RESULT_LABELS: Record<string, { en: string; ar: string }> = {
  totalSalePrice: { en: 'Total Sale Price', ar: 'إجمالي سعر البيع' },
  profitAmount: { en: 'Profit Amount', ar: 'مبلغ الربح' },
  monthlyPayment: { en: 'Monthly Payment', ar: 'القسط الشهري' },
  effectiveRate: { en: 'Effective Annual Rate', ar: 'المعدل الفعلي السنوي' },
  monthlyRent: { en: 'Monthly Rent', ar: 'الإيجار الشهري' },
  totalPayments: { en: 'Total Lease Payments', ar: 'إجمالي مدفوعات الإجارة' },
  implicitRate: { en: 'Implicit Rate', ar: 'المعدل الضمني' },
  ownershipTransfer: { en: 'Ownership Transfer Value', ar: 'قيمة نقل الملكية' },
  currentYield: { en: 'Current Yield', ar: 'العائد الحالي' },
  ytm: { en: 'Yield to Maturity', ar: 'العائد حتى الاستحقاق' },
  annualCoupon: { en: 'Annual Coupon Payment', ar: 'دفعة الكوبون السنوية' },
  totalReturn: { en: 'Total Return at Maturity', ar: 'إجمالي العائد عند الاستحقاق' },
  totalAssets: { en: 'Total Zakatable Assets', ar: 'إجمالي الأصول الزكوية' },
  netWealth: { en: 'Net Zakatable Wealth', ar: 'صافي الثروة الزكوية' },
  nisab: { en: 'Nisab Threshold', ar: 'نصاب الزكاة' },
  zakatDue: { en: 'Zakat Due (2.5%)', ar: 'الزكاة المستحقة (2.5%)' },
  isZakatRequired: { en: 'Zakat Status', ar: 'حالة الزكاة' },
};

function generateReportRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CW-IFC-${timestamp}-${random}`;
}

function formatDate(date: Date, language: 'en' | 'ar'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', options);
}

function formatValue(key: string, value: number | string, language: 'en' | 'ar'): string {
  if (typeof value === 'string') return value;
  
  const isPercentage = key.toLowerCase().includes('rate') || 
                       key.toLowerCase().includes('percent') || 
                       key.toLowerCase().includes('yield');
  const isMonths = key.toLowerCase().includes('period') || 
                   key.toLowerCase().includes('term');
  const isYears = key.toLowerCase().includes('years');
  const isBoolean = key === 'isZakatRequired';
  
  if (isBoolean) {
    return value ? (language === 'ar' ? 'الزكاة واجبة' : 'Zakat Required') : (language === 'ar' ? 'الزكاة غير واجبة' : 'Below Nisab');
  }
  if (isPercentage) {
    return `${value.toFixed(2)}%`;
  }
  if (isMonths) {
    return `${value} ${language === 'ar' ? 'شهر' : 'months'}`;
  }
  if (isYears) {
    return `${value} ${language === 'ar' ? 'سنة' : 'years'}`;
  }
  
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function generatePDFContent(data: CalculationExportData, language: 'en' | 'ar'): string {
  const { type, inputs, results } = data;
  const isRTL = language === 'ar';
  const reportRef = generateReportRef();
  const formattedDate = formatDate(new Date(), language);
  
  const disclaimers = DISCLAIMERS[language];
  const calcLabel = CALCULATOR_LABELS[language][type];
  const aaoifiRef = AAOIFI_REFERENCES[type];

  const t = {
    en: {
      title: 'Islamic Finance Calculation Report',
      subtitle: 'CauseWay Financial & Banking Consultancies',
      reportRef: 'Report Reference',
      generatedOn: 'Generated On',
      calculationType: 'Calculation Type',
      inputParameters: 'Input Parameters',
      calculationResults: 'Calculation Results',
      legalDisclaimer: 'Legal Disclaimer',
      regulatoryNotice: 'Regulatory Notice',
      shariahCompliance: 'Shariah Compliance Notice',
      contactInfo: 'For inquiries, please contact us at info@causewaygrp.com',
      parameter: 'Parameter',
      value: 'Value',
      result: 'Result',
    },
    ar: {
      title: 'تقرير حساب التمويل الإسلامي',
      subtitle: 'كوزواي للاستشارات المالية والمصرفية',
      reportRef: 'مرجع التقرير',
      generatedOn: 'تاريخ الإصدار',
      calculationType: 'نوع الحساب',
      inputParameters: 'معاملات الإدخال',
      calculationResults: 'نتائج الحساب',
      legalDisclaimer: 'إخلاء المسؤولية القانونية',
      regulatoryNotice: 'الإشعار التنظيمي',
      shariahCompliance: 'إشعار الامتثال الشرعي',
      contactInfo: 'للاستفسارات، يرجى التواصل معنا على info@causewaygrp.com',
      parameter: 'المعامل',
      value: 'القيمة',
      result: 'النتيجة',
    }
  }[language];

  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title} - ${reportRef}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: ${isRTL ? "'Noto Sans Arabic', 'Inter', sans-serif" : "'Inter', 'Noto Sans Arabic', sans-serif"};
      font-size: 11pt;
      line-height: 1.6;
      color: ${COLORS.forest};
      background: ${COLORS.white};
      direction: ${isRTL ? 'rtl' : 'ltr'};
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      margin: 0 auto;
      background: ${COLORS.white};
      position: relative;
    }
    
    /* Gold corner frames - matching brand identity */
    .corner-frame {
      position: absolute;
      width: 50px;
      height: 50px;
    }
    .corner-frame::before,
    .corner-frame::after {
      content: '';
      position: absolute;
      background: ${COLORS.gold};
    }
    .corner-tl { top: 12mm; ${isRTL ? 'right' : 'left'}: 12mm; }
    .corner-tl::before { width: 2px; height: 40px; top: 0; ${isRTL ? 'right' : 'left'}: 0; }
    .corner-tl::after { width: 40px; height: 2px; top: 0; ${isRTL ? 'right' : 'left'}: 0; }
    
    .corner-tr { top: 12mm; ${isRTL ? 'left' : 'right'}: 12mm; }
    .corner-tr::before { width: 2px; height: 40px; top: 0; ${isRTL ? 'left' : 'right'}: 0; }
    .corner-tr::after { width: 40px; height: 2px; top: 0; ${isRTL ? 'left' : 'right'}: 0; }
    
    .corner-bl { bottom: 12mm; ${isRTL ? 'right' : 'left'}: 12mm; }
    .corner-bl::before { width: 2px; height: 40px; bottom: 0; ${isRTL ? 'right' : 'left'}: 0; }
    .corner-bl::after { width: 40px; height: 2px; bottom: 0; ${isRTL ? 'right' : 'left'}: 0; }
    
    .corner-br { bottom: 12mm; ${isRTL ? 'left' : 'right'}: 12mm; }
    .corner-br::before { width: 2px; height: 40px; bottom: 0; ${isRTL ? 'left' : 'right'}: 0; }
    .corner-br::after { width: 40px; height: 2px; bottom: 0; ${isRTL ? 'left' : 'right'}: 0; }
    
    /* Inner decorative squares */
    .corner-frame .inner {
      position: absolute;
      width: 12px;
      height: 12px;
      border: 1px solid ${COLORS.gold};
    }
    .corner-tl .inner { top: 8px; ${isRTL ? 'right' : 'left'}: 8px; }
    .corner-tr .inner { top: 8px; ${isRTL ? 'left' : 'right'}: 8px; }
    .corner-bl .inner { bottom: 8px; ${isRTL ? 'right' : 'left'}: 8px; }
    .corner-br .inner { bottom: 8px; ${isRTL ? 'left' : 'right'}: 8px; }
    
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 3px solid ${COLORS.gold};
      margin-bottom: 25px;
    }
    
    .logo-container {
      margin-bottom: 15px;
    }
    
    .logo {
      height: 70px;
      width: auto;
    }
    
    .header-title {
      font-family: 'Playfair Display', serif;
      font-size: 24pt;
      font-weight: 700;
      color: ${COLORS.forest};
      margin-bottom: 5px;
      letter-spacing: -0.5px;
    }
    
    .header-subtitle {
      font-size: 12pt;
      color: ${COLORS.sage};
      font-weight: 500;
    }
    
    .report-meta {
      display: flex;
      justify-content: space-between;
      background: linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.lightGold}40 100%);
      padding: 15px 20px;
      border-radius: 10px;
      margin-bottom: 25px;
      border: 1px solid ${COLORS.gold}40;
    }
    
    .meta-item { text-align: ${isRTL ? 'right' : 'left'}; }
    .meta-label {
      font-size: 9pt;
      color: ${COLORS.sage};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    .meta-value {
      font-size: 11pt;
      font-weight: 600;
      color: ${COLORS.forest};
    }
    
    .aaoifi-ref {
      background: ${COLORS.lightGold};
      border: 2px solid ${COLORS.gold};
      border-radius: 10px;
      padding: 15px 20px;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .aaoifi-icon {
      width: 40px;
      height: 40px;
      background: ${COLORS.gold};
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20pt;
    }
    
    .aaoifi-text .aaoifi-title {
      font-weight: 700;
      color: ${COLORS.forest};
      font-size: 12pt;
    }
    .aaoifi-text .aaoifi-standard {
      font-size: 10pt;
      color: ${COLORS.sage};
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 14pt;
      font-weight: 600;
      color: ${COLORS.forest};
      padding-bottom: 10px;
      border-bottom: 2px solid ${COLORS.gold};
      margin-bottom: 15px;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .data-table th,
    .data-table td {
      padding: 12px 15px;
      text-align: ${isRTL ? 'right' : 'left'};
    }
    
    .data-table th {
      background: ${COLORS.forest};
      color: ${COLORS.cream};
      font-weight: 600;
      font-size: 10pt;
    }
    
    .data-table tr:nth-child(even) { background: ${COLORS.cream}; }
    .data-table tr:nth-child(odd) { background: ${COLORS.white}; }
    .data-table tr { border-bottom: 1px solid ${COLORS.forest}10; }
    
    .data-table .label { color: ${COLORS.sage}; font-weight: 500; }
    .data-table .value { font-weight: 600; color: ${COLORS.forest}; }
    
    .results-highlight {
      background: linear-gradient(135deg, ${COLORS.forest} 0%, ${COLORS.teal} 100%);
      padding: 25px;
      border-radius: 12px;
      color: ${COLORS.cream};
      margin-bottom: 25px;
    }
    
    .results-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .result-item {
      background: rgba(255,255,255,0.1);
      padding: 15px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.15);
    }
    
    .result-label {
      font-size: 9pt;
      opacity: 0.85;
      margin-bottom: 5px;
    }
    
    .result-value {
      font-size: 18pt;
      font-weight: 700;
      color: ${COLORS.gold};
    }
    
    .disclaimer-section {
      background: ${COLORS.cream};
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
    }
    
    .disclaimer-box {
      border-${isRTL ? 'right' : 'left'}: 4px solid ${COLORS.gold};
      padding: 12px 15px;
      margin-bottom: 12px;
      font-size: 9pt;
      color: ${COLORS.sage};
      line-height: 1.5;
      background: ${COLORS.white};
      border-radius: 0 6px 6px 0;
    }
    
    .disclaimer-box.important {
      border-color: #c53030;
      background: #fff5f5;
      color: #742a2a;
    }
    
    .disclaimer-box strong {
      color: ${COLORS.forest};
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 3px solid ${COLORS.gold};
      text-align: center;
    }
    
    .footer-logo { height: 45px; margin-bottom: 12px; }
    .footer-text { font-size: 10pt; color: ${COLORS.sage}; }
    .footer-contact {
      font-size: 11pt;
      color: ${COLORS.forest};
      font-weight: 600;
      margin-top: 8px;
    }
    
    .copyright {
      font-size: 8pt;
      color: ${COLORS.sage};
      margin-top: 15px;
      padding-top: 12px;
      border-top: 1px solid ${COLORS.forest}15;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { margin: 0; padding: 15mm; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="corner-frame corner-tl"><div class="inner"></div></div>
    <div class="corner-frame corner-tr"><div class="inner"></div></div>
    <div class="corner-frame corner-bl"><div class="inner"></div></div>
    <div class="corner-frame corner-br"><div class="inner"></div></div>
    
    <div class="header">
      <div class="logo-container">
        <img src="/images/causeway-logo.png" alt="CauseWay" class="logo" crossorigin="anonymous" />
      </div>
      <h1 class="header-title">${t.title}</h1>
      <p class="header-subtitle">${t.subtitle}</p>
    </div>
    
    <div class="report-meta">
      <div class="meta-item">
        <div class="meta-label">${t.reportRef}</div>
        <div class="meta-value">${reportRef}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">${t.generatedOn}</div>
        <div class="meta-value">${formattedDate}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">${t.calculationType}</div>
        <div class="meta-value">${calcLabel}</div>
      </div>
    </div>
    
    <div class="aaoifi-ref">
      <div class="aaoifi-icon">⚖</div>
      <div class="aaoifi-text">
        <div class="aaoifi-title">${aaoifiRef.standard}</div>
        <div class="aaoifi-standard">${isRTL ? aaoifiRef.titleAr : aaoifiRef.title}</div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">📊 ${t.inputParameters}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>${t.parameter}</th>
            <th>${t.value}</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(inputs).map(([key, value]) => {
            const label = INPUT_LABELS[key]?.[language] || key;
            return `
              <tr>
                <td class="label">${label}</td>
                <td class="value">${formatValue(key, value as number, language)}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="section">
      <h2 class="section-title">✓ ${t.calculationResults}</h2>
      <div class="results-highlight">
        <div class="results-grid">
          ${Object.entries(results).map(([key, value]) => {
            const label = RESULT_LABELS[key]?.[language] || key;
            return `
              <div class="result-item">
                <div class="result-label">${label}</div>
                <div class="result-value">${formatValue(key, value as number, language)}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">⚖ ${t.legalDisclaimer}</h2>
      <div class="disclaimer-section">
        <div class="disclaimer-box important">${disclaimers.general}</div>
        <div class="disclaimer-box"><strong>${t.regulatoryNotice}:</strong> ${disclaimers.regulatory}</div>
        <div class="disclaimer-box"><strong>${t.shariahCompliance}:</strong> ${disclaimers.shariah}</div>
        <div class="disclaimer-box">${disclaimers.accuracy}</div>
        <div class="disclaimer-box">${disclaimers.liability}</div>
      </div>
    </div>
    
    <div class="footer">
      <img src="/images/causeway-logo.png" alt="CauseWay" class="footer-logo" crossorigin="anonymous" />
      <p class="footer-contact">${t.contactInfo}</p>
      <p class="footer-text">www.causewaygrp.com</p>
      <p class="copyright">© ${year} CauseWay Financial & Banking Consultancies. All rights reserved. This document is confidential and intended solely for the recipient.</p>
    </div>
  </div>
</body>
</html>
`;
}

export default function CalculatorPDFExport({ data, disabled = false }: Props) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const t = {
    en: {
      exportReport: 'Export Report',
      preview: 'Preview',
      download: 'Download PDF',
      print: 'Print',
      previewTitle: 'Report Preview',
      previewDesc: 'Review your calculation report before downloading',
      generating: 'Generating...',
      success: 'Report generated successfully',
      disclaimer: 'This report includes legal disclaimers and AAOIFI compliance notices.',
    },
    ar: {
      exportReport: 'تصدير التقرير',
      preview: 'معاينة',
      download: 'تحميل PDF',
      print: 'طباعة',
      previewTitle: 'معاينة التقرير',
      previewDesc: 'راجع تقرير الحساب قبل التحميل',
      generating: 'جاري الإنشاء...',
      success: 'تم إنشاء التقرير بنجاح',
      disclaimer: 'يتضمن هذا التقرير إخلاء المسؤولية القانونية وإشعارات الامتثال لمعايير أيوفي.',
    }
  }[language];

  const handlePreview = () => {
    setIsGenerating(true);
    const htmlContent = generatePDFContent(data, language);
    
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(htmlContent);
      previewWindow.document.close();
    }
    
    setIsGenerating(false);
    toast.success(t.success);
  };

  const handlePrint = () => {
    setIsGenerating(true);
    const htmlContent = generatePDFContent(data, language);
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
    
    setIsGenerating(false);
  };

  const handleAmortization = () => {
    if (!supportsAmortization(data.type)) return;
    
    const principal = Number(data.inputs.costPrice || data.inputs.assetValue) || 0;
    const profitRate = Number(data.inputs.profitRate || data.inputs.managementFee) || 0;
    const termMonths = Number(data.inputs.period || data.inputs.leaseTerm) || 0;
    const monthlyPayment = Number(data.results.monthlyPayment || data.results.monthlyRent) || 0;
    const totalProfit = Number(data.results.profitAmount) || (monthlyPayment * termMonths - principal);
    const totalPayments = monthlyPayment * termMonths;
    
    const scheduleData: AmortizationScheduleData = {
      type: data.type as 'murabaha' | 'ijara',
      language,
      principal,
      profitRate,
      termMonths,
      monthlyPayment,
      totalProfit,
      totalPayments,
      startDate: new Date(),
    };
    
    previewAmortizationSchedule(scheduleData);
    toast.success(language === 'ar' ? 'تم إنشاء جدول الاستهلاك' : 'Amortization schedule generated');
  };

  const amortizationLabel = language === 'ar' ? 'جدول الاستهلاك' : 'Amortization Schedule';

  return (
    <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreview}
        disabled={disabled || isGenerating}
        className="gap-2"
      >
        <Eye className="h-4 w-4" />
        {t.preview}
      </Button>
      
      {supportsAmortization(data.type) && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleAmortization}
          disabled={disabled || isGenerating}
          className="gap-2 border-amber-500 text-amber-600 hover:bg-amber-50"
        >
          <Table2 className="h-4 w-4" />
          {amortizationLabel}
        </Button>
      )}
      
      <Button
        variant="default"
        size="sm"
        onClick={handlePrint}
        disabled={disabled || isGenerating}
        className="gap-2 bg-[#133129] hover:bg-[#224B40]"
      >
        <Download className="h-4 w-4" />
        {isGenerating ? t.generating : t.exportReport}
      </Button>
    </div>
  );
}
