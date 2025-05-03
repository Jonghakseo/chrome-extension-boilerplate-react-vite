import { colorfulLog, sleep } from '@extension/shared';
import { processCLIArgs, runModuleManager } from './lib/index.js';

const cliOptions = processCLIArgs();

if (cliOptions) {
  const targets = cliOptions.targets;
  (async () => {
    for (const moduleName of targets) {
      colorfulLog(`Processing module: ${moduleName}`, 'info');
      const isLastIndex = targets.at(-1) === moduleName;
      await runModuleManager(moduleName, cliOptions.action, isLastIndex);
      await sleep(500);
    }
  })();
} else {
  void runModuleManager();
}
