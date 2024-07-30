# I18n Package

This package provides a set of tools to help you internationalize your Chrome Extension.

https://developer.chrome.com/docs/extensions/reference/api/i18n

## Installation

If you want to use the i18n translation function in each pages, you need to add the following to the package.json file.

```json
{
  "dependencies": {
    "@extension/i18n": "workspace:*"
  }
}
```

Then run the following command to install the package.

```bash
pnpm install
```

## Manage translations

You can manage translations in the `locales` directory.

`locales/en/messages.json`

```json
{
  "helloWorld": {
    "message": "Hello, World!"
  }
}
```

`locales/ko/messages.json`

```json
{
  "helloWorld": {
    "message": "안녕하세요, 여러분!"
  }
}
```

If you want to use placeholders, you can use the following format.

https://developer.chrome.com/docs/extensions/how-to/ui/localization-message-formats#placeholders

> [!Caution]
> You should use placeholders in this format: `$1`, `$2`, `$3`, ... $/d+
> Still, We don't support the placeholders field in the `messages.json` file.

`locales/en/messages.json`

```json
{
  "helloAnd": {
    "message": "Hello, $1 $2"
  }
}
```

`locales/ko/messages.json`

```json
{
  "helloAnd": {
    "message": "안녕하세요, $1 $2"
  }
}
```

## Delete or Add a new language

When you want to delete or add a new language, you don't need to edit some util files like `lib/types.ts` or `lib/getMessageFromLocale.ts`. 
That's because we provide a script to generate util files automatically by the `generate-i18n.mjs` file.

Following the steps below to delete or add a new language.

### Delete a language

If you want to delete unused languages, you can delete the corresponding directory in the `locales` directory.

```
locales
├── en
│   └── messages.json
└── ko // delete this directory
    └── messages.json 
```

Then run the following command. (or just run `pnpm dev` or `pnpm build` on root)

```bash
pnpm genenrate-i8n
```

### Add a new language

If you want to add a new language, you can create a new directory in the `locales` directory.

```
locales
├── en
│   └── messages.json
├── ko
│   └── messages.json
└── ja // create this directory
    └── messages.json // and create this file 
```

Then same as above, run the following command. (or just run `pnpm dev` or `pnpm build` on root)

```bash
pnpm genenrate-i8n
```


## Usage

### Translation function

Just import the `t` function and use it to translate the key.

```typescript
import { t } from '@extension/i18n';

console.log(t('helloWorld')); // Hello, World!
```

```typescript jsx
import { t } from '@extension/i18n';

const Component = () => {
  return (
    <div>
      {t('helloWorld')} // Hello, World!
    </div>
  );
};
```

### Placeholders

If you want to use placeholders, you can pass the second argument as a string or an array.

```typescript
import { t } from '@extension/i18n';

console.log(t('helloWorld')); // Hello, World!
console.log(t('helloAnd', 'World')); // Hello, World
console.log(t('helloAnd', ['World', "~!"])); // Hello, World ~!
```

If you want to show specific language, you can set the `devLocale` property. (only for development)

```typescript
import { t } from '@extension/i18n';

t.devLocale = "ko";

console.log(t('helloWorld')); // 안녕하세요, 여러분!
```

### Type Safety

When you forget to add a key to all language's `messages.json` files, you will get a Typescript error.

`locales/en/messages.json`

```json
{
  "hello": {
    "message": "Hello World!"
  }
}
```

`locales/ko/messages.json`

```json
{
  "helloWorld": {
    "message": "안녕하세요, 여러분!"
  }
}
```

```typescript
import { t } from '@extension/i18n';

// Error: TS2345: Argument of type "hello" is not assignable to parameter of type
console.log(t('hello'));
```