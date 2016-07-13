var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')


router.get('/signin', function(req, res, next) {
    if (req.signedCookies.user){
      res.render("auth/yougood");
    } else {
      res.render("auth/signin", {button_text: "sign in"});
    }
});

router.get('/signout', function(req, res, next) {
    res.clearCookie("user");
    res.render("auth/signin", {button_text: "sign in", notice: "you have been signed out"});
});

router.get('/signup', function(req, res, next) {
    res.render("auth/signup", {button_text: "sign up"});
});

router.get('/no_auth', function(req, res, next) {
    res.render("auth/yousuck");
});

router.get('/', (req, res, next) => {
    res.redirect('/signup')
})

module.exports = router;
