const initStripe = require("../stripe.js");

const createCheckoutSession = async (req, res) => {
    const cart = req.body; // Exempel: [{ product: "price_1P1mEXP1cUqUxBHTSo0Iug8N", quantity: 1 }, { product: "price_1P1m7KP1cUqUxBHT8MBE8J4X", quantity: 1 }]
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY); // Lägg till din Stripe API-nyckel här

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

// const fetchProducts = async (req, res) => {
//     app.get("/products", async (req, res) => {
//         const products = await stripe.products.list ({
//             expand: ["data-default_price"]
//         });
//         res.status(200).json(products)
    
//     });
    // try {
    //     const stripe = initStripe; // Lägg till din Stripe API-nyckel här

    //     const products = await stripe.products.list({
    //         expand: ["data.default_price"]
    //     });

    //     res.status(200).json(products);
    // } catch (error) {
    //     console.error('Ett fel uppstod:', error);
    //     res.status(500).json({ error: 'unable to fetch products' });
//     // }
// };

module.exports = { createCheckoutSession };
