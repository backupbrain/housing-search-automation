import { getProfile } from "./utils/database/getProfile";
import { getUnprocessedOffers } from "./utils/database/getUnprocessedOffers";
import { prepareOfferResponses } from "./utils/processing/prepareOfferResponses";

let profile = getProfile(profileId);
let bio = profile.bio.replace(/ +/g, " ");

let offers = await getUnprocessedOffers(searchId);
await prepareOfferResponses(offers, bio);
