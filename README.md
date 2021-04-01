<h2 align="center">
  graphcms-commerce-starter
</h2>

<p align="center">Build modern, SEO ready commerce storefronts with GraphCMS, Next.js, Stripe and Tailwind CSS</p>

## About

This project is an example of how to build fully-functioning Next.js commerce storefront with GraphCMS and Stripe. View the demo on [https://commerce.withheadlesscms.com/](https://commerce.withheadlesscms.com/).

## Features

- Fully localized product catalogue built with [GraphCMS localization](https://graphcms.com/content-localization) and [Next.js](https://nextjs.org/docs/advanced-features/i18n-routing).
- Pre-rendered catalogue pages via [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) and [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).
- Dynamic client-side data fetching via [SWR](https://swr.vercel.app).
- Localized shopping cart with [`react-use-cart`](https://github.com/notrab/react-use-cart).
- Hosted checkout and payment flow with [Stripe Checkout](https://stripe.com/docs/payments/checkout).
- Use the [GraphCMS mutation API](https://graphcms.com/mutation-api) with [API Routes](https://nextjs.org/docs/api-routes/introduction) to create orders on successful checkout (via webhook).
- Multiple currency support.

## Usage

> This reference application requires a Stripe account

1. Clone the repository with [`degit`](https://github.com/Rich-Harris/degit) and install project dependencies.

```bash
npx degit GraphCMS/graphcms-commerce-starter#main graphcms-commerce-starter
cd graphcms-commerce-starter
yarn
```

2. Create a new GraphCMS project using the `Commerce Starter` template.

3. Add a `.env` file by cloning `.env.sample` and providing the required variable values.

> It is recommended you create separate GraphCMS [auth tokens](https://graphcms.com/docs/authorization#permanent-auth-tokens) to handle querying and mutating data.

```
GRAPHCMS_MUTATION_TOKEN=
NEXT_PUBLIC_GRAPHCMS_TOKEN=
NEXT_PUBLIC_GRAPHCMS_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

4. Setup a [Stripe webhook](https://stripe.com/docs/payments/handling-payment-events) for the `checkout.session.completed` event to order to enable GraphCMS fulfilment via the mutation API.

5. Configure support for more locales or currencies in [`graphcms.config.js`](graphcms.config.js) if required. Learn more [here](#configuration).

6. Run `yarn dev`

## Configuration

Project configuration for supported locales and currencies is managed in [`graphcms.config.js`](graphcms.config.js).

> It is important that the `locales` array reflects the enabled locales in your GraphCMS project.

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
