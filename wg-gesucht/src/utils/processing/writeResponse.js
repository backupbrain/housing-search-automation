import { delaySeconds } from "../delaySeconds";

require("dotenv").config();
let { Configuration, OpenAIApi } = require("openai");
let configuration = new Configuration({
  organization: process.env.OPENAI_API_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
let openai = new OpenAIApi(configuration);

// let prompt = `BEGIN MY BIO

// I'm Tony.
//     I'm a programmer that moved to Vienna in March of this year for work.
//     I work from home but I enjoy going out in my free time.
//     I'm enjoying the relaxed nature of Vienna. I love how close to nature the city is and how easy it is to get around and experience the history, art, culture, museums, and activities.
//     I'm excited to live with roommates so that I can better understand Viennese culture, and to be more social.
//     I'm tidy and I love to cook. I'm quiet but I love socializing.

// END MY BIO

// BEGIN HOUSING AD

// I am not in Vienna in August and September and rent out my room for this time (just 1 month is also possible). It is quite a small, but bright and cozy room. The size is actually not a problem, because I actually only use it to sleep and relax. We work in the shared working space and all the fun life takes place anyway in the very large citchen and the "living room" (living and work are one big room - see picture).

// My room remains fully furnished. I would clear the large shelf and store my stuff in the sideboard. If you bring something big, I'm sure we can find a place in our storage room.
//  END HOUSING AD

// Write a cheerful three paragraph introduction to Jakob  explaining why I'm a good fit as a roommate for this apartment.

// Mention reasons why I might enjoy the 7th district of Vienna, that I'm looking to stay until the end of the year and use information from my bio.

// Use the housing ad as reference and make sure to include details that seem like a good fit, especially if it's a social atmosphere, good natural lighting, or lots of common space.:
// ========`;

// stopSequence = '========';

export let writeResponse = async (prompt, stopSequence) => {
  let model = "text-davinci-002";
  let maxTokens = 1000;
  let response = await openai.createCompletion({
    model,
    prompt: `${prompt}\n\n${stopSequence}\n`,
    max_tokens: maxTokens,
    temperature: 0.8,
    top_p: 1,
    n: 1,
    echo: false,
    stream: false,
    logprobs: null,
    stop: stopSequence,
  });
  if (response.status !== 200) {
    console.log({ response });
    console.log({ status: response.status });
    console.log({ error: response.error });
    console.log({ data: response.data });
  }
  if (response.data.choices.length === 0) {
    throw new Error("No response choices available");
  }
  let firstChoice = response.data.choices[0];

  if (firstChoice.finish_reason !== "stop") {
    throw new Error(
      `first choice stopped for reason: '${firstChoice.finish_reason}'`
    );
  }
  await delaySeconds(1);
  return firstChoice.text.trim("\n");
};
