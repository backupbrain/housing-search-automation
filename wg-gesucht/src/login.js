const { Builder, By, Key, until } = require("selenium-webdriver");

const agreeToSafety = async () => {
  let safetyAgreeButton = await driver.findElement(
    By.id("sicherheit_bestaetigung")
  );
  await driver.executeScript("return arguments[0].click()", safetyAgreeButton);
};

const login = (email, password) => {
    let menu = await driver.findElement(By.id("burger_toggle"));
    await driver.executeScript("return arguments[0].scrollIntoView()", menu);
    await driver.executeScript("return arguments[0].click()", menu);
    await delayForSeconds(2, 3);

    let registerLink = await driver.findElement(By.xpath(
        '//div[contains(@class,"drawer_content")]/a[7]'
    ))
    await driver.executeScript("return arguments[0].click()", registerLink);
    await registerLink.getText();
    await delayForSeconds(2, 3);


    let emailInput = await driver.findElement(By.id("login_email_username"));
    await driver.executeScript("return arguments[0].focus()", emailInput);
    await emailInput.clear()
    await emailInput.sendKeys(email);
    await delayForSeconds(2, 3);
    let passwordInput = await driver.findElement(By.id("login_password"));
    await driver.executeScript("return arguments[0].focus()", passwordInput);
    await passwordInput.clear()
    await passwordInput.sendKeys(password);
    await delayForSeconds(2, 3);

    let loginButton = await driver.findElement(By.id("login_submit"))
    await driver.executeScript("return arguments[0].click()", loginButton);
    await delayForSeconds(3, 5);
}