# Hygraph Commerce Starter

Build modern, SEO ready commerce storefronts with Hygraph, Next.js, Stripe and Tailwind CSS

[![Clone project](https://graphcms.com/button)](https://app.graphcms.com/clone/d6ae678601534be5a7bde7fba69acd24?name=Commerce%20Shop)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FGraphCMS%2Fgraphcms-commerce-starter&env=HYGRAPH_MUTATION_TOKEN,HYGRAPH_QUERY_TOKEN,HYGRAPH_ENDPOINT,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,STRIPE_SECRET_KEY&envDescription=Stripe%20keys%20and%20GraphCMS%20tokens&envLink=https%3A%2F%2Fgithub.com%2FGraphCMS%2Fgraphcms-commerce-starter%23usage&demo-title=GraphCMS%20Commerce%20Starter&demo-description=Build%20modern%2C%20SEO%20ready%20commerce%20storefronts%20with%20GraphCMS%2C%20Next.js%2C%20Stripe%20and%20Tailwind%20CSS&demo-url=https%3A%2F%2Fcommerce.withheadlesscms.com)

## About

This project is an example of how to build fully-functioning Next.js commerce storefront with Hygraph and Stripe. View the demo on [https://commerce.withheadlesscms.com/](https://commerce.withheadlesscms.com/).

## Features

- Fully localized product catalogue built with [Hygraph localization](https://hygraph.com/content-localization) and [Next.js](https://nextjs.org/docs/advanced-features/i18n-routing).
- Pre-rendered catalogue pages via [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).
- Dynamic client-side data fetching via [SWR](https://swr.vercel.app).
- Localized shopping cart with [`react-use-cart`](https://github.com/notrab/react-use-cart).
- Hosted checkout and payment flow with [Stripe Checkout](https://stripe.com/docs/payments/checkout).
- Use the [Hygraph mutation API](https://hygraph.com/mutation-api) with [API Routes](https://nextjs.org/docs/api-routes/introduction) to create orders on successful checkout (via webhook).
- Multiple currency support.

## Usage

> This reference application requires a Stripe account

1. Clone the repository with [`degit`](https://github.com/Rich-Harris/degit) and install project dependencies.

```bash
npx degit Hygraph/hygraph-commerce-starter#main hygraph-commerce-starter
cd hygraph-commerce-starter
yarn
```

2. Create a new Hygraph project using the `Commerce Starter` template.

3. Add a `.env` file by cloning `.env.sample` and providing the required variable values.

> It is recommended you create separate Hygraph [auth tokens](https://hygraph.com/docs/authorization#permanent-auth-tokens) to handle querying and mutating data.

```
HYGRAPH_MUTATION_TOKEN=
HYGRAPH_QUERY_TOKEN=
HYGRAPH_ENDPOINT=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SIGNING_SECRET=
```

4. Setup a [Stripe webhook](https://stripe.com/docs/payments/handling-payment-events) for the `checkout.session.completed` event to order to enable Hygraph fulfilment via the mutation API.

5. Configure support for more locales or currencies in [`hygraph.config.js`](hygraph.config.js) if required. Learn more [here](#configuration).

6. Run `yarn dev`

## Configuration

Project configuration for supported locales and currencies is managed in [`hygraph.config.js`](hygraph.config.js).

> It is important that the `locales` array reflects the enabled locales in your Hygraph project.

```js
module.exports = {
  locales: [
    {
      value: 'en',
      label: 'English',
      default: true
    },
    {
      value: 'de',
      label: 'German'
    }
  ],
  currencies: [
    {
      code: 'GBP',
      default: true
    },
    {
      code: 'EUR'
    }
  ]
}
```
