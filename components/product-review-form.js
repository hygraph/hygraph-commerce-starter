import { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { ProductReviewsQuery } from '@/graphql/queries/reviews'
import Button from '@/ui/button'

function ProductReviewForm({ product }) {
  const { errors, handleSubmit, register } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(),
        email: yup.string().required().email(),
        headline: yup.string().required(),
        name: yup.string().required()
      })
    )
  })

  const onSubmit = async (data) => {
    mutate(
      [ProductReviewsQuery, product.id],
      async ({ reviews: { aggregate, edges } }) => {
        try {
          const { review } = await fetch(
            '/api/graphcms/create-product-review',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                product: { connect: { id: product.id } },
                ...data
              })
            }
          ).then((res) => res.json())

          return {
            reviews: {
              aggregate: { count: ++aggregate.count },
              edges: [...edges, { node: review }]
            }
          }
        } catch (error) {
          console.log(error)
        }
      },
      false
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
          htmlFor="headline"
        >
          Headline
        </label>
        <input
          className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
          id="headline"
          name="headline"
          ref={register}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
            id="name"
            name="name"
            ref={register}
          />
        </div>
        <div>
          <label
            className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
            id="email"
            name="email"
            type="email"
            ref={register}
          />
        </div>
      </div>
      <div>
        <label
          className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
          htmlFor="content"
        >
          Review
        </label>
        <textarea
          className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
          rows={4}
          id="content"
          name="content"
          ref={register}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default ProductReviewForm
