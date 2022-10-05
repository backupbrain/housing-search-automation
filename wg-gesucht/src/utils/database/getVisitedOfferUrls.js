const { prisma } = require("./database/client");

export let getVisitedOfferUrls = async (profileId) => {
  let offers = await prisma.offer.findMany({
    where: { search: { profileId } },
    select: { url: true },
  });
  const urls = offers.map((offer) => offer.url);
  return urls;
};
