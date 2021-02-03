import 'tailwindcss/tailwind.css'

import Layout from '@/components/layout'

function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
