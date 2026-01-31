/**
 * Privacy Policy Page
 */

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-causeway-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-display text-causeway-forest mb-4">
              Privacy Policy
            </h1>
            <p className="text-causeway-forest/60 mb-8">
              Last updated: January 31, 2026
            </p>

            <div className="prose prose-lg text-causeway-forest/80 max-w-none">
              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                1. Introduction
              </h2>
              <p>
                CauseWay Consulting, Services & Development Group ("CauseWay," "we," "us," or "our") 
                is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p>We may collect information about you in various ways, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, organization name, and other contact information you provide through our contact forms or service inquiries.</li>
                <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.</li>
                <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience on our website.</li>
              </ul>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraudulent or unauthorized activity</li>
              </ul>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                4. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information with trusted service providers who assist us in 
                operating our website and conducting our business, subject to confidentiality agreements.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                5. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                6. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                7. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> info@causewaygrp.com<br />
                <strong>Phone:</strong> +967 2 236655<br />
                <strong>Address:</strong> Khormaksar, Corniche Road, Aden, Yemen
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
