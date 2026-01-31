/**
 * CauseWay Services Page
 * All service categories with detailed descriptions
 */

import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Building2, 
  Shield, 
  Server, 
  Users, 
  GraduationCap, 
  Palette,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    id: 'islamic-finance',
    icon: Building2,
    title: 'Islamic Finance Engineering',
    titleAr: 'هندسة التمويل الإسلامي',
    description: 'We design Sharia-compliant financial products that bridge the gap between theoretical compliance and operational reality. Our engineering process ensures every product is audit-ready and governance-safe.',
    features: [
      'Sharia-compliant product development',
      'Sukuk structuring and issuance',
      'Islamic banking transformation',
      'Fatwa coordination with Sharia boards',
      'Product manuals and SOPs',
      'SSB briefing packs',
      'Core banking configuration',
      'Staff training programs'
    ],
    href: '/services/islamic-finance'
  },
  {
    id: 'risk-compliance',
    icon: Shield,
    title: 'Risk & Compliance',
    titleAr: 'المخاطر والامتثال',
    description: 'Comprehensive risk management and regulatory compliance solutions designed for the unique challenges of emerging markets and fragile economies.',
    features: [
      'AML/CFT frameworks development',
      'Regulatory compliance assessment',
      'Internal audit establishment',
      'Risk assessment methodologies',
      'Compliance monitoring systems',
      'Regulatory reporting frameworks',
      'Policy and procedure development',
      'Compliance training programs'
    ],
    href: '/services/risk-compliance'
  },
  {
    id: 'core-banking',
    icon: Server,
    title: 'Core Banking Systems',
    titleAr: 'الأنظمة المصرفية الأساسية',
    description: 'End-to-end core banking system services from selection to implementation, ensuring your technology infrastructure supports your business objectives.',
    features: [
      'System selection and evaluation',
      'Implementation project management',
      'Digital transformation strategy',
      'Integration services',
      'Legacy system modernization',
      'Data migration planning',
      'User acceptance testing',
      'Post-implementation support'
    ],
    href: '/services/core-banking'
  },
  {
    id: 'microfinance',
    icon: Users,
    title: 'Microfinance Development',
    titleAr: 'تطوير التمويل الأصغر',
    description: 'Supporting the establishment and growth of microfinance institutions with comprehensive development services aligned with international best practices.',
    features: [
      'MFI establishment support',
      'Capacity building programs',
      'Product development',
      'Regulatory licensing assistance',
      'Social performance management',
      'Client protection implementation',
      'Operational efficiency improvement',
      'Impact measurement frameworks'
    ],
    href: '/services/microfinance'
  },
  {
    id: 'capacity-building',
    icon: GraduationCap,
    title: 'Capacity Building',
    titleAr: 'بناء القدرات',
    description: 'Comprehensive training and development programs designed to strengthen institutional capabilities at all levels of your organization.',
    features: [
      'Board training and governance',
      'Executive development programs',
      'Staff certification programs',
      'Workshops and seminars',
      'Technical skills training',
      'Leadership development',
      'Change management training',
      'Customized learning solutions'
    ],
    href: '/services/capacity-building'
  },
  {
    id: 'branding',
    icon: Palette,
    title: 'Branding & Identity',
    titleAr: 'العلامة التجارية والهوية',
    description: 'Strategic branding services tailored for the financial sector, helping institutions build trust and recognition in competitive markets.',
    features: [
      'Financial sector branding',
      'Corporate identity development',
      'Marketing strategy',
      'Digital presence optimization',
      'Brand guidelines creation',
      'Visual identity systems',
      'Communication strategy',
      'Stakeholder engagement'
    ],
    href: '/services/branding'
  }
];

export default function Services() {
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
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-display text-causeway-cream mt-3 mb-6">
              Comprehensive Financial Advisory Services
            </h1>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              From Islamic finance engineering to digital transformation, we provide 
              end-to-end solutions that strengthen institutions and build sustainable 
              financial infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-causeway-forest/10 rounded-lg flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-causeway-teal" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display text-causeway-forest">
                        {service.title}
                      </h2>
                      <p className="text-causeway-teal/80 font-body-ar">
                        {service.titleAr}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-causeway-forest/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <Link href={service.href}>
                    <Button className="btn-gold">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className={`bg-white p-8 rounded-lg shadow-sm ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-lg font-semibold text-causeway-forest mb-4">
                    Key Services
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-causeway-teal flex-shrink-0 mt-0.5" />
                        <span className="text-causeway-forest/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-causeway-forest mt-3 mb-4">
              How We Deliver Results
            </h2>
            <p className="text-causeway-forest/70 max-w-2xl mx-auto">
              Our structured methodology ensures consistent quality and measurable outcomes 
              across all engagements.
            </p>
          </div>

          <div className="bg-causeway-forest rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { phase: 'Discovery', desc: 'Understanding your needs and context' },
                { phase: 'Assessment', desc: 'Analyzing current state and gaps' },
                { phase: 'Design', desc: 'Developing tailored solutions' },
                { phase: 'Implementation', desc: 'Executing with precision' },
                { phase: 'Handover', desc: 'Ensuring sustainable outcomes' }
              ].map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="w-12 h-12 bg-causeway-gold rounded-full flex items-center justify-center mx-auto mb-3 text-causeway-forest font-semibold">
                    {index + 1}
                  </div>
                  <h4 className="text-causeway-cream font-medium mb-1">{item.phase}</h4>
                  <p className="text-causeway-cream/60 text-sm">{item.desc}</p>
                  {index < 4 && (
                    <ChevronRight className="hidden md:block absolute top-6 -right-3 w-6 h-6 text-causeway-gold/50" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-causeway-forest">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-display text-causeway-cream mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-causeway-cream/70 mb-8">
              Request a briefing to discuss how our services can support your institution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-gold">
                  Request a Briefing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button className="btn-outline-light">
                  Learn About Us
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
