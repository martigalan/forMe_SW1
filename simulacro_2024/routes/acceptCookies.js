//necesito hacer un post
//en ese post, compruebo si el usuario esta logeado, y si lo esta, cambiar del database un nuevo campo que sea un boolean de aceptar cookies o no
const express = require('express');
const router = express.Router();
const database = require('../database');


router.post('/', async (req, res) => {
    //primero, compruebo si el usuario está logeado
    if(!req.session.user) {
        req.session.error = "User is not logged.";
        res.redirect("login");
    }
    //si lo esta, cambiar del database un nuevo campo que sea un boolean de aceptar cookies o no
    try {
        req.session.user.cookiesAccepted = true; //se actualiza el valor de las cookies en la sesión
        database.user.setParams(req.session.user.username, {"cookiesAccepted":true}); //también se actualiza en la base de datos
        req.session.message = "¡Cookies aceptadas!";
        res.json({ success: true });
    } catch (error) {
        console.error('Error actualizando el perfil:', error);
        res.status(500).json({ success: false });
    }
});
  
module.exports = router;