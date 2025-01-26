import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';
import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export const Button = ({ className, children, ...props }: ButtonProps) => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <button
      className={cn(
        className,
        'py-1 px-4 rounded shadow hover:scale-105',
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white',
      )}
      {...props}>
      {children}
    </button>
  );
};
