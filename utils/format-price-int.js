export const formatPriceInt = ({ locale, price }) =>
  new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: locale.currency
  }).format(price / 100)
