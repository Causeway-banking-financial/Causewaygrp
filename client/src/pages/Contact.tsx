/**
 * Contact Page - Bilingual (Arabic/English)
 * CauseWay - Financial & Banking Consultancies
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
import { useLanguage } from '@/contexts/LanguageContext';

const topics = [
  { en: 'General Inquiry', ar: 'استفسار عام' },
  { en: 'Islamic Finance Services', ar: 'خدمات التمويل الإسلامي' },
  { en: 'Risk & Compliance', ar: 'المخاطر والامتثال' },
  { en: 'Core Banking Systems', ar: 'الأنظمة المصرفية الأساسية' },
  { en: 'Microfinance Development', ar: 'تطوير التمويل الأصغر' },
  { en: 'Capacity Building', ar: 'بناء القدرات' },
  { en: 'Branding Services', ar: 'خدمات العلامة التجارية' },
  { en: 'YETO / Observatory', ar: 'يتو / المرصد' },
  { en: 'Partnership Opportunities', ar: 'فرص الشراكة' },
  { en: 'Media Inquiry', ar: 'استفسار إعلامي' }
];

export default function Contact() {
  const { language, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    topic: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      language === 'ar' 
        ? 'شكراً لرسالتك. سنرد خلال يومي عمل.'
        : 'Thank you for your message. We will respond within 2 business days.'
    );
    setFormData({ name: '', email: '', organization: '', topic: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const content = {
    hero: {
      label: { en: 'Contact Us', ar: 'اتصل بنا' },
      title: { en: "Let's Start a Conversation", ar: 'لنبدأ محادثة' },
      description: { 
        en: "Whether you have a question about our services, want to discuss a potential project, or need expert advice, we're here to help.",
        ar: 'سواء كان لديك سؤال حول خدماتنا، أو تريد مناقشة مشروع محتمل، أو تحتاج إلى مشورة خبير، نحن هنا للمساعدة.'
      }
    },
    form: {
      title: { en: 'Send Us a Message', ar: 'أرسل لنا رسالة' },
      name: { en: 'Full Name', ar: 'الاسم الكامل' },
      namePlaceholder: { en: 'Your name', ar: 'اسمك' },
      email: { en: 'Email Address', ar: 'البريد الإلكتروني' },
      emailPlaceholder: { en: 'your@email.com', ar: 'بريدك@email.com' },
      organization: { en: 'Organization', ar: 'المؤسسة' },
      organizationPlaceholder: { en: 'Your organization', ar: 'مؤسستك' },
      topic: { en: 'Topic', ar: 'الموضوع' },
      topicPlaceholder: { en: 'Select a topic', ar: 'اختر موضوعاً' },
      message: { en: 'Message', ar: 'الرسالة' },
      messagePlaceholder: { en: 'How can we help you?', ar: 'كيف يمكننا مساعدتك؟' },
      submit: { en: 'Send Message', ar: 'إرسال الرسالة' },
      required: { en: '*', ar: '*' }
    },
    office: {
      title: { en: 'Our Office', ar: 'مكتبنا' },
      address: { 
        en: 'Aden, Republic of Yemen',
        ar: 'عدن، الجمهورية اليمنية'
      },
      phone: '+967 2 234 567',
      email: 'info@causewaygrp.com',
      hours: { en: 'Sunday - Thursday: 9:00 AM - 5:00 PM', ar: 'الأحد - الخميس: 9:00 ص - 5:00 م' }
    },
    yeto: {
      title: { en: 'YETO Inquiries', ar: 'استفسارات يتو' },
      description: { 
        en: 'For questions about the Yemen Economic Transparency Observatory',
        ar: 'للأسئلة حول مرصد الشفافية الاقتصادية اليمني'
      },
      email: 'yeto@causewaygrp.com'
    }
  };

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#133129]">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url(/images/hero-main.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#133129] via-[#133129]/95 to-[#133129]" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-[#d4a84b] font-semibold text-sm uppercase tracking-wider">
              {content.hero.label[language]}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#faf9f6] mt-3 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {content.hero.title[language]}
            </h1>
            <p className="text-xl text-[#faf9f6]/80 leading-relaxed">
              {content.hero.description[language]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm">
                <h2 className="text-2xl font-serif text-[#133129] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {content.form.title[language]}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#133129] mb-2">
                        {content.form.name[language]} {content.form.required[language]}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#133129]/20 rounded-lg focus:outline-none focus:border-[#d4a84b] text-[#133129]"
                        placeholder={content.form.namePlaceholder[language]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#133129] mb-2">
                        {content.form.email[language]} {content.form.required[language]}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#133129]/20 rounded-lg focus:outline-none focus:border-[#d4a84b] text-[#133129]"
                        placeholder={content.form.emailPlaceholder[language]}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#133129] mb-2">
                        {content.form.organization[language]}
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#133129]/20 rounded-lg focus:outline-none focus:border-[#d4a84b] text-[#133129]"
                        placeholder={content.form.organizationPlaceholder[language]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#133129] mb-2">
                        {content.form.topic[language]} {content.form.required[language]}
                      </label>
                      <select
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#133129]/20 rounded-lg focus:outline-none focus:border-[#d4a84b] text-[#133129] bg-white"
                      >
                        <option value="">{content.form.topicPlaceholder[language]}</option>
                        {topics.map((topic) => (
                          <option key={topic.en} value={topic.en}>
                            {language === 'ar' ? topic.ar : topic.en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#133129] mb-2">
                      {content.form.message[language]} {content.form.required[language]}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-[#133129]/20 rounded-lg focus:outline-none focus:border-[#d4a84b] text-[#133129] resize-none"
                      placeholder={content.form.messagePlaceholder[language]}
                    />
                  </div>

                  <Button type="submit" className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-3">
                    {content.form.submit[language]}
                    <Send className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Office Location */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#133129]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#224B40]" />
                  </div>
                  <h3 className="text-lg font-serif text-[#133129]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {content.office.title[language]}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                    <span className="text-[#406D61]">{content.office.address[language]}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                    <span className="text-[#406D61]" dir="ltr">{content.office.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                    <a href={`mailto:${content.office.email}`} className="text-[#224B40] hover:text-[#d4a84b] transition-colors">
                      {content.office.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                    <span className="text-[#406D61]">{content.office.hours[language]}</span>
                  </div>
                </div>
              </div>

              {/* YETO Inquiries */}
              <div className="bg-[#224B40] p-6 rounded-lg">
                <h3 className="text-lg font-serif text-[#faf9f6] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {content.yeto.title[language]}
                </h3>
                <p className="text-[#faf9f6]/70 text-sm mb-4">
                  {content.yeto.description[language]}
                </p>
                <a 
                  href={`mailto:${content.yeto.email}`}
                  className="inline-flex items-center gap-2 text-[#d4a84b] hover:text-[#faf9f6] transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  {content.yeto.email}
                </a>
              </div>

              {/* Quick Response Promise */}
              <div className="bg-[#faf9f6] border border-[#d4a84b]/30 p-6 rounded-lg">
                <p className="text-[#133129] text-sm leading-relaxed">
                  {language === 'ar' 
                    ? 'نسعى للرد على جميع الاستفسارات خلال يومي عمل. للأمور العاجلة، يرجى الاتصال بنا مباشرة.'
                    : 'We aim to respond to all inquiries within 2 business days. For urgent matters, please call us directly.'
                  }
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
