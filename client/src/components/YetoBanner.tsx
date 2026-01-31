/**
 * YETO Coming Soon Banner Component
 * Yemen Economic Transparency Observatory
 * المرصد اليمني للشفافية الاقتصادية
 * Enhanced with better mobile responsiveness
 */

import { useState } from 'react';
import { X, Bell, ArrowRight, BarChart3, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface YetoBannerProps {
  variant?: 'top' | 'inline' | 'modal';
  onClose?: () => void;
}

export default function YetoBanner({ variant = 'top', onClose }: YetoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you! We\'ll notify you when YETO launches.');
      setEmail('');
    }
  };

  if (!isVisible) return null;

  if (variant === 'top') {
    return (
      <div className="bg-gradient-to-r from-causeway-gold via-causeway-gold-dark to-causeway-gold relative overflow-hidden">
        <div className="container py-2.5 sm:py-3 relative">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-causeway-forest/20 rounded-full flex-shrink-0">
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-causeway-forest" />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
                <span className="font-semibold text-causeway-forest text-xs sm:text-sm whitespace-nowrap">
                  YETO Coming Soon
                </span>
                <span className="text-causeway-forest/80 text-xs sm:text-sm hidden md:inline truncate">
                  — Yemen Economic Transparency Observatory
                </span>
                <span className="text-causeway-forest/70 text-xs font-body-ar hidden lg:inline">
                  المرصد اليمني للشفافية الاقتصادية
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link href="/observatory">
                <Button 
                  size="sm" 
                  className="bg-causeway-forest text-causeway-cream hover:bg-causeway-forest-light text-xs px-2.5 sm:px-3 py-1.5"
                >
                  <span className="hidden xs:inline">Learn More</span>
                  <span className="xs:hidden">More</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
              <button 
                onClick={handleClose}
                className="text-causeway-forest/60 hover:text-causeway-forest transition-colors p-1"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-causeway-forest-light rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden border border-causeway-teal/20">
        <div className="absolute inset-0 bg-gradient-to-br from-causeway-teal/10 to-transparent" />
        
        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l border-t border-causeway-gold/30" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r border-b border-causeway-gold/30" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-causeway-gold/20 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-causeway-gold" />
            </div>
            <span className="text-causeway-gold font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-causeway-cream mb-1 sm:mb-2">
            YETO Platform
          </h3>
          <p className="text-causeway-cream/80 font-body-ar text-base sm:text-lg mb-3 sm:mb-4">
            المرصد اليمني للشفافية الاقتصادية
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-causeway-teal/20 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-causeway-sage" />
              </div>
              <span className="text-causeway-cream/70 text-xs">Economic Data</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-causeway-teal/20 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-causeway-sage" />
              </div>
              <span className="text-causeway-cream/70 text-xs">Analysis</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-causeway-teal/20 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-causeway-sage" />
              </div>
              <span className="text-causeway-cream/70 text-xs">Reports</span>
            </div>
          </div>

          <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for updates"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-causeway-forest border border-causeway-teal/30 rounded text-causeway-cream placeholder:text-causeway-cream/40 focus:outline-none focus:border-causeway-gold text-sm"
            />
            <Button type="submit" className="btn-gold whitespace-nowrap text-sm py-2 sm:py-2.5">
              Notify Me
            </Button>
          </form>
          
          <p className="text-causeway-cream/50 text-xs mt-3 sm:mt-4">
            Expected launch: Q2 2026
          </p>
        </div>
      </div>
    );
  }

  // Modal variant
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-causeway-forest rounded-lg p-6 sm:p-8 max-w-lg w-full relative overflow-hidden">
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-causeway-cream/60 hover:text-causeway-cream transition-colors z-10 p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-causeway-gold/30" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-causeway-gold/30" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-causeway-teal/20 to-transparent" />
        
        <div className="relative z-10 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-causeway-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-causeway-gold" />
          </div>
          
          <span className="text-causeway-gold font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Coming Soon
          </span>
          
          <h3 className="text-2xl sm:text-3xl font-display text-causeway-cream mt-2 mb-1 sm:mb-2">
            YETO Platform
          </h3>
          <p className="text-causeway-cream/80 font-body-ar text-lg sm:text-xl mb-3 sm:mb-4">
            المرصد اليمني للشفافية الاقتصادية
          </p>
          <p className="text-causeway-cream/70 text-xs sm:text-sm mb-6 sm:mb-8">
            Yemen Economic Transparency Observatory — Your gateway to comprehensive 
            economic data, analysis, and transparency reporting for Yemen.
          </p>

          <form onSubmit={handleNotify} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for launch updates"
              className="w-full px-4 py-2.5 sm:py-3 bg-causeway-forest-light border border-causeway-teal/30 rounded text-causeway-cream placeholder:text-causeway-cream/40 focus:outline-none focus:border-causeway-gold text-sm"
            />
            <Button type="submit" className="btn-gold w-full text-sm sm:text-base">
              Notify Me When YETO Launches
            </Button>
          </form>
          
          <p className="text-causeway-cream/50 text-xs mt-4">
            Expected launch: Q2 2026
          </p>
        </div>
      </div>
    </div>
  );
}
