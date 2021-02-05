import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { locales } from 'graphcms.config'
import { ProductCardFragment } from '@/lib/graphql-fragments'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en]) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale }) {
  const { products } = await graphcmsClient.request(getAllProductsQuery, {
    locale
  })

  const activeLocale = locales.find(({ value }) => value === locale)

  return products.map((product) => ({
    ...product,
    variants: product.variants.map((variant) => ({
      ...variant,
      formattedPrice: new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: activeLocale.currency
      }).format(variant.price / 100)
    }))
  }))
}

export default getAllProducts
