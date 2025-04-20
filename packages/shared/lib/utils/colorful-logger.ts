import { COLORS } from './const.js';
import type { ColorType, ValueOf } from './types.js';

export const colorfulLog = (message: string, type: ColorType) => {
  let color: ValueOf<typeof COLORS>;

  switch (type) {
    case 'success':
      color = COLORS.FgGreen;
      break;
    case 'info':
      color = COLORS.FgBlue;
      break;
    case 'error':
      color = COLORS.FgRed;
      break;
    case 'warning':
      color = COLORS.FgYellow;
      break;
    default:
      color = COLORS[type];
      break;
  }

  console.info(color, message);
  console.info(COLORS['Reset']);
};
