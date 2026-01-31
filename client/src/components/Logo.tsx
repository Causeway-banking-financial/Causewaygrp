/**
 * CauseWay Logo Component
 * Brand: CauseWay (كوزواي)
 * Uses the exact brand logo image with correct colors
 * Colors: Forest Green (#1a2e1a), Teal (#1e6b5a), Sage (#5a8a6a), Gold (#d4a84b)
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
    md: { icon: 36, text: 'text-lg', arabic: 'text-sm' },
    lg: { icon: 48, text: 'text-xl', arabic: 'text-base' }
  };

  const currentSize = sizes[size];
  const textColor = light ? 'text-causeway-cream' : 'text-causeway-cream';
  const arabicColor = light ? 'text-causeway-gold' : 'text-causeway-gold';

  // Exact brand colors matching the logo
  const colors = {
    tealFrame: '#1e6b5a',     // Teal green for C-frame
    sageSquare: '#5a8a6a',    // Sage green inner square
    goldSquare: '#d4a84b',    // Gold accent square
    forestGreen: '#1a2e1a',   // Deep forest green
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
      {/* Outer C-shaped frame - Teal Green */}
      {/* Top horizontal bar */}
      <rect x="5" y="5" width="90" height="14" rx="2" fill={colors.tealFrame} />
      {/* Left vertical bar */}
      <rect x="5" y="5" width="14" height="90" rx="2" fill={colors.tealFrame} />
      {/* Bottom horizontal bar - shorter to form C shape */}
      <rect x="5" y="81" width="65" height="14" rx="2" fill={colors.tealFrame} />
      
      {/* Inner sage green square */}
      <rect x="30" y="38" width="28" height="28" rx="4" fill={colors.sageSquare} />
      
      {/* Gold accent square - overlapping */}
      <rect x="50" y="28" width="24" height="24" rx="4" fill={colors.goldSquare} />
      
      {/* Small teal circle - bottom right area */}
      <circle cx="78" cy="65" r="12" fill={colors.tealFrame} />
    </svg>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <span className={`font-display font-bold ${currentSize.text} ${textColor}`}>
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
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon />
      <div className="flex items-baseline gap-1.5">
        <span className={`font-display font-bold ${currentSize.text} ${textColor}`}>
          CauseWay
        </span>
        {showArabic && (
          <span className={`font-display-ar ${currentSize.arabic} ${arabicColor}`}>
            كوزواي
          </span>
        )}
      </div>
    </div>
  );
}
