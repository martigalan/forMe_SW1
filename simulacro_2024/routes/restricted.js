const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/', function(req, res) {
  res.render('restricted', {
    user: req.session.user, 
     cookies: req.session.user ? req.session.user.cookiesAccepted : false, 
     title:"Embutidos León", 
     role: req.session.role,
     isBanned: req.session.isBanned 
    }); //ASÍ COJO EL OBJETO, Y LUEGO PUEDO MOSTRAR USERNAME O LOS ATRIBUTOS QUE TENGA
}); //IMPORTANTE!! añadir los nuevos parámetros tb en las plantillas que voy a usar

module.exports = router;
