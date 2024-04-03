const express = require("express")
const { getCustomers } = require("./customers.controllers")
const {loggedIn} = require("../../middlewares/loggedIn")
const router = express.Router()

router.get("/", loggedIn, getCustomers)

module.exports = router