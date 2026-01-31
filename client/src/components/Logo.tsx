/**
 * CauseWay Logo Component
 * Brand: CauseWay (كوزواي)
 * Features the distinctive square-within-square logo with teal, sage, and gold elements
 * Exact colors from brand guidelines - matching IMG_3866(9).jpeg
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
    md: { icon: 40, text: 'text-xl', arabic: 'text-sm' },
    lg: { icon: 56, text: 'text-2xl', arabic: 'text-lg' }
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
    textWhite: '#f5f5f0',     // Off-white text
    textSage: '#7aa88a'       // Sage text for Arabic
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
      {/* Outer C-shaped frame - Teal #2d6a5a */}
      <path 
        d="M12 8 L12 92 L24 92 L24 20 L88 20 L88 8 Z" 
        fill={colors.tealFrame}
      />
      <path 
        d="M12 92 L88 92 L88 80 L24 80 L24 20 L12 20 Z" 
        fill={colors.tealFrame}
      />
      {/* Inner sage square - #5a8a6a */}
      <rect x="32" y="40" width="28" height="28" rx="5" fill={colors.sageSquare} />
      {/* Gold accent square - #d4a84b */}
      <rect x="52" y="28" width="24" height="24" rx="5" fill={colors.goldSquare} />
      {/* Small teal circle/dot - #2d6a5a */}
      <circle cx="84" cy="60" r="10" fill={colors.tealFrame} />
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
