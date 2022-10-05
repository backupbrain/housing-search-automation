const { prisma } = require("./database/client");

export let getOrCreateUser = async (defaultUser) => {
  let foundUser = await prisma.user.findFirst({
    where: { email: defaultUser.email },
  });
  if (foundUser) {
    return foundUser;
  }
  return await prisma.user.create({ data: defaultUser });
};
