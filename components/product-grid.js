import ProductCard from '@/components/product-card'

function ProductGrid({ products }) {
  return (
    <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
      {products.map(ProductCard)}
    </div>
  )
}

export default ProductGrid
