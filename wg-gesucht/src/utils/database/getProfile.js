const { prisma } = require("./database/client");

export let getProfile = async (profileId) => {
  return await prisma.profile.findFirst({
    where: { id: profileId },
  });
};
