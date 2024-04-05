const initStripe = require("../stripe.js");

const createCheckoutSession = async (req, res) => {
    const cart = req.body; // Exempel: [{ product: "price_1P1mEXP1cUqUxBHTSo0Iug8N", quantity: 1 }, { product: "price_1P1m7KP1cUqUxBHT8MBE8J4X", quantity: 1 }]

    const stripe = initStripe();
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: cart.map(item => {
            return {
                price: item.product,
                quantity: item.quantity
            };
        }),
        success_url: "http://localhost:5173/confirmation",
        cancel_url: "http://localhost:5173",
    });

    res.status(200).json({ url: session.url });
};

module.exports = { createCheckoutSession };
