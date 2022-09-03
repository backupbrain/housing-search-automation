export let getOfferData = async (driver, listItem) => {
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
  await driver.executeScript(
    "return arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' })",
    listItem
  );

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
  let descriptionText = await descriptionDiv.getText();
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
      let date = dates[row];
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
