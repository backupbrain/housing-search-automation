export let buildPrompt = (bio, offer) => {
  let maxMonths = 3;
  let numMonths = Math.min(offer.monthsOffered, maxMonths);

  const prompt = `BEGIN MY BIO

  ${bio}

  END MY BIO

  BEGIN HOUSING AD

  ${offer.englishDescription}

  END HOUSING AD

Write a cheerful three paragraph introduction to ${
    offer.contactFirstName || "Sir or madam"
  } explaining why I'm a good fit as a roommate for this apartment.

Mention reasons why I might enjoy the ${
    offer.cardinalizedDistrict
  } district of Vienna, that I'm looking to stay about ${numMonths} month${
    numMonths === 1 ? "" : "s"
  } or longer and use information from my bio.

  Use the housing ad as reference and make sure to explain why I'm a good fit, especially if it's a social atmosphere, good natural lighting, or lots of common space.
    `;
  return prompt;
};
