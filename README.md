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

+ __APIKEY__: API key from the movie database.
+ __PORT__: port for server to listen on, default is 3000.
+ __SESSION_SECRET__: secret for `session` from `express-session`. Acts as salt.

## Sources

TMDB API Docs: https://developers.themoviedb.org/3/getting-started/introduction
