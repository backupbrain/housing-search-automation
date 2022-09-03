import { Driver } from "selenium-webdriver/chrome";

export type Props = {
  driver: Driver;
};
export const getCurrentPage = async ({ driver }: Props) => {
  const url = await driver.getCurrentUrl();
  const query = url.substring(url.indexOf("?") + 1);
  const splitQuery = query.split("&");
  const queryParams: { [key: string]: string } = {};
  for (let param of splitQuery) {
    const queryParamSet = param.split("=");
    queryParams[queryParamSet[0]] = queryParamSet[1];
    if (queryParamSet[0] === "pagination") {
      return parseInt(queryParamSet[1]);
    }
  }
  return undefined;
};
