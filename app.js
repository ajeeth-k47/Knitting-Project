const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-sessions');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;
var username = "";
var password = "";

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
const operator=require('./server/routes/operator.js');
app.get("/",function(req,res){
  res.sendFile('C:/Users/Welcome/Desktop/side_projects/Knitting Project/login.html');
})
app.post("/",function(req,res){
  username = req.body.username;
  password = req.body.password;
  if(username=='user' && password=="password"){
    res.render('home');
    app.use('/api/v1/master', master);
    app.use('/api/v1/operator', operator);
  }
  else{
    res.send("username/passwor does not match");
  }
})





app.listen(port , () => console.log('Listening to port ${port}'));
