const { cardinalizeNumber } = require("./cardinalizeNumber");
const { getOfferLength } = require("./getOfferLength");
const { splitLanguages } = require("./splitLanguages");
const { translateGermanToEnglish } = require("./translate");
const { splitName } = require("./splitName");

export let enrichOfferData = async (offers) => {
  for (let row in offers) {
    let potentialOffer = offers[row];
    if (potentialOffer.contacted) {
      console.log(`Offer ${row + 1} already contacted`);
      continue;
    }
    if (
      potentialOffer.splitDescription &&
      potentialOffer.splitDescription.english
    ) {
      console.log(`English description already extracted ${row + 1}`);
      continue;
    }
    if (potentialOffer.prompt) {
      console.log(`Prompt already written for offer ${row + 1}`);
      continue;
    }
    if (potentialOffer.response) {
      console.log(`Response already written for offer ${row + 1}`);
      continue;
    }
    // get the contact's first and last name
    let contactNames = splitName(potentialOffer.contact);
    potentialOffer.contactFirstName = contactNames.first;
    potentialOffer.contactMiddleName = contactNames.middle;
    potentialOffer.contactLastName = contactNames.last;

    // cardinalize the district
    if (potentialOffer.district) {
      potentialOffer.cardinalizedDistrict = cardinalizeNumber(
        potentialOffer.district
      );
    } else {
      potentialOffer.cardinalizedDistrict = undefined;
    }
    let offerLength = getOfferLength(potentialOffer);
    potentialOffer.monthsOffered = offerLength.months;
    potentialOffer.weeksOffered = offerLength.weeks;
    potentialOffer.daysOffered = offerLength.days;

    // if there is English and German in the ad, strip out the German
    let splitText = await splitLanguages(potentialOffer.description);
    potentialOffer.englishDescription = splitText.english;
    potentialOffer.germanDescription = splitText.german;
    potentialOffer.officialDescription = splitText.english;
    potentialOffer.wasDescriptionTranslated = false;
    // if it is German only, translate to English
    if (
      !potentialOffer.englishDescription &&
      potentialOffer.germanDescription
    ) {
      let englishTranslation = await translateGermanToEnglish(
        potentialOffer.germanDescription
      );
      potentialOffer.englishDescription = englishTranslation;
      potentialOffer.officialDescription = englishTranslation;
      potentialOffer.wasDescriptionTranslated = true;
    }
  }
};
