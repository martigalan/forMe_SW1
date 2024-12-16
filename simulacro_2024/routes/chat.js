const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', {user:req.session.user, cookies: req.session.user ? req.session.user.cookiesAccepted : false, title:"Embutidos León"});
});

module.exports = router;
