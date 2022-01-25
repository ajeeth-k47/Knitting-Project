const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-sessions');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true} ));
app.use(express.static('public'));
app.use(expressLayouts);

/*app.use(cookieParser('KnittingSecure'));
app.use(session({
  secret:'KnittingSecretSession',
  saveUninitialized:true,
  resave:true
}));

app.use(flash());*/

app.set('layout' , './layouts/main');
app.set('view engine', 'ejs');

const master=require('./server/routes/master.js');
app.use('/api/v1/master', master);

app.listen(port , () => console.log('Listening to port ${port}'));
