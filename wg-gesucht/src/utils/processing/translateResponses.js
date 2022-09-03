// write responses
export let translateResponses = async (offers) => {
  for (let row in offers) {
    console.log(`translating ${row}`);
    let potentialOffer = offers[row];
    if (potentialOffer.contacted) {
      console.log(`Offer ${row + 1} already contacted`);
      continue;
    }
    if (potentialOffer.wasTranslated) {
      console.log(`Response already translated offer ${row + 1}`);
      continue;
    }

    // if the response calls for German, translate response
    if (!potentialOffer.demographics.englishOk) {
      let germanResponse = await translateEnglishToGerman(
        potentialOffer.response.english
      );
      potentialOffer.response.german = germanResponse;
      potentialOffer.response.wasTranslated = true;
    }
    // save generated English and german and prompts
    saveAnsweredResponses(offers);
  }
  return offers;
};
