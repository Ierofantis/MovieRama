var express = require('express');
var router = express.Router();
const service = require("../services/movieService");

/* GET movie page. */
router.get('/', function (req, res) {
    res.render('movie', { user: req.user });
});

/* POST add movie. */

router.post('/addMovie', function (req, res) {
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
module.exports = router;