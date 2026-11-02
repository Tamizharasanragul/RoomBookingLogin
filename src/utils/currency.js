export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥', rate: 152.0, name: 'Japanese Yen' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, name: 'Indian Rupee' }
};

export const formatPrice = (amountInUSD, currencyCode = 'USD') => {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountInUSD * curr.rate;

  if (curr.code === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
};
