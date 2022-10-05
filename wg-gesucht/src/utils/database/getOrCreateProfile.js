const { prisma } = require("./database/client");

export let getOrCreateProfile = async (user, defaultProfile) => {
  let foundProfile = await prisma.profile.findFirst({
    where: {
      email: defaultProfile.email,
      user: { email: user.email },
    },
  });
  if (foundProfile) {
    return foundProfile;
  }
  let data = defaultProfile;
  data.user = { connect: { email: user.email } };
  return await prisma.profile.create({ data });
};
