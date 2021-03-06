var path = require('path');
var createError = require('http-errors');
var express = require('express');
const session = require('express-session'); // session is a function
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./db');
const { User } = db;
const { Op } = require('sequelize');

// initialize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store)

// Create Session Store link to database
var sessionStore = new SequelizeStore({ db: db.sequelize})

// create/sync database table
sessionStore.sync()

// ======== PASSPORT FILES========================
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
// Strategy takes 2 args:
// 1. config object with clientID, clientSecret, callbackUrl
// 2. callback/middleware of (accessToken, refreshToken, profile, cb)
// ===============================================

var app = express();
const helmet = require('helmet');

// ============HELMET CONFIG===============
app.use(helmet({
    // options for CSP
    contentSecurityPolicy: {
      directives: {
        // less specific directives use the defaultSrc origins
        defaultSrc: [
          "'self'",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
          "https://maxcdn.bootstrapcdn.com"
        ],
        scriptSrc: [
          "'self'",
          "https://ajax.googleapis.com",
          "https://maxcdn.bootstrapcdn.com",
        ],
        imgSrc: [
            "'self'",
          "http://image.tmdb.org"
        ]
      }
  }
}));
// ========================================

// ============PASSPORT CONFIG=============
// configure session before initializing passport

app.use(cookieParser());
app.use(session({
  store: sessionStore,
  name: "magic_session",
  secret: process.env.SESSION_SECRET, // secret key is just salt to make session id harder to crack
  resave: false,
  saveUninitialized: true,
  cookie: {
      path: '/',
      httpOnly: true,
      secure: false, // set to false when using http connection
      maxAge: 5000  // max age in milliseconds
  }
}))

app.use(passport.initialize());
app.use(passport.session()); // requires express-session

// Get the configuration object
const { configPassport } = require('./config')
// passport middleware - Strategy needs a verify callback
passport.use(new GitHubStrategy(configPassport,
    async (accessToken, refreshToken, profile, cb) => {
      // verify callback, called upon successful authentication
      // The verify callback must call cb providing a user to complete authentication process


        const {id: github_id, displayName: name} = profile;

        // Find or create returns [foundObject, boolean indicating of record was just created]
        let [user, created] = await User.findOrCreate({
            logging: true,
            where: {"github_id": {[Op.eq]: github_id}},
            defaults: {
                name: name,
                github_id: github_id,
            },
            attributes: ['name', ['github_id', 'githubId'], 'id']
        })
        console.log(Object.keys(user.dataValues))
        // clean up user object
        user = {id: user.id, name: user.name, githubId: user.getDataValue('githubId')}

        return cb(null, user)  // return cb(error, user), have no error object here though

    })
)

passport.serializeUser( (user, cb) => {
  cb(null, user); // store user
})

passport.deserializeUser((user, cb) => {
  cb(null, user); // restore user to req.user
})

// ========================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
