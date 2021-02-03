import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { locales } from 'graphcms.config'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en]) {
      id
      images(first: 1) {
        id
        height
        url
        width
      }
      name
      slug
      variants(first: 1) {
        ... on ProductColorVariant {
          id
          name
          price
        }
        ... on ProductSizeColorVariant {
          id
          name
          price
        }
        ... on ProductSizeVariant {
          id
          name
          price
        }
      }
    }
  }
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
