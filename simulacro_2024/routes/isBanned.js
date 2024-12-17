const express = require('express');
const router = express.Router();
const database = require('../database');

router.post('/', async (req, res) => {
    const userBan = req.body.username;
    //primero, compruebo si el usuario está logeado
    if(!req.session.user) {
        req.session.error = "User is not logged.";
        res.redirect("login");
    }
    try {
        //NO puedo añadir en la sesión nada de OTRA PERSON
        database.user.banUser(userBan); //se banea
        database.user.setParams(userBan, {"isBanned":true}); //se actualiza en base de datos
        req.session.message = "¡Usuario banneado!";
        res.json({ success: true });
    } catch (error) {
        console.error('Error actualizando el perfil:', error);
        res.status(500).json({ success: false });
    }
});
  
module.exports = router;