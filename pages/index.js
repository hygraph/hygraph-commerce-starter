import getAllProducts from '@/lib/get-all-products'
import getNavigation from '@/lib/get-navigation'
import ProductCard from '@/components/product-card'

function IndexPage({ products }) {
  return (
    <div className="gap-8 grid sm:grid-cols-2 md:grid-cols-3">
      {products.map(ProductCard)}
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const navigation = await getNavigation({ locale })
  const products = await getAllProducts({ locale })

  return {
    props: { navigation, products }
  }
}

export default IndexPage
