import Stripe from 'stripe'

import graphcmsClient, { gql } from '@/lib/graphcms-client'

export default async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  try {
    const { currency, items, locale, ...rest } = req.body

    const getProduct = async (id) => {
      const {
        product: { description, images, name, ...product }
      } = await graphcmsClient.request(
        gql`
          query ProductQuery($id: ID!, $locale: Locale!) {
            product(where: { id: $id }, locales: [$locale]) {
              productId: id
              description
              images(first: 1) {
                url
              }
              name
              price
            }
          }
        `,
        {
          id,
          locale
        }
      )

      return {
        currency,
        product_data: {
          description,
          metadata: {
            ...product
          },
          name,
          images: images.map((img) => img.url)
        },
        unit_amount: product.price
      }
    }

    const line_items = await Promise.all(
      items.map(async (item) => ({
        quantity: item.quantity,
        price_data: await getProduct(item.productId)
      }))
    )

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      locale,
      payment_method_types: ['card'],
      ...rest
    })

    res.status(201).json({ session })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'There was a problem creating the Stripe Checkout session'
    })
  }
}
