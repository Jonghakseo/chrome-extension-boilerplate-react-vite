# Shared Package

This package contains code shared with other packages.
To use the code in the package, you need to add the following to the package.json file.

```json
{
  "dependencies": {
    "@chrome-extension-boilerplate/shared": "workspace:*"
  }
}
```

After building this package, real-time cache busting does not occur in the code of other packages that reference this package.
You need to rerun it from the root path with `pnpm dev`, etc. (This will be improved in the future.)

If the type does not require compilation, there is no problem, but if the implementation requiring compilation is changed, a problem may occur.

Therefore, it is recommended to extract and use it in each context if it is easier to manage by extracting overlapping or business logic from the code that changes frequently in this package.
