require('dotenv').config()

// Authentication Configuration for GitHub
module.exports = {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL:  process.env.GITHUB_CB,
}