let { By } = require("selenium-webdriver");
const { delaySeconds } = require("../delaySeconds");

let getDistrict = (address) => {
  let postalCodeData = address.match(/ (1[\d]{2}0) /);
  if (postalCodeData && postalCodeData.length >= 2) {
    let district = parseInt(postalCodeData[1].substring(1, 3));
    return district;
  }
  return undefined;
};

export let enrichOffer = async (driver) => {
  let enrichedOffer = {
    title: undefined,
    numTenants: undefined,
    url: undefined,
    roomSize: undefined,
    apartmentSizeSquareMeters: undefined,
    contact: undefined,
    dates: undefined,
    html: undefined,
    rentPrice: undefined,
    extraCost: undefined,
    otherCost: undefined,
    depositPrice: undefined,
    transferCost: undefined,
    address: undefined,
    district: undefined,
    rawDescription: undefined,
    isFurnished: false,
    hasWashingMachine: false,
    hasWifi: false,
    studentsOk: undefined,
    englishOk: false,
    malesOk: false,
    lgbtqOk: undefined,
    nonSmoking: false,
    contactUrl: undefined,
    wasContacted: false,
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
      "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
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
    "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
    addressLink
  );
  await delaySeconds(1, 2);
  let address = await addressLink.getText();
  let district = getDistrict(address);
  enrichedOffer.address = address;
  enrichedOffer.district = district;

  let demographicPanel = await driver.findElement(
    By.xpath(
      '//div[contains(@class,"panel-body")]' +
        '//div[contains(@class,"row")][6]'
    )
  );
  await driver.executeScript(
    "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
    demographicPanel
  );
  await delaySeconds(1, 4);
  let extendendInfos = await demographicPanel.findElements(
    By.xpath('./div[contains(@class,"col-sm-6")][1]/ul/li')
  );
  for (let extendedInfoDiv of extendendInfos) {
    let extendedInfo = await extendedInfoDiv.getText();
    extendedInfo = extendedInfo.trim().replace(/\s\s+/g, " ");
    if (!enrichedOffer.studentsOk && extendedInfo.includes("Studenten")) {
      enrichedOffer.studentsOk = true;
    }
    if (!enrichedOffer.lgbtqOk && extendedInfo.includes("LGB")) {
      enrichedOffer.lgbtqOk = true;
    }
    if (
      !enrichedOffer.nonSmoking &&
      extendedInfo.includes("Rauchen nicht erwünscht")
    ) {
      enrichedOffer.nonSmoking = true;
    }
    if (!enrichedOffer.englishOk && extendedInfo.includes("Englisch")) {
      enrichedOffer.englishOk = true;
    }
    if (extendedInfo.includes("Wohnungsgröße:")) {
      const apartmentSizeMatches = extendedInfo.match(/\d+/);
      const apartmentSize = parseInt(apartmentSizeMatches[0]);
      enrichedOffer.apartmentSizeSquareMeters = apartmentSize;
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
      enrichedOffer.malesOk = true;
      break;
    }
    if (desiredGenderInfo.includes("mann")) {
      enrichedOffer.malesOk = true;
      break;
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
    if (!enrichedOffer.hasWifi && utilityText === "WLAN") {
      enrichedOffer.hasWifi = true;
    }
    if (!enrichedOffer.isFurnished && utilityText === "möbliert") {
      enrichedOffer.isFurnished = true;
    }
    if (
      !enrichedOffer.hasWashingMachine &&
      utilityText.includes("Waschmaschine")
    ) {
      enrichedOffer.hasWashingMachine = true;
    }
  }

  try {
    let descriptionDiv = await driver.findElement(By.id("freitext_0"));
    await driver.executeScript(
      "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
      descriptionDiv
    );
    await delaySeconds(2, 5);
    let description = await descriptionDiv.getText();
    description = description.trim().replace(/  +/g, " ");
    enrichedOffer.rawDescription = description;
  } catch (error) {
    try {
      let descriptionDiv = await driver.findElement(By.id("freitext_2"));
      await driver.executeScript(
        "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
        descriptionDiv
      );
      await delaySeconds(2, 5);
      let description = await descriptionDiv.getText();
      description = description.trim().replace(/  +/g, " ");
      enrichedOffer.rawDescription = description;
    } catch (error) {
      try {
        let descriptionDiv = await driver.findElement(By.id("freitext_3"));
        await driver.executeScript(
          "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
          descriptionDiv
        );
        await delaySeconds(2, 5);
        let description = await descriptionDiv.getText();
        description = description.trim().replace(/  +/g, " ");
        enrichedOffer.rawDescription = description;
      } catch (error) {}
    }
  }

  let contactButton = await driver.findElement(By.id("mailform"));
  await driver.executeScript(
    "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
    contactButton
  );
  let contactLink = await contactButton.getAttribute("href");
  enrichedOffer.contactUrl = contactLink;
  const html = await driver.executeScript(
    "return document.getElementsByTagName('html')[0].outerHTML"
  );
  enrichedOffer.html = html;
  return enrichedOffer;
};
