// node --experimental-repl-await
const { goToSearchPage } = require("./utils/automation/goToSearchPage");
const {
  scrapeEnrichedOffers,
} = require("./utils/automation/scrapeEnrichedOffers");
const { startBrowser } = require("./utils/automation/startBrowser");
const { openEnrichedOffers } = require("./utils/database/openEnrichedOffers");

let driver = await startBrowser();
await goToSearchPage(driver);

let enrichedOffers = [];
enrichedOffers = openEnrichedOffers();
let visitedUrls = new Set([]);
for (let enrichedOffer of enrichedOffers) {
  visitedUrls.add(enrichedOffer.url);
}
let currentPage = await getCurrentPage(driver); // 1
let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);

enrichedOffers = await scrapeEnrichedOffers(
  driver,
  visitedUrls,
  currentPage,
  enrichedOffers,
  minutesUntilBreak
);
