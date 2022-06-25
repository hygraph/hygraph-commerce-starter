import * as React from 'react'

import getAllCategories from '@/lib/get-all-categories'
import getCategoryBySlug from '@/lib/get-category-slug'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import SEO from '@/components/seo'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

function CategoryPage({ category }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <React.Fragment>
      <SEO title={category.name} {...category} />
      {!!category.carousel.length && (
        <div className="p-8">
          <Slider {...settings}>
            {category.carousel.map((banner) => (
              <Image
                key={banner.id}
                src={banner.image.url}
                height={150}
                width={1500}
                alt={banner.caption}
                title={banner.caption}
              />
            ))}
          </Slider>
        </div>
      )}
      {!!category.blog.items.length && (
        <div className="flex justify-center">
          <Link href={`/blog/${category.blogSlug}`}>
            <a className="p-8">
              {category.blogSlug.split('-').join(' ').toUpperCase()}
            </a>
          </Link>
        </div>
      )}
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
  const pageData = await getPageData({ locale })
  const { category } = await getCategoryBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      category,
      ...pageData
    }
  }
}

export default CategoryPage
