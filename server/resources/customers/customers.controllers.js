// ett sätt att hämta alla kunder
// hämtar ut datan från customers.json filen

// en controller fuhktion för att hämta ut alla användare från vår fil och skickar tillbaka dem

const fetchCustomers = require("../../utils/fetchCustomers")

const getCustomers = async (req, res) => {
    const customers = await fetchCustomers()

    if(!customers || customers.length <= 0) {
        return res.status(400).json ("No customers found")
    }
    res.status(200).json(customers)
}

module.exports = { getCustomers }