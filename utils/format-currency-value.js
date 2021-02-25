export const formatCurrencyValue = ({ currency, value }) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code
  }).format(value / 100)
