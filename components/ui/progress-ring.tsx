'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
}

const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      value,
      max,
      size = 200,
      strokeWidth = 12,
      showValue = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = Math.min(Math.max(value / max, 0), 1);
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-blue-600 dark:text-blue-400 transition-all duration-300 ease-in-out"
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }
);
ProgressRing.displayName = 'ProgressRing';

export { ProgressRing };
