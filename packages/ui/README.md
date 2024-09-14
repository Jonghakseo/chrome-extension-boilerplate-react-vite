# UI Package

This package provides components that make up the UI.

## Installation

First, move to the page you want to use.

```shell
cd pages/options
```

Add the following to the dependencies in `package.json`.

```json
{
  "dependencies": {
    "@extension/ui": "workspace:*"
  }
}
```

Then, run `pnpm install`.

```shell
pnpm install
```

Add the following to the `tailwind.config.ts` file.

```ts
import baseConfig from '@extension/tailwindcss-config';
import { withUI } from '@extension/ui';

export default withUI({
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
});
```

Add the following to the `index.tsx` file.

```tsx
import '@extension/ui/dist/global.css';
```

## Add Component

Add the following to the `lib/components/index.ts` file.

```tsx
export * from './Button';
```

Add the following to the `lib/components/Button.tsx` file.

```tsx
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';

export type ButtonProps = {
  theme?: 'light' | 'dark';
} & ComponentPropsWithoutRef<'button'>;

export function Button({ theme, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        className,
        'mt-4 py-1 px-4 rounded shadow hover:scale-105',
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white',
      )}
      {...props}>
      {children}
    </button>
  );
}
```

## Usage

```tsx
import { Button } from '@extension/ui';

export default function ToggleButton() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button theme={theme} onClick={toggle}>
      Toggle
    </Button>
  );
}
```

## Modifying the tailwind config of the UI library

Modify the `tailwind.config.ts` file to make global style changes to the package.

## Modifying the css variable of the UI library

Modify the css variable in the `ui/lib/global.css` code to change the css variable of the package.

## Guide for Adding shadcn to the UI Package

1. Create components.json in packages/ui

Create a file named `components.json` in the `packages/ui` directory with the following content:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "lib/global.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/lib/components",
    "utils": "@/lib/utils",
    "ui": "@/lib/components/ui",
    "lib": "@/lib"
  }
}
```

2. Create `tailwind.config.ts` in packages/ui

Create a file named `tailwind.config.ts` in the `packages/ui` directory with the following content:


3. Update `tsconfig.json` in packages/ui

Add the following configuration to the tsconfig.json file in the packages/ui directory:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

4. Update `package.json` in packages/ui

Add the following dependencies to the `package.json` file in the `packages/ui` directory:

```json
{
  "devDependencies": {
    "@extension/tailwindcss-config": "workspace:*",
  }
}
```

5. Install dependencies

Run the following command from the root of your project:
    
```shell
pnpm install
```

6. Add shadcn components

Finally, run this command from the root of your project to add the button component:

```shell
pnpm dlx shadcn@latest add button -c ./packages/ui
```

This will add the shadcn button component to your UI package.

Remember to adjust any paths or package names if your project structure differs from the assumed layout in this guide. 
