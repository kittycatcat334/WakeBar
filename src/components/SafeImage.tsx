import React, { useState } from 'react';
import { SunGlyph } from './WakebarLogo';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  captionTitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  captionTitle,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else if (!triedFallback && src.startsWith('/assets/')) {
      // Try relative dot-slash fallback
      setTriedFallback(true);
      setCurrentSrc('.' + src);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-[#241510] via-[#1B0F0B] to-[#120806] border border-[#43251B] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-[#E58B24]/10 border border-[#E58B24]/30 flex items-center justify-center mb-3 text-[#E58B24]">
          <SunGlyph className="w-7 h-7" />
        </div>
        <span className="font-serif font-bold text-sm tracking-wide text-[#FAF5EE]">
          {captionTitle || 'Wakebar Chocolate'}
        </span>
        <span className="text-[11px] text-[#A69080] mt-1 max-w-[200px]">
          72% Single-Origin Dark Cacao · Functional Focus
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      decoding="async"
      className={className}
      {...rest}
    />
  );
};
