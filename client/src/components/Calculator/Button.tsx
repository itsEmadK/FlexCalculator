import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'digit' | 'operator' | 'function' | 'equals';
  span?: 'single' | 'double';
  active?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'digit',
  span = 'single',
  active = false
}: ButtonProps) {
  const baseStyles = "calculator-button text-lg font-medium rounded p-3 transition-colors focus:outline-none active:scale-[0.97]";
  
  const variantStyles = {
    'digit': "bg-gray-100 text-gray-900 hover:bg-gray-200",
    'operator': active 
      ? "bg-blue-700 text-white" 
      : "bg-primary text-white hover:bg-primary-600",
    'function': "bg-secondary-100 text-primary hover:bg-secondary-200",
    'equals': "bg-blue-700 text-white hover:bg-blue-800"
  };
  
  const spanStyles = {
    'single': "col-span-1",
    'double': "col-span-2"
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        spanStyles[span]
      )}
    >
      {children}
    </button>
  );
}
