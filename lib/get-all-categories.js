import graphcmsClient, { gql } from '@/lib/graphcms-client'

export const getAllCategoriesQuery = gql`
  query AllCategoriesQuery($locale: Locale!) {
    categories(locales: [$locale, en]) {
      id
      description
      name
      slug
    }
  }
`

async function getAllCategories({ locale = 'en' } = {}) {
  const { categories } = await graphcmsClient.request(getAllCategoriesQuery, {
    locale
  })

  return { categories }
}

export default getAllCategories
