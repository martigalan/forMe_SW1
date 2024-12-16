const bcrypt = require("bcrypt");

const users = {};

users.comparePass = function(pass, hash, callback){
    bcrypt.compare(pass, hash, callback);
}

users.generateHash = function(pass, callback){
    bcrypt.hash(pass, 10, callback);
}

users.register = function(username, pass, callback){
    users.generateHash(pass, function(err, hash){
        users[username] = {username, hash};
        //console.log(users);
        if (callback) {
            //callback(); //NO le pasa parametros, por lo que tpc tiene que pasárselos al llamar a register
            //callback?.({username, hash}); así podría quitar el if
            callback({username, hash});
        };
    });
}

users.register('admin', 'admin', function(){
    console.log('User admin successfully registered'); //esto me añade un admin directamente, con username y contraseña iguales!
});
users.register('user', 'user', function(){
    console.log('User user successfully registered'); //esto me añade un user directamente, con username y contraseña iguales!
});

module.exports = users;