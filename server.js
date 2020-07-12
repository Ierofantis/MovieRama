require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
const { sequelize } = require("./models");
const session = require('express-session');
var bodyParser = require('body-parser')

/*  Express body parser  */
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*  Express session  */
app.use(
  session({
    secret: 'cat',
    resave: true,
    saveUninitialized: true
  })
);

/*  Passport Setup  */
const passport = require('passport');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */

app.get('/success', (req, res) => res.render('success'));
app.get('/error', (req, res) => res.render('error'));
app.use('/', indexRouter);

app.get('/auth/github',
  passport.authenticate('github'),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success');
  });

/**
 * Connect to Postgresql
 */

sequelize
  .authenticate()
  .then(() => {
    console.log("[OK] Postgresql");
  })
  .catch(err => {
    console.error(">> Unable to connect to the database:", err);
  });

/**
 * Engine Setup
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Catch 404 and error handling
 */

app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Error Handler
 */

app.use(function (err, req, res, next) {
  /* set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /* render the error page */
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;

// const service = require("./services/movieService");

// const db = require("./models");

// const run = async () => {
//   const user1 = await service.createUser({
//     username: "Theodore",
//     email: "theodore@theodore"
//   });

//   const user2 = await service.createUser({
//     username: "Nick",
//     email: "nick@nick"
//   });

//   const comment1 = await service.createMovie(user1.id, {
//     title: "Name1",
//     description: "MovieText",
//     published: user1.username,
//   });
//   await service.createMovie(user2.id, {
//     title: "Name2",
//     description: "MovieText",
//     published: user2.username,
//   });

//   const tut1Data = await service.findUserById(user1.id);
//   console.log(
//     ">> Tutorial id=" + tut1Data.id,
//     JSON.stringify(tut1Data, null, 2)
//   );

//   const tut2Data = await service.findUserById(user2.id);
//   console.log(
//     ">> Tutorial id=" + tut2Data.id,
//     JSON.stringify(tut2Data, null, 2)
//   );
// };

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   run();
// });
app.listen(port, () => console.log(`Server running on port ${port}`));
