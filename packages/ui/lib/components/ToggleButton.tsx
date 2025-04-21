import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type ToggleButtonProps = ComponentPropsWithoutRef<'button'>;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  const onClick = async () => {
    chrome.storage.local.get(['theme']).then(({ theme }) => {
      chrome.storage.local.set({
        theme: theme === 'dark' ? 'light' : 'dark',
      });
    });
  };

  return (
    <button
      className={cn(
        'py-1 px-4 rounded shadow hover:scale-105 bg-white text-black border-black mt-4 border-2 font-bold',
        'dark:bg-black dark:text-white dark:border-white',
        className,
      )}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
};
