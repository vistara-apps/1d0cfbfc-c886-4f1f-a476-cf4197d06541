import { cn } from '../../lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className,
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-text-primary hover:bg-gray-200',
    outline: 'border border-gray-300 text-text-primary hover:bg-gray-50',
    ghost: 'text-text-primary hover:bg-gray-100',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
}
