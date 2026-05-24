import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ glow, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`glass rounded-2xl p-4 ${glow ? 'animate-pulse-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
