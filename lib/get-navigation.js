import graphcmsClient, { gql } from '@/lib/graphcms-client'

export const getNavigationQuery = gql`
  query NavigationQuery($locale: Locale!) {
    categories(first: 1, locales: [$locale]) {
      id
      name
      slug
      type: __typename
    }
    collections(first: 1, locales: [$locale]) {
      id
      name
      slug
      type: __typename
    }
  }
`

async function getNavigation({ locale }) {
  const {
    categories,
    collections
  } = await graphcmsClient.request(getNavigationQuery, { locale })

  return [...categories, ...collections]
}

export default getNavigation
