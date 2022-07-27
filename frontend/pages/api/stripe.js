import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["IN"],
        },
        allow_promotion_codes: true,
        shipping_options: [{shipping_rate: "shr_1LOh7OSIJA9aZN6jUjBwHEtJ"}],
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.Title,
                images: [item.Image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.Price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
                enabled: true,
                minimum: 1,
            }
          };
        }),
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
}
