import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { CategoryFragment, ProductCardFragment } from '@/lib/graphql-fragments'
import { parseProduct } from '@/utils/parse-data'

export const getCategorySlugQuery = gql`
  query CategorySlugQuery($locale: Locale!, $slug: String!) {
    categories(where: { slug: $slug }, locales: [$locale, en]) {
      ...CategoryFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CategoryFragment, ProductCardFragment]}
`

async function getCategoryBySlug({ locale = 'en', slug }) {
  const {
    categories: [category]
  } = await graphcmsClient.request(getCategorySlugQuery, {
    locale,
    slug
  })

  return {
    category: {
      ...category,
      products: category.products.map((product) =>
        parseProduct({ locale, product })
      )
    }
  }
}

export default getCategoryBySlug
