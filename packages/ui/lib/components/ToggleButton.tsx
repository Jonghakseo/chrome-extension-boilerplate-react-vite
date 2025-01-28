import type { ButtonProps } from './Button';
import { Button } from './Button';
import { exampleThemeStorage } from '@extension/storage';
import { useStorage } from '@extension/shared';
import { cn } from '../utils';

type ToggleButtonProps = ButtonProps;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <Button
      className={cn(className, theme === 'light' ? 'border-black' : 'border-white', 'mt-4 border-2 font-bold')}
      onClick={exampleThemeStorage.toggle}
      {...props}>
      {children}
    </Button>
  );
};
