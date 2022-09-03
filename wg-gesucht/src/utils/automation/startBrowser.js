let { Builder } = require("selenium-webdriver");

export let startBrowser = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  return driver;
};
