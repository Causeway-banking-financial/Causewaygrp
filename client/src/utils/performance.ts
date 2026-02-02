/**
 * CauseWay Performance Optimization Utilities
 * Implements lazy loading, image optimization, and performance monitoring
 */

// Lazy load images with Intersection Observer
export const lazyLoadImage = (
  imageElement: HTMLImageElement,
  src: string,
  options?: IntersectionObserverInit
): void => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = src;
        img.classList.add('loaded');
        obs.unobserve(img);
      }
    });
  }, defaultOptions);

  observer.observe(imageElement);
};

// Preload critical resources
export const preloadResource = (
  href: string,
  as: 'script' | 'style' | 'image' | 'font' | 'fetch',
  type?: string
): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  if (as === 'font') link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

// Prefetch pages for faster navigation
export const prefetchPage = (url: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

// Debounce function for performance
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Performance metrics collection
interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export const collectPerformanceMetrics = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    const metrics: PerformanceMetrics = {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null
    };

    // Get navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      metrics.ttfb = navigation.responseStart - navigation.requestStart;
    }

    // Get paint timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        metrics.fcp = entry.startTime;
      }
    });

    // Use PerformanceObserver for LCP, FID, CLS
    if ('PerformanceObserver' in window) {
      // LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // LCP not supported
      }

      // FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as PerformanceEventTiming;
            metrics.fid = fidEntry.processingStart - fidEntry.startTime;
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // FID not supported
      }

      // CLS
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const layoutShift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
            if (!layoutShift.hadRecentInput) {
              clsValue += layoutShift.value;
              metrics.cls = clsValue;
            }
          });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // CLS not supported
      }
    }

    // Resolve after a short delay to collect metrics
    setTimeout(() => resolve(metrics), 3000);
  });
};

// Resource hints for critical pages
export const addResourceHints = (): void => {
  const criticalPages = [
    '/services',
    '/about',
    '/contact',
    '/academy',
    '/insights'
  ];

  // Prefetch critical pages
  criticalPages.forEach(page => {
    prefetchPage(page);
  });

  // Preconnect to external domains
  const externalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Image optimization helper
export const getOptimizedImageUrl = (
  url: string,
  width?: number,
  quality?: number
): string => {
  // If using a CDN that supports image optimization
  if (url.includes('cdn.') || url.includes('cloudinary') || url.includes('imgix')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (quality) params.set('q', quality.toString());
    params.set('auto', 'format');
    return `${url}?${params.toString()}`;
  }
  return url;
};

// Memory-efficient scroll handler
export const createScrollHandler = (
  callback: (scrollY: number) => void,
  throttleMs: number = 100
): (() => void) => {
  let ticking = false;
  let lastScrollY = 0;

  const handleScroll = () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(lastScrollY);
        ticking = false;
      });
      ticking = true;
    }
  };

  const throttledHandler = throttle(handleScroll, throttleMs);
  window.addEventListener('scroll', throttledHandler, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', throttledHandler);
  };
};

// Detect slow connections
export const isSlowConnection = (): boolean => {
  const connection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
  
  if (connection) {
    const slowTypes = ['slow-2g', '2g', '3g'];
    return slowTypes.includes(connection.effectiveType || '') || connection.saveData === true;
  }
  
  return false;
};

// Reduce motion preference
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
