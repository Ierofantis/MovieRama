var express = require('express');
var router = express.Router();
const service = require("../services/movieService");

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { user: req.user, session: req.session });
});

router.post('/addMovie', function (req, res) {
  service.createMovie("asd", {
    title: "asd",
    description: "asd",
    published: "asd",
  });
  res.redirect('/');
});
module.exports = router;
