/**
 * Terms of Service Page
 */

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="text-causeway-forest/60 mb-8">
              Last updated: January 31, 2026
            </p>

            <div className="prose prose-lg text-causeway-forest/80 max-w-none">
              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using the CauseWay website and services, you accept and agree 
                to be bound by these Terms of Service. If you do not agree to these terms, 
                please do not use our website or services.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                2. Services
              </h2>
              <p>
                CauseWay provides financial consulting, advisory, and development services 
                including but not limited to Islamic finance engineering, risk and compliance, 
                core banking systems, microfinance development, capacity building, and branding services.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                3. Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of CauseWay and is protected by intellectual property laws. 
                You may not reproduce, distribute, or create derivative works without our written permission.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                4. User Responsibilities
              </h2>
              <p>When using our website and services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with the operation of our website</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
              </ul>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                5. Limitation of Liability
              </h2>
              <p>
                CauseWay provides information and services on an "as is" basis. We make no 
                warranties, express or implied, regarding the accuracy, completeness, or 
                reliability of any content or services. We shall not be liable for any 
                indirect, incidental, or consequential damages arising from your use of our services.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                6. Confidentiality
              </h2>
              <p>
                We maintain strict confidentiality regarding all client information and 
                project details. Our engagement agreements include comprehensive confidentiality 
                provisions to protect your business interests.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                7. Governing Law
              </h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with 
                the laws of the Republic of Yemen. Any disputes arising from these terms 
                shall be resolved through appropriate legal channels.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                8. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. 
                Changes will be effective immediately upon posting to our website. 
                Your continued use of our services constitutes acceptance of any modifications.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                9. Contact
              </h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> info@causewaygrp.com<br />
                <strong>Phone:</strong> +967 2 236655
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
