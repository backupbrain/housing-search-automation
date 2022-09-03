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
const { delaySeconds } = require("./utils/delaySeconds");

let driver = await startBrowser();
await goToHomePage(driver);
await acceptCookies(driver);
await login(driver, username, password);

let potentialOffers = openPotentialOffers();
let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);

sendMessagesToOffers(driver, potentialOffers, minutesUntilBreak);
