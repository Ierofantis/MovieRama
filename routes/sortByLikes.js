const express = require('express');
const router = express.Router();
const sortService = require("../services/sortService");

var moment = require('moment');

/* GET like page. */
router.get('/', async (req, res) => {
    let movies = await sortService.sortByLikes();
    res.render('sortByLikes', { user: req.user, session: req.session, movies: movies, moment: moment });
});

module.exports = router;
