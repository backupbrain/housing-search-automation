const { prisma } = require("./database/client");

export let createSearch = async (profileId, data) => {
  data.profileId = profileId;
  return await prisma.search.create({ data });
};
