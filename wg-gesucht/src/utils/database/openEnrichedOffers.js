const fs = require("fs");
const path = require("path");

export let openEnrichedOffers = () => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/enrichedOffers.json");
  const rawData = fs.readFileSync(filename, "utf8");
  const offers = JSON.parse(rawData);
  return offers;
};
