export const delayForSeconds = async (min: number, max: number) => {
  if (min >= max) {
    throw Error("max must be bigger than min");
  }
  return Math.random() * (max - min) + min;
};
