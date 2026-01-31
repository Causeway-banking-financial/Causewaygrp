/**
 * Observatory Page - YETO (Yemen Economic Transparency Observatory)
 * المرصد اليمني للشفافية الاقتصادية
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  BarChart3, 
  TrendingUp, 
  Globe, 
  FileText,
  Database,
  Bell,
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YetoBanner from '@/components/YetoBanner';
import { toast } from 'sonner';

const features = [
  {
    icon: BarChart3,
    title: 'Economic Indicators',
    titleAr: 'المؤشرات الاقتصادية',
    description: 'Real-time tracking of key economic metrics including GDP, inflation, and trade data.'
  },
  {
    icon: TrendingUp,
    title: 'Exchange Rates',
    titleAr: 'أسعار الصرف',
    description: 'Daily exchange rate monitoring and historical trend analysis.'
  },
  {
    icon: Globe,
    title: 'Sector Analysis',
    titleAr: 'تحليل القطاعات',
    description: 'In-depth analysis of banking, microfinance, and financial services sectors.'
  },
  {
    icon: FileText,
    title: 'Reports & Publications',
    titleAr: 'التقارير والمنشورات',
    description: 'Quarterly reports, whitepapers, and policy briefs on Yemen\'s economy.'
  },
  {
    icon: Database,
    title: 'Data Sources',
    titleAr: 'مصادر البيانات',
    description: 'Aggregated data from Central Bank, World Bank, IMF, and UN agencies.'
  },
  {
    icon: Calendar,
    title: 'Economic Calendar',
    titleAr: 'التقويم الاقتصادي',
    description: 'Upcoming economic events, policy announcements, and report releases.'
  }
];

const upcomingReports = [
  { title: 'Q1 2026 Banking Sector Review', date: 'March 2026', status: 'In Progress' },
  { title: 'Yemen Microfinance Landscape', date: 'April 2026', status: 'Planned' },
  { title: 'Exchange Rate Dynamics Analysis', date: 'May 2026', status: 'Planned' }
];

const dataSources = [
  { name: 'Central Bank of Yemen', url: 'https://www.centralbank.gov.ye' },
  { name: 'World Bank Yemen', url: 'https://www.worldbank.org/en/country/yemen' },
  { name: 'IMF Yemen Reports', url: 'https://www.imf.org/en/Countries/YEM' },
  { name: 'UN OCHA Yemen', url: 'https://www.unocha.org/yemen' }
];

export default function Observatory() {
  const [email, setEmail] = useState('');

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you! We\'ll notify you when YETO launches.');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-causeway-forest min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: 'url(/images/hero-observatory.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-causeway-forest via-causeway-forest/90 to-causeway-forest" />
        </div>
        
        {/* Geometric Decorations */}
        <div className="absolute top-32 right-10 w-32 h-32 border border-causeway-gold/20 rotate-45 hidden lg:block" />
        <div className="absolute bottom-20 left-10 w-24 h-24 border border-causeway-teal/20 hidden lg:block" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-causeway-gold/20 px-4 py-2 rounded-full mb-6">
                <Bell className="w-4 h-4 text-causeway-gold" />
                <span className="text-causeway-gold text-sm font-semibold">Coming Q2 2026</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-display text-causeway-cream mb-4">
                Yemen Economic Transparency Observatory
              </h1>
              <p className="text-2xl text-causeway-cream/80 font-body-ar mb-6">
                المرصد اليمني للشفافية الاقتصادية
              </p>
              <p className="text-lg text-causeway-cream/70 mb-8 leading-relaxed">
                YETO is CauseWay's flagship initiative to promote economic transparency 
                in Yemen. The platform will provide comprehensive economic data, analysis, 
                and reporting to support informed decision-making.
              </p>
              
              <blockquote className="border-l-4 border-causeway-gold pl-4 mb-8">
                <p className="text-causeway-cream/80 italic">
                  "نحو اقتصاد مبني على الحقائق"
                </p>
                <p className="text-causeway-cream/60 text-sm mt-2">
                  "Towards a fact-based economy"
                </p>
              </blockquote>

              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for launch updates"
                  className="flex-1 px-4 py-3 bg-causeway-forest-light border border-causeway-teal/30 rounded text-causeway-cream placeholder:text-causeway-cream/40 focus:outline-none focus:border-causeway-gold"
                />
                <Button type="submit" className="btn-gold whitespace-nowrap">
                  Notify Me
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              {/* YETO Teaser Image - Yemen Map */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/images/yeto-teaser.png" 
                  alt="YETO - Yemen Economic Transparency Observatory - For a decade, decisions have been made in the dark. Something is about to change."
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-causeway-forest/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-causeway-forest mt-3 mb-4">
              What YETO Will Offer
            </h2>
            <p className="text-causeway-forest/70 max-w-2xl mx-auto">
              A comprehensive platform for economic data, analysis, and transparency 
              reporting focused on Yemen's financial sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="w-14 h-14 bg-causeway-forest/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-causeway-teal" />
                </div>
                <h3 className="text-xl font-display text-causeway-forest mb-2">
                  {feature.title}
                </h3>
                <p className="text-causeway-teal/80 font-body-ar text-sm mb-3">
                  {feature.titleAr}
                </p>
                <p className="text-causeway-forest/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Reports */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
                Upcoming
              </span>
              <h2 className="text-3xl font-display text-causeway-forest mt-3 mb-6">
                Planned Reports & Publications
              </h2>
              <p className="text-causeway-forest/70 mb-8">
                Our research team is preparing comprehensive reports on Yemen's 
                economic landscape. Subscribe to receive notifications when these 
                reports are published.
              </p>
              
              <div className="space-y-4">
                {upcomingReports.map((report) => (
                  <div key={report.title} className="flex items-center justify-between bg-causeway-cream/50 p-4 rounded-lg">
                    <div>
                      <h4 className="font-medium text-causeway-forest">{report.title}</h4>
                      <p className="text-causeway-forest/60 text-sm">{report.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      report.status === 'In Progress' 
                        ? 'bg-causeway-gold/20 text-causeway-gold-dark' 
                        : 'bg-causeway-teal/20 text-causeway-teal'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
                Data Sources
              </span>
              <h2 className="text-3xl font-display text-causeway-forest mt-3 mb-6">
                Trusted Sources
              </h2>
              <p className="text-causeway-forest/70 mb-8">
                YETO aggregates data from authoritative sources to provide 
                accurate and reliable economic information.
              </p>
              
              <div className="space-y-4">
                {dataSources.map((source) => (
                  <a 
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-causeway-cream/50 p-4 rounded-lg hover:bg-causeway-cream transition-colors"
                  >
                    <span className="font-medium text-causeway-forest">{source.name}</span>
                    <ExternalLink className="w-4 h-4 text-causeway-teal" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-causeway-forest">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-display text-causeway-cream mb-4">
              Stay Informed
            </h2>
            <p className="text-causeway-cream/70 mb-8">
              Be the first to know when YETO launches. Subscribe for updates 
              and early access to our economic reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/insights">
                <Button className="btn-gold">
                  View Current Insights
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="btn-outline-light">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
