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
          createdAt
          email
          headline
          name
          rating
        }
      }
    }
  }
`

export { ProductReviewsQuery }
