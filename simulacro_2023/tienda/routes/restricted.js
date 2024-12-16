var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('restricted', { title: 'Restricted', user: req.session.user}); //le puedo coger aquí los datos y en la vista, decirle que del user quiero el username: user.username
});

module.exports = router;
