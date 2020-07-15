const express = require('express');
const router = express.Router();
const service = require("../services/movieService");

var moment = require('moment');

/* GET user's page. */
router.get('/:userId', async (req, res) => {
    let UserId = req.params.userId
    let movies = await service.findMoviesByUser(UserId);

    res.render('findMoviesByUser', { user: req.user, session: req.session, movies: movies, moment: moment });
});

module.exports = router;
