import React, { useState, useEffect } from 'react';
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
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [hasExhausted, setHasExhausted] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setAttemptIndex(0);
    setHasExhausted(false);
  }, [src]);

  const handleError = () => {
    if (attemptIndex === 0) {
      // Attempt 1: Try fallbackSrc if provided
      if (fallbackSrc && fallbackSrc !== currentSrc) {
        setAttemptIndex(1);
        setCurrentSrc(fallbackSrc);
        return;
      }
      // If fallbackSrc was relative './images', try root '/images/' or vice versa
      const cleanName = currentSrc.split('/').pop()?.split('?')[0] || '';
      if (cleanName) {
        setAttemptIndex(1);
        setCurrentSrc(`./images/${cleanName}`);
        return;
      }
    } else if (attemptIndex === 1) {
      // Attempt 2: Try with absolute path /images/
      const cleanName = currentSrc.split('/').pop()?.split('?')[0] || '';
      if (cleanName && !currentSrc.startsWith('/images/')) {
        setAttemptIndex(2);
        setCurrentSrc(`/images/${cleanName}`);
        return;
      }
    }
    // All fallbacks exhausted, show brand visual
    setHasExhausted(true);
  };

  if (hasExhausted) {
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
