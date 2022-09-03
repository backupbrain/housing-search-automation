export let goToHomePage = async (driver) => {
  let startUrl = "https://www.wg-gesucht.de";
  await driver.get(startUrl);
};
