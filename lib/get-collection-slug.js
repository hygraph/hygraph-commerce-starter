import graphcmsClient, { gql } from '@/lib/graphcms-client'
import {
  CollectionFragment,
  ProductCardFragment
} from '@/lib/graphql-fragments'
import { parseProduct } from '@/utils/parse-data'

export const getCollectionSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    collections(where: { slug: $slug }, locales: [$locale, en]) {
      ...CollectionFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CollectionFragment, ProductCardFragment]}
`

async function getCollectionBySlug({ locale = 'en', slug }) {
  const {
    collections: [collection]
  } = await graphcmsClient.request(getCollectionSlugQuery, {
    locale,
    slug
  })

  return {
    collection: {
      ...collection,
      products: collection.products.map((product) =>
        parseProduct({ locale, product })
      )
    }
  }
}

export default getCollectionBySlug
