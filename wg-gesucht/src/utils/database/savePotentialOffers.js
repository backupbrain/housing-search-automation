const fs = require("fs");
const path = require("path");
const process = require("process");

export let savePotentialOffers = (data) => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/potentialOffers.json");
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
};
