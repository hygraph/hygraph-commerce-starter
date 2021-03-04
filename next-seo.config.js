const description =
  'Learn how to build with commerce experiences, with localization and SEO, using GraphCMS, NextJS, Tailwind, Stripe and Vercel.'
const title = 'Build Modern Commerce Experiences with a Headless CMS'
const url = 'https://commerce.withheadlesscms.com'

const seo = {
  title,
  titleTemplate: '%s | GraphCMS',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  },
  twitter: {
    handle: '@GraphCMS',
    site: '@GraphCMS'
  }
}

export { seo as defaultSeo, url as defaultUrl }
