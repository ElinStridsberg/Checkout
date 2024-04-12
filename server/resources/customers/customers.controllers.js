const fetchCustomers = require("../../utils/fetchCustomers")

const getCustomers = async (req, res) => {
    try {
        const customers = await fetchCustomers()
        console.log(customers)

        if (!customers || customers.length <= 0) {
            return res.status(400).json("Inga kunder hittades")
        }

        res.status(200).json(customers)
    } catch (error) {
        console.error("Fel uppstod vid hämtning av kunder", error)
        res.status(500).json("Internal Server Error")
    }
}

module.exports = { getCustomers }
