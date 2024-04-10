const express = require("express");
const { createCheckoutSession, verifySession } = require("./stripe.controller");
const router = express.Router();
const stripe = require("stripe")

router.post("/create-checkout-session", createCheckoutSession);
router.post("/verify-session", verifySession)
module.exports = router;
