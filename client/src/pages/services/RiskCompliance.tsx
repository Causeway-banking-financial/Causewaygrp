/**
 * Risk & Compliance Service Page
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Shield, 
  CheckCircle, 
  FileText, 
  AlertTriangle, 
  Search,
  Scale,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const services = [
  'AML/CFT Framework Development',
  'Regulatory Compliance Assessment',
  'Internal Audit Establishment',
  'Risk Assessment Methodologies',
  'Compliance Monitoring Systems',
  'Regulatory Reporting Frameworks',
  'Policy & Procedure Development',
  'Compliance Training Programs'
];

const frameworks = [
  { name: 'FATF Recommendations', desc: 'International AML/CFT standards' },
  { name: 'Basel III', desc: 'Banking supervision framework' },
  { name: 'AAOIFI Standards', desc: 'Islamic finance governance' },
  { name: 'Central Bank Regulations', desc: 'Local regulatory requirements' }
];

export default function RiskCompliance() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Risk & Compliance Services"
        description="AML/CFT frameworks, regulatory compliance, internal audit, and risk assessment services for financial institutions in Yemen."
        keywords="AML/CFT, Risk Management, Compliance, FATF, Basel III, Internal Audit, Yemen"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-causeway-forest">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url(/images/hero-services.jpg)' }}
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
                <Shield className="w-8 h-8 text-causeway-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display text-causeway-cream">
                  Risk & Compliance
                </h1>
                <p className="text-causeway-cream/80 font-body-ar text-lg">
                  المخاطر والامتثال
                </p>
              </div>
            </div>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              Comprehensive risk management and regulatory compliance solutions designed 
              for the unique challenges of emerging markets and fragile economies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-4 gold-accent-line pb-4">
                  Service Overview
                </h2>
                <div className="prose prose-lg text-causeway-forest/70">
                  <p>
                    In today's complex regulatory environment, financial institutions face 
                    unprecedented compliance challenges. Our Risk & Compliance services help 
                    you navigate these challenges while building robust governance frameworks 
                    that protect your institution and stakeholders.
                  </p>
                  <p>
                    We specialize in AML/CFT compliance, regulatory frameworks, and risk 
                    management solutions tailored for banks, microfinance institutions, and 
                    development organizations operating in challenging environments.
                  </p>
                </div>
              </div>

              {/* Services Grid */}
              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-6">
                  Our Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-causeway-teal flex-shrink-0" />
                      <span className="text-causeway-forest">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-6">
                  Frameworks We Work With
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {frameworks.map((framework) => (
                    <div key={framework.name} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-causeway-teal">
                      <h4 className="font-semibold text-causeway-forest mb-2">{framework.name}</h4>
                      <p className="text-causeway-forest/60 text-sm">{framework.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-causeway-forest p-8 rounded-lg">
                <h3 className="text-xl font-display text-causeway-cream mb-6">
                  Key Benefits
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Shield, text: 'Regulatory Protection' },
                    { icon: AlertTriangle, text: 'Risk Mitigation' },
                    { icon: Search, text: 'Enhanced Due Diligence' },
                    { icon: Scale, text: 'Governance Strengthening' }
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-causeway-gold" />
                      <span className="text-causeway-cream">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-display text-causeway-forest mb-4">
                  Request a Briefing
                </h3>
                <p className="text-causeway-forest/70 text-sm mb-6">
                  Discuss your compliance needs with our experts.
                </p>
                <Link href="/contact">
                  <Button className="btn-gold w-full">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
