const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const http = require('http');
const { Server } = require("socket.io");

//rutas
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const tiendaRouter = require('./routes/tienda');
const restrictedRouter = require('./routes/restricted');
const acceptCookiesRouter = require('./routes/acceptCookies');
const lastLoginRouter = require('./routes/deleteLastLogin');
const chatRouter = require('./routes/chat');
const adminPannelRouter = require('./routes/adminPannel');
const isBannedRouter = require('./routes/isBanned');
const isBannedPannelRouter = require('./routes/isBannedPannel');

const app = express();
//para que funcione socket.io
const server = http.createServer(app);
const io = new Server(server);

//con esta parte, añado puerto!
const port = process.env.PORT || 3050; //aqui cambiamos por el puerto que queremos
server.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// Inicialización de socket.io en el servidor
io.on('connection', (socket) => {
  console.log('User connected');
  //escucho mensajes enviados por cliente (recibidos)
  socket.on('chat', (data) => {
    console.log("Mensaje recibido del cliente " + data.user);
    io.emit('chat', { user: data.user, message: data.message }); //voy a enviarle a todos los usuarios el msj que me ha llegado
  });
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
}); //socket.emit -> envio msjs ; socket.on -> recibir / enviar msjs (defino el callback para ambas)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //para habilitar las cookies
app.use(express.static(path.join(__dirname, 'public')));
//CON ESTO CREAMOS LA SESIÓN
app.use(session({
  secret: "Una frase muy secreta",
  resave: false,
  saveUninitialized: true
}));
//used to: manejar mensajes y errores temporales para mostrarlos en las vistas renderizadas
app.use((req,res,next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if(message) res.locals.message = `<p>${message}</p>`;
  if(error) res.locals.error = `<p>${error}</p>`;
  //hacer lo de los roles
  if (req.session.user) {
    res.locals.user = req.session.user; // Asigna el usuario completo
    res.locals.role = req.session.role; // Asigna el rol (debe obtenerse durante el login)
  } else {
    res.locals.user = null;
    res.locals.role = null;
  }
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/tienda', tiendaRouter);
app.use('/restricted', restricted, restrictedRouter);
app.use('/acceptCookies', acceptCookiesRouter);
app.use('/deleteLastLogin', lastLoginRouter);
app.use('/chat', chatRouter);
app.use('/adminPannel', adminPannelRouter);
app.use('/isBanned', isBannedRouter);
app.use('/isBannedPannel', isBannedPannelRouter);
app.use('/logout', (req,res) =>{ //esto NO se toca, se eliminan automáticamente después de la sesión, NO hace falta especificarlo
  req.session.destroy();
  res.redirect("/");
});

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("login");
  }
}
/*
app.delete("/deleteLastLogin", function(req, res) {
  console.log("req params", req.params.id)
  
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
