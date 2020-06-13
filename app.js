const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const fileupload = require('express-fileupload');
const flash = require('connect-flash');
const db_config = require('./config/database');
const cloudinary = require('cloudinary').v2;

// CLOUDINARY CONFIG
//CLOUDINARY_URL=cloudinary://755336265882271:g1BvjZs_Gm6l8uGBEzmYqCAXnZU@devbyredcode
cloudinary.config({ 
  cloud_name: 'devbyredcode', 
  api_key: '755336265882271', 
  api_secret: 'g1BvjZs_Gm6l8uGBEzmYqCAXnZU' 
});

// DATABASE CONNECTION
const option = `${db_config.host}${db_config.name}`
mongoose.connect(option, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// ROUTER
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin');

// VIEW ENGINE SETUP
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized : true,
  cookie : { maxAge: 60000 }
}));

app.use(fileupload({
  useTempFiles: true
}));

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
