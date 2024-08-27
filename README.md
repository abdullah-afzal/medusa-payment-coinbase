# medusa-payment-coinbase

[Documentation](https://github.com/abdullah-afzal/medusa-payment-coinbase/blob/main/README.md)

If you are not familiar with Medusa, you can learn more on [the project web site](https://www.medusajs.com/).

> Medusa is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any product that needs foundational commerce primitives. All modules are open-source and freely available on npm.

<h2>
  Note: This plugin will be migrated to Medusa v2, when v2 will reach production readiness.
</h2>

## What is it?
An Onchain Payment provider using CoinBase intigration with Medusa.

---

## Prerequisites

- [Medusa backend](https://docs.medusajs.com/development/backend/install)
- [Coinbase Account](https://www.coinbase.com/)

---

## How to Install

1. Install the package with `yarn add medusa-payment-coinbase` or `npm i medusa-payment-coinbase`
2. Set the following environment variables in your `.env` file:

  ```bash
  COINBASE_API_KEY=<YOUR_COINBASE_X-CC-Api-Key>
  COINBASE_CANCEL_URL=<REDIRECT_URL_AFTER_CANCEL>
  COINBASE_REDIRECT_URL=<REDIRECT_URL_AFTER_PAYMENT_COMPLETE>
  ```
3. In `medusa-config.js` add the following at the end of the `plugins` array:

  ```js
  const plugins = [
    // ...
    {
      resolve: `medusa-payment-coinbase`,
      options: {
        api_key: process.env.COINBASE_API_KEY,
        cancel_url: process.env.COINBASE_CANCEL_URL,
        redirect_url: process.env.COINBASE_REDIRECT_URL,
      },
    },
  ]
  ```
4. Start project

  - After installation of a plugin, you will see new payment provider in regions named `CoinBase`.

## Test the Plugin

 After configuring and setting coinbase as payment provider, when you will select coinbase to complete your payment on storefront
 you will get checkout url by ```session.data.hosted_url``` where session is payment_session_data of selected payment provider
---

## Proposals, bugs, improvements

If you have an idea, what could be the next highest priority functionality, do not hesistate raise issue here: [Github issues](https://github.com/abdullah-afzal/medusa-payment-coinbase/issues)

## License

MIT

## Pro versions

This comunity version is only enables you to create hosted payment url for your cart and complete payment. The Pro version of medusa-payment-coinbase expands on the features of the free version with more advanced capabilities such as:
- Automatic Authorization of paymenet and placing order after completing payment
- Automatic payment capture for order
- Webhooks
- Refund, Delete payment
- Dedicated integration support for your project (Diamond package)

The Pro version is available under commercial licence - contact [abdullah-afzal](https://github.com/abdullah-afzal) for more information.

---

© 2024 [abdullah-afzal](https://github.com/abdullah-afzal)

---
