/**
 * CauseWay Logo Component
 * Brand: CauseWay (كوزواي)
 * Features the distinctive C-frame logo with teal, sage, and gold elements
 * Exact colors from brand guidelines - matching the provided logo images
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
    sm: { icon: 32, text: 'text-lg', arabic: 'text-xs' },
    md: { icon: 44, text: 'text-xl', arabic: 'text-sm' },
    lg: { icon: 60, text: 'text-2xl', arabic: 'text-lg' }
  };

  const currentSize = sizes[size];
  const textColor = light ? 'text-causeway-cream' : 'text-causeway-cream';
  const arabicColor = light ? 'text-causeway-sage' : 'text-causeway-sage';

  // Exact brand colors from the logo image
  const colors = {
    tealFrame: '#2d6a5a',     // Main C-frame color (darker teal)
    sageSquare: '#5a8a6a',    // Inner sage green square
    goldSquare: '#d4a84b',    // Gold/amber accent square
    tealDot: '#2d6a5a',       // Small teal circle
  };

  const LogoIcon = () => (
    <svg 
      width={currentSize.icon} 
      height={currentSize.icon} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-label="CauseWay Logo"
    >
      {/* Outer C-shaped frame - Teal */}
      {/* Top horizontal bar */}
      <rect x="8" y="8" width="84" height="12" rx="2" fill={colors.tealFrame} />
      {/* Left vertical bar */}
      <rect x="8" y="8" width="12" height="84" rx="2" fill={colors.tealFrame} />
      {/* Bottom horizontal bar */}
      <rect x="8" y="80" width="60" height="12" rx="2" fill={colors.tealFrame} />
      
      {/* Inner sage square - positioned inside the C */}
      <rect x="32" y="40" width="26" height="26" rx="4" fill={colors.sageSquare} />
      
      {/* Gold accent square - positioned to the right of sage */}
      <rect x="54" y="32" width="22" height="22" rx="4" fill={colors.goldSquare} />
      
      {/* Small teal circle/dot - bottom right */}
      <circle cx="80" cy="68" r="10" fill={colors.tealFrame} />
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
