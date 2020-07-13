var express = require('express');
var router = express.Router();

router.get('/success', function (req, res) {
    res.render('success');
});

router.get('/error', function (req, res) {
    res.render('error');
})

module.exports = router;
