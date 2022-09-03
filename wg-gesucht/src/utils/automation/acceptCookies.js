const { By } = require("selenium-webdriver");

// accept cookie banner if it exists
export let acceptCookies = async (driver) => {
  try {
    let acceptCookiesButton = await driver.findElement(
      By.xpath('//*[@id="cmpwelcomebtnyes"]/a')
    );
    await acceptCookiesButton.sendKeys(" ");
  } catch {}
};
