const { prisma } = require("./database/client");

export let getVisitedOfferUrls = async (profileId) => {
  let offers = await prisma.offer.findMany({
    where: { search: { profileId } },
    select: { url: true },
  });
  const urls = new Set();
  offers.forEach((offer) => urls.add(offer.url));
  return urls;
};
