const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register', user: req.session.user});
});

router.post('/', async (req, res) => {
    const { user, pass, repeatPass } = req.body;
    //ESTO SERÍAN VALIDACIONES DEL SERVIDOR!
    if (users[user]) {
        req.session.error = "User already exists";
        return res.redirect("/register");
    } else {
        if (pass === repeatPass) {
            if (pass.length >= 8) {
                users.register(user, pass, function(err, result){
                    if(result){
                        console.log(users);
                        res.redirect("/login");
                    }
                });
            } else {
                req.session.error = "The password must have at least 8 characters";
                res.redirect("/register");
            }        
        } else {
            req.session.error = "The password is not the same. Please, try again";
            res.redirect("/register");
        }     
    }
 
});

module.exports = router;
