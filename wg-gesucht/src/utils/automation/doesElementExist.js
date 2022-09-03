import { By } from "selenium-webdriver";

export let doesElementExist = async (driver, xpath) => {
  try {
    let element = await driver.findElement(By.xpath(xpath));
    if (element.isDisplayed()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
