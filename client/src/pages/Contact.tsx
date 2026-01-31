/**
 * Contact Page
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const topics = [
  'General Inquiry',
  'Islamic Finance Services',
  'Risk & Compliance',
  'Core Banking Systems',
  'Microfinance Development',
  'Capacity Building',
  'Branding Services',
  'YETO / Observatory',
  'Partnership Opportunities',
  'Media Inquiry'
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    topic: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your message. We will respond within 2 business days.');
    setFormData({ name: '', email: '', organization: '', topic: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-causeway-forest">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url(/images/hero-main.jpg)' }}
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
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-display text-causeway-cream mt-3 mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              Whether you have a question about our services, want to discuss a potential 
              project, or need expert advice, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-causeway-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm">
                <h2 className="text-2xl font-display text-causeway-forest mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-causeway-forest mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-causeway-forest/20 rounded-lg focus:outline-none focus:border-causeway-gold text-causeway-forest"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-causeway-forest mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-causeway-forest/20 rounded-lg focus:outline-none focus:border-causeway-gold text-causeway-forest"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-causeway-forest mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-causeway-forest/20 rounded-lg focus:outline-none focus:border-causeway-gold text-causeway-forest"
                        placeholder="Your organization"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-causeway-forest mb-2">
                        Topic *
                      </label>
                      <select
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-causeway-forest/20 rounded-lg focus:outline-none focus:border-causeway-gold text-causeway-forest bg-white"
                      >
                        <option value="">Select a topic</option>
                        {topics.map((topic) => (
                          <option key={topic} value={topic}>{topic}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-causeway-forest mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-causeway-forest/20 rounded-lg focus:outline-none focus:border-causeway-gold text-causeway-forest resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" className="btn-gold">
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Office Location */}
              <div className="bg-causeway-forest p-8 rounded-lg">
                <h3 className="text-xl font-display text-causeway-cream mb-6">
                  Office Location
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-causeway-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-causeway-cream">Khormaksar, Corniche Road</p>
                      <p className="text-causeway-cream">Aden, Yemen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-causeway-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-causeway-cream">+967 2 236655</p>
                      <p className="text-causeway-cream">+967 2 232096</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-causeway-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-causeway-cream">info@causewaygrp.com</p>
                      <p className="text-causeway-cream/70 text-sm mt-1">General inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-causeway-gold flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-causeway-cream">Sunday - Thursday</p>
                      <p className="text-causeway-cream/70 text-sm">8:00 AM - 4:00 PM (GMT+3)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* YETO Inquiries */}
              <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-causeway-gold">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-causeway-gold" />
                  <h3 className="text-lg font-display text-causeway-forest">
                    YETO Inquiries
                  </h3>
                </div>
                <p className="text-causeway-forest/70 text-sm mb-4">
                  For questions about the Yemen Economic Transparency Observatory:
                </p>
                <a 
                  href="mailto:yeto@causewaygrp.com"
                  className="text-causeway-teal hover:text-causeway-gold transition-colors font-medium"
                >
                  yeto@causewaygrp.com
                </a>
              </div>

              {/* Response Time */}
              <div className="bg-causeway-cream/50 p-6 rounded-lg border border-causeway-forest/10">
                <h4 className="font-semibold text-causeway-forest mb-2">
                  Response Time
                </h4>
                <p className="text-causeway-forest/70 text-sm">
                  We aim to respond to all inquiries within 2 business days. 
                  For urgent matters, please call our office directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
