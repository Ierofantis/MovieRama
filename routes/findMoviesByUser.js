const express = require('express');
const router = express.Router();
const service = require("../services/movieService");

var moment = require('moment');

/* GET date page. */
router.get('/', async (req, res) => {
    let movies = await service.findMoviesByUser(2);

    res.render('findMoviesByUser', { user: req.user, session: req.session, movies: movies, moment: moment });
});

module.exports = router;
