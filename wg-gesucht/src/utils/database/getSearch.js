const { prisma } = require("./database/client");

export let getSearch = async (searchId) => {
  return await prisma.search.findFirst({
    where: {
      id: searchId,
    },
  });
};
