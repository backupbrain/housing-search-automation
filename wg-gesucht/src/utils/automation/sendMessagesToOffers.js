import { prisma } from "@prisma/client";
import { delaySeconds } from "../delaySeconds";
import { sendMessage } from "./sendMessage";
import { sendMessageToOffer } from "./sendMessageToOffer";

export let sendMessagesToOffers = async (driver, offers, minutesUntilBreak) => {
  let startTime = new Date();
  for (let row in offers) {
    console.log(`Applying to row ${row}`);
    let potentialOffer = offers[row];
    let currentTime = new Date();
    let timeSinceStart = currentTime - startTime;
    let minutesSinceStart = Math.round(
      ((timeSinceStart % 86400000) % 3600000) / 60000
    );
    if (minutesSinceStart > minutesUntilBreak) {
      console.log(
        `Time limit of ${minutesUntilBreak} minutes exceeded. Taking coffee break`
      );
      morePagesAvailable = false;
      break;
    }
    if (potentialOffer.expired) {
      console.log(`Offer ${row + 1} expired`);
      continue;
    }
    if (potentialOffer.contacted) {
      console.log(`Offer ${row + 1} already contacted`);
      continue;
    }
    if (!potentialOffer.response) {
      console.log(`No message available for offer ${row + 1}`);
      continue;
    }
    await sendMessageToOffer(driver, row, potentialOffer);
    // are we nervous before we send?
    delaySeconds(2, 10);
    await sendMessage(driver);
    // potentialOffer.contacted = true;
    await prisma.offer.update({
      where: { id: potentialOffer.id },
      data: { wasContacted: true },
    });
  }
};
