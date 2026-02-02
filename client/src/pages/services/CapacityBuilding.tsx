/**
 * Capacity Building Service Page
 * Redesigned with creative visuals, unique navigation, and modern animations
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  GraduationCap, 
  CheckCircle, 
  ChevronRight,
  Users,
  BookOpen,
  Award,
  Target,
  Lightbulb,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Play,
  ChevronDown,
  Star,
  Briefcase,
  Shield,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/App';

// Training tracks with icons and detailed info
const trainingTracks = [
  {
    id: 'board',
    icon: Users,
    titleEn: 'Board Leadership',
    titleAr: 'قيادة مجلس الإدارة',
    descEn: 'Strategic governance and fiduciary excellence for board members',
    descAr: 'الحوكمة الاستراتيجية والتميز الائتماني لأعضاء مجلس الإدارة',
    color: 'from-amber-500 to-orange-600',
    programs: ['Board Governance Fundamentals', 'Strategic Oversight', 'Risk Committee Excellence'],
    duration: '2-3 days',
    audience: 'Board Members, Directors'
  },
  {
    id: 'islamic',
    icon: BookOpen,
    titleEn: 'Islamic Finance',
    titleAr: 'التمويل الإسلامي',
    descEn: 'Sharia-compliant product development and structuring',
    descAr: 'تطوير وهيكلة المنتجات المتوافقة مع الشريعة',
    color: 'from-emerald-500 to-teal-600',
    programs: ['Islamic Finance Fundamentals', 'Sukuk Structuring', 'Sharia Audit'],
    duration: '5 days',
    audience: 'Banking Staff, Product Teams'
  },
  {
    id: 'compliance',
    icon: Shield,
    titleEn: 'Risk & Compliance',
    titleAr: 'المخاطر والامتثال',
    descEn: 'AML/CFT frameworks and regulatory compliance mastery',
    descAr: 'أطر مكافحة غسل الأموال والامتثال التنظيمي',
    color: 'from-blue-500 to-indigo-600',
    programs: ['AML/CFT Compliance', 'Internal Audit', 'Regulatory Reporting'],
    duration: '3-4 days',
    audience: 'Compliance Teams, Risk Officers'
  },
  {
    id: 'leadership',
    icon: Target,
    titleEn: 'Executive Leadership',
    titleAr: 'القيادة التنفيذية',
    descEn: 'Strategic thinking and organizational transformation',
    descAr: 'التفكير الاستراتيجي والتحول المؤسسي',
    color: 'from-purple-500 to-violet-600',
    programs: ['Executive Development', 'Change Management', 'Strategic Planning'],
    duration: '4-5 days',
    audience: 'C-Suite, Senior Management'
  },
  {
    id: 'digital',
    icon: TrendingUp,
    titleEn: 'Digital Banking',
    titleAr: 'الخدمات المصرفية الرقمية',
    descEn: 'Digital transformation and fintech integration',
    descAr: 'التحول الرقمي وتكامل التقنية المالية',
    color: 'from-cyan-500 to-blue-600',
    programs: ['Digital Strategy', 'Core Banking Systems', 'API Integration'],
    duration: '3 days',
    audience: 'IT Teams, Digital Officers'
  },
  {
    id: 'operations',
    icon: BarChart3,
    titleEn: 'Banking Operations',
    titleAr: 'العمليات المصرفية',
    descEn: 'Operational excellence and process optimization',
    descAr: 'التميز التشغيلي وتحسين العمليات',
    color: 'from-rose-500 to-pink-600',
    programs: ['Operations Management', 'Process Improvement', 'Quality Assurance'],
    duration: '2-3 days',
    audience: 'Operations Staff, Branch Managers'
  }
];

// Training formats with visual icons
const trainingFormats = [
  { icon: Users, labelEn: 'In-Person Workshops', labelAr: 'ورش عمل حضورية', descEn: 'Interactive face-to-face sessions', descAr: 'جلسات تفاعلية وجهاً لوجه' },
  { icon: Play, labelEn: 'Virtual Training', labelAr: 'تدريب افتراضي', descEn: 'Live online sessions', descAr: 'جلسات مباشرة عبر الإنترنت' },
  { icon: BookOpen, labelEn: 'Blended Learning', labelAr: 'تعلم مدمج', descEn: 'Combined online & offline', descAr: 'مزيج من التعلم عبر الإنترنت والحضوري' },
  { icon: Briefcase, labelEn: 'On-the-Job Coaching', labelAr: 'تدريب أثناء العمل', descEn: 'Practical workplace training', descAr: 'تدريب عملي في مكان العمل' },
  { icon: Award, labelEn: 'Certification Programs', labelAr: 'برامج الشهادات', descEn: 'Accredited certifications', descAr: 'شهادات معتمدة' }
];

// Stats for impact section
const impactStats = [
  { valueEn: '500+', valueAr: '٥٠٠+', labelEn: 'Professionals Trained', labelAr: 'متخصص تم تدريبهم' },
  { valueEn: '50+', valueAr: '٥٠+', labelEn: 'Programs Delivered', labelAr: 'برنامج تم تقديمه' },
  { valueEn: '15+', valueAr: '١٥+', labelEn: 'Partner Institutions', labelAr: 'مؤسسة شريكة' },
  { valueEn: '98%', valueAr: '٩٨٪', labelEn: 'Satisfaction Rate', labelAr: 'نسبة الرضا' }
];

export default function CapacityBuilding() {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#faf9f6]" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO 
        title={language === 'ar' ? 'بناء القدرات | كوزواي' : 'Capacity Building | CauseWay'}
        description={language === 'ar' 
          ? 'برامج تدريب وتطوير شاملة لتعزيز القدرات المؤسسية على جميع المستويات'
          : 'Board training, executive development, staff certification, and workshops for financial institutions in Yemen.'
        }
        keywords="Capacity Building, Training, Board Governance, Executive Development, Workshops, Yemen"
      />
      <Header />
      
      {/* Hero Section with Dynamic Background */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[#133129]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a84b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#133129] via-[#224B40] to-[#133129]" />
        </div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 right-10 w-64 h-64 bg-[#d4a84b]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#406D61]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container relative z-10 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Back Link */}
            <Link href="/services">
              <motion.span 
                className={`inline-flex items-center text-[#d4a84b] hover:text-[#d4a84b]/80 mb-6 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
                whileHover={{ x: isRTL ? 5 : -5 }}
              >
                <ChevronRight className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1 rotate-180'}`} />
                {language === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
              </motion.span>
            </Link>
            
            {/* Icon Badge */}
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-2xl mb-8 shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1, delay: 0.2 }}
            >
              <GraduationCap className="w-10 h-10 text-[#133129]" />
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#faf9f6] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'ar' ? 'بناء القدرات' : 'Capacity Building'}
            </motion.h1>
            
            {/* Subtitle in other language */}
            <motion.p 
              className="text-xl md:text-2xl text-[#d4a84b] mb-6"
              style={{ fontFamily: language === 'ar' ? "'Source Sans Pro', sans-serif" : "'Amiri', serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {language === 'ar' ? 'Capacity Building' : 'بناء القدرات'}
            </motion.p>
            
            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-[#faf9f6]/80 max-w-3xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {language === 'ar' 
                ? 'برامج تدريب وتطوير شاملة مصممة لتعزيز القدرات المؤسسية على جميع مستويات مؤسستك'
                : 'Comprehensive training and development programs designed to strengthen institutional capabilities at all levels of your organization'
              }
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                onClick={() => openBooking('training')}
                className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                {language === 'ar' ? 'سجل في برنامج تدريبي' : 'Enroll in a Program'}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
              <Button 
                variant="outline"
                onClick={() => openBooking('discovery')}
                className="border-[#faf9f6]/40 text-[#faf9f6] hover:bg-[#faf9f6]/10 px-8 py-6 text-lg"
              >
                {language === 'ar' ? 'استشارة مجانية' : 'Free Consultation'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-[#d4a84b]/60" />
        </motion.div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 bg-white border-y border-[#133129]/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.labelEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#d4a84b] mb-2">
                  {language === 'ar' ? stat.valueAr : stat.valueEn}
                </div>
                <div className="text-[#406D61] text-sm md:text-base">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Tracks - Interactive Grid */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'مسارات التدريب' : 'Training Tracks'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'اختر مسارك التدريبي' : 'Choose Your Learning Path'}
            </h2>
            <p className="text-[#406D61] max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'ستة مسارات تدريبية متخصصة مصممة لتلبية احتياجات المؤسسات المالية'
                : 'Six specialized training tracks designed to meet the needs of financial institutions'
              }
            </p>
          </motion.div>

          {/* Interactive Track Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
              >
                <div className={`
                  relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500
                  ${selectedTrack === track.id ? 'ring-2 ring-[#d4a84b] shadow-2xl' : 'shadow-lg hover:shadow-xl'}
                  ${hoveredTrack === track.id ? 'scale-[1.02]' : ''}
                `}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-90`} />
                  
                  {/* Content */}
                  <div className="relative p-6 md:p-8 text-white min-h-[200px] flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                      <track.icon className="w-7 h-7" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">
                      {language === 'ar' ? track.titleAr : track.titleEn}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 text-sm mb-4 flex-grow">
                      {language === 'ar' ? track.descAr : track.descEn}
                    </p>
                    
                    {/* Meta Info */}
                    <div className={`flex items-center gap-4 text-xs text-white/70 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Clock className="w-3 h-3" />
                        {track.duration}
                      </span>
                      <span className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Users className="w-3 h-3" />
                        {track.audience.split(',')[0]}
                      </span>
                    </div>
                    
                    {/* Expand Indicator */}
                    <motion.div 
                      className="absolute bottom-4 right-4"
                      animate={{ rotate: selectedTrack === track.id ? 180 : 0 }}
                    >
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Expanded Content */}
                <AnimatePresence>
                  {selectedTrack === track.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white rounded-b-2xl p-6 border border-t-0 border-[#133129]/10 shadow-lg">
                        <h4 className="font-semibold text-[#133129] mb-3">
                          {language === 'ar' ? 'البرامج المتاحة:' : 'Available Programs:'}
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {track.programs.map((program) => (
                            <li key={program} className={`flex items-center gap-2 text-[#406D61] text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CheckCircle className="w-4 h-4 text-[#d4a84b]" />
                              {program}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openBooking('training');
                          }}
                          className="w-full bg-[#133129] hover:bg-[#224B40] text-white"
                        >
                          {language === 'ar' ? 'سجل الآن' : 'Enroll Now'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Formats Section */}
      <section className="py-20 bg-[#133129]">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'أساليب التدريب' : 'Training Formats'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'تعلم بالطريقة التي تناسبك' : 'Learn Your Way'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {trainingFormats.map((format, index) => (
              <motion.div
                key={format.labelEn}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-[#224B40]/50 backdrop-blur-sm rounded-xl p-6 text-center border border-[#406D61]/30 hover:border-[#d4a84b]/50 transition-all"
              >
                <div className="w-14 h-14 bg-[#d4a84b]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <format.icon className="w-7 h-7 text-[#d4a84b]" />
                </div>
                <h3 className="text-[#faf9f6] font-semibold mb-2">
                  {language === 'ar' ? format.labelAr : format.labelEn}
                </h3>
                <p className="text-[#faf9f6]/60 text-sm">
                  {language === 'ar' ? format.descAr : format.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#133129]/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Lightbulb className="w-16 h-16 text-[#133129] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'هل لديك احتياجات تدريبية محددة؟' : 'Have Specific Training Needs?'}
            </h2>
            <p className="text-[#133129]/80 text-lg mb-8">
              {language === 'ar' 
                ? 'نصمم برامج تدريبية مخصصة تتناسب مع احتياجات مؤسستك الفريدة'
                : 'We design customized training programs tailored to your organization\'s unique requirements'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                onClick={() => openBooking('discovery')}
                className="bg-[#133129] hover:bg-[#224B40] text-[#faf9f6] px-8 py-6 text-lg shadow-xl"
              >
                {language === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
              <Link href="/contact">
                <Button 
                  variant="outline"
                  className="border-[#133129] text-[#133129] hover:bg-[#133129]/10 px-8 py-6 text-lg"
                >
                  {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#faf9f6]">
        <div className="container">
          <h3 className="text-xl font-serif text-[#133129] mb-6 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'خدمات ذات صلة' : 'Related Services'}
          </h3>
          <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/services/risk-compliance">
              <Button variant="outline" className="border-[#133129]/30 text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6]">
                {language === 'ar' ? 'المخاطر والامتثال' : 'Risk & Compliance'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
            <Link href="/services/core-banking">
              <Button variant="outline" className="border-[#133129]/30 text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6]">
                {language === 'ar' ? 'الأنظمة المصرفية' : 'Core Banking Systems'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
            <Link href="/services/islamic-finance">
              <Button variant="outline" className="border-[#133129]/30 text-[#133129] hover:bg-[#133129] hover:text-[#faf9f6]">
                {language === 'ar' ? 'التمويل الإسلامي' : 'Islamic Finance'}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
