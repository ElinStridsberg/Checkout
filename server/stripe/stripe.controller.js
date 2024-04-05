const initStripe = require("../stripe.js")

const createCheckoutSession = async (req, res) => {
const stripe = initStripe()
const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
        {
            price: 'price_1P1mEXP1cUqUxBHTSo0Iug8N',
            quantity: 1,
        }
                ],
 //när man är klar med betalningen, vart ska vi hamna då?
 // confiramtion sida
    success_url: "http://localhost:5173/confirmation",
    cancel_url: "http://localhost:5173",
})

res.status(200).json({ url: session.url })
}

module.exports = { createCheckoutSession }