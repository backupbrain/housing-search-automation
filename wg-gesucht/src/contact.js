let contactButton = await driver.findElement(By.id("mailform"));
await driver.executeScript(
  "return arguments[0].scrollIntoView()",
  contactButton
);
await driver.executeScript("return arguments[0].click()", contactButton);

// 150 char limit!
const messageInput = await driver.findElement(By.id("message_input"));
await messageInput.sendKeys(text);

const sendButton = await driver.findElement(
  By.xpath(
    '//form[@id="messenger_form"]/div/div[5]/button[contains(@class,"create_new_conversation")]'
  )
);
await driver.executeScript("return arguments[0].click()", sendButton);

// go back to message input
await driver.executeScript("history.back()");
// go back to listing
await driver.executeScript("history.back()");
// go back to list
await driver.executeScript("history.back()");

const cardinalize = (number) => {
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

let script = `Hello ${contact},

My name is Tony and I'm looking for a room from October to December.

I saw that you are ${offer.numTenants} people in ${cardinalize(
  district
)}, which I would love to live in because ${districtReason}.

I would love to live with roommates

`;
