const initStripe = require("../../stripe")
const fetchCustomers = require("../../utils/fetchCustomers")
const bcrypt = require("bcrypt")
const fs = require("fs").promises

const register = async (req, res) => {

    const { email, password, name } = req.body
   
    const customers = await fetchCustomers()
    const customerAlreadyExists = customers.find(c => c.email === email)
    

    if(customerAlreadyExists) {
        return res.status(400).json("Customer already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const stripeCustomer = {
        email
    }

    const stripe = initStripe()
    const addStripeCustomer = await stripe.customers.create({
        email: stripeCustomer.email,
      });

      const customerId = addStripeCustomer.id
    const newCustomer = {
        customerId,
        email,
        password: hashedPassword
    }

    customers.push(newCustomer)
        
    fs.writeFile("./data/customers.json", JSON.stringify(customers, null, 2))
    
    res.status(201).json(newCustomer.email)
}


const login = async(req, res) => {

    
    const { email, password } = req.body

    const customers = await fetchCustomers()
    const customerExists = customers.find(c => c.email === email)

    if (!customerExists || !await bcrypt.compare(password, customerExists.password)){
       
        return res.status(400).json("Wrong email or password") 
    }

    req.session.customer = customerExists

    res.status(200).json(customerExists.email)
}

const logout = (req, res) => {
    req.session = null
    res.status(200).json("Logga ut")
}

const authorize = (req, res) => {
    if (!req.session.customer) {
        return res.status(401).json ("Du är inte inloggad")
    }
    res.status(200).json(req.session.customer.email)
}
module.exports = { register, login, logout, authorize }









// FLÖDET
// 1. Det som finns i POST,  ex { "email" : "elin"} (skickas från klienten), så hammnar det i req.body
// req.body = "name" : "Elin" osv.... det i post-anropet
// 2. Det som kommer in måste parsas, från json till ett objekt. Det gör vi genom att alla anrop går igenom en middleware, app.use(express.json()) i server filen. Det tar bodyn i sträng format och kobnverterar. När detta är gjort så blir req.body objektet som finns i data filen
// 3. För att göra det memr lätt jobbat kan man destuckta ut email och password som på rad 3. Detta gör att vii plockar ut nycklarna i objektet och skapar variabler.

// DESSA VARIABLER (EMAIL OCH PASSWORD) KOMMER IN FRÅN KLIENTEN