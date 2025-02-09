import { exampleThemeStorage } from '@extension/storage';
import { useStorage } from '@extension/shared';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type ToggleButtonProps = ComponentPropsWithoutRef<'button'>;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <button
      className={cn(
        className,
        'py-1 px-4 rounded shadow hover:scale-105',
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white',
        theme === 'light' ? 'border-black' : 'border-white',
        'mt-4 border-2 font-bold',
      )}
      onClick={exampleThemeStorage.toggle}
      {...props}>
      {children}
    </button>
  );
};
