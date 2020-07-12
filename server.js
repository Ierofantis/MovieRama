require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
const { sequelize } = require("./models");
var bodyParser = require('body-parser')
const session = require('express-session');
/*  Express body parser  */
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const service = require("./services/movieService");

app.use(cookieParser());

/*  Express session  */
app.use(session({ secret: 'ssshhhhh' }));

/*  Passport Setup  */
const passport = require('passport');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send('You must login!');
  }
}

app.get('/secret', isUserAuthenticated, (req, res) => {
  res.send('You have reached the secret route');
});
app.get('/user',
  (req, res) => res.send({ user: req.user })
);

/**
 * Routes
 */

app.use(function (req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});
app.get('/success', (req, res) => res.render('success'));
app.get('/error', (req, res) => res.render('error'));
app.get('/', (req, res) => res.render('index', { user: req.user }));
app.get('/movie', (req, res) => res.render('movie', { user: req.user }));

app.get('/auth/github',
  passport.authenticate('github', { scope: ['profile'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success');
  });

// route for logging out
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/addMovie', function (req, res) {
  console.log(req.body)
  service.createMovie(req.user.id, {
    title: req.body.title,
    description: req.body.description,
    published: "aadsd",
  });
  res.redirect('/');

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
