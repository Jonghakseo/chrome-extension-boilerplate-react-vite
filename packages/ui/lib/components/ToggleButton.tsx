import { cn } from '@/lib/utils';
import { exampleThemeStorage } from '@extension/storage/lib';
import type { ComponentPropsWithoutRef } from 'react';

type ToggleButtonProps = ComponentPropsWithoutRef<'button'>;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  return (
    <button
      className={cn(
        'py-1 px-4 rounded shadow hover:scale-105 bg-white text-black border-black mt-4 border-2 font-bold',
        'dark:bg-black dark:text-white dark:border-white',
        className,
      )}
      onClick={exampleThemeStorage.toggle}
      {...props}>
      {children}
    </button>
  );
};
