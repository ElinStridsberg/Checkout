const initStripe = require("../stripe.js");
const stripe = require("stripe")
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
const fetchProducts = async (req, res) => {
    try {
        const stripeInstance = initStripe();
        const products = await stripeInstance.products.list({
            limit: 6,
        });
        console.log('Hämtade produkter:', products.data);
        res.status(200).json(products.data);
    } catch (error) {
        console.error('Ett fel uppstod:', error);
        res.status(500).json({ error: 'unable to fetch products' });
    }
};

module.exports = { createCheckoutSession, fetchProducts };
