export const toDollar = (amount: number = 0) => {
  return new Intl.NumberFormat("en-BW", {
    style: "currency",
    currency: "BWP",
  }).format(amount);
};
