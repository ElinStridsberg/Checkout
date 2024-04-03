
// Vi vill kolla om användaren är inloggad
const loggedIn = (req, res, next) => {
    if (!req.session.customer) {
        return res.status(401).json ("You are not logged in")
    }
    next()
}

module.exports = { loggedIn }