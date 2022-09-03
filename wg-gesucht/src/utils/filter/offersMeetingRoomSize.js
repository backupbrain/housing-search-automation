export let offersMeetingRoomSize = (offers, minRoomSize) => {
  // strip out anything where the room size is too small
  let potentialOffers = offers.slice();
  numStartedWith = potentialOffers.length;
  for (let i = potentialOffers.length - 1; i >= 0; i--) {
    let offerData = potentialOffers[i];
    if (offerData.size && offerData.size < minRoomSize) {
      console.log(`    offer ${i} is too small`);
      potentialOffers.splice(i, 1);
    }
    console.log(i);
  }
  numEndedWith = potentialOffers.length;
  numRemoved = numStartedWith - numEndedWith;
  console.log(`Removed ${numRemoved} small rooms`);
  console.log(`${potentialOffers.length} remaining`);
  return potentialOffers;
};
