const express = require("express");
const { createCheckoutSession, fetchProducts } = require("./stripe.controller");
const router = express.Router();
const stripe = require("stripe")

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
