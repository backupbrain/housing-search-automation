export let offersLastingAtLeast = (offers, minDays) => {
  // strip out anything where the date ranges don't match
  let potentialOffers = offers.slice();
  numStartedWith = potentialOffers.length;
  for (let i = potentialOffers.length - 1; i >= 0; i--) {
    let offerData = potentialOffers[i];
    let startDate = new Date(offerData.dates.start);
    let endDate = new Date(offerData.dates.end);
    let timeDifference = endDate - startDate;
    let numDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (numDays <= minDays) {
      console.log(`    offer ${i} is too short`);
      potentialOffers.splice(i, 1);
    }
  }
  numEndedWith = potentialOffers.length;
  numRemoved = numStartedWith - numEndedWith;
  console.log(`Removed ${numRemoved} rooms outside date ranges`);
  console.log(`${potentialOffers.length} remaining`);
  return potentialOffers;
};
