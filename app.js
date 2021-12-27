var express=require("express");
var bodyParser=require("body-parser");
var app=express();


// ----MongoDB -----//
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/HRPortal');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
  
    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
db.collection('Candidates').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('signup.html');
})
  
  
// app.get('/',function(req,res){
// res.set({
//     'Access-control-Allow-Origin': '*'
//     });
// return res.redirect('index.html');
// }).listen(3000)
  
module.exports=app;