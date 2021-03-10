import getAllProducts from '@/lib/get-all-products'
import getNavigation from '@/lib/get-navigation'
import ProductGrid from '@/components/product-grid'

function IndexPage({ products }) {
  return <ProductGrid products={products} />
}

export async function getStaticProps({ locale }) {
  const navigation = await getNavigation({ locale })
  const { products } = await getAllProducts({ locale })

  return {
    props: { ...navigation, products }
  }
}

export default IndexPage
