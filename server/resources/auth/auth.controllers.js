const fetchCustomers = require("../../utils/fetchCustomers")
const bcrypt = require("bcrypt")
const fs = require("fs").promises

const register = async (req, res) => {
    
    const { email, password } = req.body

    // Kolla så att inte användaren finns. 
    //För att göra det måste vi plocka ut alla användare från vår datababs (json-fil)
    const customers = await fetchCustomers()
    const customerAlreadyExists = customers.find(c => c.email === email)

    if(customerAlreadyExists) {
        return res.status(400).json("Customer already exists")
    }

    // Kryptera lösenordet. Vi tar lösenordet som användare har skickat in och krypterar det. För att kryptera lösenordet använder vi packetet bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10)

    // Sparar till databasen (json fil). Nedan ett exempel. Denna data ska komm från klienten
    const newCustomer = {
        email,
        password: hashedPassword
    }

    customers.push(newCustomer)
    // Uppe på rad 10 ligger alla kunder i variabeln customers.Nu tar vi dem och pushar in den nya kunden. Nu är customers vara det som redan var i filen plus den nya!
    // sedan skickar vi in det och lägger till i databasen (json-filen)n och stringefierar denna
    
    fs.writeFile ("./data/customer.json"), JSON.stringify(customers, null, 2)
    
    // Skicka tillbaka ett svar. Det vi vill skicka tillbaka till klienten är i paranteserna
    res.status(201).json(newCustomer)
}

module.exports = {register}

// FLÖDET
// 1. Det som finns i POST,  ex { "email" : "elin"} (skickas från klienten), så hammnar det i req.body
// req.body = "name" : "Elin" osv.... det i post-anropet
// 2. Det som kommer in måste parsas, från json till ett objekt. Det gör vi genom att alla anrop går igenom en middleware, app.use(express.json()) i server filen. Det tar bodyn i sträng format och kobnverterar. När detta är gjort så blir req.body objektet som finns i data filen
// 3. För att göra det memr lätt jobbat kan man destuckta ut email och password som på rad 3. Detta gör att vii plockar ut nycklarna i objektet och skapar variabler.

// DESSA VARIABLER (EMAIL OCH PASSWORD) KOMMER IN FRÅN KLIENTEN