# Module manager

Module manager is a tool to manage modules in a project. It can be used to delete or recover some pages.

## Usage

### On Root

```bash
$ pnpm module-manager
```

### On Module

```bash
$ pnpm start
```

### Choose a tool

```
? Choose a tool (Use arrow keys)
❯ Delete Feature
  Recover Feature
```

## How it works

### Delete Feature

When you select an unused module, Module Manager compresses the contents of that folder, takes a snapshot of it, and removes it. It also automatically removes anything that needs to be cleared from the manifest.

### Recover Feature

When you select a module that has been deleted, Module Manager will recover the module from the snapshot and add it back to the manifest.
