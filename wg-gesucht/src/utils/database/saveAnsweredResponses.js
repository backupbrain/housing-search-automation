const fs = require("fs");
const path = require("path");

export let saveAnsweredResponses = (data) => {
  let pwd = process.cwd();
  try {
    pwd = __dirname;
  } catch (error) {}
  const filename = path.resolve(pwd, "data/answeredOffers.json");
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
};
