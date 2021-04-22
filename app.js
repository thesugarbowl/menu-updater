// DON'T USE HELMET! Makes d3 and accordion not work!
// The changes are IRREVERSIBLE even if uninstall helmet!

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');

// Import the mongoose module
var mongoose = require('mongoose');

// Authentication dependencies
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
const connection = require('./config/database');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/menu'); // Import routes for 'menu' area of site

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression()); // Compress all routes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * -------------- SESSION SETUP ----------------
 */

 const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

 app.use(session({
     secret: process.env.SECRET,
     resave: false,
     saveUninitialized: true,
     store: sessionStore,
     cookie: {
         maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
     }
 }));
 
 /**
  * -------------- PASSPORT AUTHENTICATION ----------------
  */
 
 // Need to require the entire Passport config module so app.js knows about it
 require('./config/passport');
 
 app.use(passport.initialize());
 app.use(passport.session());
 
 app.use((req, res, next) => {
     console.log(req.session);
     console.log(req.user);
     next();
 });

 /**
 * -------------- ROUTES ----------------
 */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu', itemsRouter); // Add item routes to middleware chain

// Set up default mongoose connection
var dev_db_url = 'mongodb+srv://patricialan:development@cluster0.vxl0f.mongodb.net/menu-dev?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true});

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error'));

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