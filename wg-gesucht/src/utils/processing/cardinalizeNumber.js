export let cardinalizeNumber = (number) => {
  let strNumber = `${number}`;
  let ending = strNumber.substring(strNumber.length - 1);
  switch (ending) {
    case "1":
      return `${number}st`;
    case "2":
      return `${number}nd`;
    case "3":
      return `${number}rd`;
    default:
      return `${number}th`;
  }
};
