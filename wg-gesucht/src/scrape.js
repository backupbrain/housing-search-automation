// node --experimental-repl-await
const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");
const { format } = require("util");

let saveOffers = (data) => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/offers.json");
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
};

let saveEnrichedOffers = (data) => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/enrichedOffers.json");
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
};

let openOffers = () => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/offers.json");
  const rawData = fs.readFileSync(filename, "utf8");
  const offers = JSON.parse(rawData);
  return offers;
};

let openEnrichedOffers = () => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/enrichedOffers.json");
  const rawData = fs.readFileSync(filename, "utf8");
  const offers = JSON.parse(rawData);
  return offers;
};

const delaySeconds = async (min, max) => {
  const delaySeconds = Math.random() * (max - min) + min;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delaySeconds * 1000);
  });
};

const doesElementExist = async (driver, xpath) => {
  try {
    await driver.findElement(By.xpath(xpath));
    return true;
  } catch (error) {
    return false;
  }
};

const getElement = async (driver, xpath) => {
  try {
    return driver.findElement(By.xpath(xpath));
  } catch (error) {
    return undefined;
  }
};

const getOfferData = async (driver, listItem) => {
  let offer = {
    title: undefined,
    url: undefined,
    description: undefined,
    numTenants: undefined,
    price: undefined,
    contact: undefined,
    size: undefined,
    dates: { start: undefined, end: undefined },
  };
  await driver.executeScript("return arguments[0].scrollIntoView()", listItem);

  let titleDiv = await listItem.findElement(By.css("h3"));
  let title = await titleDiv.getText();
  title = title.trim().replace(/\s\s+/g, " ");
  offer.title = title;

  let linkDiv = await titleDiv.findElement(By.css("a"));
  let url = await linkDiv.getAttribute("href");
  offer.url = url;

  let descriptionDiv = await listItem.findElement(
    By.xpath(
      './/div[contains(@class,"card_body")]/div[1]/div[contains(@class,"col-xs-11")]'
    )
  );
  let description = await descriptionDiv.getText();
  description = descriptionText.trim().replace(/\s\s+/g, " ");
  offer.description = description;

  let tenantsInfoContainer = await listItem.findElement(
    By.xpath(
      '//div[contains(@class,"card_body")]/' +
        "div[1]/div[2]/" +
        'span[contains(@class,"noprint")]'
    )
  );
  let tenantsInfo = await tenantsInfoContainer.findElements(By.xpath("./img"));
  //*[@id="liste-details-ad-4292139"]/div/div[2]/div[1]/div[2]/span[2]/img[1]
  let numTenants = tenantsInfo.length;
  offer.numTenants = numTenants;

  let priceDiv = await listItem.findElement(
    By.xpath(
      './/div[contains(@class,"card_body")]/div[contains(@class,"middle")]/div[contains(@class,"col-xs-3")][1]'
    )
  );
  let rawPrice = await priceDiv.getText();
  rawPrice = rawPrice.trim().replace(/\s\s+/g, " ");
  let price = rawPrice;
  if (rawPrice.includes("€")) {
    price = rawPrice.replace(/ €/, "");
  }
  price = parseInt(price);
  offer.price = price;

  let contactDiv = await listItem.findElement(
    By.xpath(
      './/div[contains(@class,"card_body")]' +
        "//div" +
        '/span[contains(@class,"ml5")]'
    )
  );
  let contact = await contactDiv.getText();
  contact = contact.trim().replace(/\s\s+/g, " ");
  offer.contact = contact;

  let sizeDiv = await listItem.findElement(
    By.xpath(
      './/div[contains(@class,"card_body")]/div[contains(@class,"middle")]/div[contains(@class,"text-right")]'
    )
  );
  let rawSize = await sizeDiv.getText();
  rawSize = rawSize.trim().replace(/\s\s+/g, " ");
  let size = rawSize;
  if (rawSize.includes("m²")) {
    size = rawSize.replace(/ m²/, "");
  }
  size = parseInt(size);
  offer.size = size;

  let datesDiv = await listItem.findElement(
    By.xpath(
      './/div[contains(@class,"card_body")]/div[contains(@class,"middle")]/div[contains(@class,"text-center")]'
    )
  );
  let datesInfo = await datesDiv.getText();
  datesInfo = datesInfo.trim().replace(/\s\s+/g, " ");
  let finalDates = { start: undefined, end: undefined };
  if (datesInfo.includes("privat")) {
    // do nothing
  } else {
    dates = datesInfo.split(" - ");
    for (let row in dates) {
      let key = "start";
      if (row == 1) {
        key = "end";
      }
      let dateInfo = date.split(".");
      let finalDate = new Date(`${dateInfo[2]}-${dateInfo[1]}-${dateInfo[0]}`);
      finalDates[key] = finalDate;
    }
  }
  offer.dates = finalDates;
  return offer;
};

