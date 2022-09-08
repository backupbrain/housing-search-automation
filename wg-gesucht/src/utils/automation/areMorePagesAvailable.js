let { By } = require("selenium-webdriver");

export let areMorePagesAvailable = async (driver) => {
  let morePagesAvailable = false;
  try {
    await driver.findElement(By.xpath('//a[contains(@class,"next")]'));
    morePagesAvailable = true;
  } catch (error) {}
  return morePagesAvailable;
};
