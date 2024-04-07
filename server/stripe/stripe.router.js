const express = require("express");
const { createCheckoutSession, fetchProducts } = require("./stripe.controller");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.get("/products", fetchProducts);  // Uppdaterat namn här

module.exports = router;
