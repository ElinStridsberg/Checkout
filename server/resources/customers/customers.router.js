const express = require("express")
const { getCustomers } = require("./customers.controllers")
const router = express.Router()

router.get("/", getCustomers)

module.exports = router