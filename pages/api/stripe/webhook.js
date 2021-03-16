import createOrder from '@/lib/create-order'

export default async (req, res) => {
  const permittedEvents = ['checkout.session.completed']

  if (req.method === 'POST') {
    if (permittedEvents.includes(req.body.type)) {
      try {
        switch (req.body.type) {
          case 'checkout.session.completed':
            await createOrder({ sessionId: req.body.data.object.id })
            break
          default:
            throw new Error(`Unhandled event: ${req.body.type}`)
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
