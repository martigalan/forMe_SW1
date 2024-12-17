const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    user: req.session.user, 
    cookies: req.session.user ? req.session.user.cookiesAccepted : false, 
    title:"Embutidos León", 
    role: req.session.role,
    isBanned: req.session.isBanned 
    });
});

module.exports = router;
