/**
 * Capacity Building Service Page - Creative Redesign
 * Features: Animated hero, colorful training track cards, impact stats, interactive elements
 * Brand Colors: #133129 (forest), #224B40 (teal), #406D61 (sage), #d4a84b (gold), #faf9f6 (cream)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  GraduationCap, 
  ChevronRight,
  Users,
  Award,
  Building2,
  TrendingUp,
  BookOpen,
  Target,
  Briefcase,
  Shield,
  Laptop,
  Settings,
  Play,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/App';

// Training tracks with unique colors and icons
const trainingTracks = [
  {
    id: 'board',
    icon: Building2,
    titleEn: 'Board Leadership',
    titleAr: 'قيادة مجلس الإدارة',
    descEn: 'Strategic governance, fiduciary duties, and board effectiveness',
    descAr: 'الحوكمة الاستراتيجية والواجبات الائتمانية وفعالية مجلس الإدارة',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    programs: ['Board Governance Fundamentals', 'Strategic Planning for Boards', 'Risk Oversight', 'Audit Committee Excellence']
  },
  {
    id: 'islamic',
    icon: BookOpen,
    titleEn: 'Islamic Finance',
    titleAr: 'التمويل الإسلامي',
    descEn: 'Sharia-compliant products, Sukuk, and Islamic banking principles',
    descAr: 'المنتجات المتوافقة مع الشريعة والصكوك ومبادئ الصيرفة الإسلامية',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    programs: ['Islamic Finance Fundamentals', 'Sukuk Structuring', 'Murabaha & Ijara', 'Sharia Audit']
  },
  {
    id: 'risk',
    icon: Shield,
    titleEn: 'Risk & Compliance',
    titleAr: 'المخاطر والامتثال',
    descEn: 'AML/CFT, regulatory compliance, and enterprise risk management',
    descAr: 'مكافحة غسل الأموال والامتثال التنظيمي وإدارة المخاطر المؤسسية',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    programs: ['AML/CFT Compliance', 'Regulatory Reporting', 'Risk Assessment', 'Internal Controls']
  },
  {
    id: 'executive',
    icon: Briefcase,
    titleEn: 'Executive Leadership',
    titleAr: 'القيادة التنفيذية',
    descEn: 'C-suite development, change management, and strategic thinking',
    descAr: 'تطوير القيادات العليا وإدارة التغيير والتفكير الاستراتيجي',
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    programs: ['Executive Leadership Program', 'Change Management', 'Strategic Decision Making', 'Team Leadership']
  },
  {
    id: 'digital',
    icon: Laptop,
    titleEn: 'Digital Banking',
    titleAr: 'الخدمات المصرفية الرقمية',
    descEn: 'Fintech, digital transformation, and cybersecurity awareness',
    descAr: 'التكنولوجيا المالية والتحول الرقمي والوعي بالأمن السيبراني',
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    programs: ['Digital Banking Essentials', 'Fintech Innovation', 'Cybersecurity Awareness', 'Data Analytics']
  },
  {
    id: 'operations',
    icon: Settings,
    titleEn: 'Banking Operations',
    titleAr: 'العمليات المصرفية',
    descEn: 'Core banking, treasury management, and operational excellence',
    descAr: 'الأنظمة المصرفية الأساسية وإدارة الخزينة والتميز التشغيلي',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    programs: ['Core Banking Operations', 'Treasury Management', 'Credit Analysis', 'Customer Service Excellence']
  }
];

// Training formats
const trainingFormats = [
  { icon: Users, titleEn: 'In-Person Workshops', titleAr: 'ورش عمل حضورية', descEn: 'Interactive face-to-face sessions', descAr: 'جلسات تفاعلية وجهاً لوجه' },
  { icon: Laptop, titleEn: 'Virtual Training', titleAr: 'تدريب افتراضي', descEn: 'Live online sessions', descAr: 'جلسات مباشرة عبر الإنترنت' },
  { icon: BookOpen, titleEn: 'Blended Learning', titleAr: 'تعلم مدمج', descEn: 'Combined online & offline', descAr: 'مزيج من التعلم الإلكتروني والحضوري' },
  { icon: Target, titleEn: 'On-the-Job Coaching', titleAr: 'التدريب أثناء العمل', descEn: 'Practical workplace training', descAr: 'تدريب عملي في بيئة العمل' },
  { icon: Award, titleEn: 'Certification Programs', titleAr: 'برامج الشهادات', descEn: 'Accredited certifications', descAr: 'شهادات معتمدة' }
];

// Impact stats
const impactStats = [
  { value: '500+', labelEn: 'Professionals Trained', labelAr: 'متدرب محترف' },
  { value: '50+', labelEn: 'Training Programs', labelAr: 'برنامج تدريبي' },
  { value: '15+', labelEn: 'Partner Institutions', labelAr: 'مؤسسة شريكة' },
  { value: '98%', labelEn: 'Satisfaction Rate', labelAr: 'نسبة الرضا' }
];

export default function CapacityBuilding() {
  const { language, isRTL } = useLanguage();
  const { openBooking } = useBooking();
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for skeleton effect
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEO 
        title={language === 'ar' ? 'بناء القدرات | كوزواي' : 'Capacity Building | CauseWay'}
        description={language === 'ar' 
          ? 'برامج تدريب وتطوير شاملة لتعزيز القدرات المؤسسية على جميع المستويات'
          : 'Comprehensive training and development programs to strengthen institutional capabilities at all levels'
        }
        keywords="Capacity Building, Training, Board Governance, Executive Development, Islamic Finance Training, Yemen"
      />
      <Header />
      
      {/* Hero Section - Animated Gradient Background */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#133129] via-[#1a4a3d] to-[#224B40]">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-64 h-64 rounded-full bg-[#d4a84b]/5"
                initial={{ x: Math.random() * 100, y: Math.random() * 100, scale: 0.5 }}
                animate={{ 
                  x: [Math.random() * 100, Math.random() * 100 + 50, Math.random() * 100],
                  y: [Math.random() * 100, Math.random() * 100 + 30, Math.random() * 100],
                  scale: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ left: `${i * 20}%`, top: `${i * 15}%` }}
              />
            ))}
          </div>
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a84b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Link href="/services" className={`inline-flex items-center text-[#d4a84b] hover:text-[#d4a84b]/80 mb-6 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'ml-1 rotate-180' : 'mr-1 rotate-180'}`} />
              {language === 'ar' ? 'العودة إلى الخدمات' : 'Back to Services'}
            </Link>
            
            {/* Icon Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#d4a84b] to-[#c9a227] rounded-2xl flex items-center justify-center shadow-lg shadow-[#d4a84b]/20"
            >
              <GraduationCap className="w-10 h-10 text-[#133129]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#faf9f6] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'بناء القدرات' : 'Capacity Building'}
            </h1>
            <p className="text-lg md:text-xl text-[#faf9f6]/70 font-medium mb-2" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Source Sans Pro', sans-serif" }}>
              {language === 'ar' ? 'Capacity Building' : 'بناء القدرات'}
            </p>
            <p className="text-lg text-[#faf9f6]/80 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar' 
                ? 'برامج تدريب وتطوير شاملة مصممة لتعزيز القدرات المؤسسية على جميع مستويات مؤسستك.'
                : 'Comprehensive training and development programs designed to strengthen institutional capabilities at all levels of your organization.'
              }
            </p>
          </motion.div>
          
          {/* Impact Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 max-w-4xl mx-auto"
          >
            {impactStats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-center border border-white/10"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#d4a84b] mb-1">{stat.value}</div>
                <div className="text-[#faf9f6]/70 text-sm">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Tracks Section */}
      <section className="py-16 md:py-24 bg-[#faf9f6]">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'مسارات التدريب' : 'Training Tracks'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'اختر مسارك التعليمي' : 'Choose Your Learning Path'}
            </h2>
            <p className="text-[#406D61] mt-4 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'برامج متخصصة مصممة لتلبية احتياجات المؤسسات المالية في مختلف المجالات'
                : 'Specialized programs designed to meet the needs of financial institutions across various domains'
              }
            </p>
          </motion.div>

          {/* Training Track Cards */}
          {isLoading ? (
            // Skeleton Loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                  <div className="w-14 h-14 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 ${
                    expandedTrack === track.id ? track.borderColor : 'border-transparent'
                  } cursor-pointer`}
                  onClick={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <track.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-serif text-[#133129] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {language === 'ar' ? track.titleAr : track.titleEn}
                  </h3>
                  <p className="text-[#406D61]/70 text-sm mb-3" style={{ fontFamily: language === 'ar' ? "'Amiri', serif" : "'Source Sans Pro', sans-serif" }}>
                    {language === 'ar' ? track.titleEn : track.titleAr}
                  </p>
                  
                  {/* Description */}
                  <p className="text-[#406D61] text-sm leading-relaxed mb-4">
                    {language === 'ar' ? track.descAr : track.descEn}
                  </p>
                  
                  {/* Expandable Programs */}
                  <AnimatePresence>
                    {expandedTrack === track.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-100 pt-4 mt-4"
                      >
                        <p className="text-xs font-semibold text-[#133129] uppercase tracking-wider mb-3">
                          {language === 'ar' ? 'البرامج المتاحة' : 'Available Programs'}
                        </p>
                        <ul className="space-y-2">
                          {track.programs.map((program, i) => (
                            <li key={i} className={`flex items-center gap-2 text-sm text-[#406D61] ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <CheckCircle2 className="w-4 h-4 text-[#d4a84b] flex-shrink-0" />
                              {program}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Expand Indicator */}
                  <div className={`flex items-center gap-1 text-[#d4a84b] text-sm font-medium mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Sparkles className="w-4 h-4" />
                    {expandedTrack === track.id 
                      ? (language === 'ar' ? 'إخفاء البرامج' : 'Hide Programs')
                      : (language === 'ar' ? 'عرض البرامج' : 'View Programs')
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Training Formats Section */}
      <section className="py-16 md:py-20 bg-[#133129]">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {language === 'ar' ? 'أساليب التدريب' : 'Training Methods'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#faf9f6] mt-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'تعلم بالطريقة التي تناسبك' : 'Learn Your Way'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {trainingFormats.map((format, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#224B40]/50 rounded-xl p-5 text-center hover:bg-[#224B40] transition-colors group"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-[#d4a84b]/20 rounded-lg flex items-center justify-center group-hover:bg-[#d4a84b]/30 transition-colors">
                  <format.icon className="w-6 h-6 text-[#d4a84b]" />
                </div>
                <h3 className="text-[#faf9f6] font-semibold text-sm mb-1">
                  {language === 'ar' ? format.titleAr : format.titleEn}
                </h3>
                <p className="text-[#faf9f6]/60 text-xs">
                  {language === 'ar' ? format.descAr : format.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#d4a84b] to-[#c9a227]">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'جاهز لتطوير فريقك؟' : 'Ready to Develop Your Team?'}
            </h2>
            <p className="text-[#133129]/80 text-lg mb-8">
              {language === 'ar' 
                ? 'تواصل معنا لمناقشة احتياجاتك التدريبية وتصميم برنامج مخصص لمؤسستك.'
                : 'Contact us to discuss your training needs and design a customized program for your institution.'
              }
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                onClick={() => openBooking('training')}
                className="bg-[#133129] hover:bg-[#224B40] text-[#faf9f6] font-semibold px-8 py-6 shadow-lg"
              >
                {language === 'ar' ? 'احجز استشارة' : 'Book a Consultation'}
                <Calendar className={`w-5 h-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  className="border-[#133129] text-[#133129] hover:bg-[#133129]/10 px-8 py-6"
                >
                  {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
