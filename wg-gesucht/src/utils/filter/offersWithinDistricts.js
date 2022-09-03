export let offersWithinDistricts = (offers, desiredDistricts) => {
  // look for things in these districts
  let potentialOffers = offers.slice();
  numStartedWith = potentialOffers.length;
  for (let i = potentialOffers.length - 1; i >= 0; i--) {
    let offerData = potentialOffers[i];
    if (desiredDistricts.includes(offerData.district)) {
      console.log(`   offer ${i} is outside district search`);
      potentialOffers.splice(i, 1);
    }
    // console.log(i);
  }
  numEndedWith = potentialOffers.length;
  numRemoved = numStartedWith - numEndedWith;
  console.log(`Removed ${numRemoved} rooms outside district search`);
  console.log(`${potentialOffers.length} remaining`);
  return potentialOffers;
};
