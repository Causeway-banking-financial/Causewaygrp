/**
 * CauseWay Logo Component
 * Brand: CauseWay (كوزواي)
 * Features the distinctive square-within-square logo with teal, sage, and gold elements
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
    sm: { icon: 32, text: 'text-lg', arabic: 'text-sm' },
    md: { icon: 40, text: 'text-xl', arabic: 'text-base' },
    lg: { icon: 56, text: 'text-3xl', arabic: 'text-xl' }
  };

  const currentSize = sizes[size];
  const textColor = light ? 'text-causeway-cream' : 'text-causeway-forest';

  const LogoIcon = () => (
    <svg 
      width={currentSize.icon} 
      height={currentSize.icon} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer C-shaped frame - Teal */}
      <path 
        d="M20 15 L80 15 L80 25 L30 25 L30 75 L80 75 L80 85 L20 85 Z" 
        fill="#1e6b5a"
      />
      {/* Inner sage square */}
      <rect x="40" y="35" width="25" height="25" rx="3" fill="#5a8a6a" />
      {/* Gold accent square */}
      <rect x="55" y="25" width="20" height="20" rx="3" fill="#d4a84b" />
      {/* Small teal circle */}
      <circle cx="80" cy="55" r="8" fill="#1e6b5a" />
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
          <span className={`font-display-ar ${currentSize.arabic} ${textColor} opacity-80`}>
            كوزواي
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col">
        <span className={`font-display font-semibold ${currentSize.text} ${textColor} leading-tight`}>
          CauseWay
        </span>
        {showArabic && (
          <span className={`font-display-ar ${currentSize.arabic} ${light ? 'text-causeway-sage' : 'text-causeway-teal'} leading-tight`}>
            كوزواي
          </span>
        )}
      </div>
    </div>
  );
}
