export let goToSearchPage = async (driver, search) => {
  // let offerFilter = 1; // look for offers
  // let cityId = 163; // Vienna
  // let maxRent = 650; // euros
  // let sortColumn = 0; // ?
  // let sortOrder = 0; // ?
  // let noDeact = 1; // L
  // let query = {
  //   offer_filter: offerFilter,
  //   city_id: cityId,
  //   sort_column: sortColumn,
  //   sort_order: sortOrder,
  //   noDeact,
  //   "categories%5B%5D": 0, // 0 = shared, 1 = 1 room, 2 = apartment, 3 = house
  //   "rent_types%5B%5D": 1, // 0 = permanent, 1 = temporary, 2 = overnight
  //   rMax: maxRent,
  // };
  let rentTypes = JSON.parse(search.rentTypes);
  let categories = JSON.parse(search.categories);
  let query = {
    offer_filter: 1,
    city_id: search.cityId,
    sort_column: 0,
    sort_order: 0,
    noDeact: 1,
    "categories%5B%5D": categories[0], // 0 = shared, 1 = 1 room, 2 = apartment, 3 = house
    "rent_types%5B%5D": rentTypes[0], // 0 = permanent, 1 = temporary, 2 = overnight
    rMax: search.maxPrice,
  };
  let queryPairs = [];
  for (let key in query) {
    queryPairs.push(`${key}=${query[key]}`);
  }
  let queryString = queryPairs.join("&");
  let startUrl = `https://www.wg-gesucht.de/wg-zimmer-und-wohnungen-in-Wien.163.0+2.1.0.html?${queryString}`;
  console.log(startUrl);
  await driver.get(startUrl);
};
