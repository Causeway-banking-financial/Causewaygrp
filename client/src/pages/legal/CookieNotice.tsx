/**
 * Cookie Notice Page
 */

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookieNotice() {
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
              Cookie Notice
            </h1>
            <p className="text-causeway-forest/60 mb-8">
              Last updated: January 31, 2026
            </p>

            <div className="prose prose-lg text-causeway-forest/80 max-w-none">
              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are stored on your device when you visit 
                a website. They help the website remember your preferences and improve 
                your browsing experience.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                How We Use Cookies
              </h2>
              <p>CauseWay uses cookies for the following purposes:</p>
              
              <h3 className="text-xl font-semibold text-causeway-forest mt-6 mb-3">
                Essential Cookies
              </h3>
              <p>
                These cookies are necessary for the website to function properly. 
                They enable basic features like page navigation and access to secure areas.
              </p>

              <h3 className="text-xl font-semibold text-causeway-forest mt-6 mb-3">
                Analytics Cookies
              </h3>
              <p>
                We use analytics cookies to understand how visitors interact with our website. 
                This helps us improve our content and user experience. These cookies collect 
                information anonymously.
              </p>

              <h3 className="text-xl font-semibold text-causeway-forest mt-6 mb-3">
                Preference Cookies
              </h3>
              <p>
                These cookies remember your preferences, such as language settings, 
                to provide a more personalized experience.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                Managing Cookies
              </h2>
              <p>
                You can control and manage cookies through your browser settings. 
                Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
              <p className="mt-4">
                Please note that blocking cookies may affect the functionality of our website.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                Third-Party Cookies
              </h2>
              <p>
                Some cookies on our website are placed by third-party services, 
                such as analytics providers. These third parties have their own 
                privacy policies governing the use of cookies.
              </p>

              <h2 className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> info@causewaygrp.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
