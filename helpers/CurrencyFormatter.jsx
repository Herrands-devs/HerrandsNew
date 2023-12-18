export const formatCurrency = (amount) => {
  const formattedAmount = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

  return formattedAmount;
};

export const shortenString = (inputString, maxLength) => {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength - 3) + '...';
  }
}

// Example usage:
const longString = "This is a very long string that needs to be shortened.";
const shortened = shortenString(longString, 20);
console.log(shortened);  // Output: "This is a very lon..."

