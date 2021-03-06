# Movie Fansite

Basic fansite using EJS template engine for frontend and express for backend.

## Table of Contents
+ [Description](#description)
+ [Technologies](#technologies)
+ [Environment Variables](#environment-variables)
+ [Sources](#sources)

## Description

Express server with EJS templating engine. Uses data from the TMDb API to display
currently showing movies and provides search functionality based on movie title and actors.

__Branches__

+ main: base Movie Fan Site
+ passport: OAuth github authentication via `passport` and `passport-github`.

## Technologies

+ Node.js and Express
+ EJS

## Environment Variables

a `.env` file is required with the following keys.
+ __APIKEY__: API key from the movie database.
+ __PORT__: port for server to listen on, default is 3000.
+ __SESSION_SECRET__: secret for `session` from `express-session`. Acts as salt. Set Manually 
  
Database environment variables
+ __DB_HOST__ : Host name
+ __DB_USER__ : Database Role/User name
+ __DB_PORT__ : Port for database
+ __DB_PASSWORD__ : password for User
+ __DB_DATABASE__ : name of database to access
+ __DB_CLIENT__ : the dialect of the database, i.e. postgres, mysql, etc.

see `.env.sample` for an example

## Other Configuration

a `configPassport.js` file in main directory is also required, this should hold info from TMDB app 
with clientID, clientSecret and callbackURL
```javascript
module.exports = {
        clientID: "*************",
        clientSecret: "**********************",
        callbackURL:  "protocol://host:PORT/auth"
}
```

see `.configPassport.js.sample` for an example

## Sources

TMDb API Docs: https://developers.themoviedb.org/3/getting-started/introduction
