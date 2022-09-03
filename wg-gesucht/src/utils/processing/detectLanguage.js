let cld = require("cld");

export let detectLanguage = async (text) => {
  let result = await cld.detect(text);
  let highestPercent = 0;
  let language = undefined;
  result.languages.forEach((possibleLanguage) => {
    if (possibleLanguage.percent > highestPercent) {
      highestPercent = possibleLanguage.percent;
      language = possibleLanguage.name.toLowerCase();
    }
  });
  return language;
};
