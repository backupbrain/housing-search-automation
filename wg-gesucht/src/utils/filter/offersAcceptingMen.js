export let offersAcceptingMen = (offers) => {
  // eliminate anything where males aren't allowed
  let potentialOffers = offers.slice();
  numStartedWith = potentialOffers.length;
  for (let i = potentialOffers.length - 1; i >= 0; i--) {
    let offerData = potentialOffers[i];
    if (!offerData.demographics.malesOk) {
      console.log(`   offer ${i} doesn't allow males`);
      potentialOffers.splice(i, 1);
    }
    // console.log(i);
  }
  numEndedWith = potentialOffers.length;
  numRemoved = numStartedWith - numEndedWith;
  console.log(`Removed ${numRemoved} rooms that don't allow males`);
  console.log(`${potentialOffers.length} remaining`);
  return potentialOffers;
};
