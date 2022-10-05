// node --experimental-repl-await
import "dotenv/config";
import { getOrCreateProfile } from "./utils/database/getOrCreateProfile";
import { getOrCreateUser } from "./utils/database/getOrCreateUser";

let defaultUser = {
  email: "tonyg_2@yahoo.com",
  hashedPassword: "invalid",
};

let defaultProfile = {
  firstName: "Tony",
  lastName: "Gaitatzis",
  email: "tonyg_2@yahoo.com",
  websiteUsername: process.env.WGGESUCHT_DEFAULT_USERNAME,
  websitePassword: process.env.WGGESUCHT_DEFAULT_PASSWORD,
  bio: `
        I'm Tony.
        I'm a programmer that moved to Vienna in March of this year for work. 
        I work from home but I enjoy going out in my free time.
        I'm enjoying the relaxed nature of Vienna. I love how close to nature the city is and how easy it is to get around and experience the history, art, culture, museums, and activities.
        I'm excited to live with roommates so that I can better understand Viennese culture, and to be more social.
        I'm tidy and I love to cook. I'm quiet but I love socializing.
    `,
};

let defaultSearch = {
  maxPrice: 650,
  minRoomSizeSquareMeters: 15,
  startDateMin: new Date("2022-09-25"),
  startDateMax: new Date("2022-10-05"),
  endDateMin: new Date("2022-12-25"),
  endDateMax: new Date("2023-01-05"),
  mustBeFurnished: true,
  needsWashingMachine: true,
  needsWifi: true,
  mustBeStudensOk: false,
  mustBeEnglishOk: false,
  mustBeMalesOk: true,
  mustBeLgbtqOk: false,
  mustBeNonSmoking: true,
  cityId: 163, // 163 = Vienna
  districts: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  rentTypes: JSON.stringify([1]), // 0 = permanent, 1 = temporary, 2 = overnight
  categories: JSON.stringify([0]), //// 0 = shared, 1 = 1 room, 2 = apartment, 3 = house
};

let user = await getOrCreateUser(defaultUser);
let profile = await getOrCreateProfile(user, defaultProfile);
let search = await createSearch(profile, defaultSearch);

console.log("profile found or created:");
console.log(profile.id);

console.log("search created:");
console.log(search.id);
