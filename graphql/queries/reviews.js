import { gql } from 'graphql-request'

const ProductReviewsQuery = gql`
  query ProductReviewsQuery($productId: ID!) {
    reviews(where: { product: { id: $productId } }) {
      id
      content
      email
      name
      rating
    }
  }
`

export { ProductReviewsQuery }
