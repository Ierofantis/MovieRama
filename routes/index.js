const express = require('express');
const router = express.Router();
const service = require("../services/movieService");

var moment = require('moment');

/* GET home page. */
router.get('/', async (req, res) => {
  let movies = await service.findAllMovies();
  res.render('index', { user: req.user, session: req.session, movies: movies, moment: moment });
});

module.exports = router;
