import * as React from 'react'

import getAllCollections from '@/lib/get-all-collections'
import getCollectionBySlug from '@/lib/get-collection-slug'
import getPageData from '@/lib/get-page-data'
import ProductGrid from '@/components/product-grid'
import SEO from '@/components/seo'
import Slider from 'react-slick'
import Image from 'next/image'

function CollectionPage({ collection }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <React.Fragment>
      <SEO title={collection.name} {...collection} />
      {!!collection.carousel.length && (
        <div className="p-8">
          <Slider {...settings}>
            {collection.carousel.map((banner) => (
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
      <ProductGrid products={collection.products} />
    </React.Fragment>
  )
}

export async function getStaticPaths({ locales }) {
  let paths = []

  for (const locale of locales) {
    const { collections } = await getAllCollections({ locale })

    paths = [
      ...paths,
      ...collections.map((collection) => ({
        params: { slug: collection.slug },
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
  const { collection } = await getCollectionBySlug({
    locale,
    slug: params.slug
  })

  return {
    props: {
      collection,
      ...pageData
    }
  }
}

export default CollectionPage
