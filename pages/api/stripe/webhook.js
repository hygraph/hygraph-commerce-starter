import createOrder from '@/lib/create-order'
import stripeSigningSecret from '@/lib/stripe-signing-secret'

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = async (req, res, event) => {
  const permittedEvents = ['checkout.session.completed']

  if (req.method === 'POST') {
    if (permittedEvents.includes(event.type)) {
      try {
        switch (event.type) {
          case 'checkout.session.completed':
            await createOrder({ sessionId: event.data.object.id })
            break
          default:
            throw new Error(`Unhandled event: ${event.type}`)
        }
      } catch (error) {
        res.status(500).json({ message: 'Unknown event' })
      }
    }

    res.status(204).json({ message: 'Received' })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default stripeSigningSecret(handler)
