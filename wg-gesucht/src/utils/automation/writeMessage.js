import { By } from "selenium-webdriver";

export let writeMessage = async (driver, message) => {
  // let contactButton = await driver.findElement(By.id("mailform"));
  // await driver.executeScript(
  //   "return arguments[0].scrollIntoView()",
  //   contactButton
  // );
  // await driver.executeScript("return arguments[0].click()", contactButton);

  // 150 char limit!
  const messageInput = await driver.findElement(By.id("message_input"));
  await messageInput.clear();
  await messageInput.sendKeys(message);
};
