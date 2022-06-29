import * as React from 'react'
import useSWR from 'swr'
import cc from 'classcat'

import { ChevronDownSmallIcon } from '@/icons'
import hygraphClient from '@/lib/hygraph-client'
import { ProductReviewsQuery } from '@/graphql/queries/reviews'
import ProductReviewForm from '@/components/product-review-form'

function ProductReviews({ product }) {
  const [isExpanded, setIsExpanded] = React.useState(true)

  const { data, error } = useSWR(
    [ProductReviewsQuery, product.id],
    (query, productId) => hygraphClient.request(query, { productId })
  )

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded)

  return (
    <div className="pt-6">
      <div className="border-b-2 pb-4">
        <button
          className="text-lg text-left w-full flex justify-between items-start text-gray-400"
          onClick={toggleExpanded}
        >
          <span className="font-medium text-gray-900">
            Reviews{' '}
            {data && (
              <React.Fragment>({data.reviews.aggregate.count})</React.Fragment>
            )}
          </span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDownSmallIcon
              className={cc([
                'h-6 w-6 transform',
                isExpanded ? '-rotate-180' : 'rotate-0'
              ])}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
      {isExpanded && (
        <div className="pt-4">
          {!data ? (
            'loading'
          ) : data.reviews.aggregate.count ? (
            <div className="divide-y-2 space-y-4">
              {data.reviews.edges.map(({ node: review }) => (
                <div key={review.id} className="first:pt-0 pt-4 space-y-4">
                  <div>
                    <p className="text-lg leading-6 font-medium text-gray-900">
                      {review.headline}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {review.name} &mdash;{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium'
                      }).format(new Date(review.createdAt))}
                    </p>
                  </div>
                  <p className="leading-5 text-gray-900">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <ProductReviewForm product={product} />
          )}
        </div>
      )}
    </div>
  )
}

export default ProductReviews
