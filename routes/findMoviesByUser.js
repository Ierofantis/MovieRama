const express = require('express');
const router = express.Router();
const service = require("../services/movieService");

var moment = require('moment');

/* GET user's page. */
router.get('/:userId', async (req, res) => {
    let UserId = req.params.userId
    if (req.user) {
        let movies = await service.findMoviesByUser(UserId);
        res.render('findMoviesByUser', { user: req.user, session: req.session, movies: movies, moment: moment });
    } else {
        res.send("You have to be logged in! ")
    }
});

module.exports = router;
