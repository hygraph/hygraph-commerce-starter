import { CartProvider } from 'react-use-cart'

import 'tailwindcss/tailwind.css'

import { CurrencyProvider } from '@/components/context/currency'
import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <CurrencyProvider {...pageProps}>
      <CartProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </CurrencyProvider>
  )
}

export default App
