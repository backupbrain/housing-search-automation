export let offersWithFeatures = (offers) => {
  // strip out anytihng without wifi, furnished, or washing machine
  let potentialOffers = offers.slice();
  let numStartedWith = potentialOffers.length;
  for (let i = potentialOffers.length - 1; i >= 0; i--) {
    let potentialOffer = potentialOffers[i];
    // console.log({ features: potentialOffer.address });
    // if (!potentialOffer.features.nonSmoking) {
    //   console.log(`    offer ${i} is smoking`);
    //   potentialOffers.splice(i, 1);
    //   continue;
    // }
    if (!potentialOffer.features.hasWashingMachine) {
      console.log(`    offer ${i} doesn't have a washing machine`);
      potentialOffers.splice(i, 1);
      continue;
    }
    if (!potentialOffer.features.isFurnished) {
      console.log(`    offer ${i} isn't furnished`);
      potentialOffers.splice(i, 1);
      continue;
    }
    if (!potentialOffer.features.hasWifi) {
      console.log(`    offer ${i} doesn't have wifi`);
      potentialOffers.splice(i, 1);
    }
  }
  let numEndedWith = potentialOffers.length;
  let numRemoved = numStartedWith - numEndedWith;
  console.log(`Removed ${numRemoved} without Wifi, furniture, or washer`);
  console.log(`${potentialOffers.length} remaining`);
  return potentialOffers;
};
