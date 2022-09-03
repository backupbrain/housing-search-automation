import express, { Request, Response } from "express";
import { Builder } from "selenium-webdriver";
import { acceptCookies } from "./automator/acceptCookies";
import { goToHomePage } from "./automator/goToHomePage";
import { prisma } from "./database/database";
const app = express();
const port = 5050;
let driver = new Builder().forBrowser("chrome").build();

/*
cerate endpoints to
* start browser
* stop browser
* start search
* pause search
* get current app search state (page, current offer, etc)
* get folders from the database
*/

app.get("/", async (request: Request, response: Response) => {
  response.send("Hello World!");
});

app.get("/actions/run", async (request: Request, response: Response) => {
  let currentUrl = await driver.getCurrentUrl();
  if (!currentUrl.startsWith("https://wg-gesucht.de")) {
    await goToHomePage({ driver });
    await acceptCookies({ driver });
    currentUrl = await driver.getCurrentUrl();
  }
  response.json({ currentUrl });
});

app.get("/data", async (request: Request, response: Response) => {
  const data = await prisma.wgHousingOffer.findMany({});
  response.json({ data });
});

app.listen(port, () => {
  console.log(`Housing Search Server listening on port ${port}`);
});
