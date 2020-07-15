var express = require('express');
var router = express.Router();

router.get('/success', function (req, res) {
    res.render('success');
});

router.get('/error', function (req, res) {
    res.render('error');
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
