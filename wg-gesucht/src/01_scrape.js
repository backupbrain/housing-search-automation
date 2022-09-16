// node --experimental-repl-await
const { goToSearchPage } = require("./utils/automation/goToSearchPage");
const {
  scrapeEnrichedOffers,
} = require("./utils/automation/scrapeEnrichedOffers");
const { startBrowser } = require("./utils/automation/startBrowser");
const { acceptCookies } = require("./utils/automation/acceptCookies");
const { getCurrentPage } = require("./utils/automation/getCurrentPage");
const { openEnrichedOffers } = require("./utils/database/openEnrichedOffers");

let driver = await startBrowser();
await goToSearchPage(driver);
await acceptCookies(driver);

let enrichedOffers = [];
enrichedOffers = openEnrichedOffers();
let visitedUrls = new Set([]);
for (let enrichedOffer of enrichedOffers) {
  visitedUrls.add(enrichedOffer.url);
}
let currentPage = await getCurrentPage(driver); // 1
let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);

console.log(`Starting on page ${currentPage}`);
console.log(`Working for ${minutesUntilBreak} minutes before break`);

// enrichedOffers =
await scrapeEnrichedOffers(
  driver,
  visitedUrls,
  currentPage,
  enrichedOffers,
  minutesUntilBreak
);
await driver.quit();
