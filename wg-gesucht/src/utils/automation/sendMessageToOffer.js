import { By } from "selenium-webdriver";
import { delaySeconds } from "../delaySeconds";
import { translateEnglishToGerman } from "../processing/translate";
import { writeMessage } from "./writeMessage";

export let sendMessageToOffer = async (driver, row, potentialOffer) => {
  await driver.get(potentialOffer.url);
  // check if offer expired
  let offerExpiredAlert = await driver.findElement(
    By.xpath('//div[contains(@class,"alert-with-icon")]')
  );
  let hasOfferExpired = await offerExpiredAlert.isDisplayed();
  if (hasOfferExpired) {
    console.log(`Offer ${row + 1} expired`);
    potentialOffer.expired = true;
    return;
  }
  const messageButton = await driver.findElement(
    By.xpath(
      '//div[contains(@class,"rhs_contact_information")]' +
        '/div[2]/div/div/a[contains(@class,"wgg_orange")]'
    )
  );
  await driver.executeScript("return arguments[0].click()", messageButton);
  delaySeconds(1, 5);
  await agreeToSafety(driver);
  // BUGFIX: we lost the translation somehow
  if (!potentialOffer.demographics.englishOk) {
    potentialOffer.response.german = await translateEnglishToGerman(
      potentialOffer.response.english
    );
  }
  let messageToSend = undefined;
  if (potentialOffer.demographics.englishOk) {
    messageToSend = potentialOffer.response.english;
  } else if (potentialOffer.response.german) {
    messageToSend = potentialOffer.response.german;
  }
  if (messageToSend) {
    await writeMessage(driver, messageToSend);
  }
};
