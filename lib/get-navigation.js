import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { CategoryFragment, CollectionFragment } from '@/lib/graphql-fragments'

export const getNavigationQuery = gql`
  query NavigationQuery($locale: Locale!) {
    categories(first: 1, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    collections(first: 1, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
  }

  ${[CategoryFragment, CollectionFragment]}
`

async function getNavigation({ locale }) {
  const {
    categories,
    collections
  } = await graphcmsClient.request(getNavigationQuery, { locale })

  return [...categories, ...collections]
}

export default getNavigation
