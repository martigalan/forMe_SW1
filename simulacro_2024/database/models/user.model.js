const bcrypt = require('bcrypt');

users = {};

users.data = {};

//para que los nombres de las propiedades, no la líe y me equivoque poniendo dos nombres distintos
const keyUsername = "username"; 
const keyHash = "hash"; 
const keyCookiesAccepted = "cookiesAccepted"; 
const keyLastLogin = "last_Login"; 
const keyRole = "role";
const keyPost = "posts";
const keyIsBanned = "isBanned";

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = function(username, password, cookiesAccepted, posts){ //aqui se podria añadir cookiesAccepted y quitar de abajo que sea false
    if(users.data.hasOwnProperty(username)){
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error(`Error al generar el hash de ${username}.`);
        }
        const role = "user"; //por defecto es user
        const isBanned = false;
        //users.data[username] = {username, hash, cookiesAccepted, last_Login: new Date().toISOString};
        //en vez de hacerlo como el profe, lo pongo como abajo de manera que siempre por defecto tenga algo y no pierda info
        users.setParams(username, {hash, cookiesAccepted, last_Login : new Date().toISOString(), role, posts, isBanned});
    });
}

users.registerAdmin = function(){
    const username ="admin";
    const password = "admin";
    const cookiesAccepted = true;
    const role = "admin";
    const isBanned = false;
    console.log('User admin successfully registered'); //esto me añade un admin directamente, con username y contraseña iguales!
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error(`Error al generar el hash de ${username}.`);
        }
        users.setParams(username, {hash, cookiesAccepted, role, isBanned});
    });
}

//para bannear a un usuario por su "username"
users.banUser = function(username) {
    const user = users.getParams(username);
    if (!user) {
        throw new Error(`Usuario ${username} no encontrado.`);
    }
    user.isBanned = true; // Actualizas el estado de baneado
    return true;
};


/**
 * Obtengo los parametros de mi usuario
 * @param {string} username 
 * @returns {username : string, hash : string, cookiesAccepted : boolean, last_Login : string, role : string}
 */
users.getParams = function(username){
    return {username : "", hash : "", cookiesAccepted : false, last_Login : "", role : "", isBanned : false, ...(users.data[username])};
}

/**
 * Seteo los 4 parametros del user y, si no tengo nada, me lo pone por defecto 
 * @param {string} username 
 * @param {object} props se le pasa un objeto con las propiedades que quiero setear en la base de datos
 */
users.setParams = function(username, props){
    let user = users.data[username]; //esto es un OBJETO que contiene username, hash, last_login
    if (!user) {
        users.data[username] = {};
        user = users.data[username];
    }
    user[keyUsername] = username;
    user[keyHash] = props.hash ?? user[keyHash]; //la segunda parte lo coge por defecto
    user[keyCookiesAccepted] = props.cookiesAccepted ?? user[keyCookiesAccepted];
    user[keyLastLogin] = props.last_Login ?? user[keyLastLogin];
    user[keyRole] = props.role ?? user[keyRole];
    user[keyPost] = props.posts ?? user[keyPost];
    user[keyIsBanned] = props.isBanned ?? user[keyIsBanned];
}

users.isLoginRight = async function(username, password){
    if(!users.data.hasOwnProperty(username)){
        return false;
    }
    return await users.comparePass(password, users.data[username].hash);
}

module.exports = users;