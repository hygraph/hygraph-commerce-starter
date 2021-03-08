import * as React from 'react'
import useSWR from 'swr'

import { ProductReviewsQuery } from '@/graphql/queries/reviews'
import graphcmsClient from '@/lib/graphcms-client'

function ProductReviews({ id }) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const { data, error } = useSWR(
    [ProductReviewsQuery, id],
    (query, productId) => graphcmsClient.request(query, { productId })
  )

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded)

  return (
    <div>
      <button onClick={toggleExpanded}>
        Reviews ({data?.reviews.aggregate.count || 0})
      </button>
      <div>
        {isExpanded &&
          (data ? (
            <pre>{JSON.stringify(data.reviews.edges, null, 2)}</pre>
          ) : (
            'loading'
          ))}
      </div>
    </div>
  )
}

export default ProductReviews
