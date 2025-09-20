import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-lg shadow-card',
        variant === 'outlined' && 'border border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
}
