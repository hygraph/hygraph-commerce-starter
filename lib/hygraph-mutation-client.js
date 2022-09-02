import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_MUTATION_TOKEN}`
  }
})

export { gql }
