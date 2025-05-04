import { cn } from '@/lib/utils';
import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';

type ToggleButtonProps = ComponentPropsWithoutRef<'button'>;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  const { isLight } = useStorage(exampleThemeStorage);

  return (
    <button
      className={cn(
        'mt-4 rounded border-2 px-4 py-1 font-bold shadow hover:scale-105',
        isLight ? 'border-black bg-white text-black' : 'border-white bg-black text-white',
        className,
      )}
      onClick={exampleThemeStorage.toggle}
      {...props}>
      {children}
    </button>
  );
};
