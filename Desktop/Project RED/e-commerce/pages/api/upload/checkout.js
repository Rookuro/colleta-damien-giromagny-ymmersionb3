const stripeAPI = require('stripe')("sk_test_51LQ9KCJw7SyqSl04K6zp80bF4y4ruV2uqGr0UPzZy6R4L5kEz4SY2FpKcrnAJBEr0IaKhqbqR9UVbxJDDNp5hQbR00DWs4jR3W");

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).json({ error: 'You can only make POST requests on this route' });

  const { line_items, customer_email } = req.body;
  if (!line_items || !customer_email)
    return res.status(400).json({ error: 'Missing required session paramaters' });

  let session;
  try {
    console.log("pk pas");
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email,
      success_url: `http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/checkout/canceled`,
      shipping_address_collection: { allowed_countries: ['MY', 'SG'] },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.log("ça marche pas");
    return res.status(400).json({ error: 'Error, unable to create session' });
  }
}
