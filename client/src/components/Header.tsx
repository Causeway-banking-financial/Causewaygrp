/**
 * CauseWay Header Component
 * Navigation: About, Services, Observatory, Insights, Contact
 * Features: Language toggle, Client Portal CTA
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown, Lock, Globe } from 'lucide-react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const services = [
  { name: 'Islamic Finance Engineering', href: '/services/islamic-finance' },
  { name: 'Risk & Compliance', href: '/services/risk-compliance' },
  { name: 'Core Banking Systems', href: '/services/core-banking' },
  { name: 'Microfinance Development', href: '/services/microfinance' },
  { name: 'Capacity Building', href: '/services/capacity-building' },
  { name: 'Branding & Identity', href: '/services/branding' },
];

const insights = [
  { name: 'Articles', href: '/insights/articles' },
  { name: 'Publications', href: '/insights/publications' },
  { name: 'News', href: '/insights/news' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location === path || location.startsWith(path + '/');

  const handleClientPortal = () => {
    toast.info('Client Portal access coming soon');
  };

  const handleLanguageToggle = () => {
    toast.info('Arabic version coming soon');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-causeway-forest/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Logo variant="full" size="md" light className="cursor-pointer" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/about"
              className={`text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium ${
                isActive('/about') ? 'text-causeway-gold' : ''
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium ${
                isActive('/services') ? 'text-causeway-gold' : ''
              }`}>
                Services <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-causeway-forest border-causeway-teal/30">
                {services.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link 
                      href={service.href}
                      className="text-causeway-cream/90 hover:text-causeway-gold hover:bg-causeway-forest-light cursor-pointer"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link 
                    href="/services"
                    className="text-causeway-gold hover:bg-causeway-forest-light cursor-pointer border-t border-causeway-teal/20 mt-1 pt-2"
                  >
                    View All Services
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/observatory"
              className={`text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium ${
                isActive('/observatory') ? 'text-causeway-gold' : ''
              }`}
            >
              Observatory
            </Link>

            {/* Insights Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium ${
                isActive('/insights') ? 'text-causeway-gold' : ''
              }`}>
                Insights <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-causeway-forest border-causeway-teal/30">
                {insights.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link 
                      href={item.href}
                      className="text-causeway-cream/90 hover:text-causeway-gold hover:bg-causeway-forest-light cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link 
                    href="/insights"
                    className="text-causeway-gold hover:bg-causeway-forest-light cursor-pointer border-t border-causeway-teal/20 mt-1 pt-2"
                  >
                    All Insights
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/contact"
              className={`text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium ${
                isActive('/contact') ? 'text-causeway-gold' : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={handleLanguageToggle}
              className="flex items-center gap-1 text-causeway-cream/70 hover:text-causeway-gold transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              <span>العربية</span>
            </button>
            
            <Button 
              onClick={handleClientPortal}
              variant="outline" 
              className="border-causeway-gold/50 text-causeway-gold hover:bg-causeway-gold/10 hover:border-causeway-gold"
            >
              <Lock className="w-4 h-4 mr-2" />
              Client Portal
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-causeway-cream p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-causeway-teal/20 pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/about"
                className="text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="border-t border-causeway-teal/20 pt-2">
                <span className="text-causeway-gold text-sm font-semibold uppercase tracking-wider">Services</span>
                <div className="flex flex-col gap-2 mt-2 pl-4">
                  {services.map((service) => (
                    <Link 
                      key={service.href}
                      href={service.href}
                      className="text-causeway-cream/80 hover:text-causeway-gold transition-colors text-sm py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/observatory"
                className="text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium py-2 border-t border-causeway-teal/20 pt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Observatory
              </Link>

              <div className="border-t border-causeway-teal/20 pt-2">
                <span className="text-causeway-gold text-sm font-semibold uppercase tracking-wider">Insights</span>
                <div className="flex flex-col gap-2 mt-2 pl-4">
                  {insights.map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href}
                      className="text-causeway-cream/80 hover:text-causeway-gold transition-colors text-sm py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/contact"
                className="text-causeway-cream/90 hover:text-causeway-gold transition-colors font-medium py-2 border-t border-causeway-teal/20 pt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="flex items-center gap-4 pt-4 border-t border-causeway-teal/20">
                <button 
                  onClick={handleLanguageToggle}
                  className="flex items-center gap-1 text-causeway-cream/70 hover:text-causeway-gold transition-colors text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>العربية</span>
                </button>
                
                <Button 
                  onClick={handleClientPortal}
                  variant="outline" 
                  size="sm"
                  className="border-causeway-gold/50 text-causeway-gold hover:bg-causeway-gold/10"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Client Portal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
