# Shared Package

This package contains code shared with other packages.
To use the code in the package, you need to add the following to the package.json file.

```json
{
  "dependencies": {
    "@extension/shared": "workspace:*"
  }
}
```

## Messaging

You can use messaging api to send/receive messages between context.

```typescript
import { messaging } from '@extension/shared';

// Send message
messaging.send('message', { data: 'data' });

// Receive message
messaging.on('message', (data) => {
  console.log(data);
});
```
