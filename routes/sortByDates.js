const express = require('express');
const router = express.Router();
const sortService = require("../services/sortService");

var moment = require('moment');

/* GET date page. */
router.get('/', async (req, res) => {
    let movies = await sortService.sortByDates();
    res.render('sortByDates', { user: req.user, session: req.session, movies: movies, moment: moment });
});

module.exports = router;
