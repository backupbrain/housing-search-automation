import { By } from "selenium-webdriver";
import { saveEnrichedOffers } from "../database/saveEnrichedOffers";
import { delaySeconds } from "../delaySeconds";
import { areMorePagesAvailable } from "./areMorePagesAvailable";
import { clickNextButton } from "./clickNextButton";
import { getOfferData } from "./getOfferData";

export let scrapeOffers = async (driver) => {
  // let listItem = listItems[0];
  let currentPage = 1;
  let offers = [];
  let morePagesAvailable = await areMorePagesAvailable(driver);
  while (morePagesAvailable) {
    let mainList = await driver.findElement(By.id("main_column"));
    let listItems = await mainList.findElements(
      By.xpath('//div[contains(@class,"offer_list_item")]')
    );
    for (let listItem of listItems) {
      let offerData = await getOfferData(driver, listItem);
      offers.push(offerData);
      saveEnrichedOffers(offers);
      await delaySeconds(1, 3);
    }
    morePagesAvailable = await areMorePagesAvailable(driver);
    if (morePagesAvailable) {
      await clickNextButton(driver);
      morePagesAvailable = true;
      currentPage += 1;
      console.log(`page ${currentPage}`);
      await delaySeconds(3, 7);
    }
  }
};
