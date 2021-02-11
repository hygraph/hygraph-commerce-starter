import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { ProductCardFragment } from '@/lib/graphql-fragments'
import { parseProduct } from '@/utils/parse-data'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, en]) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale = 'en' }) {
  const { products } = await graphcmsClient.request(getAllProductsQuery, {
    locale
  })

  return {
    products: products.map((product) => parseProduct({ locale, product }))
  }
}

export default getAllProducts
