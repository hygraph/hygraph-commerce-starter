import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`
  }
})

export { gql }
