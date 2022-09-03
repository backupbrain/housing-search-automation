import { By } from "selenium-webdriver";

export let clickNextButton = async (driver) => {
  let lastNavigationButton = await driver.findElement(
    By.xpath('//a[contains(@class,"next")]')
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
    lastNavigationButton
  );
  await driver.executeScript(
    "return arguments[0].click()",
    lastNavigationButton
  );
};
