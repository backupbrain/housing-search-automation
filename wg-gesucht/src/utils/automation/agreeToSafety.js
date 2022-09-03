import { By } from "selenium-webdriver";
import { doesElementExist } from "./doesElementExist";

export let agreeToSafety = async (driver) => {
  let doesButtonExist = await doesElementExist(
    driver,
    '//input[@id="sicherheit_bestaetigung"]'
  );
  if (doesButtonExist) {
    let safetyAgreeButton = await driver.findElement(
      By.id("sicherheit_bestaetigung")
    );
    await driver.executeScript(
      "return arguments[0].click()",
      safetyAgreeButton
    );
  }
};
