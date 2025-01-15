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

## Add a new language

Create folder inside `locales` with name from [languages](https://developer.chrome.com/docs/extensions/reference/api/i18n?hl=pl#support_multiple_languages), which need include `message.json` file.

## Usage

### Translation function

Just import the `t` function and use it to translate the key.

```typescript
import { t } from '@extension/i18n';

console.log(t('loading')); // Loading...
```

```typescript jsx
import { t } from '@extension/i18n';

const Component = () => {
  return (
    <button>
      {t('toggleTheme')} // Toggle Theme
    </button>
  );
};
```

### Placeholders

If you want to use placeholders, you can use the following format.

> For more information, see the [Message Placeholders](https://developer.chrome.com/docs/extensions/how-to/ui/localization-message-formats#placeholders) section.

`locales/en/messages.json`

```json
{
  "greeting": {
    "description": "Greeting message",
    "message": "Hello, My name is $NAME$",
    "placeholders": {
      "name": {
        "content": "$1",
        "example": "John Doe"
      }
    }
  },
  "hello": {
    "description": "Placeholder example",
    "message": "Hello $1"
  }
}
```

`locales/ko/messages.json`

```json
{
  "greeting": {
    "description": "인사 메시지",
    "message": "안녕하세요, 제 이름은 $NAME$입니다.",
    "placeholders": {
      "name": {
        "content": "$1",
        "example": "서종학"
      }
    }
  },
  "hello": {
    "description": "Placeholder 예시",
    "message": "안녕 $1"
  }
}
```

If you want to replace the placeholder, you can pass the value as the second argument.

Function `t` has exactly the same interface as the `chrome.i18n.getMessage` function.

```typescript
import { t } from '@extension/i18n';

console.log(t('greeting', 'John Doe')); // Hello, My name is John Doe
console.log(t('greeting', ['John Doe'])); // Hello, My name is John Doe

console.log(t('hello')); // Hello
console.log(t('hello', 'World')); // Hello World
console.log(t('hello', ['World'])); // Hello World
```

### Locale setting on development

If you want to enforce displaying specific language, you need to set `CEB_DEV_LOCALE` in `.env` file (work only for development).

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
