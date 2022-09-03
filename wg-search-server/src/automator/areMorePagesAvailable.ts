import { By } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";

export type Props = {
  driver: Driver;
};
export const areMorePagesAvailable = async ({ driver }: Props) => {
  let morePagesAvailable = false;
  try {
    await driver.findElement(By.xpath('//a[contains(@class,"next")]'));
    morePagesAvailable = true;
  } catch (error) {}
  return morePagesAvailable;
};
