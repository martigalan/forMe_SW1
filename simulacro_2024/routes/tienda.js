const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tienda', {
    user: req.session.user, 
    cookies: req.session.user ? req.session.user.cookiesAccepted : false, 
    title:"Embutidos León", 
    role: req.session.role,
    isBanned: req.session.isBanned 
    });
});

//like posts
router.post('/', (req, res) => {
  const  {postId} = req.body; 

  // Validar que se haya enviado el ID
  if (!postId) {
      res.status(400).json({ error: "Post ID is required" });
  }

  //Validar que el usuario exista
  const user = database.user.data[req.session.user.username];
  //console.log(user.posts);
  if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
  }

  // Buscar la publicación en los posts del usuario
  const post = user.posts.find(p => p.id === Number(postId)); //OJO!!! PONER Number(postId), que sino NO LO COGE!
  if (!post) {
      res.status(404).json({ error: "Post not found" });
  }

  // Incrementar el contador de likes
  if (post.likes === 0) {
    post.likes += 1;
    res.json({ message: "Like added", post });
  } else {
    post.likes -= 1;
    res.json({ message: "Like substracted", post });
  }
});

module.exports = router;
