import { locales } from 'graphcms.config'
import { findActiveLocale } from '@/utils/find-active-locale'
import { formatPriceInt } from '@/utils/format-price-int'

export const parseProduct = ({ locale, product }) => {
  const activeLocale =
    findActiveLocale(locale) ||
    locales.find((locale) => Boolean(locale.default))

  return {
    ...product,
    formattedPrice: formatPriceInt({
      locale: activeLocale,
      price: product.price
    })
  }
}
