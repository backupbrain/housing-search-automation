import { By } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";

export type Props = {
  driver: Driver;
};
export const goToFirstPage = async ({ driver }: Props) => {
  let navigationButtons = await driver.findElements(
    By.xpath('//a[contains(@class,"page-link")]')
  );
  let firstPage = navigationButtons[1];
  await driver.executeScript("return arguments[0].scrollIntoView()", firstPage);
  await driver.executeScript("return arguments[0].click()", firstPage);
};
