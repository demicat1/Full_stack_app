
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const jsonParser= express.json()

let arr=[];

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    email: String,
    password: String,
});






app.use(bodyparser.json());
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));





//база данных
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

mongoose.connect("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(()=>{
        console.log('mongodb connected');
    })
    .catch(err=>console.log(err))







app.listen(3000,()=>{
    console.log('running server on port 3000');
})

const loadRoute = require('./routes/loadvacansy')
app.use('/upload', loadRoute);

const users = require('./routes/users');
app.use('/', users);
const listRoute = require('./routes/vakansiList');
app.use('/list',listRoute);









//init gfs





