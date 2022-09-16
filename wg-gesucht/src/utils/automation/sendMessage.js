import { By } from "selenium-webdriver";
import { doesElementExist } from "./doesElementExist";

export let sendMessage = async (driver) => {
  // 150 char limit!
  // const messageInput = await driver.findElement(By.id("message_input"));
  // await messageInput.sendKeys(message);
  const sendButtonXpath =
    '//form[@id="messenger_form"]/div/div[5]/button[contains(@class,"create_new_conversation")]';
  const doesSendButtonExist = await doesElementExist(driver, sendButtonXpath);
  if (!doesSendButtonExist) {
    return;
  }
  const sendButton = await driver.findElement(By.xpath(sendButtonXpath));
  await driver.executeScript("return arguments[0].click()", sendButton);
  await delaySeconds(3, 5);
  // // go back to message input
  // await driver.executeScript("history.back()");
  // // go back to listing
  // await driver.executeScript("history.back()");
  // // go back to list
  // await driver.executeScript("history.back()");
};
