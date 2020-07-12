var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { user: req.user, session: req.session });
});

module.exports = router;
