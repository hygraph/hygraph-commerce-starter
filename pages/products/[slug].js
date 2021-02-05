import getAllProducts from '@/lib/get-all-products'
import getProductBySlug from '@/lib/get-product-slug'
import getNavigation from '@/lib/get-navigation'

function ProductPage({ product }) {
  return <pre>{JSON.stringify(product, null, 2)}</pre>
}

export async function getStaticPaths({ locales }) {
  let paths = []

  for (const locale of locales) {
    const { products } = await getAllProducts({ locale })

    paths = [
      ...paths,
      ...products.map((product) => ({
        params: { slug: product.slug },
        locale
      }))
    ]
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ locale, params }) {
  const { navigation } = await getNavigation({ locale })
  const { product } = await getProductBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      product,
      navigation
    }
  }
}

export default ProductPage
