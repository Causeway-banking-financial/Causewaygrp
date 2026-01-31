/**
 * CauseWay About Page
 * Sections: Story, Mission, Leadership, Approach, Partners
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Target, Eye, Compass, Users, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We deliver solutions that exceed expectations, grounded in deep expertise and rigorous methodology.'
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We believe in open communication, honest assessment, and clear reporting at every stage.'
  },
  {
    icon: Compass,
    title: 'Integrity',
    description: 'Our work is guided by ethical principles and Sharia compliance, ensuring trust and credibility.'
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'We work alongside our clients as true partners, invested in their long-term success.'
  }
];

const affiliations = [
  'AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)',
  'Yemen Microfinance Network',
  'Central Bank of Yemen - Registered Consultant',
  'Arab Federation for Capital Markets'
];

export default function About() {
  return (
    <div className="min-h-screen">
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
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-display text-causeway-cream mt-3 mb-6">
              Building Financial Infrastructure for Tomorrow
            </h1>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              CauseWay Consulting, Services & Development Group is a specialized financial 
              advisory firm dedicated to strengthening banking systems, promoting Islamic 
              finance, and fostering economic transparency in Yemen and the region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-lg shadow-sm border-l-4 border-causeway-gold"
            >
              <div className="w-14 h-14 bg-causeway-gold/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-causeway-gold" />
              </div>
              <h2 className="text-2xl font-display text-causeway-forest mb-4">Our Mission</h2>
              <p className="text-causeway-forest/70 leading-relaxed">
                To provide world-class financial advisory services that strengthen institutional 
                governance, promote Sharia-compliant finance, and build sustainable financial 
                infrastructure. We are committed to excellence, transparency, and creating 
                lasting value for our clients and the communities they serve.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-lg shadow-sm border-l-4 border-causeway-teal"
            >
              <div className="w-14 h-14 bg-causeway-teal/20 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-causeway-teal" />
              </div>
              <h2 className="text-2xl font-display text-causeway-forest mb-4">Our Vision</h2>
              <p className="text-causeway-forest/70 leading-relaxed">
                To be the leading financial consultancy in the region, recognized for our 
                expertise in Islamic finance, our commitment to governance excellence, and 
                our role in fostering economic transparency. We envision a financial sector 
                that is robust, ethical, and inclusive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-causeway-forest mt-3 mb-6">
                A Commitment to Excellence
              </h2>
              <div className="space-y-4 text-causeway-forest/70 leading-relaxed">
                <p>
                  CauseWay Consulting, Services & Development Group was established in Aden, Yemen, 
                  emerging from a recognition that the region's financial sector needed specialized 
                  expertise that understood both international best practices and local context.
                </p>
                <p>
                  Our team comprises seasoned professionals with extensive experience in 
                  banking, Islamic finance, and regulatory compliance. We established 
                  CauseWay to bridge the gap between global financial standards and 
                  regional implementation challenges.
                </p>
                <p>
                  Today, we serve banks, microfinance institutions, development 
                  organizations, and government bodies, providing comprehensive 
                  solutions that range from Islamic product development to digital 
                  transformation and capacity building.
                </p>
                <p>
                  Our commitment to Sharia-grounded, governance-safe financial systems 
                  has positioned us as a trusted partner for institutions seeking to 
                  strengthen their operations while maintaining compliance with both 
                  Islamic principles and international regulatory standards.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="approach" className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-causeway-forest mt-3 mb-4">
              Values That Guide Our Work
            </h2>
            <p className="text-causeway-forest/70 max-w-2xl mx-auto">
              Every engagement is guided by our core values, ensuring consistent 
              quality and ethical practice across all our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-causeway-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-causeway-teal" />
                </div>
                <h3 className="text-xl font-display text-causeway-forest mb-3">
                  {value.title}
                </h3>
                <p className="text-causeway-forest/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              Our Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-causeway-forest mt-3 mb-4">
              A Proven Approach to Delivery
            </h2>
          </div>

          <div className="bg-causeway-forest rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {['Discovery', 'Assessment', 'Design', 'Implementation', 'Handover'].map((phase, index) => (
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-causeway-gold rounded-full flex items-center justify-center text-causeway-forest font-semibold mb-3">
                      {index + 1}
                    </div>
                    <span className="text-causeway-cream font-medium text-center">
                      {phase}
                    </span>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-causeway-gold/30" />
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-causeway-teal/20">
              <p className="text-causeway-cream/80 text-center max-w-3xl mx-auto">
                Our structured methodology ensures consistent quality, clear milestones, 
                and measurable outcomes. Each phase includes defined deliverables, 
                stakeholder engagement, and quality assurance checkpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section id="partners" className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              Affiliations & Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-causeway-forest mt-3">
              Our Professional Network
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {affiliations.map((affiliation, index) => (
              <motion.div
                key={affiliation}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="w-10 h-10 bg-causeway-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-causeway-teal" />
                </div>
                <span className="text-causeway-forest/80 text-sm">
                  {affiliation}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-causeway-forest">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-display text-causeway-cream mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-causeway-cream/70 mb-8">
              Let's discuss how CauseWay can support your institution's goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-gold">
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button className="btn-outline-light">
                  Explore Services
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
