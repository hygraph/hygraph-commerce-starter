import * as React from 'react'

import getAllCategories from '@/lib/get-all-categories'
import getCategoryBySlug from '@/lib/get-category-slug'
import getNavigation from '@/lib/get-navigation'
import ProductGrid from '@/components/product-grid'
import SEO from '@/components/seo'

function CategoryPage({ category }) {
  return (
    <React.Fragment>
      <SEO title={category.name} {...category} />
      <ProductGrid products={category.products} />
    </React.Fragment>
  )
}

export async function getStaticPaths({ locales }) {
  let paths = []

  for (const locale of locales) {
    const { categories } = await getAllCategories({ locale })

    paths = [
      ...paths,
      ...categories.map((category) => ({
        params: { slug: category.slug },
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
  const { category } = await getCategoryBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      category,
      navigation
    }
  }
}

export default CategoryPage
