/**
 * CauseWay Home Page
 * Design: Institutional Arabesque Modernism
 * Sections: Hero, Services Preview, Observatory Preview, Insights, Newsletter, Stats
 * Enhanced with Yemen-specific imagery and improved mobile responsiveness
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Building2, 
  Shield, 
  Server, 
  Users, 
  GraduationCap, 
  Palette,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';

const services = [
  {
    icon: Building2,
    title: 'Islamic Finance Engineering',
    titleAr: 'هندسة التمويل الإسلامي',
    description: 'Sharia-compliant product development, Sukuk structuring, and Islamic banking transformation.',
    href: '/services/islamic-finance'
  },
  {
    icon: Shield,
    title: 'Risk & Compliance',
    titleAr: 'المخاطر والامتثال',
    description: 'AML/CFT frameworks, regulatory compliance, internal audit, and risk assessment.',
    href: '/services/risk-compliance'
  },
  {
    icon: Server,
    title: 'Core Banking Systems',
    titleAr: 'الأنظمة المصرفية الأساسية',
    description: 'System selection, digital transformation, integration services, and legacy modernization.',
    href: '/services/core-banking'
  },
  {
    icon: Users,
    title: 'Microfinance Development',
    titleAr: 'تطوير التمويل الأصغر',
    description: 'MFI establishment, capacity building, product development, and regulatory licensing.',
    href: '/services/microfinance'
  },
  {
    icon: GraduationCap,
    title: 'Capacity Building',
    titleAr: 'بناء القدرات',
    description: 'Board training, executive development, staff certification, and workshops.',
    href: '/services/capacity-building'
  },
  {
    icon: Palette,
    title: 'Branding & Identity',
    titleAr: 'العلامة التجارية والهوية',
    description: 'Financial sector branding, corporate identity, marketing strategy, and digital presence.',
    href: '/services/branding'
  }
];

const insights = [
  {
    category: 'Governance',
    title: 'Governance in Fragile Markets: Building Audit-Ready Systems',
    excerpt: 'A deep dive into compliance frameworks for high-risk environments and emerging market banks.',
    date: 'January 28, 2026',
    readTime: '12 min',
    image: '/images/aden-aerial.jpg',
    href: '/insights/articles/governance-fragile-markets'
  },
  {
    category: 'Islamic Finance',
    title: 'Islamic Finance Product Engineering: From Concept to Execution',
    excerpt: 'Structuring innovative, compliant financial solutions for modern banking needs.',
    date: 'January 25, 2026',
    readTime: '8 min',
    image: '/images/financial-district.png',
    href: '/insights/articles/islamic-finance-engineering'
  },
  {
    category: 'Compliance',
    title: 'AML/CFT in Development Finance: Practical Frameworks',
    excerpt: 'Implementing robust anti-money laundering strategies in challenging environments.',
    date: 'January 20, 2026',
    readTime: '10 min',
    image: '/images/business-district.jpg',
    href: '/insights/articles/aml-cft-frameworks'
  },
  {
    category: 'Risk Management',
    title: 'Treasury Governance for Emerging Market Banks',
    excerpt: 'Optimizing liquidity and risk management in volatile economic conditions.',
    date: 'January 15, 2026',
    readTime: '9 min',
    image: '/images/aden-harbor.jpg',
    href: '/insights/articles/treasury-governance'
  }
];

const newsTicker = [
  { text: 'New AML/CFT Framework Released', type: 'update' },
  { text: 'Yemen Banking Sector Update', type: 'report' },
  { text: 'Observatory Q1 Report Available', type: 'report' },
  { text: 'YETO Platform Launch Announced', type: 'announcement' }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <YetoBanner variant="top" />
      <Header />
      
      {/* Hero Section - Enhanced with Aden imagery */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-causeway-forest">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/aden-aerial.jpg)',
              filter: 'brightness(0.4) saturate(0.8)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-causeway-forest/95 via-causeway-forest/80 to-causeway-forest/60" />
        </div>
        
        {/* Geometric Corner Ornaments */}
        <div className="absolute top-28 left-6 md:left-12 w-16 md:w-24 h-16 md:h-24 border-l-2 border-t-2 border-causeway-gold/40 hidden sm:block" />
        <div className="absolute bottom-28 right-6 md:right-12 w-16 md:w-24 h-16 md:h-24 border-r-2 border-b-2 border-causeway-gold/40 hidden sm:block" />
        
        <div className="container relative z-10 py-12 md:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-causeway-cream leading-tight mb-4 md:mb-6">
              Where Finance Becomes{' '}
              <span className="text-causeway-gold italic block sm:inline">Infrastructure</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-causeway-cream/80 mb-6 md:mb-8 leading-relaxed">
              Building Sharia-grounded, governance-safe financial systems 
              for banks, institutions, and development partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/services">
                <Button className="btn-gold text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto">
                  Explore Our Services
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="btn-outline-light text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto">
                  Request a Briefing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* News Ticker - Enhanced */}
        <div className="absolute bottom-0 left-0 right-0 bg-causeway-forest-light/90 backdrop-blur-sm border-t border-causeway-teal/20">
          <div className="container py-2 sm:py-3">
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
              <span className="text-causeway-gold font-semibold text-xs sm:text-sm whitespace-nowrap flex-shrink-0">
                Governance Pulse
              </span>
              <span className="text-causeway-cream/40 hidden sm:block">|</span>
              <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
                {newsTicker.map((item, index) => (
                  <span key={index} className="text-causeway-cream/70 text-xs sm:text-sm whitespace-nowrap flex items-center gap-2">
                    <span className="text-causeway-gold/60">Latest:</span> {item.text}
                    {index < newsTicker.length - 1 && <span className="text-causeway-cream/30 ml-4">|</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced grid */}
      <section className="py-16 md:py-24 bg-causeway-cream">
        <div className="container">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-causeway-gold font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Our Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-causeway-forest mt-2 sm:mt-3 mb-3 sm:mb-4">
              Comprehensive Financial Advisory
            </h2>
            <p className="text-causeway-forest/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
              From Islamic finance engineering to digital transformation, we provide 
              end-to-end solutions for financial institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <div className="group bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-transparent hover:border-causeway-gold/20">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-causeway-forest/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-causeway-gold/20 transition-colors">
                      <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-causeway-teal group-hover:text-causeway-gold transition-colors" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-display text-causeway-forest mb-1 sm:mb-2">
                      {service.title}
                    </h3>
                    <p className="text-causeway-teal/80 font-body-ar text-xs sm:text-sm mb-2 sm:mb-3">
                      {service.titleAr}
                    </p>
                    <p className="text-causeway-forest/60 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-3 sm:mt-4 flex items-center text-causeway-gold font-medium text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link href="/services">
              <Button variant="outline" className="border-causeway-forest text-causeway-forest hover:bg-causeway-forest hover:text-causeway-cream text-sm sm:text-base">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-16 bg-causeway-cream border-y border-causeway-forest/10">
        <div className="container">
          <blockquote className="text-center max-w-3xl mx-auto px-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-display text-causeway-forest italic leading-relaxed">
              "Governance is not a constraint; it is the foundation of credibility."
            </p>
            <cite className="text-causeway-forest/60 mt-3 sm:mt-4 block not-italic text-sm sm:text-base">
              — CauseWay Leadership
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Insights Section - Enhanced layout matching mockup */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
            <div>
              <span className="text-causeway-gold font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Latest Insights
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-causeway-forest mt-2 sm:mt-3">
                Expert Analysis & Thought Leadership
              </h2>
            </div>
            <Link href="/insights">
              <Button variant="outline" className="mt-4 md:mt-0 border-causeway-forest text-causeway-forest hover:bg-causeway-forest hover:text-causeway-cream text-sm">
                View All Insights
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Link href={insights[0].href}>
                <div className="group relative h-[300px] sm:h-[400px] md:h-full md:min-h-[450px] rounded-lg overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${insights[0].image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-causeway-forest via-causeway-forest/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                    <span className="inline-block bg-causeway-gold text-causeway-forest text-xs font-semibold px-3 py-1 rounded mb-3 sm:mb-4">
                      {insights[0].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-causeway-cream mb-2 sm:mb-3">
                      {insights[0].title}
                    </h3>
                    <p className="text-causeway-cream/80 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {insights[0].excerpt}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 text-causeway-cream/60 text-xs sm:text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {insights[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {insights[0].readTime}
                      </span>
                    </div>
                    <div className="mt-3 sm:mt-4 flex items-center text-causeway-gold font-medium text-sm">
                      Read Analysis <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Secondary Articles */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              {insights.slice(1).map((article, index) => (
                <motion.div
                  key={article.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={article.href}>
                    <div className="group bg-causeway-cream/50 rounded-lg p-4 sm:p-5 md:p-6 hover:bg-causeway-cream transition-colors border border-transparent hover:border-causeway-gold/20">
                      <span className="text-causeway-gold text-xs font-semibold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-display text-causeway-forest mt-1 sm:mt-2 mb-1 sm:mb-2 group-hover:text-causeway-teal transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-causeway-forest/60 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-causeway-gold font-medium text-xs sm:text-sm">
                        Read More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Observatory Preview - Enhanced */}
      <section className="py-16 md:py-24 bg-causeway-forest relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/images/aden-city.jpg)',
              filter: 'brightness(0.25) saturate(0.6)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-causeway-forest via-causeway-forest/90 to-causeway-forest/70" />
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-causeway-gold font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Observatory
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-causeway-cream mt-2 sm:mt-3 mb-3 sm:mb-4">
                Yemen Economic Transparency Observatory
              </h2>
              <p className="text-causeway-cream/80 font-body-ar text-lg sm:text-xl mb-3 sm:mb-4">
                المرصد اليمني للشفافية الاقتصادية
              </p>
              <p className="text-causeway-cream/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                YETO provides comprehensive economic data, analysis, and transparency 
                reporting for Yemen. Access real-time economic indicators, sector analysis, 
                exchange rate tracking, and in-depth reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/observatory">
                  <Button className="btn-gold w-full sm:w-auto">
                    Explore Observatory
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="hidden md:block"
            >
              {/* YETO Teaser Image - Yemen Map */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/images/yeto-teaser.png" 
                  alt="YETO - Yemen Economic Transparency Observatory - For a decade, decisions have been made in the dark. Something is about to change."
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Enhanced */}
      <section className="py-12 sm:py-16 bg-causeway-cream border-t border-causeway-forest/10">
        <div className="container">
          <div className="bg-causeway-forest rounded-lg p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-display text-causeway-cream mb-2">
                Subscribe to CauseWay Insights
              </h3>
              <p className="text-causeway-cream/70 text-sm sm:text-base">
                Get expert analysis and updates delivered to your inbox.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-3 bg-causeway-forest-light border border-causeway-teal/30 rounded text-causeway-cream placeholder:text-causeway-cream/40 focus:outline-none focus:border-causeway-gold w-full sm:min-w-[280px] text-sm sm:text-base"
              />
              <Button className="btn-gold whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
