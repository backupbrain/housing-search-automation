require("dotenv").config();

export let translate = async (text, fromCode, toCode) => {
  console.log(`translating ${fromCode} -> ${toCode}: `);
  console.log(text);
  console.log("-------------------------------------");
  const paragraphs = text.split("\n");
  const translatedParagraphs = [];
  for (let paragraph of paragraphs) {
    if (paragraph === "") {
      translatedParagraphs.push("");
      continue;
    }
    let queryParams = new URLSearchParams({
      text: paragraph,
      from: fromCode,
      to: toCode,
    });
    let queryString = queryParams.toString();
    console.log(
      `https://nlp-translation.p.rapidapi.com/v1/translate?${queryString}`
    );
    try {
      let response = await fetch(
        `https://nlp-translation.p.rapidapi.com/v1/translate?${queryString}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
          },
        }
      );

      let responseJson = await response.json();
      console.log(responseJson);
      if (response.status !== 200) {
        throw new Error(responseJson.message);
      }
      translatedParagraphs.push(responseJson.translated_text[toCode]);
      await delaySeconds(1, 2);
    } catch (error) {
      console.error(error);
    }
  }
  const translatedText = translatedParagraphs.join("\n");
  return translatedText;
};

export let translateGermanToEnglish = async (germanText) => {
  return translate(germanText, "de", "en");
};

export let translateEnglishToGerman = async (englishText) => {
  return translate(englishText, "en", "de");
};
