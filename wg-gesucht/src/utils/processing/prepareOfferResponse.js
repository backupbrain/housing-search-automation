import { prisma } from "@prisma/client";
import { buildPrompt } from "./buildPrompt";
import { writeResponse } from "./writeResponse";

export let prepareOfferResponse = async (offer, bio) => {
  let stopSequence = "=====";

  const prompt = buildPrompt(offer, bio);
  const englishResponse = await writeResponse(prompt, stopSequence);

  let officialResponse = englishResponse;
  let germanResponse = undefined;
  let wasResponseTranslated = false;
  if (!offer.englishOk) {
    germanResponse = await translateEnglishToGerman(englishResponse);
    officialResponse = germanResponse;
    wasResponseTranslated = true;
  }
  return await prisma.offer.update({
    where: { id: offer.id },
    data: {
      prompt,
      englishResponse,
      germanResponse,
      officialResponse,
      wasAnalyzed: true,
      wasResponseTranslated,
    },
  });
};
