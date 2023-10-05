import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51LQ9KCJw7SyqSl04K6zp80bF4y4ruV2uqGr0UPzZy6R4L5kEz4SY2FpKcrnAJBEr0IaKhqbqR9UVbxJDDNp5hQbR00DWs4jR3W");
export default async function handler(req, res) {
    const id = req.query.id;
  
    try {
      if (!id.startsWith('cs_')) {
        throw Error('Incorrect CheckoutSession ID.');
      }
      const checkout_session = await stripe.checkout.sessions.retrieve(id);
  
      res.status(200).json(checkout_session);
    } catch (err) {
        console.log("cheh");
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
  