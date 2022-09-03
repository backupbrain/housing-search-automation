let {
  saveAnsweredResponses,
} = require("./utils/database/saveAnsweredResponses");
const { openPotentialOffers } = require("./utils/database/openPotentialOffers");
const { enrichOfferData } = require("./utils/processing/enrichOfferData");
const { buildPrompts } = require("./utils/processing/buildPrompts");
const { writeResponses } = require("./utils/processing/writeResponses");
const { translateResponses } = require("./utils/processing/translateResponses");

let bio = `
    I'm Tony.
    I'm a programmer that moved to Vienna in March of this year for work. 
    I work from home but I enjoy going out in my free time.
    I'm enjoying the relaxed nature of Vienna. I love how close to nature the city is and how easy it is to get around and experience the history, art, culture, museums, and activities.
    I'm excited to live with roommates so that I can better understand Viennese culture, and to be more social.
    I'm tidy and I love to cook. I'm quiet but I love socializing.
`.replace(/ +/g, " ");

let stopSequence = "=====";
let offers = openPotentialOffers();

await enrichOfferData(offers);
await buildPrompts(offers, bio);
await writeResponses(offers, stopSequence);
await translateResponses(offers);

saveAnsweredResponses();
