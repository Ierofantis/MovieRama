const express = require('express');
const router = express.Router();
const service = require("../services/movieService");
var moment = require('moment');
const { sequelize } = require("../models");

/* GET home page. */
router.get('/', async (req, res) => {
  reqUser = req.body.user_id;
  reqMovie = req.body.movie_id;
  let movies = await service.findAllMovies();

  res.render('index', { user: req.user, session: req.session, movies: movies, moment: moment });
});

module.exports = router;
