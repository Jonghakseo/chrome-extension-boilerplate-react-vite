import { colorfulLog } from '@extension/shared';
import { processCLIArgs } from './lib/cliArgsProcessor.js';
import runModuleManager from './lib/runModuleManager.js';

const cliOptions = processCLIArgs();

if (cliOptions) {
  const targets = cliOptions.targets;
  for (const moduleName of targets) {
    colorfulLog(`Processing module: ${moduleName}`, 'info');
    const isLastIndex = targets.at(-1) === moduleName;
    void runModuleManager(moduleName, cliOptions.action, isLastIndex);
  }
} else {
  void runModuleManager();
}
