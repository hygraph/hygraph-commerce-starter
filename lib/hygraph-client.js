import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL, {
  headers: {
    ...(process.env.NEXT_PUBLIC_HYGRAPH_TOKEN && {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
    })
  }
})

export { gql }
