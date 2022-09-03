export let getOfferLength = (offer) => {
  let startDate = new Date(offer.dates.start);
  let endDate = new Date(offer.dates.end);
  let timeDifference = endDate - startDate;
  let numDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let numWeeks = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 7));
  let numMonths = Math.round(timeDifference / (1000 * 60 * 60 * 24 * 30));
  return {
    days: numDays,
    months: numMonths,
    weesk: numWeeks,
  };
};
