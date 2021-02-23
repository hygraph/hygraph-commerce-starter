export const formatPriceInt = ({ currency, price }) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code
  }).format(price / 100)
