import { openEnrichedOffers } from "./utils/database/openEnrichedOffers";
import { savePotentialOffers } from "./utils/database/savePotentialOffers";
import { offersAcceptingMen } from "./utils/filter/offersAcceptingMen";
import { offersLastingAtLeast } from "./utils/filter/offersLastingAtLeast";
import { offersMeetingRoomSize } from "./utils/filter/offersMeetingRoomSize";
import { offersStartingInRange } from "./utils/filter/offersStartingInRange";
import { offersWithFeatures } from "./utils/filter/offersWithFeatures";
import { offersWithinDistricts } from "./utils/filter/offersWithinDistricts";

let desiredDistricts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let minRoomSize = 15;
let startDates = {
  earliest: new Date("2022-09-25"), // earliestStart
  latest: new Date("2022-10-05"), // latestStart
};
let endDates = {
  earliest: new Date("2022-12-25"), // earliestEnd
  latest: new Date("2023-01-05"), // latestEnd
};

let offers = [];
offers = openEnrichedOffers();

let potentialOffers = offers.slice();
potentialOffers = offersWithFeatures(potentialOffers);
potentialOffers = offersAcceptingMen(potentialOffers);
potentialOffers = offersMeetingRoomSize(potentialOffers, minRoomSize);
potentialOffers = offersStartingInRange(
  potentialOffers,
  startDates.earliest,
  startDates.latest
);
potentialOffers = offersLastingAtLeast(potentialOffers, 28);
potentialOffers = offersWithinDistricts(potentialOffers, desiredDistricts);

savePotentialOffers(potentialOffers);
