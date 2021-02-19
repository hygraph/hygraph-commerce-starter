import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { ProductFragment } from '@/lib/graphql-fragments'
import { parseProduct } from '@/utils/parse-data'

export const getProductsSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    products(where: { slug: $slug }, locales: [$locale, en]) {
      ...ProductFragment
      localizations(includeCurrent: true) {
        locale
        name
        slug
      }
    }
  }

  ${ProductFragment}
`

async function getProductBySlug({ locale = 'en', slug }) {
  const {
    products: [product]
  } = await graphcmsClient.request(getProductsSlugQuery, {
    locale,
    slug
  })

  return { product: parseProduct({ locale, product }) }
}

export default getProductBySlug
