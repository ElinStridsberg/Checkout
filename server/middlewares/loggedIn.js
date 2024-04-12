
// Vi vill kolla om användaren är inloggad
const loggedIn = (req, res, next) => {
    if (!req.session.customer) {
        return res.status(401).json ("Du är inte inloggad")
    }
    next()
}

module.exports = { loggedIn }