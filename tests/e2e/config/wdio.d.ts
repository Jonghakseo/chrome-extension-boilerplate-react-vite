declare namespace WebdriverIO {
  interface Browser extends WebdriverIO.Browser {
    getExtensionPath: () => Promise<string>;
    installAddOn: (extension: string, temporary: boolean) => Promise<void>;
    addCommand: (name: string, func: () => Promise<string>) => void;
  }
}
