export let splitName = (fullName) => {
  const names = {
    first: undefined,
    middle: undefined,
    last: undefined,
  };
  const lastNameTitles = [
    "bin",
    "de",
    "aux",
    "de",
    "des",
    "la",
    "le",
    "el",
    "al",
    "les",
    "von",
    "van",
    "der",
    "die",
  ];
  const allNames = fullName.replace(/\s+/, " ").split(" ");
  if (allNames[0] !== "") {
    names.first = allNames[0];
  }
  let lastName = undefined;
  let middleName = undefined;
  if (allNames.length > 1) {
    const remainingNames = allNames.slice(1);
    let earliestLastNamePos = remainingNames.length;
    for (let lastNameTitle of lastNameTitles) {
      let lastNameTitlePos = remainingNames.indexOf(lastNameTitle);
      if (lastNameTitlePos >= 0 && lastNameTitlePos < earliestLastNamePos) {
        earliestLastNamePos = lastNameTitlePos;
        lastName = allNames.slice(lastNameTitlePos + 1).join(" ");
        middleName = allNames.slice(1, lastNameTitlePos + 1).join(" ");
      }
    }
    if (!lastName) {
      lastName = allNames[allNames.length - 1];
      if (allNames.length > 2) {
        middleName = allNames.slice(1, allNames.length - 1).join(" ");
      }
    }
    if (middleName !== "") {
      names.middle = middleName;
    }
    if (lastName !== "") {
      names.last = lastName;
    }
  }
  return names;
};
