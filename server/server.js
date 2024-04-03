const express = require("express")
const cookieSession = require("cookie-session")
const cors = require("cors")

const customerRouter = require("./resources/customers/customers.router")
const authRouter = require("./resources/auth/auth.router")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60 * 24, // 1dygn
}))
//Routes
//Endpoint för att hämta alla användare
app.use("/api/customers", customerRouter);

//Endpoit för .. Alla anrop som kommer in på /api/auth kommer in i auth.router.js. Går igenom post/register och sen i register funktionen som ligger i auth.controller.js och kör koden där
app.use("/api/auth", authRouter)


app.listen(3001, () => console.log("Server is up and running...."))





// FLÖDET
// 1. Anropet kommer till server, går igenom alla middlewears. DEn kommer till app.use som betyder att alla anrop oavsett om det är get eller post, hoppa in här, matchar det med den url-en. Om ja, flyget anropet in i router (customerRouter).
// 2. Den kommer in i customer.router.js. Anropet kikar vidare om det är något mer efter /api/customer i ("/")? Nej, då fastnar den där och kör geCustomers.
// 3. getCustomers funktionen finns i customer.controllers.js. Och så görs allt i den filen och skickar tillbaka alla kunder.