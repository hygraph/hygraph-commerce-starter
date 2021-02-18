import Image from 'next/image'
import Link from 'next/link'
import { useCart } from 'react-use-cart'

function Cart() {
  const {
    cartTotal,
    emptyCart,
    items,
    removeItem,
    updateItemQuantity
  } = useCart()

  const decrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity - 1)

  const incrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity + 1)

  return (
    <div>
      <button onClick={emptyCart}>Empty</button>
      {items.map((item) => {
        const itemTotal = item.quantity * item.price

        return (
          <div className="flex items-center" key={item.id}>
            <div className="w-1/6">
              <Image
                src={item.images[0].url}
                width={item.images[0].width}
                height={item.images[0].height}
              />
            </div>
            <div>
              <Link href={`/products/${item.slug}`}>
                <a>{item.name}</a>
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
            <div>{itemTotal}</div>
          </div>
        )
      })}
      <p className="text-xl">{cartTotal}</p>
    </div>
  )
}

export default Cart
