/**
 * Branding & Identity Service Page
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Palette, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  'Financial Sector Branding',
  'Corporate Identity Development',
  'Marketing Strategy',
  'Digital Presence Optimization',
  'Brand Guidelines Creation',
  'Visual Identity Systems',
  'Communication Strategy',
  'Stakeholder Engagement'
];

export default function Branding() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative pt-32 pb-20 bg-causeway-forest">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/hero-islamic-finance.jpg)' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-causeway-forest via-causeway-forest/95 to-causeway-forest" />
        </div>
        
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center text-causeway-gold hover:text-causeway-gold/80 mb-4">
              <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
              Back to Services
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-causeway-gold/20 rounded-lg flex items-center justify-center">
                <Palette className="w-8 h-8 text-causeway-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display text-causeway-cream">Branding & Identity</h1>
                <p className="text-causeway-cream/80 font-body-ar text-lg">العلامة التجارية والهوية</p>
              </div>
            </div>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              Strategic branding services tailored for the financial sector, helping institutions build trust and recognition in competitive markets.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-4 gold-accent-line pb-4">Service Overview</h2>
                <div className="prose prose-lg text-causeway-forest/70">
                  <p>In the financial sector, brand is trust. We help institutions develop and communicate their brand identity in ways that build credibility, differentiate from competitors, and connect with stakeholders.</p>
                  <p>Our branding services are specifically designed for banks, microfinance institutions, and financial service providers, with deep understanding of regulatory requirements and market dynamics.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-6">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-causeway-teal flex-shrink-0" />
                      <span className="text-causeway-forest">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-causeway-forest p-8 rounded-lg">
                <h3 className="text-xl font-display text-causeway-cream mb-6">Deliverables</h3>
                <ul className="space-y-3 text-causeway-cream/80 text-sm">
                  <li>• Brand strategy document</li>
                  <li>• Visual identity system</li>
                  <li>• Brand guidelines</li>
                  <li>• Marketing collateral</li>
                  <li>• Digital asset library</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-display text-causeway-forest mb-4">Request a Briefing</h3>
                <p className="text-causeway-forest/70 text-sm mb-6">Discuss your branding needs with our experts.</p>
                <Link href="/contact">
                  <Button className="btn-gold w-full">Contact Us<ArrowRight className="w-4 h-4 ml-2" /></Button>
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
