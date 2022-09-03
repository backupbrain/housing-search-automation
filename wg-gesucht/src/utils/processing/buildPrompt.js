export let buildPrompt = (bio, potentialOffer) => {
  let maxMonths = 3;
  let numMonths = Math.min(potentialOffer.offerLength.months, maxMonths);

  const prompt = `BEGIN MY BIO

  ${bio}

  END MY BIO

  BEGIN HOUSING AD

  ${potentialOffer.splitDescription.english}

  END HOUSING AD

Write a cheerful three paragraph introduction to ${
    potentialOffer.contactNames.first || "Sir or madam"
  } explaining why I'm a good fit as a roommate for this apartment.

Mention reasons why I might enjoy the ${
    potentialOffer.cardinalizedDistrict
  } district of Vienna, that I'm looking to stay about ${numMonths} month${
    numMonths === 1 ? "" : "s"
  } or longer and use information from my bio.

  Use the housing ad as reference and make sure to explain why I'm a good fit, especially if it's a social atmosphere, good natural lighting, or lots of common space.
    `;
  return prompt;
};
