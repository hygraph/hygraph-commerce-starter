const description =
  'Learn how to build modern, SEO ready commerce storefronts with Hygraph, Next.js, Stripe, and Vercel.'
const title = 'Build Modern Commerce Experiences with a Headless CMS'
const url = 'https://commerce.withheadlesscms.com'

const seo = {
  title,
  titleTemplate: '%s | Hygraph',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  },
  twitter: {
    handle: '@Hygraphcom',
    site: '@Hygraphcom'
  }
}

export { seo as defaultSeo, url as defaultUrl }
