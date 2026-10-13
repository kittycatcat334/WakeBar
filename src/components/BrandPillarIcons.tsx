import React from 'react';
import { Brain, Zap, Smile, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

interface PillarIconProps {
  type: string;
  className?: string;
}

export const PillarIcon: React.FC<PillarIconProps> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'brain':
    case 'focus':
      return <Brain className={className} strokeWidth={1.75} />;
    case 'lightning':
    case 'energy':
      return <Zap className={className} strokeWidth={1.75} />;
    case 'smile':
    case 'jitters':
      return <Smile className={className} strokeWidth={1.75} />;
    case 'leaf':
    case 'ingredients':
      return <Leaf className={className} strokeWidth={1.75} />;
    case 'sparkle':
      return <Sparkles className={className} strokeWidth={1.75} />;
    default:
      return <ShieldCheck className={className} strokeWidth={1.75} />;
  }
};
