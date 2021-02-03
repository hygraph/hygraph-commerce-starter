import graphcmsClient, { gql } from '@/lib/graphcms-client'

export const getAllCollectionsQuery = gql`
  query AllCollectionsQuery($locale: Locale!) {
    collections(locales: [$locale, en]) {
      id
      description
      name
      slug
    }
  }
`

async function getAllCollections({ locale = 'en' } = {}) {
  const { collections } = await graphcmsClient.request(getAllCollectionsQuery, {
    locale
  })

  return { collections }
}

export default getAllCollections
