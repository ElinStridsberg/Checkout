const fs = require("fs").promises

const fetchCustomers = async () => {
    const data = await fs.readFile("./data/customers.json")
    const customers = JSON.parse(data)

    return customers
}

module.exports = fetchCustomers

//inte hämtat