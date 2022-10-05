// node --experimental-repl-await
import { goToHomePage } from "./utils/automation/goToHomePage";
import { login } from "./utils/automation/login";
import { sendMessagesToOffers } from "./utils/automation/sendMessagesToOffers";
import { startBrowser } from "./utils/automation/startBrowser";
import { getUncontactedOffers } from "./utils/database/getUncontactedOffers";

let driver = await startBrowser();
await goToHomePage(driver);
await acceptCookies(driver);
await login(driver, username, password);

let uncontactedoffers = getUncontactedOffers(profileId);
let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);

await sendMessagesToOffers(driver, uncontactedoffers, minutesUntilBreak);

await driver.quit();