let clickNextButton = async (driver) => {
  let lastNavigationButton = await driver.findElement(
    By.xpath('//a[contains(@class,"next")]')
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView()",
    lastNavigationButton
  );
  await driver.executeScript(
    "return arguments[0].click()",
    lastNavigationButton
  );
};

/*
title
description
price
size
contact
url
lastOnline
*/
dataset = [];

xpath = '//*[@id="cmpwelcomebtnyes"]/a';
let startUrl =
  "https://www.wg-gesucht.de/wg-zimmer-und-wohnungen-in-Wien.163.0+2.1.0.html?offer_filter=1&city_id=163&sort_column=0&sort_order=0&noDeact=1&categories%5B%5D=0&categories%5B%5D=2&rent_types%5B%5D=1&rMax=650";

// let driver = await new Builder().forBrowser("safari").build();
let driver = await new Builder().forBrowser("chrome").build();
await driver.get(startUrl);

// accept cookie banner if it exists
try {
  let acceptCookiesButton = await driver.findElement(By.xpath(xpath));
  await acceptCookiesButton.sendKeys(" ");
} catch {}

// next button
// let navigationButtons = await driver.findElements(By.xpath('//*[@id="assets_list_pagination"]/ul/li'))
// let lastNavigationButton = await driver.findElement(By.xpath('//a[contains(@class,"next")]'))

// get list items

let goTopreviousPage = async () => {
  let prevPageLink = await driver.findElement(
    By.xpath('//a[contains(@class,"prev")]')
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView()",
    prevPageLink
  );
  await driver.executeScript("return arguments[0].click()", prevPageLink);
};

let listItem = listItems[0];

let areMorePagesAvailable = async (driver) => {
  let morePagesAvailable = false;
  try {
    await driver.findElement(By.xpath('//a[contains(@class,"next")]'));
    morePagesAvailable = true;
  } catch (error) {}
  return morePagesAvailable;
};

let currentPage = 1;
let scrapeOffers = async (driver) => {
  let offers = [];
  let morePagesAvailable = await areMorePagesAvailable(driver);
  while (morePagesAvailable) {
    let mainList = await driver.findElement(By.id("main_column"));
    let listItems = await mainList.findElements(
      By.xpath('//div[contains(@class,"offer_list_item")]')
    );
    for (listItem of listItems) {
      let offerData = await getOfferData(driver, listItem);
      offers.push(offerData);
      saveOffers(offers);
      await delaySeconds(1, 3);
    }
    morePagesAvailable = await areMorePagesAvailable(driver);
    if (morePagesAvailable) {
      await clickNextButton(driver);
      morePagesAvailable = true;
      currentPage += 1;
      console.log(`page ${currentPage}`);
      await delaySeconds(3, 7);
    }
  }
};

let goToFirstPage = async (driver) => {
  let navigationButtons = await driver.findElements(
    By.xpath('//a[contains(@class,"page-link")]')
  );
  let firstPage = navigationButtons[1];
  await driver.executeScript("return arguments[0].scrollIntoView()", firstPage);
  await driver.executeScript("return arguments[0].click()", firstPage);
};

