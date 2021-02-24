import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import { loadStripe } from '@stripe/stripe-js'

import getNavigation from '@/lib/get-navigation'
import { useSettingsContext } from '@/context/settings'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function Cart() {
  const {
    cartTotal,
    emptyCart,
    items,
    removeItem,
    updateItemQuantity
  } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()

  const decrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity - 1)

  const incrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity + 1)

  const handleClick = async () => {
    const stripe = await stripePromise

    const { session } = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cancel_url: window.location.origin,
        currency: activeCurrency.code,
        items,
        locale: router.locale,
        success_url: window.location.origin
      })
    }).then((res) => res.json())

    await stripe.redirectToCheckout({
      sessionId: session.id
    })
  }

  return (
    <div>
      <button onClick={emptyCart}>Empty</button>
      {items.map((item) => {
        return (
          <div className="flex items-center" key={item.id}>
            <div className="w-1/6">
              <Image
                src={item.image.url}
                width={item.image.width}
                height={item.image.height}
              />
            </div>
            <div>
              <Link href={`/products/${item[router.locale].slug}`}>
                <a>{item[router.locale].name}</a>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div>
                <button onClick={() => decrementItemQuantity(item)}>
                  &#8210;
                </button>
              </div>
              <span>{item.quantity}</span>
              <div>
                <button onClick={() => incrementItemQuantity(item)}>
                  &#43;
                </button>
              </div>
            </div>
            <div>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
            <div>{item.itemTotal}</div>
          </div>
        )
      })}
      <p className="text-xl">{cartTotal}</p>
      <button onClick={handleClick}>Checkout</button>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const { navigation } = await getNavigation({ locale })

  return {
    props: {
      navigation
    }
  }
}

export default Cart
