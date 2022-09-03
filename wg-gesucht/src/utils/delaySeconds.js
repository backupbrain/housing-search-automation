export let delaySeconds = async (min, max) => {
  if (min >= max) {
    throw new Error("max must be greater than min");
  }
  const delaySeconds = Math.random() * (max - min) + min;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delaySeconds * 1000);
  });
};
