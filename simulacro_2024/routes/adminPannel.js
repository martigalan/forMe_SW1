const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('adminPannel', {
    user: req.session.user, 
    cookies: req.session.user ? req.session.user.cookiesAccepted : false, 
    title:"Embutidos León", //el title este es el que vemos en la esquina superior izquierda
    role: req.session.role,
    isBanned: req.session.isBanned 
    }); 
});

//admin button 
router.post('/', (req, res) => {
  const { username, newRole } = req.body;

  if (!username || !newRole) {
      res.status(400).json({ success: false, message: 'Datos incompletos' });
  }

  // Buscar al usuario en la base de datos
  const user = database.user.data[username];
  console.log(user)
  if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  }

  try {
    user.role = newRole; // Actualizar el rol del usuario
    database.user.setParams(req.session.user.username, {"role": newRole}); //también se actualiza en la base de datos
    req.session.message = "¡Role cambiado!";
    res.json({ success: true, message: `Rol de ${username} actualizado a ${newRole}` });
  } catch (error) {
    console.error('Error actualizando el perfil:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;