import type { ButtonProps } from './Button';
import { Button } from './Button';
import { exampleThemeStorage } from '@extension/storage';

type ToggleButtonProps = ButtonProps;

export const ToggleButton = ({ className, children, ...props }: ToggleButtonProps) => {
  return (
    <Button className={className + 'font-bold mt-4'} onClick={exampleThemeStorage.toggle} {...props}>
      {children}
    </Button>
  );
};
