export const formatCurrency = (amount) => {
  const formattedAmount = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

  return formattedAmount;
};
