// tar ut stripe så att vi kan använda denna instans överallt för att slippa ta in stripe i varje fil. Som ett context.

const Stripe = require("stripe")

const initStripe = () => {
    const apiKey = process.env.STRIPE_KEY
    if (!apiKey) return
    return new Stripe(apiKey, {
        apiVersion: "2023-10-16"
    })
    
} 

module.exports = initStripe