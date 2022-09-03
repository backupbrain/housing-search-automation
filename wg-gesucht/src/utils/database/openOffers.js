const fs = require("fs");
const path = require("path");

export let openOffers = () => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/offers.json");
  const rawData = fs.readFileSync(filename, "utf8");
  const offers = JSON.parse(rawData);
  return offers;
};
