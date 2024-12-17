const express = require('express');
const router = express.Router();
const database = require('../database');

router.post('/', async (req, res) => {
    console.log("he entrado por el post")
    //primero, compruebo si el usuario está logeado
    if(!req.session.user) {
        req.session.error = "User is not logged.";
        res.redirect("login");
    }
    //si lo esta, cambiar del database un nuevo campo que sea un boolean de aceptar cookies o no
    try {
        req.session.user.lastLogin = ""; //se actualiza el valor de las cookies en la sesión
        //console.log(req.session.user.lastLogin)
        database.user.setParams(req.session.user.username, {"last_Login":""});
        req.session.message = "¡Last login borrado!";
        res.json({ success: true });
    } catch (error) {
        console.error('Error actualizando el perfil:', error);
        res.status(500).json({ success: false });
    }
});
  
router.delete('/', async (req, res) => {
    console.log("he entrado")
    //primero, compruebo si el usuario está logeado
    if(!req.session.user) {
        req.session.error = "User is not logged.";
        res.redirect("login");
    }
    //si lo esta, cambiar del database un nuevo campo que sea un boolean de aceptar cookies o no
    try {
        req.session.user.lastLogin = ""; //se actualiza el valor de las cookies en la sesión
        //console.log(req.session.user.lastLogin)
        database.user.setParams(req.session.user.username, {"last_Login":""}); //TODO no se como borrar el lastLogin en la base de datos
        req.session.message = "¡Last login borrado!";
        res.json({ success: true });
    } catch (error) {
        console.error('Error actualizando el perfil:', error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;