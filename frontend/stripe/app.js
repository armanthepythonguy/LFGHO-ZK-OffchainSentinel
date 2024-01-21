const express = require('express')
var cors = require('cors')
const app = express()
const port = 3001
const Stripe = require('stripe');
const stripe = Stripe('YOUR STRIPE KEY');
app.use(cors())

app.use(express.json());
// app.get('/stripeValue', async(req, res) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 2000,
//         currency: 'usd',
//         automatic_payment_methods: {
//           enabled: true,
//         },
//       });
//     res.send(paymentIntent);
// });

app.post('/create-checkout-session', async (req, res) => {
    const product = await stripe.products.create({
        name: 'Tokens',
      });
      console.log(product,"product")
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 100,
        currency: 'usd',
      });
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: price.id,
          quantity: req.body.usd,
        },
      ],
      metadata:{
        address:req.body.address,
        collateral:req.body.usd,
        tokens:req.body.tokens
    },
      mode: 'payment',
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });
  console.log(session,"session")
   res.send(session.url)
  });

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
  })
