export let offersStartingInRange = (offers, earliestStart, latestStart) => {
  // strip out anything where the date ranges don't match
  let potentialOffers = offers.slice();
  numStartedWith = potentialOffers.length;
  for (let i = potentialOffers.length - 1; i >= 0; i--) {
    let offerData = potentialOffers[i];
    let startDate = new Date(offerData.dates.start);
    if (startDate <= earliestStart) {
      console.log(`    offer ${i} starts too early`);
      potentialOffers.splice(i, 1);
    }
    if (startDate >= latestStart) {
      console.log(`    offer ${i} starts too late`);
      potentialOffers.splice(i, 1);
    }
  }
  numEndedWith = potentialOffers.length;
  numRemoved = numStartedWith - numEndedWith;
  console.log(`Removed ${numRemoved} rooms outside date ranges`);
  console.log(`${potentialOffers.length} remaining`);
  return potentialOffers;
};
