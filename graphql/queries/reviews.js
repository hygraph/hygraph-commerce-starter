import { gql } from 'graphql-request'

const ProductReviewsQuery = gql`
  query ProductReviewsQuery($productId: ID!) {
    reviews: reviewsConnection(where: { product: { id: $productId } }) {
      aggregate {
        count
      }
      edges {
        node {
          id
          content
          email
          name
          rating
        }
      }
    }
  }
`

export { ProductReviewsQuery }
