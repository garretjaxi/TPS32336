import React from 'react';

interface CurvedDividerProps {
  variant?: 'wave' | 'diagonal' | 'curve';
  className?: string;
  flip?: boolean;
}

export const CurvedDivider: React.FC<CurvedDividerProps> = ({ 
  variant = 'wave', 
  className = '',
  flip = false 
}) => {
  const baseClasses = `w-full h-20 md:h-32 ${className}`;
  
  if (variant === 'wave') {
    return (
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        className={`${baseClasses} ${flip ? 'rotate-180' : ''}`}
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  
  if (variant === 'diagonal') {
    return (
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        className={`${baseClasses} ${flip ? 'rotate-180' : ''}`}
      >
        <polygon
          points="0,0 1200,120 1200,120 0,120"
          fill="currentColor"
        />
      </svg>
    );
  }
  
  // curve variant
  return (
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
      className={`${baseClasses} ${flip ? 'rotate-180' : ''}`}
    >
      <path
        d="M0,30 Q300,80 600,30 T1200,30 L1200,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CurvedDivider;
