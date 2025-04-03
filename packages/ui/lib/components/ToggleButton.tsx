import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type ToggleButtonProps = ComponentPropsWithoutRef<'button'>;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  const { isLight } = useStorage(exampleThemeStorage);

  return (
    <button
      className={cn(
        'py-1 px-4 rounded shadow hover:scale-105 mt-4 border-2 font-bold',
        isLight ? 'bg-white border-black text-black' : 'bg-black text-white border-white',
        className,
      )}
      onClick={exampleThemeStorage.toggle}
      {...props}>
      {children}
    </button>
  );
};
