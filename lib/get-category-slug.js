import graphcmsClient, { gql } from '@/lib/graphcms-client'

export const getCategorySlugQuery = gql`
  query CategorySlugQuery($locale: Locale!, $slug: String!) {
    categories(where: { slug: $slug }, locales: [$locale, en]) {
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

async function getCategoryBySlug({ locale = 'en', slug }) {
  const {
    categories: [category]
  } = await graphcmsClient.request(getCategorySlugQuery, {
    locale,
    slug
  })

  return { category }
}

export default getCategoryBySlug
