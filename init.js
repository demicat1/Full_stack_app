
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const bodyparser = require('body-parser');
const app = express();
const jsonParser= express.json()

const passport = require('passport');
require('./config/passport')(passport);
let arr=[];

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    email: String,
    password: String,
});






app.set("view engine", "ejs");
app.use(express.json())
app.use(express.static(__dirname));
app.use(express.static('public'));

//bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//session
app.use(session({
    secret: 'resave',
    resave: false,
    saveUninitialized: true,
}));

//passport
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());


//global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    next();
})




//база данных
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/test?retryWrites=true&w=majority");

mongoose.connect("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/test?retryWrites=true&w=majority")
    .then(()=>{
        console.log('mongodb connected');
    })
    .catch(err=>console.log(err))







app.listen(3000,()=>{
    console.log('running server on port 3000');
})

const loadRoute = require('./routes/loadvacansy')
app.use('/upload', loadRoute);
const main = require('./routes/main');
app.use('/main', main)
const users = require('./routes/users');
app.use('/', users);
const listRoute = require('./routes/vakansiList');
app.use('/list',listRoute);









//init gfs





