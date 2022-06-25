import { gql } from '@/lib/graphcms-client'

const CarouselFragment = gql`
  fragment CarouselFragment on Carousel {
    id
    caption
    image {
      id
      height
      url
      width
    }
  }
`

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    description
    name
    slug
    blogSlug
    blog {
      items {
        blogSlug
        content {
          json
        }
      }
    }
    carousel {
      id
      caption
      image {
        id
        height
        url
        width
      }
    }
  }
`

export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    description
    name
    slug
    carousel {
      id
      caption
      image {
        id
        height
        url
        width
      }
    }
  }
`

const ImageFragment = gql`
  fragment ImageFragment on Asset {
    id
    height
    url
    width
  }
`

export const ProductVariantFragment = gql`
  fragment ProductVariantFragment on ProductVariants {
    __typename
    ... on ProductColorVariant {
      id
      name
    }
    ... on ProductSizeColorVariant {
      id
      name
    }
    ... on ProductSizeVariant {
      id
      name
    }
  }
`

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    description
    images {
      ...ImageFragment
    }
    name
    price
    slug
    variants {
      ...ProductVariantFragment
    }
  }

  ${[ImageFragment, ProductVariantFragment]}
`

export const ProductCardFragment = gql`
  fragment ProductCardFragment on Product {
    id
    images(first: 1) {
      ...ImageFragment
    }
    name
    price
    slug
    variants(first: 1) {
      ...ProductVariantFragment
    }
  }

  ${[ImageFragment, ProductVariantFragment]}
`
