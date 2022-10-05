const { prisma } = require("./database/client");

export let getSearch = async (profileId, searchId) => {
  return await prisma.profile.findFirst({
    where: {
      searchId,
      profileId,
    },
  });
};
