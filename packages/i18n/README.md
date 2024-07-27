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

### locales/en/messages.json

```json
{
  "helloWorld": {
    "message": "Hello, World!"
  }
}
```

### locales/ko/messages.json

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

### locales/en/messages.json

```json
{
  "helloAnd": {
    "message": "Hello, $1 $2"
  }
}
```

### locales/ko/messages.json

```json
{
  "helloAnd": {
    "message": "안녕하세요, $1 $2"
  }
}
```


## Usage

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

If you want to use placeholders, you can pass the second argument as a string or an array.

```typescript
import { t } from '@extension/i18n';

console.log(t('helloWorld')); // Hello, World!
console.log(t('helloAnd', 'World')); // Hello, World
console.log(t('helloAnd', ['World', "~!"])); // Hello, World~!
```

If you want to show specific language, you can set the `devLocale` property. (only for development)

```typescript
import { t } from '@extension/i18n';

t.devLocale = "ko";

console.log(t('helloWorld')); // 안녕하세요, 여러분!
```
