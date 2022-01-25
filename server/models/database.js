const mongoose = require('mongoose');
mongoose.connect(process.env.MASTERDB_URI,{ useNewUrlParser: true , useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error' , console.error.bind(console, 'connection error:'));
db.once('open' , function(){
  console.log('Connected');
});


//Models
const {diamaster,gaugemaster,fabricmaster,yarnmaster,colormaster,millmaster,machinemaster,taxmaster,companymaster} = require('./mastermodel');
