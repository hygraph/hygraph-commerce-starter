import stripe from '@/lib/stripe-client'

const stripeSigningSecret = (handler) => async (req, res) => {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.concat(chunks),
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET
    )
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }

  return handler(req, res, event)
}

export default stripeSigningSecret
