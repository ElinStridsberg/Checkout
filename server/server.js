const express = require("express")
const cookieSession = require("cookie-session")
const cors = require("cors")
require("dotenv").config()
const stripe = require("stripe")("sk_test_51P1lzjP1cUqUxBHTIRZuyLra2NHhMqU8DY5SgM2qEjT5Fl3CEiRlaUX6gHsjKAOfM1PkkQJHWbw3HEBWiEf7fHgZ00ABWFNVBp")


const customerRouter = require("./resources/customers/customers.router")

const authRouter = require("./resources/auth/auth.router")

const stripeRouter = require("./stripe/stripe.router")

//INTE HÄMTAT
const { fetchProducts } = require("./stripe/stripe.controller")
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60 * 24, 
}))

//Routes
app.use("/api/customers", customerRouter);
app.use("/api/auth", authRouter)
app.use("/payments", stripeRouter)
app.get("/products", async (req, res) => {
    try {
        const products = await stripe.products.list({
            expand: ["data.default_price"]
        });
        res.status(200).json(products);
    } catch (error) {
        console.error('Ett fel uppstod:', error);
        res.status(500).json({ error: 'unable to fetch products' });
    }
});


app.listen(3001, () => console.log("Server is up and running...."))

