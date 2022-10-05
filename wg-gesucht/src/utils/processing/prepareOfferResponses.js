import { prepareOfferResponse } from "./prepareOfferResponse";

export let prepareOfferResponses = async (offers, bio) => {
  for (let offer of offers) {
    await prepareOfferResponse(offer, bio);
  }
};
