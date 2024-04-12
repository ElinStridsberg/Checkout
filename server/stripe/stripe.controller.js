const initStripe = require("../stripe.js");
const fs = require("fs").promises;

const createCheckoutSession = async (req, res) => {
    const cart = req.body;

    const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

    try {
        const session = await stripe.checkout.sessions.create({
            customer: req.session.customer.customerId,
            mode: "payment",
            line_items: cart.map(checkoutItem => {
                return {
                    price: checkoutItem.product.default_price.id,
                    quantity: checkoutItem.quantity
                };
            }),
            success_url: "http://localhost:5173/confirmation",
            cancel_url: "http://localhost:5173",
        });

        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create checkout session." });
    }
};

const verifySession = async (req, res) => {
    const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

    try {
        const sessionId = req.body.sessionId;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

            const order = {
                orderNumber: Math.floor(Math.random() * 100000000),
                customerName: session.customer_details.name,
                products: lineItems.data,
                total: session.amount_total,
                date: new Date()
            };

            let orders = [];
            try {
                const data = await fs.readFile("./orders.json", "utf8");
                orders = JSON.parse(data);
            } catch (error) {
                console.error("Error reading orders file:", error);
            }

            orders.push(order);

            try {
                await fs.writeFile("./orders.json", JSON.stringify(orders, null, 4), "utf8");
            } catch (error) {
                console.error("Error writing to orders file:", error);
            }

            res.status(200).json({ verified: true });
        } else {
            res.status(400).json({ error: "Betalning ej slutförd." });
        }
    } catch (error) {
        console.error("Fel uppstod vid verifiering av sessionen:", error);
        res.status(500).json({ error: "Misslyckades med att verifiera sessionen." });
    }
};

module.exports = { createCheckoutSession, verifySession };
