import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { CategoryFragment, CollectionFragment } from '@/lib/graphql-fragments'

export const getNavigationQuery = gql`
  query NavigationQuery($locale: Locale!) {
    currencies {
      id
      code
      default
      rate
    }
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
    collections,
    currencies
  } = await graphcmsClient.request(getNavigationQuery, { locale })

  return { navigation: { currencies, pages: [...categories, ...collections] } }
}

export default getNavigation
