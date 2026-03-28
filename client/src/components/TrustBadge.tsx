import React from 'react';
import { Shield, DollarSign, CheckCircle } from 'lucide-react';

interface TrustBadgeProps {
  type: 'no-fees' | 'lowest-price' | 'verified';
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const badgeConfig = {
  'no-fees': {
    icon: DollarSign,
    title: 'No Booking Fees',
    description: 'Save up to 15% vs. Airbnb/VRBO',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    accentColor: 'bg-emerald-100',
  },
  'lowest-price': {
    icon: Shield,
    title: 'Lowest Price Guarantee',
    description: 'Best rate when you book direct',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    accentColor: 'bg-amber-100',
  },
  'verified': {
    icon: CheckCircle,
    title: 'Verified Property',
    description: 'Professional management & quality assured',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    accentColor: 'bg-blue-100',
  },
};

const sizeConfig = {
  small: {
    container: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3',
  },
  medium: {
    container: 'px-3 py-2 text-sm',
    icon: 'w-4 h-4',
  },
  large: {
    container: 'px-4 py-3 text-base',
    icon: 'w-5 h-5',
  },
};

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  type,
  size = 'medium',
  showText = true,
}) => {
  const config = badgeConfig[type];
  const sizeClass = sizeConfig[size];
  const Icon = config.icon;

  if (!showText && size === 'small') {
    return (
      <div
        className={`inline-flex items-center justify-center ${sizeClass.container} rounded-full ${config.accentColor} border ${config.borderColor}`}
        title={config.title}
      >
        <Icon className={`${sizeClass.icon} ${config.textColor}`} />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 ${sizeClass.container} rounded-lg border ${config.borderColor} ${config.bgColor}`}
    >
      <Icon className={`${sizeClass.icon} ${config.textColor} flex-shrink-0`} />
      <div className="flex flex-col">
        <span className={`font-semibold ${config.textColor}`}>{config.title}</span>
        {size !== 'small' && (
          <span className={`text-xs ${config.textColor} opacity-75`}>
            {config.description}
          </span>
        )}
      </div>
    </div>
  );
};

export const TrustBadgesRow: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({
  size = 'medium',
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
      <TrustBadge type="no-fees" size={size} />
      <TrustBadge type="lowest-price" size={size} />
      <TrustBadge type="verified" size={size} />
    </div>
  );
};
