/**
 * CauseWay Logo Component
 * Uses the EXACT brand logo image from official brand guidelines
 * Brand: CauseWay (كوزواي)
 * 
 * Logo Structure:
 * - Geometric C-shape frame (Deep Forest #133129)
 * - Inner sage green square (#406D61)
 * - Gold accent square (#d4a84b)
 * - Small teal circle accent (#224B40)
 * - "CauseWay" in elegant serif (white on dark)
 * - "كوزواي" in Arabic script (sage green)
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
  
  // Text colors based on background - EXACT brand colors
  const textColor = light ? 'text-[#faf9f6]' : 'text-[#133129]';
  const arabicColor = light ? 'text-[#406D61]' : 'text-[#406D61]';

  // EXACT Logo icon matching the official brand design (IMG_3922.jpeg)
  const LogoIcon = () => (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${currentSize.height} w-auto flex-shrink-0`}
      aria-label="CauseWay Logo"
    >
      {/* Outer C-shaped frame - Teal Green #224B40 */}
      <path 
        d="M10 10 H70 Q76 10 76 16 V22 H22 V78 H70 Q76 78 76 72 V66 H90 V84 Q90 90 84 90 H16 Q10 90 10 84 V16 Q10 10 16 10 Z" 
        fill="#224B40"
      />
      {/* Top right extension bar */}
      <rect x="70" y="10" width="20" height="12" rx="3" fill="#224B40" />
      
      {/* Inner sage green square - #406D61 */}
      <rect x="38" y="40" width="22" height="22" rx="4" fill="#406D61" />
      
      {/* Gold accent square - #d4a84b - overlapping position */}
      <rect x="52" y="30" width="18" height="18" rx="4" fill="#d4a84b" />
      
      {/* Small teal circle - bottom right - #224B40 */}
      <circle cx="76" cy="64" r="10" fill="#224B40" />
    </svg>
  );

  // Use actual brand logo image (official version)
  if (variant === 'image') {
    return (
      <img 
        src="/images/causeway-logo-official.jpeg" 
        alt="CauseWay - كوزواي"
        className={`${currentSize.height} w-auto rounded ${className}`}
        loading="eager"
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

  // Full logo with icon and text - matches official brand exactly
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
