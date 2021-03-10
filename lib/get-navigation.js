import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { CategoryFragment, CollectionFragment } from '@/lib/graphql-fragments'

export const getNavigationQuery = gql`
  query NavigationQuery($locale: Locale!) {
    footerCategories: categories(first: 4, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    footerCollections: collections(first: 4, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
    navigationCategory: categories(first: 1, locales: [$locale, en]) {
      ...CategoryFragment
      type: __typename
    }
    navigationCollection: collections(first: 1, locales: [$locale, en]) {
      ...CollectionFragment
      type: __typename
    }
  }

  ${[CategoryFragment, CollectionFragment]}
`

async function getNavigation({ locale }) {
  const {
    footerCategories,
    footerCollections,
    navigationCategory,
    navigationCollection
  } = await graphcmsClient.request(getNavigationQuery, { locale })

  return {
    footer: { categories: footerCategories, collections: footerCollections },
    navigation: { pages: [...navigationCategory, ...navigationCollection] }
  }
}

export default getNavigation
