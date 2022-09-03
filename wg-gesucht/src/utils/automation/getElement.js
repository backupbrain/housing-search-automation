import { By } from "selenium-webdriver";

export let getElement = async (driver, xpath) => {
  try {
    return driver.findElement(By.xpath(xpath));
  } catch (error) {
    return undefined;
  }
};
