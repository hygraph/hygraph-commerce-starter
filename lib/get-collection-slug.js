import graphcmsClient, { gql } from '@/lib/graphcms-client'

export const getCollectionSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    collections(where: { slug: $slug }, locales: [$locale, en]) {
      id
      description
      name
      slug
      products {
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
  }
`

async function getCollectionBySlug({ locale = 'en', slug }) {
  const {
    collections: [collection]
  } = await graphcmsClient.request(getCollectionSlugQuery, {
    locale,
    slug
  })

  return { collection }
}

export default getCollectionBySlug
