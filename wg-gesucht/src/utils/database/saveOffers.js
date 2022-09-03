const fs = require("fs");
const path = require("path");

export let saveOffers = (data) => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/offers.json");
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
};
