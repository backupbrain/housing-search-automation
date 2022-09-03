import { By } from "selenium-webdriver";

export let sendMessage = async (driver) => {
  // 150 char limit!
  // const messageInput = await driver.findElement(By.id("message_input"));
  // await messageInput.sendKeys(message);

  const sendButton = await driver.findElement(
    By.xpath(
      '//form[@id="messenger_form"]/div/div[5]/button[contains(@class,"create_new_conversation")]'
    )
  );
  await driver.executeScript("return arguments[0].click()", sendButton);
  await delaySeconds(3, 5);
  // // go back to message input
  // await driver.executeScript("history.back()");
  // // go back to listing
  // await driver.executeScript("history.back()");
  // // go back to list
  // await driver.executeScript("history.back()");
};
