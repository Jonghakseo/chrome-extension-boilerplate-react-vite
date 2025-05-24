# Module manager

Module manager is a tool to manage modules in a project. It can be used to delete or recover some pages.

## Usage

### On Root

```bash
$ pnpm module-manager
```

OR

```bash
pnpm module-manager -d popup
```

### On Module

```bash
$ pnpm start
```

OR

```bash
pnpm start -d popup
```

> [!NOTE]  
> For complete info about CLI support run:
> `pnpm module-manager --help`

> [!IMPORTANT]
> If you want to remove all tests, and something else with one command, you need to set `tests` as first argument like:
> `pnpm module-manager -d tests popup ...`

### Choose a tool

```
? Choose a tool (Use arrow keys)
❯ Delete Feature
  Recover Feature
```

## How it works

### Delete Feature

When you select an unused module, Module Manager compresses the contents of that folder, takes a snapshot of it, and removes it.

It also automatically removes anything that needs to be cleared from the manifest.

### Recover Feature

When you select a module that has been deleted, The Module Manager will recover that module from the snapshot and add it back to the manifest.

> [!IMPORTANT]  
> SAVE ALL FILES FROM /ARCHIVE, WITHOUT THESE FILES' RECOVERING PROCESS WON'T WORK

> [!IMPORTANT]  
> IF YOU DECIDE TO REMOVE ONE OF CONTENT SCRIPTs AFTER EDIT, E.G YOU REMOVE OR ADD ANY MATCHES,
> REMEMBER TO EDIT ALSO [MODULE_CONFIG](./lib/const.ts) TO BE ABLE TO RECOVER IT EASILY IN THE FUTURE. 
