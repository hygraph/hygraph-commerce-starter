import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'

import { CurrencyProvider } from '@/context/currency'
import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </CurrencyProvider>
  )
}

export default App
