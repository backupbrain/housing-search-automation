let getDistrict = (enrichedOffer) => {
  let address = enrichedOffer.address;
  let postalCodeData = address.match(/ (1[\d]{2}0) /);
  if (postalCodeData && postalCodeData.length >= 2) {
    let district = parseInt(postalCodeData[1].substring(1, 3));
    return district;
  }
  return undefined;
};

let savePotentialOffers = (data) => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/potentialOffers.json");
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
};

let mergeDataSets = () => {
  // merge data sets
  let offerLookup = {};
  for (let enrichedOffer of enrichedOffers) {
    offerLookup[enrichedOffer.url] = {
      enrichedOffer,
    };
  }
  for (let offer of offers) {
    if (!(offer.url in offerLookup)) {
      offerLookup[offer.url] = {};
    }
    offerLookup[offer.url].offer = offer;
  }
  let combinedOffers = [];
  for (let url in offerLookup) {
    let combinedOffer = offerLookup[url];
    if (combinedOffer.enrichedOffer && combinedOffer.offer)
      combinedOffers.push(combinedOffer);
  }
  return {
    offerLookup,
    combinedOffers,
  };
};

let { combinedOffers, offerLookup } = mergeDataSets();

// strip out anytihng without wifi, furnished, or washing machine
let potentialOffers = combinedOffers.slice();
let numStartedWith = potentialOffers.length;
for (let i = potentialOffers.length - 1; i >= 0; i--) {
  let potentialOffer = potentialOffers[i].enrichedOffer;
  // console.log({ features: potentialOffer.address });
  if (
    !potentialOffer.features.hasWifi ||
    !potentialOffer.features.hasWashingMachine ||
    !potentialOffer.features.hasWifi
  ) {
    console.log(`    offer ${i} doesn't have wifi or something`);
    potentialOffers.splice(i, 1);
  }
  // console.log(i);
}
let numEndedWith = potentialOffers.length;
let numRemoved = numStartedWith - numEndedWith;
console.log(`Removed ${numRemoved} without Wifi, furniture, or washer`);
console.log(`${potentialOffers.length} remaining`);

// strip out anything where the room size is too small
let minRoomSize = 15;
numStartedWith = potentialOffers.length;
for (let i = potentialOffers.length - 1; i >= 0; i--) {
  let offerData = potentialOffers[i].offer;
  if (offerData.size && offerData.size < minRoomSize) {
    console.log(`    offer ${i} is too small`);
    potentialOffers.splice(i, 1);
  }
  console.log(i);
}
numEndedWith = potentialOffers.length;
numRemoved = numStartedWith - numEndedWith;
console.log(`Removed ${numRemoved} small rooms`);
console.log(`${potentialOffers.length} remaining`);

// strip out anything where the date ranges don't match
let startDates = {
  earliest: new Date("2022-09-25"),
  latest: new Date("2022-10-05"),
};
let endDates = {
  earliest: new Date("2022-12-25"),
  latest: new Date("2023-01-05"),
};
numStartedWith = potentialOffers.length;
for (let i = potentialOffers.length - 1; i >= 0; i--) {
  let offerData = potentialOffers[i].offer;
  let startDate = new Date(offerData.dates.start);
  let endDate = new Date(offerData.dates.end);
  if (startDate <= startDates.earliest || startDate >= startDates.latest) {
    console.log(`    offer ${i} starts too early or too late`);
    potentialOffers.splice(i, 1);
  }
  if (endDate <= endDates.earliest || endDate >= endDates.latest) {
    console.log(`    offer ${i} ends too early or too late`);
    potentialOffers.splice(i, 1);
  }
  console.log(i);
}
numEndedWith = potentialOffers.length;
numRemoved = numStartedWith - numEndedWith;
console.log(`Removed ${numRemoved} rooms outside date ranges`);
console.log(`${potentialOffers.length} remaining`);

// eliminate anything where males aren't allowed
numStartedWith = potentialOffers.length;
for (let i = potentialOffers.length - 1; i >= 0; i--) {
  let offerData = potentialOffers[i].enrichedOffer;
  if (!offerData.demographics.malesOk) {
    console.log(`   offer ${i} doesn't allow males`);
    potentialOffers.splice(i, 1);
  }
  // console.log(i);
}
numEndedWith = potentialOffers.length;
numRemoved = numStartedWith - numEndedWith;
console.log(`Removed ${numRemoved} rooms that don't allow males`);
console.log(`${potentialOffers.length} remaining`);

// look for things in these districts
let desiredDistricts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
numStartedWith = potentialOffers.length;
for (let i = potentialOffers.length - 1; i >= 0; i--) {
  let offerData = potentialOffers[i].enrichedOffer;
  let district = getDistrict(offerData);
  if (desiredDistricts.includes(district)) {
    console.log(`   offer ${i} is outside district search`);
    potentialOffers.splice(i, 1);
  }
  // console.log(i);
}
numEndedWith = potentialOffers.length;
numRemoved = numStartedWith - numEndedWith;
console.log(`Removed ${numRemoved} rooms outside district search`);
console.log(`${potentialOffers.length} remaining`);

savePotentialOffers(potentialOffers);
