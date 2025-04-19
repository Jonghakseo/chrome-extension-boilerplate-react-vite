import { colorfulLog } from '@extension/shared';
import { processCLIArgs } from './lib/cliArgsProcessor.js';
import runModuleManager from './lib/runModuleManager.js';

const cliOptions = processCLIArgs();

if (cliOptions && cliOptions.targets) {
  for (const moduleName of cliOptions.targets) {
    colorfulLog(`Processing module: ${moduleName}`, 'info');
    void runModuleManager(moduleName, cliOptions.action);
  }
} else {
  void runModuleManager();
}
