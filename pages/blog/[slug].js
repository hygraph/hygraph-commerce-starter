import * as React from 'react'

import getPageData from '@/lib/get-page-data'
import getAllCategories from '@/lib/get-all-categories'
import getBlogBySlug from '@/lib/get-blog-slug'

function Blog({ blog }) {
  return (
    <React.Fragment>
      <pre>{JSON.stringify(blog.content.json, null, 2)}</pre>
    </React.Fragment>
  )
}

export async function getStaticPaths({ locales }) {
  let paths = []

  for (const locale of locales) {
    const { categories } = await getAllCategories({ locale })

    paths = [
      ...paths,
      ...categories
        .filter((category) => !!category.blog.items.length)
        .map((category) => ({
          params: {
            slug: category.blogSlug
          },
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
  const { blog } = await getBlogBySlug({ blogSlug: params.slug })

  return {
    props: {
      blog,
      ...pageData
    }
  }
}

export default Blog
