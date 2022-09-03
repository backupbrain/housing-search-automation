export let offersEndingInRange = (offers, earliestEnd, latestEnd) => {
  // strip out anything where the date ranges don't match
  let potentialOffers = offers.slice();
  numStartedWith = potentialOffers.length;
  for (let i = potentialOffers.length - 1; i >= 0; i--) {
    let offerData = potentialOffers[i];
    let endDate = new Date(offerData.dates.end);
    if (endDate <= earliestEnd) {
      console.log(`    offer ${i} ends too early`);
      potentialOffers.splice(i, 1);
    }
    if (endDate >= latestEnd) {
      console.log(`    offer ${i} ends too late`);
      potentialOffers.splice(i, 1);
    }
  }
  numEndedWith = potentialOffers.length;
  numRemoved = numStartedWith - numEndedWith;
  console.log(`Removed ${numRemoved} rooms outside date ranges`);
  console.log(`${potentialOffers.length} remaining`);
  return potentialOffers;
};
