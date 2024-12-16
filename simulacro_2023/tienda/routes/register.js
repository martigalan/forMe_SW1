const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register', user: req.session.user});
});

router.post('/', async (req, res) => {
    const { user, pass, repeatPass, role } = req.body;
    //ESTO SERÍAN VALIDACIONES DEL SERVIDOR!
    if(pass.length < 8) errorLogin(req,"The password must have at least 8 characters");
    if(pass !== repeatPass) errorLogin(req, "The password is not the same. Please, try again");
    if(users[user]) errorLogin(req, "User already exists");
    
    users.register(user, pass, function(userData){
        res.cookie('userData', userData);
        res.redirect("/login");
    });
});

function errorLogin(req, err){
    req.session.error = err;
    res.redirect("/register");
}

module.exports = router;
