const fetchCustomers = require("../../utils/fetchCustomers")

const getCustomers = async (req, res) => {
    try {
        const customers = await fetchCustomers()
        console.log(customers)

        if (!customers || customers.length <= 0) {
            return res.status(400).json("No customers found")
        }

        res.status(200).json(customers)
    } catch (error) {
        console.error("Error fetching customers:", error)
        res.status(500).json("Internal Server Error")
    }
}

module.exports = { getCustomers }
