let { By } = require("selenium-webdriver");
import { saveEnrichedOffers } from "../database/saveEnrichedOffers";
import { delaySeconds } from "../delaySeconds";
import { areMorePagesAvailable } from "./areMorePagesAvailable";
import { clickNextButton } from "./clickNextButton";
import { enrichOffer } from "./enrichOffer";

export let scrapeEnrichedOffers = async (
  driver,
  visitedUrls,
  currentPage,
  enrichedOffers,
  minutesUntilBreak
) => {
  // let enrichedOffers = [];
  let onBreak = false;
  let isDone = false; // await areMorePagesAvailable(driver);
  // let currentPage = 1;
  let startTime = new Date();
  // let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);
  while (!onBreak && isDone) {
    console.log(`Starting page ${currentPage}`);
    let currentOffer = 0;
    let mainList = await driver.findElement(By.id("main_column"));
    let listItems = await mainList.findElements(
      By.xpath('//div[contains(@class,"offer_list_item")]')
    );
    while (!onBreak && currentOffer < listItems.length) {
      let currentTime = new Date();
      let timeSinceStart = currentTime - startTime;
      let minutesSinceStart = Math.round(
        ((timeSinceStart % 86400000) % 3600000) / 60000
      );
      if (minutesSinceStart > minutesUntilBreak) {
        console.log(
          `Time limit of ${minutesUntilBreak} minutes exceeded. Taking coffee break`
        );
        morePagesAvailable = false;
        onBreak = true;
        break;
      }
      console.log(`   Row ${currentOffer + 1}`);
      let listItem = listItems[currentOffer];
      await driver.executeScript(
        "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
        listItem
      );
      let linkDiv = await listItem.findElement(By.xpath(".//h3/a"));
      let url = await linkDiv.getAttribute("href");
      if (!visitedUrls.has(url)) {
        if ((currentOffer = listItems.length - 1)) {
          console.log(
            "End of list contains visited urls, probably we've seen everything past here"
          );
          break;
        }
        await delaySeconds(3, 5);
        let offerData = await getOfferData(driver, listItem);
        await driver.executeScript("return arguments[0].click()", linkDiv);
        await delaySeconds(5, 6);

        let enrichedOffer = await enrichOffer(driver);
        // enrichedOffer.url = url;
        enrichedOffer.title = offerData.title;
        enrichedOffer.numTenants = offerData.numTenants;
        enrichedOffer.url = offerData.url;
        enrichedOffer.contact = offerData.contact;
        enrichedOffer.roomSize = offerData.size;
        enrichedOffer.dates = offerData.dates;
        enrichedOffer.page = currentPage;
        enrichedOffer.row = currentOffer;
        visitedUrls.add(url);
        enrichedOffers.push(enrichedOffer);
        saveEnrichedOffers(enrichedOffers);
        await driver.executeScript("history.back()");
        await delaySeconds(5, 6);
        mainList = await driver.findElement(By.id("main_column"));
        listItems = await mainList.findElements(
          By.xpath('//div[contains(@class,"offer_list_item")]')
        );
      }
      currentOffer += 1;
    }
    morePagesAvailable = await areMorePagesAvailable(driver);
    if (morePagesAvailable) {
      await clickNextButton(driver);
      currentPage += 1;
      morePagesAvailable = true;
      await delaySeconds(3, 7);
    } else {
      isDone = true;
    }
  }
  return enrichedOffers;
};
