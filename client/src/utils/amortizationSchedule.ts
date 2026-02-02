/**
 * CauseWay Islamic Finance Calculator - Amortization Schedule Generator
 * 
 * Premium amortization schedule with:
 * - Full payment breakdown (principal/profit split)
 * - Running balances and cumulative totals
 * - Hijri date conversion
 * - AAOIFI-compliant disclosure
 * - Professional formatting
 * - Bilingual Arabic/English support
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

export interface AmortizationEntry {
  paymentNumber: number;
  paymentDate: Date;
  hijriDate: string;
  beginningBalance: number;
  paymentAmount: number;
  profitPortion: number;
  principalPortion: number;
  endingBalance: number;
  cumulativeProfit: number;
  cumulativePrincipal: number;
}

export interface AmortizationScheduleData {
  type: 'murabaha' | 'ijara';
  language: 'en' | 'ar';
  principal: number;
  profitRate: number;
  termMonths: number;
  monthlyPayment: number;
  totalProfit: number;
  totalPayments: number;
  startDate?: Date;
}

// Hijri month names
const HIJRI_MONTHS = {
  en: ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
  ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة']
};

/**
 * Convert Gregorian date to Hijri date string
 */
function toHijriDate(date: Date, language: 'en' | 'ar'): string {
  try {
    const hijri = new Intl.DateTimeFormat(`${language}-SA-u-ca-islamic`, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
    return hijri;
  } catch {
    // Fallback calculation if Intl doesn't support
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
  }
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
 * Format number with thousand separators
 */
function formatNumber(value: number, language: 'en' | 'ar'): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Generate amortization schedule entries
 */
export function generateAmortizationSchedule(data: AmortizationScheduleData): AmortizationEntry[] {
  const { principal, profitRate, termMonths, monthlyPayment, startDate = new Date() } = data;
  
  const entries: AmortizationEntry[] = [];
  let balance = principal;
  let cumulativeProfit = 0;
  let cumulativePrincipal = 0;
  const monthlyRate = profitRate / 100 / 12;
  
  for (let i = 1; i <= termMonths; i++) {
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);
    
    const profitPortion = balance * monthlyRate;
    const principalPortion = monthlyPayment - profitPortion;
    const endingBalance = Math.max(0, balance - principalPortion);
    
    cumulativeProfit += profitPortion;
    cumulativePrincipal += principalPortion;
    
    entries.push({
      paymentNumber: i,
      paymentDate,
      hijriDate: toHijriDate(paymentDate, data.language),
      beginningBalance: balance,
      paymentAmount: monthlyPayment,
      profitPortion,
      principalPortion,
      endingBalance,
      cumulativeProfit,
      cumulativePrincipal,
    });
    
    balance = endingBalance;
  }
  
  return entries;
}

/**
 * Generate unique report reference
 */
function generateReportRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CW-AMS-${timestamp}-${random}`;
}

/**
 * Generate HTML content for amortization schedule PDF
 */
export function generateAmortizationPDF(data: AmortizationScheduleData): string {
  const { type, language, principal, profitRate, termMonths, monthlyPayment, totalProfit, totalPayments } = data;
  const isRTL = language === 'ar';
  const reportRef = generateReportRef();
  const entries = generateAmortizationSchedule(data);
  
  // Text translations
  const t = {
    en: {
      title: 'Amortization Schedule',
      subtitle: 'CauseWay Financial & Banking Consultancies',
      reportRef: 'Report Reference',
      generatedOn: 'Generated On',
      financingType: 'Financing Type',
      murabaha: 'Murabaha (Cost-Plus Financing)',
      ijara: 'Ijara (Islamic Lease)',
      summaryTitle: 'Financing Summary',
      principal: 'Principal Amount',
      profitRate: 'Annual Profit Rate',
      term: 'Financing Term',
      monthlyPayment: 'Monthly Payment',
      totalProfit: 'Total Profit',
      totalPayments: 'Total Payments',
      scheduleTitle: 'Payment Schedule',
      paymentNo: 'No.',
      paymentDate: 'Payment Date',
      hijriDate: 'Hijri Date',
      beginBalance: 'Opening Balance',
      payment: 'Payment',
      profit: 'Profit',
      principalCol: 'Principal',
      endBalance: 'Closing Balance',
      cumProfit: 'Cum. Profit',
      cumPrincipal: 'Cum. Principal',
      months: 'months',
      aaoifiStandard: type === 'murabaha' ? 'AAOIFI Shariah Standard No. 8' : 'AAOIFI Shariah Standard No. 9',
      aaoifiTitle: type === 'murabaha' ? 'Murabaha to the Purchase Orderer' : 'Ijara and Ijara Muntahia Bittamleek',
      disclaimer: 'This amortization schedule is provided for illustrative purposes only. Actual payment amounts and dates may vary based on the terms agreed with your financial institution. Early settlement may be available without penalty in accordance with Shariah principles.',
      prepaymentNote: 'Early Settlement: Islamic finance principles allow for early settlement without penalty. Contact your financial institution for actual early settlement terms.',
      contactInfo: 'For inquiries, please contact us at info@causewaygrp.com',
      copyright: `© ${new Date().getFullYear()} CauseWay Financial & Banking Consultancies. All rights reserved.`,
      page: 'Page',
      of: 'of',
      continued: '(Continued)',
    },
    ar: {
      title: 'جدول الاستهلاك',
      subtitle: 'كوزواي للاستشارات المالية والمصرفية',
      reportRef: 'مرجع التقرير',
      generatedOn: 'تاريخ الإصدار',
      financingType: 'نوع التمويل',
      murabaha: 'المرابحة (التمويل بالتكلفة زائد الربح)',
      ijara: 'الإجارة (التأجير الإسلامي)',
      summaryTitle: 'ملخص التمويل',
      principal: 'المبلغ الأصلي',
      profitRate: 'معدل الربح السنوي',
      term: 'مدة التمويل',
      monthlyPayment: 'القسط الشهري',
      totalProfit: 'إجمالي الربح',
      totalPayments: 'إجمالي المدفوعات',
      scheduleTitle: 'جدول الدفعات',
      paymentNo: 'رقم',
      paymentDate: 'تاريخ الدفع',
      hijriDate: 'التاريخ الهجري',
      beginBalance: 'الرصيد الافتتاحي',
      payment: 'الدفعة',
      profit: 'الربح',
      principalCol: 'الأصل',
      endBalance: 'الرصيد الختامي',
      cumProfit: 'الربح التراكمي',
      cumPrincipal: 'الأصل التراكمي',
      months: 'شهر',
      aaoifiStandard: type === 'murabaha' ? 'معيار أيوفي الشرعي رقم 8' : 'معيار أيوفي الشرعي رقم 9',
      aaoifiTitle: type === 'murabaha' ? 'المرابحة للآمر بالشراء' : 'الإجارة والإجارة المنتهية بالتمليك',
      disclaimer: 'يُقدم جدول الاستهلاك هذا لأغراض توضيحية فقط. قد تختلف مبالغ الدفع الفعلية والتواريخ بناءً على الشروط المتفق عليها مع مؤسستك المالية. قد تكون التسوية المبكرة متاحة دون غرامة وفقاً لمبادئ الشريعة الإسلامية.',
      prepaymentNote: 'التسوية المبكرة: تسمح مبادئ التمويل الإسلامي بالتسوية المبكرة دون غرامة. تواصل مع مؤسستك المالية للحصول على شروط التسوية المبكرة الفعلية.',
      contactInfo: 'للاستفسارات، يرجى التواصل معنا على info@causewaygrp.com',
      copyright: `© ${new Date().getFullYear()} كوزواي للاستشارات المالية والمصرفية. جميع الحقوق محفوظة.`,
      page: 'صفحة',
      of: 'من',
      continued: '(تابع)',
    }
  };
  
  const text = t[language];
  const now = new Date();
  const formattedDate = now.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const hijriNow = toHijriDate(now, language);
  
  // Split entries into pages (15 entries per page for readability)
  const entriesPerPage = 15;
  const totalPages = Math.ceil(entries.length / entriesPerPage);
  
  let pagesHTML = '';
  
  for (let page = 0; page < totalPages; page++) {
    const pageEntries = entries.slice(page * entriesPerPage, (page + 1) * entriesPerPage);
    const isFirstPage = page === 0;
    const isLastPage = page === totalPages - 1;
    
    pagesHTML += `
      <div class="page ${!isFirstPage ? 'page-break' : ''}">
        <!-- Corner Frames -->
        <div class="corner-frame corner-tl"></div>
        <div class="corner-frame corner-tr"></div>
        <div class="corner-frame corner-bl"></div>
        <div class="corner-frame corner-br"></div>
        
        ${isFirstPage ? `
          <!-- Header (First Page Only) -->
          <div class="header">
            <div class="logo-container">
              <img src="/images/causeway-logo.png" alt="CauseWay" class="logo" onerror="this.style.display='none'" />
            </div>
            <h1 class="header-title">${text.title}</h1>
            <p class="header-subtitle">${text.subtitle}</p>
          </div>
          
          <!-- Report Meta -->
          <div class="report-meta">
            <div class="meta-item">
              <div class="meta-label">${text.reportRef}</div>
              <div class="meta-value">${reportRef}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">${text.generatedOn}</div>
              <div class="meta-value">${formattedDate}</div>
              <div class="meta-hijri">${hijriNow}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">${text.financingType}</div>
              <div class="meta-value">${type === 'murabaha' ? text.murabaha : text.ijara}</div>
            </div>
          </div>
          
          <!-- AAOIFI Reference -->
          <div class="aaoifi-ref">
            <div class="aaoifi-icon">⚖️</div>
            <div class="aaoifi-content">
              <div class="aaoifi-standard">${text.aaoifiStandard}</div>
              <div class="aaoifi-title">${text.aaoifiTitle}</div>
            </div>
          </div>
          
          <!-- Financing Summary -->
          <div class="summary-section">
            <h2 class="section-title">${text.summaryTitle}</h2>
            <div class="summary-grid">
              <div class="summary-item">
                <div class="summary-label">${text.principal}</div>
                <div class="summary-value">${formatCurrency(principal, language)}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">${text.profitRate}</div>
                <div class="summary-value">${profitRate}%</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">${text.term}</div>
                <div class="summary-value">${termMonths} ${text.months}</div>
              </div>
              <div class="summary-item highlight">
                <div class="summary-label">${text.monthlyPayment}</div>
                <div class="summary-value">${formatCurrency(monthlyPayment, language)}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">${text.totalProfit}</div>
                <div class="summary-value profit">${formatCurrency(totalProfit, language)}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">${text.totalPayments}</div>
                <div class="summary-value total">${formatCurrency(totalPayments, language)}</div>
              </div>
            </div>
          </div>
        ` : `
          <!-- Continuation Header -->
          <div class="continuation-header">
            <h2>${text.scheduleTitle} ${text.continued}</h2>
            <div class="report-ref-small">${reportRef}</div>
          </div>
        `}
        
        <!-- Schedule Table -->
        <div class="schedule-section">
          ${isFirstPage ? `<h2 class="section-title">${text.scheduleTitle}</h2>` : ''}
          <table class="schedule-table">
            <thead>
              <tr>
                <th class="col-no">${text.paymentNo}</th>
                <th class="col-date">${text.paymentDate}</th>
                <th class="col-balance">${text.beginBalance}</th>
                <th class="col-payment">${text.payment}</th>
                <th class="col-profit">${text.profit}</th>
                <th class="col-principal">${text.principalCol}</th>
                <th class="col-balance">${text.endBalance}</th>
              </tr>
            </thead>
            <tbody>
              ${pageEntries.map((entry, idx) => `
                <tr class="${idx % 2 === 0 ? 'even' : 'odd'}">
                  <td class="col-no">${entry.paymentNumber}</td>
                  <td class="col-date">
                    <div class="date-gregorian">${entry.paymentDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  </td>
                  <td class="col-balance">${formatNumber(entry.beginningBalance, language)}</td>
                  <td class="col-payment">${formatNumber(entry.paymentAmount, language)}</td>
                  <td class="col-profit">${formatNumber(entry.profitPortion, language)}</td>
                  <td class="col-principal">${formatNumber(entry.principalPortion, language)}</td>
                  <td class="col-balance">${formatNumber(entry.endingBalance, language)}</td>
                </tr>
              `).join('')}
            </tbody>
            ${isLastPage ? `
              <tfoot>
                <tr class="totals-row">
                  <td colspan="3" class="totals-label">${language === 'ar' ? 'الإجمالي' : 'TOTALS'}</td>
                  <td class="col-payment">${formatNumber(totalPayments, language)}</td>
                  <td class="col-profit">${formatNumber(totalProfit, language)}</td>
                  <td class="col-principal">${formatNumber(principal, language)}</td>
                  <td class="col-balance">0.00</td>
                </tr>
              </tfoot>
            ` : ''}
          </table>
        </div>
        
        ${isLastPage ? `
          <!-- Prepayment Note -->
          <div class="prepayment-note">
            <div class="note-icon">ℹ️</div>
            <div class="note-text">${text.prepaymentNote}</div>
          </div>
          
          <!-- Disclaimer -->
          <div class="disclaimer">
            <p>${text.disclaimer}</p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p class="footer-contact">${text.contactInfo}</p>
            <p class="footer-website">www.causewaygrp.com</p>
            <p class="copyright">${text.copyright}</p>
          </div>
        ` : ''}
        
        <!-- Page Number -->
        <div class="page-number">${text.page} ${page + 1} ${text.of} ${totalPages}</div>
      </div>
    `;
  }
  
  return `
<!DOCTYPE html>
<html lang="${language}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${text.title} - ${reportRef}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${isRTL ? "'Noto Sans Arabic', 'Inter', sans-serif" : "'Inter', 'Noto Sans Arabic', sans-serif"};
      font-size: 9pt;
      line-height: 1.4;
      color: ${COLORS.forest};
      background: ${COLORS.white};
      direction: ${isRTL ? 'rtl' : 'ltr'};
    }
    
    .page {
      width: 297mm;
      min-height: 210mm;
      padding: 15mm 20mm;
      margin: 0 auto;
      background: ${COLORS.white};
      position: relative;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    /* Corner Frames */
    .corner-frame {
      position: absolute;
      width: 30px;
      height: 30px;
      border: 2px solid ${COLORS.gold};
    }
    .corner-tl { top: 10mm; ${isRTL ? 'right' : 'left'}: 10mm; border-${isRTL ? 'left' : 'right'}: none; border-bottom: none; }
    .corner-tr { top: 10mm; ${isRTL ? 'left' : 'right'}: 10mm; border-${isRTL ? 'right' : 'left'}: none; border-bottom: none; }
    .corner-bl { bottom: 10mm; ${isRTL ? 'right' : 'left'}: 10mm; border-${isRTL ? 'left' : 'right'}: none; border-top: none; }
    .corner-br { bottom: 10mm; ${isRTL ? 'left' : 'right'}: 10mm; border-${isRTL ? 'right' : 'left'}: none; border-top: none; }
    
    /* Header */
    .header {
      text-align: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid ${COLORS.gold};
    }
    
    .logo {
      height: 50px;
      margin-bottom: 8px;
    }
    
    .header-title {
      font-size: 20pt;
      font-weight: 700;
      color: ${COLORS.forest};
      margin-bottom: 4px;
    }
    
    .header-subtitle {
      font-size: 10pt;
      color: ${COLORS.sage};
    }
    
    /* Report Meta */
    .report-meta {
      display: flex;
      justify-content: space-between;
      background: ${COLORS.cream};
      padding: 10px 15px;
      border-radius: 6px;
      margin-bottom: 12px;
      border: 1px solid ${COLORS.gold}30;
    }
    
    .meta-item {
      text-align: center;
    }
    
    .meta-label {
      font-size: 8pt;
      color: ${COLORS.sage};
      margin-bottom: 2px;
    }
    
    .meta-value {
      font-size: 10pt;
      font-weight: 600;
      color: ${COLORS.forest};
    }
    
    .meta-hijri {
      font-size: 8pt;
      color: ${COLORS.gold};
    }
    
    /* AAOIFI Reference */
    .aaoifi-ref {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: linear-gradient(135deg, ${COLORS.forest} 0%, ${COLORS.teal} 100%);
      color: ${COLORS.white};
      padding: 8px 15px;
      border-radius: 6px;
      margin-bottom: 12px;
    }
    
    .aaoifi-icon {
      font-size: 18pt;
    }
    
    .aaoifi-standard {
      font-weight: 600;
      font-size: 10pt;
    }
    
    .aaoifi-title {
      font-size: 9pt;
      opacity: 0.9;
    }
    
    /* Summary Section */
    .summary-section {
      margin-bottom: 15px;
    }
    
    .section-title {
      font-size: 12pt;
      font-weight: 600;
      color: ${COLORS.forest};
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid ${COLORS.gold}50;
    }
    
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }
    
    .summary-item {
      background: ${COLORS.cream};
      padding: 8px;
      border-radius: 4px;
      text-align: center;
      border: 1px solid ${COLORS.forest}10;
    }
    
    .summary-item.highlight {
      background: ${COLORS.forest};
      color: ${COLORS.white};
    }
    
    .summary-item.highlight .summary-label {
      color: ${COLORS.gold};
    }
    
    .summary-label {
      font-size: 7pt;
      color: ${COLORS.sage};
      margin-bottom: 2px;
    }
    
    .summary-value {
      font-size: 10pt;
      font-weight: 600;
    }
    
    .summary-value.profit {
      color: ${COLORS.gold};
    }
    
    .summary-value.total {
      color: ${COLORS.teal};
    }
    
    /* Schedule Table */
    .schedule-section {
      margin-bottom: 12px;
    }
    
    .schedule-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
    }
    
    .schedule-table th {
      background: ${COLORS.forest};
      color: ${COLORS.white};
      padding: 6px 4px;
      text-align: ${isRTL ? 'right' : 'left'};
      font-weight: 600;
      font-size: 7pt;
      white-space: nowrap;
    }
    
    .schedule-table td {
      padding: 5px 4px;
      border-bottom: 1px solid ${COLORS.forest}10;
      text-align: ${isRTL ? 'right' : 'left'};
    }
    
    .schedule-table tr.even {
      background: ${COLORS.cream};
    }
    
    .schedule-table tr.odd {
      background: ${COLORS.white};
    }
    
    .col-no {
      width: 5%;
      text-align: center !important;
      font-weight: 600;
    }
    
    .col-date {
      width: 15%;
    }
    
    .date-gregorian {
      font-size: 8pt;
    }
    
    .col-balance, .col-payment, .col-profit, .col-principal {
      width: 13%;
      text-align: ${isRTL ? 'left' : 'right'} !important;
      font-family: 'Inter', monospace;
    }
    
    .col-profit {
      color: ${COLORS.gold};
    }
    
    .col-principal {
      color: ${COLORS.teal};
    }
    
    .totals-row {
      background: ${COLORS.forest} !important;
      color: ${COLORS.white};
      font-weight: 700;
    }
    
    .totals-row td {
      border-bottom: none;
      padding: 8px 4px;
    }
    
    .totals-label {
      text-align: ${isRTL ? 'right' : 'left'} !important;
      font-size: 9pt;
    }
    
    /* Prepayment Note */
    .prepayment-note {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      background: ${COLORS.lightGold};
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 10px;
      border-${isRTL ? 'right' : 'left'}: 3px solid ${COLORS.gold};
    }
    
    .note-icon {
      font-size: 14pt;
    }
    
    .note-text {
      font-size: 8pt;
      color: ${COLORS.forest};
      line-height: 1.4;
    }
    
    /* Disclaimer */
    .disclaimer {
      background: ${COLORS.cream};
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 10px;
      border: 1px solid ${COLORS.forest}10;
    }
    
    .disclaimer p {
      font-size: 7pt;
      color: ${COLORS.sage};
      line-height: 1.4;
    }
    
    /* Footer */
    .footer {
      text-align: center;
      padding-top: 8px;
      border-top: 1px solid ${COLORS.gold};
    }
    
    .footer-contact {
      font-size: 8pt;
      color: ${COLORS.forest};
      margin-bottom: 2px;
    }
    
    .footer-website {
      font-size: 8pt;
      color: ${COLORS.sage};
    }
    
    .copyright {
      font-size: 7pt;
      color: ${COLORS.sage};
      margin-top: 4px;
    }
    
    /* Page Number */
    .page-number {
      position: absolute;
      bottom: 12mm;
      ${isRTL ? 'left' : 'right'}: 20mm;
      font-size: 8pt;
      color: ${COLORS.sage};
    }
    
    /* Continuation Header */
    .continuation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid ${COLORS.gold};
    }
    
    .continuation-header h2 {
      font-size: 14pt;
      color: ${COLORS.forest};
    }
    
    .report-ref-small {
      font-size: 8pt;
      color: ${COLORS.sage};
    }
    
    /* Print Styles */
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { margin: 0; padding: 10mm 15mm; }
    }
    
    @page {
      size: A4 landscape;
      margin: 0;
    }
  </style>
</head>
<body>
  ${pagesHTML}
</body>
</html>
`;
}

/**
 * Open amortization schedule in new window for preview/print
 */
export function previewAmortizationSchedule(data: AmortizationScheduleData): void {
  const htmlContent = generateAmortizationPDF(data);
  const previewWindow = window.open('', '_blank');
  if (previewWindow) {
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
  }
}

/**
 * Download amortization schedule as PDF
 */
export function downloadAmortizationSchedule(data: AmortizationScheduleData): void {
  const htmlContent = generateAmortizationPDF(data);
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
}
