import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.GRAPHCMS_URL, {
  headers: {
    ...(process.env.GRAPHCMS_TOKEN && {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    })
  }
})

export { gql }
