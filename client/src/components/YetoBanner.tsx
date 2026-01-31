/**
 * YETO Coming Soon Banner Component
 * Yemen Economic Transparency Observatory
 * المرصد اليمني للشفافية الاقتصادية
 */

import { useState } from 'react';
import { X, Bell, ArrowRight } from 'lucide-react';
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
        <div className="absolute inset-0 bg-[url('/images/hero-islamic-finance.jpg')] opacity-10 bg-cover bg-center" />
        <div className="container py-3 relative">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-causeway-forest/20 rounded-full">
                <Bell className="w-4 h-4 text-causeway-forest" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-causeway-forest text-sm">
                  YETO Coming Soon
                </span>
                <span className="text-causeway-forest/80 text-sm hidden md:inline">
                  — Yemen Economic Transparency Observatory
                </span>
                <span className="text-causeway-forest/70 text-xs font-body-ar hidden lg:inline">
                  المرصد اليمني للشفافية الاقتصادية
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/observatory">
                <Button 
                  size="sm" 
                  className="bg-causeway-forest text-causeway-cream hover:bg-causeway-forest-light text-xs"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
              <button 
                onClick={handleClose}
                className="text-causeway-forest/60 hover:text-causeway-forest transition-colors"
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
      <div className="bg-causeway-forest rounded-lg p-8 relative overflow-hidden corner-ornament">
        <div className="absolute inset-0 bg-gradient-to-br from-causeway-teal/20 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-causeway-gold/20 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-causeway-gold" />
            </div>
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-display text-causeway-cream mb-2">
            YETO Platform
          </h3>
          <p className="text-causeway-cream/80 font-body-ar text-lg mb-4">
            المرصد اليمني للشفافية الاقتصادية
          </p>
          <p className="text-causeway-cream/70 text-sm mb-6 max-w-md">
            Yemen Economic Transparency Observatory — A comprehensive platform for economic 
            data, analysis, and transparency reporting. Launching Q2 2026.
          </p>

          <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for updates"
              className="flex-1 px-4 py-2 bg-causeway-forest-light border border-causeway-teal/30 rounded text-causeway-cream placeholder:text-causeway-cream/40 focus:outline-none focus:border-causeway-gold"
            />
            <Button type="submit" className="btn-gold whitespace-nowrap">
              Notify Me
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Modal variant
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-causeway-forest rounded-lg p-8 max-w-lg w-full relative overflow-hidden corner-ornament">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-causeway-cream/60 hover:text-causeway-cream transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="absolute inset-0 bg-gradient-to-br from-causeway-teal/20 to-transparent" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-causeway-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-8 h-8 text-causeway-gold" />
          </div>
          
          <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
            Coming Soon
          </span>
          
          <h3 className="text-3xl font-display text-causeway-cream mt-2 mb-2">
            YETO Platform
          </h3>
          <p className="text-causeway-cream/80 font-body-ar text-xl mb-4">
            المرصد اليمني للشفافية الاقتصادية
          </p>
          <p className="text-causeway-cream/70 text-sm mb-8">
            Yemen Economic Transparency Observatory — Your gateway to comprehensive 
            economic data, analysis, and transparency reporting for Yemen.
          </p>

          <form onSubmit={handleNotify} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for launch updates"
              className="w-full px-4 py-3 bg-causeway-forest-light border border-causeway-teal/30 rounded text-causeway-cream placeholder:text-causeway-cream/40 focus:outline-none focus:border-causeway-gold"
            />
            <Button type="submit" className="btn-gold w-full">
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
