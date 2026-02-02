/**
 * CauseWay Islamic Finance Calculator - PDF Export Utility
 * 
 * Premium branded PDF generation with:
 * - Full CauseWay brand identity
 * - Legal disclaimers and regulatory compliance
 * - AAOIFI standards references
 * - Bilingual Arabic/English support
 * - Professional formatting
 */

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

export interface CalculationData {
  type: 'murabaha' | 'ijara' | 'sukuk' | 'zakat';
  language: 'en' | 'ar';
  inputs: Record<string, number>;
  results: Record<string, string | number>;
  timestamp: Date;
}

// Legal Disclaimers
const DISCLAIMERS = {
  en: {
    general: `IMPORTANT DISCLAIMER: This calculation report is provided for educational and estimation purposes only. It does not constitute financial advice, a recommendation, or an offer to enter into any transaction.`,
    regulatory: `REGULATORY NOTICE: This tool is designed to assist in understanding Islamic finance calculations. All actual financial transactions should be conducted through licensed financial institutions in compliance with applicable laws and regulations.`,
    shariah: `SHARIAH COMPLIANCE: While this calculator is based on AAOIFI Shariah Standards, actual Shariah compliance of any transaction must be verified by qualified Shariah scholars. CauseWay does not provide Shariah certification or fatwas.`,
    accuracy: `ACCURACY NOTICE: The calculations provided are based on the inputs entered and standard formulas. Actual financing terms may vary based on creditworthiness, market conditions, and institutional policies.`,
    liability: `LIMITATION OF LIABILITY: CauseWay, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this calculator or reliance on its results.`,
    copyright: `© ${new Date().getFullYear()} CauseWay Financial & Banking Consultancies. All rights reserved. This document is confidential and intended solely for the recipient.`,
  },
  ar: {
    general: `إخلاء مسؤولية هام: يُقدم تقرير الحساب هذا للأغراض التعليمية والتقديرية فقط. ولا يشكل نصيحة مالية أو توصية أو عرضاً للدخول في أي معاملة.`,
    regulatory: `إشعار تنظيمي: تم تصميم هذه الأداة للمساعدة في فهم حسابات التمويل الإسلامي. يجب إجراء جميع المعاملات المالية الفعلية من خلال مؤسسات مالية مرخصة وفقاً للقوانين واللوائح المعمول بها.`,
    shariah: `الامتثال الشرعي: على الرغم من أن هذه الحاسبة تستند إلى معايير أيوفي الشرعية، إلا أنه يجب التحقق من الامتثال الشرعي الفعلي لأي معاملة من قبل علماء شريعة مؤهلين. لا تقدم كوزواي شهادات شرعية أو فتاوى.`,
    accuracy: `إشعار الدقة: تستند الحسابات المقدمة إلى المدخلات المُدخلة والمعادلات القياسية. قد تختلف شروط التمويل الفعلية بناءً على الجدارة الائتمانية وظروف السوق وسياسات المؤسسة.`,
    liability: `تحديد المسؤولية: لن تكون كوزواي أو مديروها أو موظفوها أو الشركات التابعة لها مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام هذه الحاسبة أو الاعتماد على نتائجها.`,
    copyright: `© ${new Date().getFullYear()} كوزواي للاستشارات المالية والمصرفية. جميع الحقوق محفوظة. هذا المستند سري ومخصص للمستلم فقط.`,
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
const INPUT_LABELS = {
  en: {
    costPrice: 'Cost Price (Principal)',
    profitRate: 'Annual Profit Rate',
    financingPeriod: 'Financing Period',
    assetValue: 'Asset Value',
    leaseTerm: 'Lease Term',
    residualValue: 'Residual Value',
    managementFee: 'Management Fee',
    faceValue: 'Face Value',
    couponRate: 'Coupon Rate',
    currentPrice: 'Current Market Price',
    yearsToMaturity: 'Years to Maturity',
    cashSavings: 'Cash & Bank Savings',
    goldValue: 'Gold Value',
    silverValue: 'Silver Value',
    investments: 'Stocks & Investments',
    businessAssets: 'Business Assets',
    liabilities: 'Liabilities (Debts)',
    goldPrice: 'Gold Price (per gram)',
  },
  ar: {
    costPrice: 'سعر التكلفة (المبلغ الأصلي)',
    profitRate: 'معدل الربح السنوي',
    financingPeriod: 'فترة التمويل',
    assetValue: 'قيمة الأصل',
    leaseTerm: 'مدة الإجارة',
    residualValue: 'القيمة المتبقية',
    managementFee: 'رسوم الإدارة',
    faceValue: 'القيمة الاسمية',
    couponRate: 'معدل الكوبون',
    currentPrice: 'السعر السوقي الحالي',
    yearsToMaturity: 'سنوات حتى الاستحقاق',
    cashSavings: 'النقد والمدخرات البنكية',
    goldValue: 'قيمة الذهب',
    silverValue: 'قيمة الفضة',
    investments: 'الأسهم والاستثمارات',
    businessAssets: 'أصول الأعمال',
    liabilities: 'الالتزامات (الديون)',
    goldPrice: 'سعر الذهب (للجرام)',
  }
};

// Result Labels
const RESULT_LABELS = {
  en: {
    totalSalePrice: 'Total Sale Price',
    profitAmount: 'Profit Amount',
    monthlyPayment: 'Monthly Payment',
    effectiveRate: 'Effective Annual Rate',
    monthlyRent: 'Monthly Rent',
    totalPayments: 'Total Lease Payments',
    implicitRate: 'Implicit Rate',
    ownershipTransfer: 'Ownership Transfer Value',
    currentYield: 'Current Yield',
    yieldToMaturity: 'Yield to Maturity',
    annualCoupon: 'Annual Coupon Payment',
    totalReturn: 'Total Return at Maturity',
    totalAssets: 'Total Zakatable Assets',
    netWealth: 'Net Zakatable Wealth',
    nisabThreshold: 'Nisab Threshold',
    zakatDue: 'Zakat Due (2.5%)',
    zakatStatus: 'Zakat Status',
  },
  ar: {
    totalSalePrice: 'إجمالي سعر البيع',
    profitAmount: 'مبلغ الربح',
    monthlyPayment: 'القسط الشهري',
    effectiveRate: 'المعدل الفعلي السنوي',
    monthlyRent: 'الإيجار الشهري',
    totalPayments: 'إجمالي مدفوعات الإجارة',
    implicitRate: 'المعدل الضمني',
    ownershipTransfer: 'قيمة نقل الملكية',
    currentYield: 'العائد الحالي',
    yieldToMaturity: 'العائد حتى الاستحقاق',
    annualCoupon: 'دفعة الكوبون السنوية',
    totalReturn: 'إجمالي العائد عند الاستحقاق',
    totalAssets: 'إجمالي الأصول الزكوية',
    netWealth: 'صافي الثروة الزكوية',
    nisabThreshold: 'نصاب الزكاة',
    zakatDue: 'الزكاة المستحقة (2.5%)',
    zakatStatus: 'حالة الزكاة',
  }
};

/**
 * Generate a unique report reference number
 */
function generateReportRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CW-IFC-${timestamp}-${random}`;
}

/**
 * Format date for the report
 */
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

/**
 * Format currency value
 */
function formatCurrency(value: number, language: 'en' | 'ar'): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage value
 */
function formatPercentage(value: number, language: 'en' | 'ar'): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

/**
 * Generate the HTML content for PDF export
 */
export function generatePDFContent(data: CalculationData): string {
  const { type, language, inputs, results, timestamp } = data;
  const isRTL = language === 'ar';
  const reportRef = generateReportRef();
  const formattedDate = formatDate(timestamp, language);
  
  const disclaimers = DISCLAIMERS[language];
  const calcLabel = CALCULATOR_LABELS[language][type];
  const aaoifiRef = AAOIFI_REFERENCES[type];
  const inputLabels = INPUT_LABELS[language];
  const resultLabels = RESULT_LABELS[language];

  // Header text
  const headerText = {
    en: {
      title: 'Islamic Finance Calculation Report',
      subtitle: 'CauseWay Financial & Banking Consultancies',
      reportRef: 'Report Reference',
      generatedOn: 'Generated On',
      calculationType: 'Calculation Type',
      inputParameters: 'Input Parameters',
      calculationResults: 'Calculation Results',
      methodology: 'Methodology & Standards',
      legalDisclaimer: 'Legal Disclaimer',
      regulatoryNotice: 'Regulatory Notice',
      shariahCompliance: 'Shariah Compliance Notice',
      contactInfo: 'For inquiries, please contact us at info@causewaygrp.com',
    },
    ar: {
      title: 'تقرير حساب التمويل الإسلامي',
      subtitle: 'كوزواي للاستشارات المالية والمصرفية',
      reportRef: 'مرجع التقرير',
      generatedOn: 'تاريخ الإصدار',
      calculationType: 'نوع الحساب',
      inputParameters: 'معاملات الإدخال',
      calculationResults: 'نتائج الحساب',
      methodology: 'المنهجية والمعايير',
      legalDisclaimer: 'إخلاء المسؤولية القانونية',
      regulatoryNotice: 'الإشعار التنظيمي',
      shariahCompliance: 'إشعار الامتثال الشرعي',
      contactInfo: 'للاستفسارات، يرجى التواصل معنا على info@causewaygrp.com',
    }
  };

  const t = headerText[language];

  return `
<!DOCTYPE html>
<html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title} - ${reportRef}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
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
      padding: 15mm;
      margin: 0 auto;
      background: ${COLORS.white};
      position: relative;
    }
    
    /* Gold corner frames */
    .corner-frame {
      position: absolute;
      width: 40px;
      height: 40px;
      border: 2px solid ${COLORS.gold};
    }
    .corner-tl { top: 10mm; ${isRTL ? 'right' : 'left'}: 10mm; border-bottom: none; border-${isRTL ? 'left' : 'right'}: none; }
    .corner-tr { top: 10mm; ${isRTL ? 'left' : 'right'}: 10mm; border-bottom: none; border-${isRTL ? 'right' : 'left'}: none; }
    .corner-bl { bottom: 10mm; ${isRTL ? 'right' : 'left'}: 10mm; border-top: none; border-${isRTL ? 'left' : 'right'}: none; }
    .corner-br { bottom: 10mm; ${isRTL ? 'left' : 'right'}: 10mm; border-top: none; border-${isRTL ? 'right' : 'left'}: none; }
    
    /* Header */
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 2px solid ${COLORS.gold};
      margin-bottom: 25px;
    }
    
    .logo-container {
      margin-bottom: 15px;
    }
    
    .logo {
      height: 60px;
      width: auto;
    }
    
    .header-title {
      font-family: 'Playfair Display', serif;
      font-size: 22pt;
      font-weight: 700;
      color: ${COLORS.forest};
      margin-bottom: 5px;
    }
    
    .header-subtitle {
      font-size: 11pt;
      color: ${COLORS.sage};
      font-weight: 500;
    }
    
    /* Report Meta */
    .report-meta {
      display: flex;
      justify-content: space-between;
      background: ${COLORS.cream};
      padding: 12px 15px;
      border-radius: 8px;
      margin-bottom: 25px;
      border: 1px solid ${COLORS.gold}20;
    }
    
    .meta-item {
      text-align: ${isRTL ? 'right' : 'left'};
    }
    
    .meta-label {
      font-size: 9pt;
      color: ${COLORS.sage};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .meta-value {
      font-size: 11pt;
      font-weight: 600;
      color: ${COLORS.forest};
    }
    
    /* Sections */
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 14pt;
      font-weight: 600;
      color: ${COLORS.forest};
      padding-bottom: 8px;
      border-bottom: 1px solid ${COLORS.gold};
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .section-icon {
      width: 24px;
      height: 24px;
      background: ${COLORS.gold};
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${COLORS.forest};
    }
    
    /* Data Tables */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    
    .data-table th,
    .data-table td {
      padding: 10px 12px;
      text-align: ${isRTL ? 'right' : 'left'};
      border-bottom: 1px solid ${COLORS.forest}15;
    }
    
    .data-table th {
      background: ${COLORS.forest};
      color: ${COLORS.cream};
      font-weight: 600;
      font-size: 10pt;
    }
    
    .data-table tr:nth-child(even) {
      background: ${COLORS.cream};
    }
    
    .data-table .label {
      color: ${COLORS.sage};
      font-weight: 500;
    }
    
    .data-table .value {
      font-weight: 600;
      color: ${COLORS.forest};
    }
    
    /* Results Highlight */
    .results-highlight {
      background: linear-gradient(135deg, ${COLORS.forest} 0%, ${COLORS.teal} 100%);
      padding: 20px;
      border-radius: 10px;
      color: ${COLORS.cream};
      margin-bottom: 20px;
    }
    
    .results-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    
    .result-item {
      background: ${COLORS.white}15;
      padding: 12px;
      border-radius: 6px;
    }
    
    .result-label {
      font-size: 9pt;
      opacity: 0.8;
      margin-bottom: 4px;
    }
    
    .result-value {
      font-size: 16pt;
      font-weight: 700;
      color: ${COLORS.gold};
    }
    
    /* AAOIFI Reference */
    .aaoifi-ref {
      background: ${COLORS.lightGold};
      border: 1px solid ${COLORS.gold};
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }
    
    .aaoifi-title {
      font-weight: 600;
      color: ${COLORS.forest};
      margin-bottom: 5px;
    }
    
    .aaoifi-standard {
      font-size: 10pt;
      color: ${COLORS.sage};
    }
    
    /* Disclaimer Boxes */
    .disclaimer-box {
      background: ${COLORS.cream};
      border-${isRTL ? 'right' : 'left'}: 4px solid ${COLORS.gold};
      padding: 12px 15px;
      margin-bottom: 12px;
      font-size: 9pt;
      color: ${COLORS.sage};
      line-height: 1.5;
    }
    
    .disclaimer-box.important {
      border-color: #c53030;
      background: #fff5f5;
    }
    
    /* Footer */
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 2px solid ${COLORS.gold};
      text-align: center;
    }
    
    .footer-logo {
      height: 40px;
      margin-bottom: 10px;
    }
    
    .footer-text {
      font-size: 9pt;
      color: ${COLORS.sage};
    }
    
    .footer-contact {
      font-size: 10pt;
      color: ${COLORS.forest};
      font-weight: 500;
      margin-top: 8px;
    }
    
    .copyright {
      font-size: 8pt;
      color: ${COLORS.sage};
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid ${COLORS.forest}15;
    }
    
    /* Print Styles */
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { margin: 0; padding: 10mm; }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Corner Frames -->
    <div class="corner-frame corner-tl"></div>
    <div class="corner-frame corner-tr"></div>
    <div class="corner-frame corner-bl"></div>
    <div class="corner-frame corner-br"></div>
    
    <!-- Header -->
    <div class="header">
      <div class="logo-container">
        <img src="/images/causeway-logo.png" alt="CauseWay" class="logo" />
      </div>
      <h1 class="header-title">${t.title}</h1>
      <p class="header-subtitle">${t.subtitle}</p>
    </div>
    
    <!-- Report Meta -->
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
    
    <!-- AAOIFI Reference -->
    <div class="aaoifi-ref">
      <div class="aaoifi-title">${aaoifiRef.standard}</div>
      <div class="aaoifi-standard">${isRTL ? aaoifiRef.titleAr : aaoifiRef.title}</div>
    </div>
    
    <!-- Input Parameters -->
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">📊</span>
        ${t.inputParameters}
      </h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>${isRTL ? 'المعامل' : 'Parameter'}</th>
            <th>${isRTL ? 'القيمة' : 'Value'}</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(inputs).map(([key, value]) => `
            <tr>
              <td class="label">${inputLabels[key as keyof typeof inputLabels] || key}</td>
              <td class="value">${typeof value === 'number' && key.toLowerCase().includes('rate') 
                ? formatPercentage(value, language) 
                : typeof value === 'number' && !key.toLowerCase().includes('period') && !key.toLowerCase().includes('term') && !key.toLowerCase().includes('years')
                  ? formatCurrency(value, language)
                  : value}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <!-- Calculation Results -->
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">✓</span>
        ${t.calculationResults}
      </h2>
      <div class="results-highlight">
        <div class="results-grid">
          ${Object.entries(results).map(([key, value]) => `
            <div class="result-item">
              <div class="result-label">${resultLabels[key as keyof typeof resultLabels] || key}</div>
              <div class="result-value">${value}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    
    <!-- Legal Disclaimers -->
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">⚖</span>
        ${t.legalDisclaimer}
      </h2>
      <div class="disclaimer-box important">
        ${disclaimers.general}
      </div>
      <div class="disclaimer-box">
        <strong>${t.regulatoryNotice}:</strong> ${disclaimers.regulatory}
      </div>
      <div class="disclaimer-box">
        <strong>${t.shariahCompliance}:</strong> ${disclaimers.shariah}
      </div>
      <div class="disclaimer-box">
        ${disclaimers.accuracy}
      </div>
      <div class="disclaimer-box">
        ${disclaimers.liability}
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <img src="/images/causeway-logo.png" alt="CauseWay" class="footer-logo" />
      <p class="footer-contact">${t.contactInfo}</p>
      <p class="footer-text">www.causewaygrp.com</p>
      <p class="copyright">${disclaimers.copyright}</p>
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Trigger PDF download using browser print
 */
export function downloadPDF(data: CalculationData): void {
  const htmlContent = generatePDFContent(data);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  }
}

/**
 * Generate and open PDF in new tab for preview
 */
export function previewPDF(data: CalculationData): void {
  const htmlContent = generatePDFContent(data);
  
  const previewWindow = window.open('', '_blank');
  if (previewWindow) {
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
  }
}
