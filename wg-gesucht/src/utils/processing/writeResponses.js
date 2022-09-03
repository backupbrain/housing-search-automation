let { writeResponse } = await require("writeResponse");

// write responses
export let writeResponses = async (offers, stopSequence) => {
  for (let row in offers) {
    let potentialOffer = offers[row];
    if (potentialOffer.contacted) {
      console.log(`Offer ${row + 1} already contacted`);
      continue;
    }
    // if (potentialOffer.response) {
    //   console.log(`Response already written for offer ${row + 1}`);
    //   continue;
    // }
    potentialOffer.response = { english: undefined, german: undefined };
    // generate a response
    potentialOffer.response.english = await writeResponse(
      potentialOffer.prompt,
      stopSequence
    );
    saveAnsweredResponses(offers);
  }
  return offers;
};
