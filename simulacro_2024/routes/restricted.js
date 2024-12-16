const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('restricted', {user: req.session.user, cookies: req.session.user ? req.session.user.cookiesAccepted : false, title:"Embutidos León"}); //ASÍ COJO EL OBJETO, Y LUEGO PUEDO MOSTRAR USERNAME O LOS ATRIBUTOS QUE TENGA
});

module.exports = router;
