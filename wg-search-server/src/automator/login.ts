import { By } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";
import { delayForSeconds } from "./delayForSeconds";

export type Props = {
  driver: Driver;
  email: string;
  password: string;
};
export const login = async ({ driver, email, password }: Props) => {
  let menu = await driver.findElement(By.id("burger_toggle"));
  await driver.executeScript("return arguments[0].scrollIntoView()", menu);
  await driver.executeScript("return arguments[0].click()", menu);
  await delayForSeconds(2, 3);

  let registerLink = await driver.findElement(
    By.xpath('//div[contains(@class,"drawer_content")]/a[7]')
  );
  await driver.executeScript("return arguments[0].click()", registerLink);
  await registerLink.getText();
  await delayForSeconds(2, 3);

  let emailInput = await driver.findElement(By.id("login_email_username"));
  await driver.executeScript("return arguments[0].focus()", emailInput);
  await emailInput.clear();
  await emailInput.sendKeys(email);
  await delayForSeconds(2, 3);
  let passwordInput = await driver.findElement(By.id("login_password"));
  await driver.executeScript("return arguments[0].focus()", passwordInput);
  await passwordInput.clear();
  await passwordInput.sendKeys(password);
  await delayForSeconds(2, 3);

  let loginButton = await driver.findElement(By.id("login_submit"));
  await driver.executeScript("return arguments[0].click()", loginButton);
  await delayForSeconds(3, 5);
};
