/**
 * Islamic Finance Engineering Service Page
 * Detailed service page with process, deliverables, and case approach
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Building2, 
  CheckCircle, 
  FileText, 
  Users, 
  Settings,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const deliverables = [
  { icon: FileText, title: 'Product Manuals & SOPs', desc: 'Comprehensive documentation for all Islamic products' },
  { icon: Users, title: 'SSB Briefing Packs', desc: 'Sharia Supervisory Board presentation materials' },
  { icon: Settings, title: 'Core Banking Configuration', desc: 'Technical setup for Islamic product modules' },
  { icon: BookOpen, title: 'Staff Training', desc: 'Comprehensive training programs for your team' }
];

const products = [
  'Murabaha (Cost-Plus Financing)',
  'Ijara (Leasing)',
  'Musharaka (Partnership)',
  'Mudaraba (Profit Sharing)',
  'Sukuk (Islamic Bonds)',
  'Takaful (Islamic Insurance)',
  'Wakala (Agency)',
  'Salam (Forward Sale)'
];

const process = [
  { phase: 'Discovery', desc: 'Understanding your product requirements and market context' },
  { phase: 'Assessment', desc: 'Evaluating Sharia compliance requirements and operational feasibility' },
  { phase: 'Design', desc: 'Structuring products with full Sharia and regulatory compliance' },
  { phase: 'Implementation', desc: 'Configuring systems and training staff' },
  { phase: 'Handover', desc: 'Documentation, SSB approval, and launch support' }
];

export default function IslamicFinance() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Islamic Finance Engineering"
        description="Sharia-compliant product development, Sukuk structuring, and Islamic banking transformation services in Yemen and MENA region."
        keywords="Islamic Finance, Sharia Compliance, Sukuk, Murabaha, Islamic Banking, Yemen"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-causeway-forest">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: 'url(/images/hero-islamic-finance.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-causeway-forest via-causeway-forest/95 to-causeway-forest" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/services" className="inline-flex items-center text-causeway-gold hover:text-causeway-gold/80 mb-4">
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
              Back to Services
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-causeway-gold/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-causeway-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display text-causeway-cream">
                  Islamic Finance Engineering
                </h1>
                <p className="text-causeway-cream/80 font-body-ar text-lg">
                  هندسة التمويل الإسلامي
                </p>
              </div>
            </div>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              We design Sharia-compliant financial products that bridge the gap between 
              theoretical compliance and operational reality. Our engineering process 
              ensures every product is audit-ready and governance-safe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Deliverables */}
      <section className="py-16 bg-causeway-cream">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-causeway-forest/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-causeway-teal" />
                </div>
                <h3 className="font-semibold text-causeway-forest mb-2">{item.title}</h3>
                <p className="text-causeway-forest/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-4 gold-accent-line pb-4">
                  Service Overview
                </h2>
                <div className="prose prose-lg text-causeway-forest/70">
                  <p>
                    Islamic finance engineering is the systematic process of designing, 
                    developing, and implementing Sharia-compliant financial products. 
                    Our approach combines deep Sharia knowledge with practical banking 
                    expertise to create products that are both compliant and commercially viable.
                  </p>
                  <p>
                    We work closely with your Sharia Supervisory Board (SSB) to ensure 
                    all products meet the highest standards of Islamic jurisprudence while 
                    remaining operationally efficient and competitive in the market.
                  </p>
                </div>
              </div>

              {/* Products We Engineer */}
              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-6">
                  Products We Engineer
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product} className="flex items-center gap-3 bg-causeway-sage/20 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-causeway-sage flex-shrink-0" />
                      <span className="text-causeway-forest">{product}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Our Approach */}
              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-6">
                  Our Engineering Approach
                </h2>
                <div className="space-y-4">
                  <p className="text-causeway-forest/70">
                    Our Islamic finance engineering methodology is built on three pillars:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-causeway-cream/50 p-6 rounded-lg border-l-4 border-causeway-gold">
                      <h4 className="font-semibold text-causeway-forest mb-2">1. Sharia Compliance First</h4>
                      <p className="text-causeway-forest/70 text-sm">
                        Every product begins with a thorough Sharia review, ensuring compliance 
                        with AAOIFI standards and local regulatory requirements.
                      </p>
                    </div>
                    <div className="bg-causeway-cream/50 p-6 rounded-lg border-l-4 border-causeway-teal">
                      <h4 className="font-semibold text-causeway-forest mb-2">2. Operational Viability</h4>
                      <p className="text-causeway-forest/70 text-sm">
                        We design products that work in practice, not just in theory. This includes 
                        system configuration, process design, and staff training.
                      </p>
                    </div>
                    <div className="bg-causeway-cream/50 p-6 rounded-lg border-l-4 border-causeway-sage">
                      <h4 className="font-semibold text-causeway-forest mb-2">3. Market Competitiveness</h4>
                      <p className="text-causeway-forest/70 text-sm">
                        Products must be attractive to customers. We ensure pricing, features, 
                        and customer experience are competitive with conventional alternatives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Process Timeline */}
              <div className="bg-causeway-forest p-8 rounded-lg">
                <h3 className="text-xl font-display text-causeway-cream mb-6">
                  Our Process
                </h3>
                <div className="space-y-4">
                  {process.map((item, index) => (
                    <div key={item.phase} className="flex gap-4">
                      <div className="w-8 h-8 bg-causeway-gold rounded-full flex items-center justify-center flex-shrink-0 text-causeway-forest font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-causeway-cream font-medium">{item.phase}</h4>
                        <p className="text-causeway-cream/60 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Briefing */}
              <div className="bg-causeway-cream p-8 rounded-lg border border-causeway-forest/10">
                <h3 className="text-xl font-display text-causeway-forest mb-4">
                  Request a Briefing
                </h3>
                <p className="text-causeway-forest/70 text-sm mb-6">
                  Interested in Islamic finance engineering for your institution? 
                  Let's discuss your requirements.
                </p>
                <Link href="/contact">
                  <Button className="btn-gold w-full">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Related Services */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-lg font-display text-causeway-forest mb-4">
                  Related Services
                </h3>
                <div className="space-y-3">
                  <Link href="/services/risk-compliance" className="block text-causeway-teal hover:text-causeway-gold transition-colors">
                    → Risk & Compliance
                  </Link>
                  <Link href="/services/core-banking" className="block text-causeway-teal hover:text-causeway-gold transition-colors">
                    → Core Banking Systems
                  </Link>
                  <Link href="/services/capacity-building" className="block text-causeway-teal hover:text-causeway-gold transition-colors">
                    → Capacity Building
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
