require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const { sequelize } = require("./models");
var bodyParser = require('body-parser')
const session = require('express-session');
/*  Express body parser  */
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const service = require("./services/movieService");
const conditionService = require("./services/conditionsForLikesAndHates");

/*  Declare Routes  */
const indexRoute = require("./routes/index");
const helpRoutes = require("./routes/helpRoutes");
const movieRoute = require("./routes/movie");
const sortByLikesRoutes = require("./routes/sortByLikes");
const sortByHatesRoutes = require("./routes/sortByHates");
const sortByDatesRoutes = require("./routes/sortByDates");
const findMoviesByUser = require("./routes/findMoviesByUser");

app.use(cookieParser());

/*  Express session  */
app.use(session({ secret: 'secret' }));

/*  Passport Setup and auth routes */
const passport = require('passport');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
  passport.authenticate('github', { scope: ['profile'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success');
  });

/**
 * Routes
 */

app.use('/', indexRoute);
app.use('/', helpRoutes);
app.use('/movie', movieRoute);
app.use('/likes', sortByLikesRoutes);
app.use('/hates', sortByHatesRoutes);
app.use('/dates', sortByDatesRoutes);
app.use('/user-movies', findMoviesByUser);

app.use(function (req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.post('/addMovie', function (req, res) {
  if (req.user) {
    service.createMovie(req.user.id, {
      title: req.body.title,
      description: req.body.description,
    });
    res.redirect('/');
  }
  else {
    res.redirect('/error');
  }
});

app.post('/addRating', async function (req, res) {

  reqUser = req.body.user_id;
  reqMovie = req.body.movie_id;
  reqLike = req.body.like;
  reqHate = req.body.dislike;

  if (req.user) {
    reqUserId = req.user.id;

    if (req.body.user_id != reqUserId) {

      let query = `
      SELECT * FROM ratings 
      WHERE movie_id = ${reqMovie}
      AND user_id = ${reqUserId}`;

      let movieItem = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT
      });

      let queryLikes = `
      SELECT like_counts,hate_counts FROM movies 
      WHERE id = ${reqMovie}
      AND user_id = ${reqUser}`;

      let queryItem = await sequelize.query(queryLikes, {
        type: sequelize.QueryTypes.SELECT
      });

      let check = await service.checkUserAndMovie(movieItem, req)
      let checkFromDb = await service.checkLikesAndHatesFromDb(movieItem, req)

      if (movieItem.length > 0) {
        let likeCounter = queryItem[0].like_counts;
        let hateCounter = queryItem[0].hate_counts;

        conditionService.conditionsForLikesAndHates(reqMovie, check, checkFromDb, likeCounter, hateCounter)

        service.updateRatingPerUserAndMovie(reqUserId, reqMovie, {
          likes: typeof check !== "undefined" && check.likeBool === true || typeof check !== "undefined" && check.likeBool === false ? check.likeBool : checkFromDb[Object.keys(checkFromDb)[0]],
          hates: typeof check !== "undefined" && check.hateBool === true || typeof check !== "undefined" && check.hateBool === false ? check.hateBool : checkFromDb[Object.keys(checkFromDb)[1]],
          user_id: reqUserId,
          movie_id: reqMovie
        });
        res.send("you have updated preference")
      } else {

        let queryLikesHatesMovie = `
        SELECT like_counts,hate_counts FROM movies 
        WHERE id = ${reqMovie}`;

        let queryItemLikesAndHates = await sequelize.query(queryLikesHatesMovie, {
          type: sequelize.QueryTypes.SELECT
        });

        let likeCounter = 0;
        let hateCounter = 0;
        let likeUpdatedCounter = queryItemLikesAndHates[0].like_counts ? queryItemLikesAndHates[0].like_counts + 1 : likeCounter += 1;
        let hateUpdatedCounter = queryItemLikesAndHates[0].hate_counts ? queryItemLikesAndHates[0].hate_counts + 1 : hateCounter += 1;

        reqLike ? service.updateLikesAndHatesFromDb(reqMovie, likeUpdatedCounter, queryItemLikesAndHates[0].hate_counts) : service.updateLikesAndHatesFromDb(reqMovie, queryItemLikesAndHates[0].like_counts, hateUpdatedCounter)
        service.createRatingPerUserAndMovie(reqUserId, reqMovie, {
          likes: reqLike ? true : false,
          hates: reqHate ? true : false,
          user_id: reqUserId,
          movie_id: reqMovie
        });
        res.send("you have created preference")
      }
    } else {
      res.send("You can't vote your movie !")
    }
  } else {
    res.send("You have to be logged in !")
  }
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


/* feed database */

const db = require("./models");

const run = async () => {
  const user1 = await service.createUser({
    username: "Theodore",
    email: "theodore@theodore"
  });

  const user2 = await service.createUser({
    username: "Nick",
    email: "nick@nick"
  });

  const movieOne = await service.createMovie(user2.id, {
    title: "Name2",
    description: "MovieText"
  });
  const movieTwo = await service.createMovie(user2.id, {
    title: "Name3",
    description: "MovieText"
  });

  const movieData = await service.findUserById(user1.id);
  console.log(
    ">> Tutorial id=" + movieData.id,
    JSON.stringify(movieData, null, 2)
  );

  const movieDataTwo = await service.findUserById(user2.id);
  console.log(
    ">> Tutorial id=" + movieDataTwo.id,
    JSON.stringify(movieDataTwo, null, 2)
  );
};

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});

app.listen(port, () => console.log(`Server running on port ${port}`));
