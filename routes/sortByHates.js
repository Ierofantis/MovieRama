const express = require('express');
const router = express.Router();
const sortService = require("../services/sortService");

var moment = require('moment');

/* GET hate page. */
router.get('/', async (req, res) => {
    let movies = await sortService.sortByHates();
    res.render('sortByHates', { user: req.user, session: req.session, movies: movies, moment: moment });
});

module.exports = router;
