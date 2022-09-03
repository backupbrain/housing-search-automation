const { cardinalizeNumber } = require("./cardinalizeNumber");

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
    potentialOffer.contactNames = splitName(potentialOffer.contact);

    // cardinalize the district
    if (potentialOffer.district) {
      potentialOffer.cardinalizedDistrict = cardinalizeNumber(
        potentialOffer.district
      );
    } else {
      potentialOffer.cardinalizedDistrict = undefined;
    }
    potentialOffer.offerLength = getOfferLength1(potentialOffer);
    // if there is English and German in the ad, strip out the German
    let splitText = await splitLanguages1(potentialOffer.description);
    potentialOffer.splitDescription = splitText;
    potentialOffer.wasTranslated = false;
    // if it is German only, translate to English
    if (
      !potentialOffer.splitDescription.english &&
      potentialOffer.splitDescription.german
    ) {
      let englishTranslation = await translateGermanToEnglish(
        potentialOffer.splitDescription.german
      );
      potentialOffer.splitDescription.english = englishTranslation;
      potentialOffer.wasTranslated = true;
    }
    saveAnsweredResponses(offers);
  }
};
