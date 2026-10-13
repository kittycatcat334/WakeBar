import React from 'react';

interface WakebarLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
}

export const SunGlyph: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Sun semi-circle */}
    <path
      d="M17 18C17 14.134 20.134 11 24 11C27.866 11 31 14.134 31 18H17Z"
      fill="currentColor"
    />
    {/* Sun rays */}
    <path
      d="M24 3V7M16 6L18 9M32 6L30 9M9 12L13 14M39 12L35 14M7 18H13M35 18H41"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Horizon line */}
    <path
      d="M4 22H44"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const WakebarLogo: React.FC<WakebarLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  light = true,
}) => {
  const textColor = light ? 'text-[#FAF5EE]' : 'text-[#1E110C]';
  const sunColor = 'text-[#E58B24]';

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl md:text-5xl',
  }[size];

  const glyphSize = {
    sm: 'w-7 h-3.5',
    md: 'w-9 h-4.5',
    lg: 'w-11 h-5.5',
    xl: 'w-14 h-7',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Sun glyph positioned directly above */}
      <SunGlyph className={`${glyphSize} ${sunColor} -mb-1`} />
      
      {/* Brand wordmark */}
      <span className={`font-serif tracking-tight font-bold ${textSize} ${textColor}`}>
        Wakebar
      </span>

      {showTagline && (
        <span className="text-[10px] md:text-xs tracking-[0.22em] uppercase font-sans font-medium text-[#C4B29E] mt-0.5">
          Focus · Energy · Chocolate
        </span>
      )}
    </div>
  );
};
