// node --experimental-repl-await
const { agreeToSafety } = require("./utils/automation/agreeToSafety");
const { goToHomePage } = require("./utils/automation/goToHomePage");
const { login } = require("./utils/automation/login");
const { sendMessage } = require("./utils/automation/sendMessage");
const {
  sendMessagesToOffers,
} = require("./utils/automation/sendMessagesToOffers");
const { startBrowser } = require("./utils/automation/startBrowser");
const { writeMessage } = require("./utils/automation/writeMessage");
const { openPotentialOffers } = require("./utils/database/openPotentialOffers");
const { savePotentialOffers } = require("./utils/database/savePotentialOffers");
const {
  openAnsweredResponses,
} = require("./utils/database/openAnsweredResponses");
const { delaySeconds } = require("./utils/delaySeconds");
const {
  saveAnsweredResponses,
} = require("./utils/database/saveAnsweredResponses");

let driver = await startBrowser();
await goToHomePage(driver);
await acceptCookies(driver);
await login(driver, username, password);

let answeredResponses = openAnsweredResponses();
let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);

contactedUrls = [
  "https://www.wg-gesucht.de/wg-zimmer-in-Wien-20--Bezirk-Brigittenau.9256736.html",
  "https://www.wg-gesucht.de/wg-zimmer-in-Wien-18--Bezirk-Waehring.8709559.html",
  "https://www.wg-gesucht.de/wg-zimmer-in-Wien-19--Bezirk-Doebling.9344788.html",
  "https://www.wg-gesucht.de/wg-zimmer-in-Wien-05--Bezirk-Margareten.5222966.html",
  "https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Wien-06--Bezirk-Mariahilf.6192841.html",
];

for (let offer of answeredResponses) {
  if (contactedUrls.includes(offer.url)) {
    offer.contacted = true;
  }
}

saveAnsweredResponses(answeredResponses);

await sendMessagesToOffers(driver, answeredResponses, minutesUntilBreak);
