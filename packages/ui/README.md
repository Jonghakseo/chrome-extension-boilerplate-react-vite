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
import '@extension/ui/lib/global.css';
```

## Add Custom Component

Add the following to the `lib/components/index.ts` file.

```tsx
export * from './CustomComponent.js';
```

Add the following to the `lib/components/CustomComponent.tsx` file.

```tsx
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils.js';

type CustomComponentProps = ComponentPropsWithoutRef<'section'>;

export function CustomComponent({ children, ...props }: CustomComponentProps) {
  return <section {...props}>{children}</section>;
}
```

## Usage

```tsx
import { CustomComponent } from '@extension/ui';

export default function Page() {
  return <CustomComponent>Hi, I'm a custom component.</CustomComponent>;
}
```

## Modifying the tailwind config of the UI library

Modify the `tailwind.config.ts` file to make global style changes to the package.

## Modifying the css variable of the UI library

Modify the css variable in the `ui/lib/global.css` code to change the css variable of the package.

## Guide for Adding shadcn to the UI Package

You can refer to the this [manual guide](https://ui.shadcn.com/docs/installation/manual)

1. Create components.json in packages/ui

Create a file named `components.json` in the `packages/ui` directory with the following content:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "lib/global.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/lib/components",
    "utils": "@/lib/utils",
    "ui": "@/lib/components/ui",
    "lib": "@/lib",
    "hooks": "@/lib/hooks"
  },
  "iconLibrary": "lucide"
}
```

2. Install dependencies

Run the following command from the root of your project:

```shell
pnpm add tailwindcss-animate class-variance-authority tailwind-merge lucide-react -F ui
```

3. Edit `withUI.ts` in `lib` folder

This configuration file is from the manual guide. You can refer to the manual guide to modify the configuration file. ([
`Configure tailwind.config.js`](https://ui.shadcn.com/docs/installation/manual))

```ts
import deepmerge from 'deepmerge';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindAnimate from 'tailwindcss-animate';

export function withUI(tailwindConfig: Config): Config {
  return deepmerge(
    shadcnConfig,
    deepmerge(tailwindConfig, {
      content: ['./node_modules/@extension/ui/lib/**/*.{tsx,ts,js,jsx}'],
    }),
  );
}

const shadcnConfig = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindAnimate],
};
```

4. Edit `global.css` in `lib` folder

This configuration also comes from the manual guide. You can refer to the manual guide to modify the configuration
file. ([`Configure styles`](https://ui.shadcn.com/docs/installation/manual))

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :host, :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
    --ring: 215 20.2% 65.1%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;
    --border: 216 34% 17%;
    --input: 216 34% 17%;
    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --ring: 216 34% 17%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans antialiased bg-background text-foreground;
  }
}
```

5. Add shadcn components

Finally, run this command from the root of your project to add the button component:

```shell
pnpm dlx shadcn@latest add button -c ./packages/ui
```

This will add the shadcn button component to your UI package.

Remember to adjust any paths or package names if your project structure differs from the assumed layout in this guide.

6. Export components

Edit the `index.ts` file in the `packages/ui` directory to export the shadcn ui component:

```ts
//...
export * from './lib/components/ui/button';
```

7. Apply global.css

If you want to use shadcn components in content-ui ShadowDOM, you need to import ui package's global.css in the content-ui `tailwind-input.css`

```css
@import '@extension/ui/lib/global.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

If you want to use shadcn components in other pages, you need to import ui package's global.css in the `src/index.css`

```css
@import '@extension/ui/lib/global.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```
