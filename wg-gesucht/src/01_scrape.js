// node --experimental-repl-await
import { acceptCookies } from "./utils/automation/acceptCookies";
import { getCurrentPage } from "./utils/automation/getCurrentPage";
import { goToSearchPage } from "./utils/automation/goToSearchPage";
import { scrapeEnrichedOffers } from "./utils/automation/scrapeEnrichedOffers";
import { startBrowser } from "./utils/automation/startBrowser";
import { getSearch } from "./utils/database/getSearch";
import { getVisitedOfferUrls } from "./utils/database/getVisitedOfferUrls";

let search = await getSearch(searchId);

let driver = await startBrowser();
await goToSearchPage(driver, search);
await acceptCookies(driver);

let currentPage = await getCurrentPage(driver); // 1
let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);

console.log(`Starting on page ${currentPage}`);
console.log(`Working for ${minutesUntilBreak} minutes before break`);

let existingOfferUrls = await getVisitedOfferUrls(profile.id);

// enrichedOffers =
await scrapeEnrichedOffers(
  driver,
  currentPage,
  minutesUntilBreak,
  search.id,
  existingOfferUrls
);
await driver.quit();