let enrichOffer = async (driver) => {
  let enrichedOffer = {
    prices: {
      rent: undefined,
      extra: undefined,
      other: undefined,
      deposit: undefined,
      transfer: undefined,
    },
    address: undefined,
    district: undefined,
    description: undefined,
    features: {
      isFurnished: false,
      hasWashingMachine: false,
      hasWifi: false,
    },
    demographics: {
      students: undefined,
      lgbtq: undefined,
      englishOk: false,
      malesOk: false,
    },
    contactLink: undefined,
  };
  // get costs
  let infoPanel = await driver.findElement(
    By.xpath(
      '//div[contains(@class,"panel-body")]' +
        '//div[contains(@class,"row")][4]'
    )
  );
  await delaySeconds(2, 5);
  let costsItems = await infoPanel.findElements(By.xpath(".//table/tbody/tr"));
  for (let costsItem of costsItems) {
    let headerDiv = costsItem.findElement(By.xpath("./td[1]"));
    await driver.executeScript(
      "return arguments[0].scrollIntoView()",
      headerDiv
    );
    let header = await headerDiv.getText();
    header = header.trim().replace(/\s\s+/g, " ").replace(/:$/, "");
    let price = undefined;
    try {
      let valueDiv = costsItem.findElement(By.xpath("./td[2]"));
      let rawValue = await valueDiv.getText();
      rawValue = rawValue.trim().replace(/\s\s+/g, " ").replace(/€$/, "");
      price = parseInt(rawValue);
      if (isNaN(price)) {
        price = undefined;
      }
    } catch (error) {
      header = "invalid";
    }
    switch (header) {
      case "Miete":
        enrichedOffer.prices.rent = price;
        break;
      case "Sonstige Kosten":
        enrichedOffer.prices.other = price;
        break;
      case "Kaution":
        enrichedOffer.prices.deposit = price;
        break;
      case "ablösevereinbarung":
        enrichedOffer.prices.transfer = price;
        break;
      default:
        if (header.substring(0, 4) === "Nebe") {
          enrichedOffer.prices.extra = price;
          break;
        }
        break;
    }
  }
  let addressLink = await infoPanel.findElement(
    By.xpath('.//div[contains(@class,"mb10")]/a')
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView()",
    addressLink
  );
  await delaySeconds(1, 2);
  let address = await addressLink.getText();
  address = address.trim().replace(/\s\s+/g, " ");
  enrichedOffer.address = address;
  let postalCodeData = address.match(/ (1[\d]{2}0) /);
  if (postalCodeData && postalCodeData.length > 2) {
    let district = parseInt(postalCodeData[1].substring(1, 3));
    enrichedOffer.district = district;
  }

  try {
    let descriptionDiv = await driver.findElement(By.id("freitext_0"));
    await driver.executeScript(
      "return arguments[0].scrollIntoView()",
      descriptionDiv
    );
    await delaySeconds(2, 5);
    let description = await descriptionDiv.getText();
    description = description.trim().replace(/  +/g, " ");
    enrichedOffer.description = description;
  } catch (error) {
    try {
      let descriptionDiv = await driver.findElement(By.id("freitext_2"));
      await driver.executeScript(
        "return arguments[0].scrollIntoView()",
        descriptionDiv
      );
      await delaySeconds(2, 5);
      let description = await descriptionDiv.getText();
      description = description.trim().replace(/  +/g, " ");
      enrichedOffer.description = description;
    } catch (error) {
      try {
        let descriptionDiv = await driver.findElement(By.id("freitext_3"));
        await driver.executeScript(
          "return arguments[0].scrollIntoView()",
          descriptionDiv
        );
        await delaySeconds(2, 5);
        let description = await descriptionDiv.getText();
        description = description.trim().replace(/  +/g, " ");
        enrichedOffer.description = description;
      } catch (error) {}
    }
  }

  let utilities = await driver.findElements(
    By.xpath(
      '//div[contains(@class,"panel-body")]' +
        '//div[contains(@class,"row")][8]' +
        '//div[contains(@class,"row")]/div'
    )
  );
  for (let utility of utilities) {
    let utilityText = await utility.getText();
    utilityText = utilityText.trim().replace(/\s\s+/g, " ");
    if (!enrichedOffer.features.hasWifi && utilityText === "WLAN") {
      enrichedOffer.features.hasWifi = true;
    }
    if (!enrichedOffer.features.isFurnished && utilityText === "möbliert") {
      enrichedOffer.features.isFurnished = true;
    }
    if (
      !enrichedOffer.features.hasWashingMachine &&
      utilityText.includes("Waschmaschine")
    ) {
      enrichedOffer.features.hasWashingMachine = true;
    }
  }

  let demographicPanel = await driver.findElement(
    By.xpath(
      '//div[contains(@class,"panel-body")]' +
        '//div[contains(@class,"row")][6]'
    )
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView()",
    demographicPanel
  );
  await delaySeconds(1, 4);
  let extendendInfos = await demographicPanel.findElements(
    By.xpath('./div[contains(@class,"col-sm-6")][1]/ul/li')
  );
  for (let extendedInfoDiv of extendendInfos) {
    let extendedInfo = await extendedInfoDiv.getText();
    extendedInfo = extendedInfo.trim().replace(/\s\s+/g, " ");
    if (
      !enrichedOffer.demographics.students &&
      extendedInfo.includes("Studenten")
    ) {
      enrichedOffer.demographics.students = true;
    }
    if (!enrichedOffer.demographics.lgbtq && extendedInfo.includes("LGB")) {
      enrichedOffer.demographics.lgbtq = true;
    }
    if (
      !enrichedOffer.demographics.englishOk &&
      extendedInfo.includes("Englisch")
    ) {
      enrichedOffer.demographics.englishOk = true;
    }
  }

  let desiredGenderInfos = await demographicPanel.findElements(
    By.xpath('./div[contains(@class,"col-sm-6")][2]/ul/li')
  );
  for (let desiredGenderInfoDiv of desiredGenderInfos) {
    let desiredGenderInfo = await desiredGenderInfoDiv.getText();
    desiredGenderInfo = desiredGenderInfo
      .toLowerCase()
      .trim()
      .replace(/\s\s+/g, " ");
    if (desiredGenderInfo.includes("geschlecht egal")) {
      enrichedOffer.demographics.malesOk = true;
      break;
    }
    if (desiredGenderInfo.includes("mann")) {
      enrichedOffer.demographics.malesOk = true;
      break;
    }
  }

  let contactButton = await driver.findElement(By.id("mailform"));
  await driver.executeScript(
    "return arguments[0].scrollIntoView()",
    contactButton
  );
  let contactLink = await contactButton.getAttribute("href");
  enrichedOffer.contactLink = contactLink;
  return enrichedOffer;
};

