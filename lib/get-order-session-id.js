import hygraphClient, { gql } from '@/lib/hygraph-client'

export const getOrderSessionIdQuery = gql`
  query OrderSessionIdQuery($id: String!) {
    orders(first: 1, stage: DRAFT, where: { stripeCheckoutId: $id }) {
      id
      orderItems {
        id
        product {
          images {
            id
            height
            url
            width
          }
          name
        }
        quantity
        total
      }
      total
    }
  }
`

async function getOrderBySessionId({ id }) {
  const {
    orders: [order]
  } = await hygraphClient.request(getOrderSessionIdQuery, {
    id
  })

  return {
    order
  }
}

export default getOrderBySessionId
