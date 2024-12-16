const database = {};

database.user = require('./models/user.model');

function initializeUsers(){
    const NAMES = ["alberto", "ana", "daniel", "silvia", "aaa"];
    /*const users = [
        { username: "Alberto", img: "/images/users/1.jpg" },
        { username: "Ana", img: "/images/users/2.jpg" },
        { username: "Daniel", img: "/images/users/3.jpg" },
        { username: "Silvia", img: "/images/users/4.jpg" },
        { username: "aaa", img: "/images/users/5.jpg" },
    ];*/
    const posts = [ 
        {"id":1, "title":"Cecina", "likes" : 0}, 
        {"id":2, "title":"Chorizo", "likes" : 0}, 
        {"id":3, "title":"Lomo", "likes" : 0}, 
        {"id":4, "title":"Pimientos", "likes" : 0}
    ]
    const cookiesAccepted = false;
    NAMES.forEach(function(username){
        database.user.register(username, "1234", cookiesAccepted, posts);
    });
    database.user.registerAdmin();
}

function initializeDB(){
    initializeUsers();
}

initializeDB();

module.exports = database;