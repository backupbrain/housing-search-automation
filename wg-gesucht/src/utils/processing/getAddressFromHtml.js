export let getAddressFromHtml = (html) => {
  let remainingHTML = html;
  let startSearch =
    '<a href="#mapContainer" style="line-height: 1.5em;font-weight: normal; color: #555; margin-bottom: 23px;">';
  let startSearchPos = remainingHTML.indexOf(startSearch);
  if (startSearchPos) {
    remainingHTML = remainingHTML.substring(
      startSearchPos + startSearch.length
    );
  }
  let endSearch = "</a>";
  let endSearchPos = remainingHTML.indexOf(endSearch);
  if (endSearchPos) {
    remainingHTML = remainingHTML.substring(0, endSearchPos);
  }
  let address = remainingHTML
    .replaceAll("<br>", "")
    .replace(/[\s\n]+/g, " ")
    .trim();
  return address;
};
