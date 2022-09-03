import { By, ThenableWebDriver } from "selenium-webdriver";

export type Props = {
  driver: ThenableWebDriver;
};
export const acceptCookies = async ({ driver }: Props) => {
  let acceptCookiesButton = await driver.findElement(
    By.xpath('//*[@id="cmpwelcomebtnyes"]/a')
  );
  await acceptCookiesButton.sendKeys(" ");
};
