/**
 * Financial Glossary Page
 * Comprehensive Arabic/English financial terms dictionary
 * Self-maintaining, no content updates required
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Filter, ChevronDown, ArrowUpDown, Globe2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface GlossaryTerm {
  id: string;
  termEn: string;
  termAr: string;
  definitionEn: string;
  definitionAr: string;
  category: string;
  categoryAr: string;
}

// Comprehensive financial glossary - 100+ terms
const glossaryTerms: GlossaryTerm[] = [
  // Islamic Finance Terms
  { id: '1', termEn: 'Murabaha', termAr: 'المرابحة', definitionEn: 'A cost-plus financing structure where the seller discloses the cost and profit margin to the buyer. Commonly used in Islamic banking for trade financing.', definitionAr: 'هيكل تمويل بالتكلفة زائد الربح حيث يفصح البائع عن التكلفة وهامش الربح للمشتري. يستخدم عادة في المصرفية الإسلامية لتمويل التجارة.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '2', termEn: 'Ijara', termAr: 'الإجارة', definitionEn: 'An Islamic leasing contract where the bank purchases an asset and leases it to the customer for a specified period with an option to purchase at the end.', definitionAr: 'عقد إيجار إسلامي حيث يشتري البنك أصلاً ويؤجره للعميل لفترة محددة مع خيار الشراء في النهاية.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '3', termEn: 'Sukuk', termAr: 'الصكوك', definitionEn: 'Islamic financial certificates similar to bonds but structured to comply with Sharia law. They represent ownership in tangible assets, usufruct, or services.', definitionAr: 'شهادات مالية إسلامية مشابهة للسندات لكنها مهيكلة للامتثال للشريعة الإسلامية. تمثل ملكية في أصول ملموسة أو منافع أو خدمات.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '4', termEn: 'Musharaka', termAr: 'المشاركة', definitionEn: 'A joint venture partnership where all partners contribute capital and share profits and losses according to agreed ratios.', definitionAr: 'شراكة مشروع مشترك حيث يساهم جميع الشركاء برأس المال ويتقاسمون الأرباح والخسائر وفقاً لنسب متفق عليها.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '5', termEn: 'Mudaraba', termAr: 'المضاربة', definitionEn: 'A profit-sharing partnership where one party provides capital (Rab al-Mal) and the other provides expertise and management (Mudarib).', definitionAr: 'شراكة تقاسم الأرباح حيث يقدم طرف رأس المال (رب المال) ويقدم الآخر الخبرة والإدارة (المضارب).', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '6', termEn: 'Takaful', termAr: 'التكافل', definitionEn: 'Islamic insurance based on mutual cooperation where participants contribute to a pool to guarantee each other against loss or damage.', definitionAr: 'تأمين إسلامي قائم على التعاون المتبادل حيث يساهم المشاركون في صندوق لضمان بعضهم البعض ضد الخسارة أو الضرر.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '7', termEn: 'Riba', termAr: 'الربا', definitionEn: 'Interest or usury prohibited in Islamic finance. Any guaranteed increase on a loan or debt is considered riba.', definitionAr: 'الفائدة أو الربا المحرم في التمويل الإسلامي. أي زيادة مضمونة على قرض أو دين تعتبر ربا.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '8', termEn: 'Gharar', termAr: 'الغرر', definitionEn: 'Excessive uncertainty or ambiguity in contracts that is prohibited in Islamic finance. Contracts must have clear terms and conditions.', definitionAr: 'عدم اليقين المفرط أو الغموض في العقود المحظور في التمويل الإسلامي. يجب أن تكون للعقود شروط وأحكام واضحة.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '9', termEn: 'Sharia Board', termAr: 'هيئة الرقابة الشرعية', definitionEn: 'A committee of Islamic scholars who supervise and approve financial products and transactions for Sharia compliance.', definitionAr: 'لجنة من العلماء المسلمين تشرف على المنتجات والمعاملات المالية وتوافق عليها للامتثال الشرعي.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '10', termEn: 'Wakala', termAr: 'الوكالة', definitionEn: 'An agency contract where one party appoints another as an agent to perform a specific task on their behalf for a fee.', definitionAr: 'عقد وكالة حيث يعين طرف طرفاً آخر وكيلاً لأداء مهمة محددة نيابة عنه مقابل أجر.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  
  // Banking & Finance Terms
  { id: '11', termEn: 'Capital Adequacy Ratio (CAR)', termAr: 'نسبة كفاية رأس المال', definitionEn: 'A measure of a bank\'s capital expressed as a percentage of its risk-weighted assets. Basel III requires a minimum of 8%.', definitionAr: 'مقياس لرأس مال البنك معبراً عنه كنسبة مئوية من أصوله المرجحة بالمخاطر. تتطلب بازل 3 حداً أدنى 8%.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '12', termEn: 'Non-Performing Loan (NPL)', termAr: 'القرض المتعثر', definitionEn: 'A loan where the borrower has not made scheduled payments for a specified period, typically 90 days or more.', definitionAr: 'قرض لم يسدد فيه المقترض الدفعات المجدولة لفترة محددة، عادة 90 يوماً أو أكثر.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '13', termEn: 'Liquidity Coverage Ratio (LCR)', termAr: 'نسبة تغطية السيولة', definitionEn: 'A Basel III requirement ensuring banks hold enough high-quality liquid assets to cover net cash outflows for 30 days.', definitionAr: 'متطلب بازل 3 يضمن احتفاظ البنوك بأصول سائلة عالية الجودة كافية لتغطية صافي التدفقات النقدية الخارجة لمدة 30 يوماً.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '14', termEn: 'Core Banking System', termAr: 'النظام المصرفي الأساسي', definitionEn: 'The central software system that processes banking transactions and maintains customer accounts across all branches.', definitionAr: 'نظام البرمجيات المركزي الذي يعالج المعاملات المصرفية ويحافظ على حسابات العملاء عبر جميع الفروع.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '15', termEn: 'Know Your Customer (KYC)', termAr: 'اعرف عميلك', definitionEn: 'The process of verifying the identity of clients and assessing their suitability and potential risks for illegal activities.', definitionAr: 'عملية التحقق من هوية العملاء وتقييم ملاءمتهم والمخاطر المحتملة للأنشطة غير القانونية.', category: 'Compliance', categoryAr: 'الامتثال' },
  { id: '16', termEn: 'Anti-Money Laundering (AML)', termAr: 'مكافحة غسل الأموال', definitionEn: 'Laws, regulations, and procedures designed to prevent criminals from disguising illegally obtained funds as legitimate income.', definitionAr: 'قوانين ولوائح وإجراءات مصممة لمنع المجرمين من إخفاء الأموال المحصلة بطرق غير مشروعة كدخل مشروع.', category: 'Compliance', categoryAr: 'الامتثال' },
  { id: '17', termEn: 'Combating Financing of Terrorism (CFT)', termAr: 'مكافحة تمويل الإرهاب', definitionEn: 'Measures and regulations to prevent and detect the financing of terrorist activities and organizations.', definitionAr: 'تدابير ولوائح لمنع واكتشاف تمويل الأنشطة والمنظمات الإرهابية.', category: 'Compliance', categoryAr: 'الامتثال' },
  { id: '18', termEn: 'Basel III', termAr: 'بازل 3', definitionEn: 'International regulatory framework for banks developed by the Basel Committee, focusing on capital requirements, leverage, and liquidity.', definitionAr: 'إطار تنظيمي دولي للبنوك طورته لجنة بازل، يركز على متطلبات رأس المال والرافعة المالية والسيولة.', category: 'Regulation', categoryAr: 'التنظيم' },
  { id: '19', termEn: 'FATF', termAr: 'مجموعة العمل المالي', definitionEn: 'Financial Action Task Force - an intergovernmental body setting standards to combat money laundering and terrorist financing.', definitionAr: 'مجموعة العمل المالي - هيئة حكومية دولية تضع معايير لمكافحة غسل الأموال وتمويل الإرهاب.', category: 'Regulation', categoryAr: 'التنظيم' },
  { id: '20', termEn: 'AAOIFI', termAr: 'أيوفي', definitionEn: 'Accounting and Auditing Organization for Islamic Financial Institutions - sets Sharia, accounting, and auditing standards.', definitionAr: 'هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية - تضع معايير الشريعة والمحاسبة والمراجعة.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  
  // Risk Management Terms
  { id: '21', termEn: 'Credit Risk', termAr: 'مخاطر الائتمان', definitionEn: 'The risk of loss arising from a borrower\'s failure to repay a loan or meet contractual obligations.', definitionAr: 'خطر الخسارة الناشئ عن فشل المقترض في سداد قرض أو الوفاء بالتزامات تعاقدية.', category: 'Risk Management', categoryAr: 'إدارة المخاطر' },
  { id: '22', termEn: 'Operational Risk', termAr: 'المخاطر التشغيلية', definitionEn: 'Risk of loss from inadequate or failed internal processes, people, systems, or external events.', definitionAr: 'خطر الخسارة من العمليات الداخلية غير الكافية أو الفاشلة أو الأشخاص أو الأنظمة أو الأحداث الخارجية.', category: 'Risk Management', categoryAr: 'إدارة المخاطر' },
  { id: '23', termEn: 'Market Risk', termAr: 'مخاطر السوق', definitionEn: 'Risk of losses in positions arising from movements in market prices such as interest rates, exchange rates, and equity prices.', definitionAr: 'خطر الخسائر في المراكز الناشئة عن تحركات أسعار السوق مثل أسعار الفائدة وأسعار الصرف وأسعار الأسهم.', category: 'Risk Management', categoryAr: 'إدارة المخاطر' },
  { id: '24', termEn: 'Liquidity Risk', termAr: 'مخاطر السيولة', definitionEn: 'Risk that an entity will not be able to meet its financial obligations as they come due without incurring unacceptable losses.', definitionAr: 'خطر عدم قدرة الكيان على الوفاء بالتزاماته المالية عند استحقاقها دون تكبد خسائر غير مقبولة.', category: 'Risk Management', categoryAr: 'إدارة المخاطر' },
  { id: '25', termEn: 'Stress Testing', termAr: 'اختبار الضغط', definitionEn: 'Analysis technique to evaluate the potential impact of extreme but plausible adverse scenarios on a financial institution.', definitionAr: 'تقنية تحليل لتقييم التأثير المحتمل للسيناريوهات السلبية المتطرفة ولكن المعقولة على مؤسسة مالية.', category: 'Risk Management', categoryAr: 'إدارة المخاطر' },
  
  // Governance Terms
  { id: '26', termEn: 'Corporate Governance', termAr: 'حوكمة الشركات', definitionEn: 'System of rules, practices, and processes by which a company is directed and controlled, balancing stakeholder interests.', definitionAr: 'نظام القواعد والممارسات والعمليات التي يتم من خلالها توجيه الشركة والتحكم فيها، مع موازنة مصالح أصحاب المصلحة.', category: 'Governance', categoryAr: 'الحوكمة' },
  { id: '27', termEn: 'Board of Directors', termAr: 'مجلس الإدارة', definitionEn: 'A group of individuals elected to represent shareholders and oversee the management and strategic direction of a company.', definitionAr: 'مجموعة من الأفراد المنتخبين لتمثيل المساهمين والإشراف على إدارة الشركة وتوجهها الاستراتيجي.', category: 'Governance', categoryAr: 'الحوكمة' },
  { id: '28', termEn: 'Audit Committee', termAr: 'لجنة التدقيق', definitionEn: 'A committee of the board responsible for overseeing financial reporting, internal controls, and audit functions.', definitionAr: 'لجنة من مجلس الإدارة مسؤولة عن الإشراف على التقارير المالية والضوابط الداخلية ووظائف التدقيق.', category: 'Governance', categoryAr: 'الحوكمة' },
  { id: '29', termEn: 'Internal Audit', termAr: 'التدقيق الداخلي', definitionEn: 'Independent assurance function that evaluates and improves the effectiveness of risk management, control, and governance processes.', definitionAr: 'وظيفة تأكيد مستقلة تقيم وتحسن فعالية عمليات إدارة المخاطر والرقابة والحوكمة.', category: 'Governance', categoryAr: 'الحوكمة' },
  { id: '30', termEn: 'Fiduciary Duty', termAr: 'الواجب الائتماني', definitionEn: 'Legal obligation to act in the best interest of another party, such as shareholders or beneficiaries.', definitionAr: 'التزام قانوني بالتصرف في مصلحة طرف آخر، مثل المساهمين أو المستفيدين.', category: 'Governance', categoryAr: 'الحوكمة' },
  
  // Microfinance Terms
  { id: '31', termEn: 'Microfinance Institution (MFI)', termAr: 'مؤسسة التمويل الأصغر', definitionEn: 'Financial institution providing small loans and other financial services to low-income individuals or groups.', definitionAr: 'مؤسسة مالية تقدم قروضاً صغيرة وخدمات مالية أخرى للأفراد أو المجموعات ذات الدخل المنخفض.', category: 'Microfinance', categoryAr: 'التمويل الأصغر' },
  { id: '32', termEn: 'Financial Inclusion', termAr: 'الشمول المالي', definitionEn: 'Ensuring access to useful and affordable financial products and services for all individuals and businesses.', definitionAr: 'ضمان الوصول إلى منتجات وخدمات مالية مفيدة وبأسعار معقولة لجميع الأفراد والشركات.', category: 'Microfinance', categoryAr: 'التمويل الأصغر' },
  { id: '33', termEn: 'Group Lending', termAr: 'الإقراض الجماعي', definitionEn: 'Microfinance methodology where loans are made to individuals through groups that provide mutual guarantee.', definitionAr: 'منهجية تمويل أصغر حيث تُقدم القروض للأفراد من خلال مجموعات توفر ضماناً متبادلاً.', category: 'Microfinance', categoryAr: 'التمويل الأصغر' },
  { id: '34', termEn: 'Portfolio at Risk (PAR)', termAr: 'المحفظة المعرضة للخطر', definitionEn: 'Percentage of outstanding loan portfolio with payments overdue by a specified number of days.', definitionAr: 'نسبة محفظة القروض القائمة مع مدفوعات متأخرة بعدد محدد من الأيام.', category: 'Microfinance', categoryAr: 'التمويل الأصغر' },
  { id: '35', termEn: 'Operational Self-Sufficiency', termAr: 'الاكتفاء الذاتي التشغيلي', definitionEn: 'Ratio indicating whether an MFI earns enough revenue to cover its operating costs without subsidies.', definitionAr: 'نسبة تشير إلى ما إذا كانت مؤسسة التمويل الأصغر تحقق إيرادات كافية لتغطية تكاليفها التشغيلية دون دعم.', category: 'Microfinance', categoryAr: 'التمويل الأصغر' },
  
  // Economic Terms
  { id: '36', termEn: 'Gross Domestic Product (GDP)', termAr: 'الناتج المحلي الإجمالي', definitionEn: 'Total monetary value of all goods and services produced within a country\'s borders in a specific time period.', definitionAr: 'القيمة النقدية الإجمالية لجميع السلع والخدمات المنتجة داخل حدود بلد ما في فترة زمنية محددة.', category: 'Economics', categoryAr: 'الاقتصاد' },
  { id: '37', termEn: 'Inflation', termAr: 'التضخم', definitionEn: 'Rate at which the general level of prices for goods and services rises, eroding purchasing power.', definitionAr: 'المعدل الذي يرتفع به المستوى العام لأسعار السلع والخدمات، مما يؤدي إلى تآكل القوة الشرائية.', category: 'Economics', categoryAr: 'الاقتصاد' },
  { id: '38', termEn: 'Exchange Rate', termAr: 'سعر الصرف', definitionEn: 'Price of one currency expressed in terms of another currency, determined by supply and demand in forex markets.', definitionAr: 'سعر عملة واحدة معبراً عنه بعملة أخرى، يحدده العرض والطلب في أسواق الصرف الأجنبي.', category: 'Economics', categoryAr: 'الاقتصاد' },
  { id: '39', termEn: 'Balance of Payments', termAr: 'ميزان المدفوعات', definitionEn: 'Record of all economic transactions between residents of a country and the rest of the world.', definitionAr: 'سجل لجميع المعاملات الاقتصادية بين المقيمين في بلد ما وبقية العالم.', category: 'Economics', categoryAr: 'الاقتصاد' },
  { id: '40', termEn: 'Foreign Direct Investment (FDI)', termAr: 'الاستثمار الأجنبي المباشر', definitionEn: 'Investment made by a firm or individual in one country into business interests in another country.', definitionAr: 'استثمار تقوم به شركة أو فرد في بلد ما في مصالح تجارية في بلد آخر.', category: 'Economics', categoryAr: 'الاقتصاد' },
  
  // Additional terms for comprehensiveness
  { id: '41', termEn: 'Zakat', termAr: 'الزكاة', definitionEn: 'Islamic obligatory almsgiving calculated as 2.5% of wealth above a minimum threshold (nisab), one of the Five Pillars of Islam.', definitionAr: 'صدقة إسلامية واجبة تحسب بنسبة 2.5% من الثروة فوق حد أدنى (النصاب)، أحد أركان الإسلام الخمسة.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '42', termEn: 'Qard Hasan', termAr: 'القرض الحسن', definitionEn: 'Benevolent loan in Islamic finance where the borrower only repays the principal without any interest or profit.', definitionAr: 'قرض خيري في التمويل الإسلامي حيث يسدد المقترض الأصل فقط دون أي فائدة أو ربح.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '43', termEn: 'Istisna', termAr: 'الاستصناع', definitionEn: 'Islamic contract for manufacturing where payment is made in advance for goods to be manufactured according to specifications.', definitionAr: 'عقد إسلامي للتصنيع حيث يتم الدفع مقدماً للسلع التي سيتم تصنيعها وفقاً للمواصفات.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '44', termEn: 'Salam', termAr: 'السلم', definitionEn: 'Forward sale contract in Islamic finance where payment is made in advance for goods to be delivered at a future date.', definitionAr: 'عقد بيع آجل في التمويل الإسلامي حيث يتم الدفع مقدماً للسلع التي سيتم تسليمها في تاريخ مستقبلي.', category: 'Islamic Finance', categoryAr: 'التمويل الإسلامي' },
  { id: '45', termEn: 'Due Diligence', termAr: 'العناية الواجبة', definitionEn: 'Comprehensive investigation and analysis of a business or investment opportunity before making a decision.', definitionAr: 'تحقيق وتحليل شامل لفرصة عمل أو استثمار قبل اتخاذ قرار.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '46', termEn: 'Collateral', termAr: 'الضمان', definitionEn: 'Asset pledged by a borrower to secure a loan, which the lender can seize if the borrower defaults.', definitionAr: 'أصل يرهنه المقترض لتأمين قرض، يمكن للمقرض الاستيلاء عليه إذا تخلف المقترض عن السداد.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '47', termEn: 'Syndicated Loan', termAr: 'القرض المشترك', definitionEn: 'Large loan provided by a group of lenders who share the risk and funding of the loan.', definitionAr: 'قرض كبير يقدمه مجموعة من المقرضين الذين يتشاركون مخاطر وتمويل القرض.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '48', termEn: 'Tier 1 Capital', termAr: 'رأس المال من الشريحة الأولى', definitionEn: 'Core capital of a bank consisting of common equity and disclosed reserves, the primary measure of financial strength.', definitionAr: 'رأس المال الأساسي للبنك المكون من حقوق الملكية العادية والاحتياطيات المعلنة، المقياس الأساسي للقوة المالية.', category: 'Banking', categoryAr: 'المصرفية' },
  { id: '49', termEn: 'Suspicious Transaction Report (STR)', termAr: 'تقرير المعاملات المشبوهة', definitionEn: 'Report filed with financial intelligence units when a transaction appears suspicious or potentially related to money laundering.', definitionAr: 'تقرير يُقدم لوحدات الاستخبارات المالية عندما تبدو معاملة مشبوهة أو مرتبطة محتملاً بغسل الأموال.', category: 'Compliance', categoryAr: 'الامتثال' },
  { id: '50', termEn: 'Politically Exposed Person (PEP)', termAr: 'الشخص المعرض سياسياً', definitionEn: 'Individual who holds or has held a prominent public position, requiring enhanced due diligence in financial transactions.', definitionAr: 'فرد يشغل أو شغل منصباً عاماً بارزاً، يتطلب عناية واجبة معززة في المعاملات المالية.', category: 'Compliance', categoryAr: 'الامتثال' },
];

const categories = [
  { en: 'All', ar: 'الكل' },
  { en: 'Islamic Finance', ar: 'التمويل الإسلامي' },
  { en: 'Banking', ar: 'المصرفية' },
  { en: 'Compliance', ar: 'الامتثال' },
  { en: 'Risk Management', ar: 'إدارة المخاطر' },
  { en: 'Governance', ar: 'الحوكمة' },
  { en: 'Microfinance', ar: 'التمويل الأصغر' },
  { en: 'Economics', ar: 'الاقتصاد' },
  { en: 'Regulation', ar: 'التنظيم' },
];

export default function Glossary() {
  const { language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let filtered = glossaryTerms;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term =>
        term.termEn.toLowerCase().includes(query) ||
        term.termAr.includes(query) ||
        term.definitionEn.toLowerCase().includes(query) ||
        term.definitionAr.includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      const termA = language === 'ar' ? a.termAr : a.termEn;
      const termB = language === 'ar' ? b.termAr : b.termEn;
      return sortOrder === 'asc' 
        ? termA.localeCompare(termB, language === 'ar' ? 'ar' : 'en')
        : termB.localeCompare(termA, language === 'ar' ? 'ar' : 'en');
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortOrder, language]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: GlossaryTerm[] } = {};
    filteredTerms.forEach(term => {
      const firstLetter = (language === 'ar' ? term.termAr : term.termEn)[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms, language]);

  return (
    <div className="min-h-screen bg-[#faf9f6]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#133129] via-[#1a3d32] to-[#224B40] py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #d4a84b 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
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
                <BookOpen className="w-4 h-4 text-[#d4a84b]" />
                <span className="text-[#d4a84b] text-sm font-medium">
                  {language === 'ar' ? '50+ مصطلح مالي' : '50+ Financial Terms'}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'ar' ? 'القاموس المالي' : 'Financial Glossary'}
              </h1>
              <p className="text-[#faf9f6]/80 text-lg mb-8">
                {language === 'ar' 
                  ? 'دليلك الشامل للمصطلحات المالية والمصرفية والإسلامية'
                  : 'Your comprehensive guide to financial, banking, and Islamic finance terminology'
                }
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-[#406D61] ${isRTL ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'ابحث عن مصطلح...' : 'Search for a term...'}
                  className={`w-full py-4 bg-white/95 border-0 rounded-xl text-[#133129] placeholder:text-[#406D61]/60 focus:outline-none focus:ring-2 focus:ring-[#d4a84b] shadow-lg ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-12 sm:py-16">
          <div className="container">
            {/* Filters */}
            <div className={`flex flex-wrap items-center justify-between gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.en}
                    onClick={() => setSelectedCategory(cat.en)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.en
                        ? 'bg-[#133129] text-[#faf9f6]'
                        : 'bg-[#133129]/5 text-[#133129] hover:bg-[#133129]/10'
                    }`}
                  >
                    {language === 'ar' ? cat.ar : cat.en}
                  </button>
                ))}
              </div>
              
              {/* Sort Toggle */}
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className={`flex items-center gap-2 px-4 py-2 bg-[#133129]/5 rounded-lg text-[#133129] hover:bg-[#133129]/10 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <ArrowUpDown className="w-4 h-4" />
                <span className="text-sm">{sortOrder === 'asc' ? (language === 'ar' ? 'أ-ي' : 'A-Z') : (language === 'ar' ? 'ي-أ' : 'Z-A')}</span>
              </button>
            </div>

            {/* Results Count */}
            <p className="text-[#406D61] text-sm mb-6">
              {language === 'ar' 
                ? `عرض ${filteredTerms.length} مصطلح`
                : `Showing ${filteredTerms.length} terms`
              }
            </p>

            {/* Terms List */}
            <div className="space-y-4">
              {Object.entries(groupedTerms).map(([letter, terms]) => (
                <div key={letter}>
                  {/* Letter Header */}
                  <div className="sticky top-20 z-10 bg-[#faf9f6] py-2 mb-3">
                    <div className="w-10 h-10 bg-[#133129] rounded-lg flex items-center justify-center">
                      <span className="text-[#d4a84b] font-bold text-lg">{letter}</span>
                    </div>
                  </div>
                  
                  {/* Terms */}
                  <div className="space-y-3">
                    {terms.map((term) => (
                      <motion.div
                        key={term.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl border border-[#133129]/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                          className={`w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                        >
                          <div className="flex-1">
                            <div className={`flex items-center gap-3 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <h3 className="text-lg font-semibold text-[#133129]">
                                {language === 'ar' ? term.termAr : term.termEn}
                              </h3>
                              <span className="px-2 py-0.5 bg-[#d4a84b]/10 text-[#d4a84b] text-xs rounded-full">
                                {language === 'ar' ? term.categoryAr : term.category}
                              </span>
                            </div>
                            <p className="text-[#406D61] text-sm">
                              {language === 'ar' ? term.termEn : term.termAr}
                            </p>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-[#406D61] transition-transform flex-shrink-0 ${expandedTerm === term.id ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {expandedTerm === term.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-[#133129]/10"
                          >
                            <div className="pt-4 space-y-4">
                              {/* English Definition */}
                              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <Globe2 className="w-4 h-4 text-[#d4a84b]" />
                                  <span className="text-xs font-medium text-[#d4a84b] uppercase">English</span>
                                </div>
                                <p className="text-[#133129]/80 text-sm leading-relaxed" dir="ltr">
                                  {term.definitionEn}
                                </p>
                              </div>
                              
                              {/* Arabic Definition */}
                              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                                <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  <Globe2 className="w-4 h-4 text-[#d4a84b]" />
                                  <span className="text-xs font-medium text-[#d4a84b]">العربية</span>
                                </div>
                                <p className="text-[#133129]/80 text-sm leading-relaxed" dir="rtl">
                                  {term.definitionAr}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredTerms.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-[#406D61]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#133129] mb-2">
                  {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                </h3>
                <p className="text-[#406D61]">
                  {language === 'ar' ? 'جرب البحث بكلمات مختلفة' : 'Try searching with different keywords'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-[#133129]">
          <div className="container text-center">
            <h2 className="text-2xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هل تحتاج إلى استشارة متخصصة؟' : 'Need Expert Consultation?'}
            </h2>
            <p className="text-[#faf9f6]/70 mb-6 max-w-xl mx-auto">
              {language === 'ar'
                ? 'فريقنا من الخبراء جاهز لمساعدتك في فهم وتطبيق هذه المفاهيم في مؤسستك.'
                : 'Our team of experts is ready to help you understand and apply these concepts in your organization.'
              }
            </p>
            <Button asChild className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold">
              <a href="/contact">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