// await driver.getCurrentUrl()

let visitedUrls = new Set([]);
visitedUrls.add(url);
for (let eo of enrichedOffers) {
  visitedUrls.add(eo.url);
}

for (let eo of enrichedOffers) {
  if (!eo.contactUrl && eo.url) {
    let url = eo.url;
    let contactUrl = url.slice(0, 26) + "nachricht-senden/" + url.slice(26);
    eo.contactUrl = contactUrl;
  }
}

for (let eo of enrichedOffers) {
  if (!eo.url) {
    console.log(eo);
  }
}

const getCurrentPage = async (driver) => {
  const url = await driver.getCurrentUrl();
  const query = url.substring(url.indexOf("?") + 1);
  const splitQuery = query.split("&");
  const queryParams = {};
  for (let param of splitQuery) {
    const queryParamSet = param.split("=");
    queryParams[queryParamSet[0]] = queryParamSet[1];
    if (queryParamSet[0] === "pagination") {
      return parseInt(queryParamSet[1]);
    }
  }
  return undefined;
};

let enrichOffers = async (driver) => {
  let enrichedOffers = [];
  let morePagesAvailable = await areMorePagesAvailable(driver);
  let currentPage = 1;
  let startTime = new Date();
  let minutesUntilBreak = Math.floor(Math.random() * 50 + 30);
  while (morePagesAvailable) {
    console.log(`Starting page ${currentPage}`);
    let currentOffer = 0;
    let mainList = await driver.findElement(By.id("main_column"));
    let listItems = await mainList.findElements(
      By.xpath('//div[contains(@class,"offer_list_item")]')
    );
    while (currentOffer < listItems.length) {
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
        break;
      }
      console.log(`   Row ${currentOffer + 1}`);
      let listItem = listItems[currentOffer];
      await driver.executeScript(
        "return arguments[0].scrollIntoView()",
        listItem
      );
      await delaySeconds(3, 5);
      let linkDiv = await listItem.findElement(By.xpath(".//h3/a"));
      let url = await linkDiv.getAttribute("href");
      if (!visitedUrls.has(url)) {
        await driver.executeScript("return arguments[0].click()", linkDiv);
        await delaySeconds(5, 6);
        let enrichedOffer = await enrichOffer(driver);
        enrichedOffer.url = url;
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
    }
  }
};

await driver.executeScript("return window.scrollBy(0, 100)");
