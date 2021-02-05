import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { CategoryFragment } from '@/lib/graphql-fragments'

export const getAllCategoriesQuery = gql`
  query AllCategoriesQuery($locale: Locale!) {
    categories(locales: [$locale, en]) {
      ...CategoryFragment
    }
  }

  ${CategoryFragment}
`

async function getAllCategories({ locale = 'en' } = {}) {
  const { categories } = await graphcmsClient.request(getAllCategoriesQuery, {
    locale
  })

  return { categories }
}

export default getAllCategories
