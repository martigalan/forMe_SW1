const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', user: req.session.user});
});

router.post('/', function(req, res, next){
    let user = req.body.user;
    if(users[user]){
        users.comparePass(req.body.pass, users[user].hash, function(err, result){
            if(result){
                req.session.user = users[user];
                req.session.message = "Welcome!"
                res.cookie('userData', {username:users[user], hash:users[user].hash});
                console.log(req.cookies.userData); //así recupero la cookie!
                //es .userData porque lo he guardado con la clave 'userData'
                res.redirect("/restricted");
            } else {
                req.session.error = "Incorrect user or password";
                res.redirect("/login");
            }
        });
    } else {
        req.session.error = "Incorrect user or password";
        res.redirect("/login");
    }
});

module.exports = router;
