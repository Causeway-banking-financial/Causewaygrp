/**
 * CauseWay Logo Component
 * Brand: CauseWay (كوزواي)
 * Features the distinctive square-within-square logo with teal, sage, and gold elements
 * Exact colors from brand guidelines
 */

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
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
    sm: { icon: 28, text: 'text-base', arabic: 'text-xs' },
    md: { icon: 36, text: 'text-xl', arabic: 'text-sm' },
    lg: { icon: 52, text: 'text-2xl', arabic: 'text-lg' }
  };

  const currentSize = sizes[size];
  const textColor = light ? 'text-causeway-cream' : 'text-causeway-forest';
  const arabicColor = light ? 'text-causeway-sage' : 'text-causeway-teal';

  // Exact brand colors
  const colors = {
    teal: '#1e6b5a',      // Main frame color
    sage: '#5a8a6a',      // Inner square
    gold: '#d4a84b',      // Accent square
    forest: '#1a2e1a'     // Background/text
  };

  const LogoIcon = () => (
    <svg 
      width={currentSize.icon} 
      height={currentSize.icon} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Outer C-shaped frame - Teal #1e6b5a */}
      <path 
        d="M15 10 L85 10 L85 22 L27 22 L27 78 L85 78 L85 90 L15 90 Z" 
        fill={colors.teal}
      />
      {/* Inner sage square - #5a8a6a */}
      <rect x="38" y="38" width="26" height="26" rx="4" fill={colors.sage} />
      {/* Gold accent square - #d4a84b */}
      <rect x="54" y="26" width="22" height="22" rx="4" fill={colors.gold} />
      {/* Small teal circle - #1e6b5a */}
      <circle cx="82" cy="58" r="9" fill={colors.teal} />
    </svg>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <span className={`font-display font-semibold ${currentSize.text} ${textColor}`}>
          CauseWay
        </span>
        {showArabic && (
          <span className={`font-display-ar ${currentSize.arabic} ${arabicColor}`}>
            كوزواي
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col leading-none">
        <span className={`font-display font-semibold ${currentSize.text} ${textColor}`}>
          CauseWay
        </span>
        {showArabic && (
          <span className={`font-display-ar ${currentSize.arabic} ${arabicColor} mt-0.5`}>
            كوزواي
          </span>
        )}
      </div>
    </div>
  );
}
