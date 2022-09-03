import { By } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";

export type Props = {
  driver: Driver;
};
export const goTopPeviousPage = async ({ driver }: Props) => {
  let prevPageLink = await driver.findElement(
    By.xpath('//a[contains(@class,"prev")]')
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView()",
    prevPageLink
  );
  await driver.executeScript("return arguments[0].click()", prevPageLink);
};
