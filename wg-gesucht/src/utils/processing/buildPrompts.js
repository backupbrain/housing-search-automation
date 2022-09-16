import { buildPrompt } from "./buildPrompt";
export let buildPrompts = async (offers, bio) => {
  for (let row in offers) {
    let potentialOffer = offers[row];
    if (potentialOffer.contacted) {
      console.log(`Offer ${row + 1} already contacted`);
      continue;
    }
    // if (potentialOffer.prompt) {
    //   console.log(`Prompt already written for offer ${row + 1}`);
    //   continue;
    // }
    // if (potentialOffer.response) {
    //   console.log(`Response already written for offer ${row + 1}`);
    //   continue;
    // }
    // analyze semantics of the ad
    // determine distance from work by walking, train
    // determine distance from 1st from working, train
    // determine distance from family from walking, train
    // build a prompt
    // look for:
    // * district
    // * proximity to work
    // * price
    // * pets, guitars
    // * nonsmoking
    // * semantics
    // * apartment size
    // * number of roomates
    // * room size
    // * proximity to transit if outside 5,6
    // * stage of life, work from home, traveler, contract until March
    // * I'm social, but tidy and quiet. I like to cook
    // * explain who I am with a short bio and name
    // * lgbtq, genders, students, etc
    // * make sure to include name of landlord
    // * aim for X number of words, Y number of paragraphs
    if (potentialOffer.prompt) {
      console.log(`Offer ${row + 1} already has prompt`);
      continue;
    }
    potentialOffer.prompt = buildPrompt(bio, potentialOffer);
    // saveAnsweredResponses(offers);
  }
};
