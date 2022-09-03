import { By } from "selenium-webdriver";

export let goToPreviousPage = async (driver) => {
  let prevPageLink = await driver.findElement(
    By.xpath('//a[contains(@class,"prev")]')
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
    prevPageLink
  );
  await driver.executeScript("return arguments[0].click()", prevPageLink);
};
