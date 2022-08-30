import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.HYGRAPH_ENDPOINT, {
  headers: {
    ...(process.env.HYGRAPH_QUERY_TOKEN && {
      Authorization: `Bearer ${process.env.HYGRAPH_QUERY_TOKEN}`
    })
  }
})

export { gql }
