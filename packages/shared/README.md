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

## Additional Information

`utils/shared-types.ts` contains the types from `type-fest` package.