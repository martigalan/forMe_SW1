const express = require('express');
const router = express.Router();
const database = require('../database');

/*MÉTODO GET ASOCIADO A UNA VISTA QUE ESPECIFICO AQUÍ*/
router.get('/', function(req, res, next) {
  res.render('login', {
    user: req.session.user, 
    cookies: req.session.user ? req.session.user.cookiesAccepted : false, 
    title:"Embutidos León", 
    role: req.session.role,
    isBanned: req.session.isBanned });
//con req.session.loQueSea, recupero lo que quiera y luego puedo mostrarlo en la vista
});

//AQUÍ NO ES NECESARIO CAMBIAR NADA EN RELACIÓN A COOKIES!
router.post('/', async (req, res) => {
  const user = req.body.user;
  if(await database.user.isLoginRight(user, req.body.pass)){ //esto es lo que entra en el formulario
    const userParams = database.user.getParams(user); //cojo los parametros para luego coger el role
    /*console.log("User Params:", userParams); // Imprime el resultado de la consulta
    console.log("Role:", userParams ? userParams["role"] : "No role found"); // Verifica si 'role' existe*/
    req.session.user = {username: user, cookiesAccepted: database.user.getParams(user)["cookiesAccepted"]}; //cambio, en la sesión, lo que hay del usuario en la bbdd (por preferencias de cookies)
    req.session.role = userParams.role; //cojo el role -> ASÍ SI, NO COMO LAS COOKIES, QUE SINO NO FUNCIONA EN EL NAV!!!
    //console.log(userParams.role);
    req.session.isBanned = userParams.isBanned;

    if(req.session.isBanned === true) {
      console.log("is banned");
      return res.redirect("isBannedPannel");
    }
    //OJO!! QUE NO PUEDO HACER MÁS DE 1 RESPUESTA (RES.REDIRECT) EN EL MISMO FLUJO!!
    //POR ESA RAZÓN HAGO return res.redirect (sino hacer lo del JSON)!!
    req.session.message = "¡Login correcto!"
    return res.redirect("restricted");
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("login");
  }
});

module.exports = router;
