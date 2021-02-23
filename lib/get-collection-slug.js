import graphcmsClient, { gql } from '@/lib/graphcms-client'
import {
  CollectionFragment,
  ProductCardFragment
} from '@/lib/graphql-fragments'

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
    collection
  }
}

export default getCollectionBySlug
