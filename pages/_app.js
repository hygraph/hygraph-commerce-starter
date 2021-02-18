import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'

import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}

export default App
