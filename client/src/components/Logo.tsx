/**
 * CauseWay Logo Component
 * Uses the exact brand logo image with proper sizing
 * Brand: CauseWay (كوزواي)
 */

interface LogoProps {
  variant?: 'full' | 'icon' | 'text' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showArabic?: boolean;
  light?: boolean;
}

export default function Logo({ 
  variant = 'full', 
  size = 'md', 
  className = '',
  showArabic = true,
  light = false
}: LogoProps) {
  const sizes = {
    sm: { height: 'h-8', imgHeight: 32, text: 'text-lg', arabic: 'text-sm', gap: 'gap-2' },
    md: { height: 'h-10', imgHeight: 40, text: 'text-xl', arabic: 'text-base', gap: 'gap-2.5' },
    lg: { height: 'h-14', imgHeight: 56, text: 'text-2xl', arabic: 'text-lg', gap: 'gap-3' },
    xl: { height: 'h-16', imgHeight: 64, text: 'text-3xl', arabic: 'text-xl', gap: 'gap-4' }
  };

  const currentSize = sizes[size];
  
  // Text colors based on background
  const textColor = light ? 'text-[#faf9f6]' : 'text-[#133129]';
  const arabicColor = light ? 'text-[#5a8a6a]' : 'text-[#1e6b5a]';

  // Logo icon using the exact brand design
  const LogoIcon = () => (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${currentSize.height} w-auto flex-shrink-0`}
      aria-label="CauseWay Logo"
    >
      {/* Outer C-shaped frame - Teal Green */}
      <path 
        d="M8 8 H72 Q78 8 78 14 V20 H20 V80 H72 Q78 80 78 74 V68 H92 V86 Q92 92 86 92 H14 Q8 92 8 86 V14 Q8 8 14 8 Z" 
        fill="#224B40"
      />
      {/* Top bar extension */}
      <rect x="72" y="8" width="20" height="12" rx="2" fill="#224B40" />
      
      {/* Inner sage green square */}
      <rect x="36" y="42" width="24" height="24" rx="4" fill="#406D61" />
      
      {/* Gold accent square - overlapping position */}
      <rect x="52" y="32" width="20" height="20" rx="4" fill="#d4a84b" />
      
      {/* Small teal circle - bottom right area */}
      <circle cx="78" cy="66" r="10" fill="#1e6b5a" />
    </svg>
  );

  // Use actual brand logo image
  if (variant === 'image') {
    return (
      <img 
        src="/images/causeway-logo-main.jpeg" 
        alt="CauseWay - كوزواي"
        className={`${currentSize.height} w-auto rounded ${className}`}
      />
    );
  }

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center ${currentSize.gap} ${className}`}>
        <span 
          className={`font-serif font-bold tracking-tight ${currentSize.text} ${textColor}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          CauseWay
        </span>
        {showArabic && (
          <span 
            className={`${currentSize.arabic} ${arabicColor} font-medium`}
            style={{ fontFamily: "'Amiri', serif" }}
          >
            كوزواي
          </span>
        )}
      </div>
    );
  }

  // Full logo with icon and text
  return (
    <div className={`flex items-center ${currentSize.gap} ${className}`}>
      <LogoIcon />
      <div className="flex items-baseline gap-2">
        <span 
          className={`font-serif font-bold tracking-tight ${currentSize.text} ${textColor}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          CauseWay
        </span>
        {showArabic && (
          <span 
            className={`${currentSize.arabic} ${arabicColor} font-medium`}
            style={{ fontFamily: "'Amiri', serif" }}
          >
            كوزواي
          </span>
        )}
      </div>
    </div>
  );
}
