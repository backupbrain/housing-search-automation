import { prisma } from "@prisma/client";
import { buildPrompt } from "./buildPrompt";
import { translateEnglishToGerman } from "./translate";
import { writeResponse } from "./writeResponse";

export let prepareOfferResponse = async (offer, bio) => {
  let stopSequence = "=====";

  const responsePrompt = buildPrompt(offer, bio);
  const englishResponse = await writeResponse(responsePrompt, stopSequence);

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
      responsePrompt,
      englishResponse,
      germanResponse,
      officialResponse,
      wasAnalyzed: true,
      wasResponseTranslated,
    },
  });
};
