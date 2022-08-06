import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`
  }
})

export { gql }
