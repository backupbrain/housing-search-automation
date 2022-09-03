import { detectLanguage } from "./detectLanguage";

export let splitLanguages = async (text) => {
  let splitText = { english: undefined, german: undefined };
  let paragraphs = text.split("\n");
  let languageParagraphs = { english: [], german: [] };
  for (let paragraph of paragraphs) {
    try {
      let language = await detectLanguage(paragraph);
      if (!(language in languageParagraphs)) {
        languageParagraphs[language] = [];
      }
      languageParagraphs[language].push(paragraph);
    } catch (error) {
      // ignore this text
    }
  }
  for (let language in languageParagraphs) {
    splitText[language] = languageParagraphs[language].join("\n");
  }
  return splitText;
};
