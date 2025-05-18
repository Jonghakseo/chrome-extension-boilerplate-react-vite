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

Then, run:

```shell
pnpm install
```

Add the following to the `tailwind.config.ts` file.

```ts
import baseConfig from '@extension/tailwindcss-config';
import { withUI } from '@extension/ui';

export default withUI({
  ...baseConfig,
  content: ['./index.html', './src/**/*.tsx'],
});
```

Add the following to the first line of `index.css` file.

```css
@import '@extension/ui/global.css';
```

## Add Custom Component

Add the following to the `lib/components/index.ts` file.

```tsx
export * from './CustomComponent.js';
```

Add the following to the `lib/components/CustomComponent.tsx` file.

```tsx
import { cn } from '@/lib/utils.js';
import type { ComponentPropsWithoutRef } from 'react';

type CustomComponentProps = ComponentPropsWithoutRef<'section'>;

export const CustomComponent = ({ children, ...props }: CustomComponentProps) => {
  return <section {...props}>{children}</section>;
}
```

## Usage

```tsx
import { CustomComponent, ErrorDisplay, LoadingSpinner } from '@extension/ui';

const Page = () => {
  return <CustomComponent>Hi, I'm a custom component.</CustomComponent>;
}

export default withErrorBoundary(withSuspense(Page, <LoadingSpinner />), ErrorDisplay);

```

> [!TIP]
> You are able to set another size of the loading spinner by passing the `size` prop to the `<LoadingSpinner />`.

## Modifying the tailwind config of the UI library

Modify the `global.css` `@theme` section to edit tailwind config.

## Modifying the CSS variable of the UI library

Modify the CSS variable in the `global.css` code to change the CSS variable of all pages(with UI).

## Guide for Adding shadcn to the UI Package

1. Run `pnpm -F ui add class-variance-authority lucide-react tw-animate-css`
2. Add [Step 4](https://ui.shadcn.com/docs/installation/manual) to `global.css`.
3. Create `components.json` in that package root with the following content:
   ```json
   {
   "$schema": "https://ui.shadcn.com/schema.json",
   "style": "new-york",
   "rsc": false,
   "tsx": true,
   "tailwind": {
      "config": "",
      "css": "globals.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
   },
   "aliases": {
      "components": "@/lib/components",
      "utils": "@/lib/utils",
      "ui": "@/lib/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
      },
   "iconLibrary": "lucide"
   }
   ```
   
> [!NOTE]
> If you've changed the structure of this package, let's adjust `components.json`

## Guide for Adding shadcn components

1. Add shadcn component
    ```shell
    pnpm dlx shadcn@latest add button -c ./packages/ui
    ```

2. Export component
   - After first:
     - Create `index.ts` inside `lib/components/ui`
   - After each run:
     - Add
       ```ts
       export * from './your-component';
       ```
      in `lib/components/ui/index.ts` file.
