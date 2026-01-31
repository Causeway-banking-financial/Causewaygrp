/**
 * CauseWay Footer Component
 * Includes: Company info, expertise links, resources, contact, legal
 */

import { Link } from 'wouter';
import Logo from './Logo';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const expertise = [
  { name: 'Islamic Finance', href: '/services/islamic-finance' },
  { name: 'Risk & Compliance', href: '/services/risk-compliance' },
  { name: 'Core Banking', href: '/services/core-banking' },
  { name: 'Microfinance', href: '/services/microfinance' },
  { name: 'Capacity Building', href: '/services/capacity-building' },
  { name: 'Branding', href: '/services/branding' },
];

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Approach', href: '/about#approach' },
  { name: 'Leadership', href: '/about#leadership' },
  { name: 'Partners', href: '/about#partners' },
  { name: 'Careers', href: '/careers' },
];

const resources = [
  { name: 'Observatory (YETO)', href: '/observatory' },
  { name: 'Articles', href: '/insights/articles' },
  { name: 'Publications', href: '/insights/publications' },
  { name: 'News', href: '/insights/news' },
];

const externalResources = [
  { name: 'Central Bank of Yemen', href: 'https://www.centralbank.gov.ye', external: true },
  { name: 'AAOIFI Standards', href: 'https://aaoifi.com', external: true },
  { name: 'Basel Framework', href: 'https://www.bis.org/basel_framework/', external: true },
  { name: 'FATF Guidelines', href: 'https://www.fatf-gafi.org', external: true },
  { name: 'World Bank Yemen', href: 'https://www.worldbank.org/en/country/yemen', external: true },
  { name: 'IMF Reports', href: 'https://www.imf.org/en/Countries/YEM', external: true },
];

const legal = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Notice', href: '/cookie-notice' },
];

export default function Footer() {
  return (
    <footer className="bg-causeway-forest grain-overlay">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Logo variant="full" size="lg" light />
            <p className="mt-4 text-causeway-cream/70 text-sm leading-relaxed max-w-sm">
              Building Sharia-grounded, governance-safe financial systems for banks, 
              institutions, and development partners across Yemen and the region.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-causeway-cream/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-causeway-gold" />
                <div>
                  <p>Khormaksar, Corniche Road</p>
                  <p>Aden, Yemen</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-causeway-cream/70 text-sm">
                <Phone className="w-4 h-4 text-causeway-gold" />
                <div>
                  <p>+967 2 236655</p>
                  <p>+967 2 232096</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-causeway-cream/70 text-sm">
                <Mail className="w-4 h-4 text-causeway-gold" />
                <a href="mailto:info@causewaygrp.com" className="hover:text-causeway-gold transition-colors">
                  info@causewaygrp.com
                </a>
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-causeway-gold font-semibold text-sm uppercase tracking-wider mb-4">
              Expertise
            </h4>
            <ul className="space-y-2">
              {expertise.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-causeway-cream/70 hover:text-causeway-gold transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-causeway-gold font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-causeway-cream/70 hover:text-causeway-gold transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-causeway-gold font-semibold text-sm uppercase tracking-wider mb-4 mt-8">
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-causeway-cream/70 hover:text-causeway-gold transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Resources */}
          <div>
            <h4 className="text-causeway-gold font-semibold text-sm uppercase tracking-wider mb-4">
              External Resources
            </h4>
            <ul className="space-y-2">
              {externalResources.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-causeway-cream/70 hover:text-causeway-gold transition-colors text-sm flex items-center gap-1"
                  >
                    {item.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-causeway-teal/20">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-causeway-cream/50 text-sm">
              © {new Date().getFullYear()} CauseWay Consultancies. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              {legal.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="text-causeway-cream/50 hover:text-causeway-gold transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
