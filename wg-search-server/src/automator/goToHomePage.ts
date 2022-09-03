import { ThenableWebDriver } from "selenium-webdriver";

export type Props = {
  driver: ThenableWebDriver;
};
export const goToHomePage = async ({ driver }: Props) => {
  const startUrl =
    "https://www.wg-gesucht.de/wg-zimmer-und-wohnungen-in-Wien.163.0+2.1.0.html?offer_filter=1&city_id=163&sort_column=0&sort_order=0&noDeact=1&categories%5B%5D=0&categories%5B%5D=2&rent_types%5B%5D=1&rMax=650";
  await driver.get(startUrl);
};
