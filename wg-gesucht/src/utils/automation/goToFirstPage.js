import { By } from "selenium-webdriver";

export let goToFirstPage = async (driver) => {
  let navigationButtons = await driver.findElements(
    By.xpath('//a[contains(@class,"page-link")]')
  );
  let firstPage = navigationButtons[1];
  await driver.executeScript(
    "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
    firstPage
  );
  await driver.executeScript("return arguments[0].click()", firstPage);
};
