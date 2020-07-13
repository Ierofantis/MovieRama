var express = require('express');
var router = express.Router();

/* GET movie page. */
router.get('/', function (req, res) {
    res.render('movie', { user: req.user });
});

module.exports = router;