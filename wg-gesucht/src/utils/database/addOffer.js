const { prisma } = require("./database/client");

export let addOffer = async (searchId, data) => {
  data.searchId = searchId;
  return await prisma.offer.create({ data });
};
