export let getDistanceMatrix = (address1, address2) => {
  if (!process.env.GOOGLE_MAPS_API) {
    throw new Error("No GOOGLE_MAPS_API set in .env");
  }
  let queryParameters = URLSearchParams({
      origins: address1,
      destinations: address2,
      units: 'metric',
      key: process.env.GOOGLE_MAPS_API_KEY
  });
  let queryString = queryParameters.toString();
  let url = `https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}`;
  let response = await fetch(url);
  if (response.status !== 200) {
      throw new Error(response.text);
  }
  let responseJson = await response.json();
  return responseJson.rows;
  // {
  //     "destination_addresses": ["New York, NY, USA"],
  //     "origin_addresses": ["Washington, DC, USA"],
  //     "rows":
  //       [
  //         {
  //           "elements":
  //             [
  //               {
  //                 "distance": { "text": "228 mi", "value": 367654 },
  //                 "duration": { "text": "3 hours 55 mins", "value": 14078 },
  //                 "status": "OK",
  //               },
  //             ],
  //         },
  //       ],
  //     "status": "OK",
  //   }
  // find distances from responseJson
};
