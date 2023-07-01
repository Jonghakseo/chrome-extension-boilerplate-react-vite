// Do what you need to set up your test
console.log("setup test: jest.setup.js");

global.chrome = {
  i18n: {
    getMessage: (key) => {
      return key;
    },
  },
};
