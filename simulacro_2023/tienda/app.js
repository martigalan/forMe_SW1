let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const session = require('express-session');

let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let restrictedRouter = require('./routes/restricted');
let registerRouter = require('./routes/register');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //para habilitar las cookies
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'El secreto que queramos nosotros'
}));

app.use(function(req, res, next){
  let error = req.session.error;
  let message = req.session.message;
  delete req.session.error;
  delete req.session.message;
  res.locals.error = "";
  res.locals.message = "";
  if (error) res.locals.error = `<p>${error}</p>`;
  if (message) res.locals.message = `<p>${message}</p>`;
  next();
});

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/restricted', restrict, restrictedRouter);
app.use('/logout', function(req, res, next){
  req.session.destroy(function(){
    res.clearCookie('userData'); //it will clear the userData cookie
    res.send('user logout successfully');
    res.redirect("/");
  })
})

function restrict(req, res, next){
  if(req.session.user){
    next();
  } else {
    req.session.error = "Unauthorized access";
    res.redirect("/login");
  }
}
    
//Route for adding cookie 
app.get('/register', (req, res)=>{ 
  res.cookie('cookiename', 'cookievalue');
  res.send('user data added to cookie'); 
}); 
    
//Iterate users data from cookie 
app.get('/login', (req, res)=>{ 
  console.log(req.cookies);
  res.send(req.cookies); 
}); 
    
//agregar cookie con tiempo de expiración
/*//Caduca después de 400000 ms desde el momento en que se establece.
res.cookie(nombre_cookie, 'valor', {caduca: 400000 + Fecha.ahora()});*/
/*//También expira después de 400000 ms desde el momento en que se establece.
res.cookie(nombre_cookie, 'valor', {maxAge: 360000});*/

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
