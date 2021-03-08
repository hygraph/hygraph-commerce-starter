import * as React from 'react'
import useSWR from 'swr'

import { ProductReviewsQuery } from '@/graphql/queries/reviews'
import graphcmsClient from '@/lib/graphcms-client'

function ProductReviews({ id }) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const { data, error } = useSWR(
    isExpanded ? [ProductReviewsQuery, id] : null,
    (query, productId) => graphcmsClient.request(query, { productId })
  )

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded)
  return (
    <div>
      <button onClick={toggleExpanded}>Reviews</button>
      <div>
        {isExpanded ? (
          data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            'loading'
          )
        ) : null}
      </div>
    </div>
  )
}

export default ProductReviews
