import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    ...(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN && {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
    })
  }
})

export { gql }
