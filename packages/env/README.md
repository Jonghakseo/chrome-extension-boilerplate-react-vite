# Environment Package

This package contains code which creates env object.
To use the code in the package, you need to follow those steps:

1. Add a new record to `.env` (NEED TO CONTAIN `CEB_` PREFIX),

    - If you want via cli:
    - Add it as argument like: `pnpm set-global-env CLI_CEB_NEXT_VALUE=new_data ...` (NEED TO CONTAIN `CLI_CEB_` PREFIX)

   > [!IMPORTANT]
   > `CLI_CEB_DEV` and `CLI_CEB_FIREFOX` are `false` by default \
   > All CLI values are overwriting in each call, that's mean you'll have access to values from current script run only.

    - If you want dynamic variables go to `lib/index.ts` and edit `dynamicEnvValues` object.

2. Go to: `packages/env/lib/types.ts` and add new value to `ICebEnv` or `ICebCliEnv` (Not necessary for dynamic values).

3. Add the following to the package.json file.

    ```json
    {
      "dependencies": {
        "@extension/env": "workspace:*"
      }
    }
    ```

4. Import:
    ```ts
    import { env } from '@extension/env';
    ```

5. Use it:
    ```ts
    console.log(env.CEB_EXAMPLE);
    ```