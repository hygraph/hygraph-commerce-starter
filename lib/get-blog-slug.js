import graphcmsClient, { gql } from '@/lib/graphcms-client'
import { CategoryFragment } from '@/lib/graphql-fragments'

export const getPageSlugQuery = gql`
  query CategorySlugQuery($blogSlug: String!) {
    categories(where: { blogSlug: $blogSlug }) {
      ...CategoryFragment
    }
  }

  ${[CategoryFragment]}
`

async function getBlogBySlug({ blogSlug }) {
  const {
    categories: [category]
  } = await graphcmsClient.request(getPageSlugQuery, { blogSlug })

  return { blog: category.blog.items[0] }
}

export default getBlogBySlug
