import hygraphClient, { gql } from '@/lib/hygraph-client'
import { ProductCardFragment } from '@/lib/graphql-fragments'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en]) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale = 'en' }) {
  const { products } = await hygraphClient.request(getAllProductsQuery, {
    locale
  })

  return {
    products
  }
}

export default getAllProducts
