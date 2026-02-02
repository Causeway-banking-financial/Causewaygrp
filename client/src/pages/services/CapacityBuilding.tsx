/**
 * Capacity Building Service Page
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, GraduationCap, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const services = [
  'Board Training & Governance',
  'Executive Development Programs',
  'Staff Certification Programs',
  'Workshops & Seminars',
  'Technical Skills Training',
  'Leadership Development',
  'Change Management Training',
  'Customized Learning Solutions'
];

const programs = [
  { title: 'Board Governance', duration: '2-3 days', audience: 'Board Members' },
  { title: 'Islamic Finance Fundamentals', duration: '5 days', audience: 'Banking Staff' },
  { title: 'AML/CFT Compliance', duration: '3 days', audience: 'Compliance Teams' },
  { title: 'Risk Management', duration: '4 days', audience: 'Risk Officers' }
];

export default function CapacityBuilding() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Capacity Building"
        description="Board training, executive development, staff certification, and workshops for financial institutions in Yemen."
        keywords="Capacity Building, Training, Board Governance, Executive Development, Workshops, Yemen"
      />
      <Header />
      
      <section className="relative pt-32 pb-20 bg-causeway-forest">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/hero-services.jpg)' }} />
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
                <GraduationCap className="w-8 h-8 text-causeway-gold" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display text-causeway-cream">Capacity Building</h1>
                <p className="text-causeway-cream/80 font-body-ar text-lg">بناء القدرات</p>
              </div>
            </div>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              Comprehensive training and development programs designed to strengthen institutional capabilities at all levels of your organization.
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
                  <p>Strong institutions are built on capable people. Our capacity building programs are designed to develop skills, knowledge, and competencies across all levels of your organization.</p>
                  <p>From board governance to technical skills training, we deliver programs that create lasting impact and support institutional sustainability.</p>
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

              <div>
                <h2 className="text-2xl font-display text-causeway-forest mb-6">Sample Programs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {programs.map((program) => (
                    <div key={program.title} className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-causeway-forest mb-2">{program.title}</h4>
                      <p className="text-causeway-forest/60 text-sm">Duration: {program.duration}</p>
                      <p className="text-causeway-forest/60 text-sm">Audience: {program.audience}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-causeway-forest p-8 rounded-lg">
                <h3 className="text-xl font-display text-causeway-cream mb-6">Training Formats</h3>
                <ul className="space-y-3 text-causeway-cream/80 text-sm">
                  <li>• In-person workshops</li>
                  <li>• Virtual training sessions</li>
                  <li>• Blended learning programs</li>
                  <li>• On-the-job coaching</li>
                  <li>• Certification programs</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-display text-causeway-forest mb-4">Request a Briefing</h3>
                <p className="text-causeway-forest/70 text-sm mb-6">Discuss your training needs with our experts.</p>
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
