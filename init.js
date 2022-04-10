const authRouter = require('./authRouter');
const express = require('express');
const bodyparser = require('body-parser');
const stream = require("stream");
const app = express();
const jsonParser= express.json()
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream')
const MethodOverride = require('method-override');
//events
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    email: String,
    password: String,
});

const EventEmitter = require('events');
const {response, request} = require("express");
const myEmitter = new EventEmitter();
const logConnection=()=>{console.log('сработал ивент подключения сервера')};
myEmitter.addListener('connected',logConnection);
myEmitter.emit('connected');

//deleting events
myEmitter.removeListener('connected',logConnection);
////
app.use(bodyparser.json());
app.use(MethodOverride('_method'));
app.set("view engine", "ejs");
app.set("registration engine", "ejs")
app.use(express.json())
app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}))
app.use('/',authRouter)

//база данных
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/");

async function run(){
    try{
        //connect to DB
        await mongoClient.connect();
        const db = mongoClient.db('test');
        const collection = db.collection("users")
        const count = await collection.countDocuments();
        console.log(`коичесвто людей в базе ${count}`)
        const result = await db.command({ping:1});
        console.log('Подключились к коллекции');
        console.log(result);
    }
    catch (err){
        console.log(err);
        console.log("возникла ошибка")
    }
    finally {
        // Закрываем подключение при завершении работы или при ошибке
        await mongoClient.close();
        console.log("закрываем базу");
    }
}
run();



app.listen(3000,()=>{
    console.log('running server on port 3000');})
app.get('/login.ejs', (req,res)=>{
    res.render('login.ejs', {
        ERROR:'',
    });
});
app.get('/', (req,res)=>{
    res.render('register.ejs');
});
app.get('/register.ejs',(req,res)=>{
    res.render('register.ejs');
})

 app.post("/register.ejs", jsonParser, (req, res) => {
     if(!req.body){
         console.log('400 form not found')
         return res.sendStatus(400);
     }
     mongoose.connect("mongodb://localhost:27017/", { useUnifiedTopology: true, useNewUrlParser: true });
    mongoClient.connect();
     const db = mongoClient.db('test');
        const user = mongoose.model("users",userScheme);
         const output = new Promise((resolve,reject)=>{
            let data = db.collection('users').findOne({"email": `${req.body.email}`});
            resolve(data)
        })
            output.then((data)=>{console.log(data);


                        const User = new user({
                            email: req.body.email,
                            password: req.body.password,
                            status: 'user',
                        })

                        User.save((err) => {
                            mongoose.disconnect();
                            if (err) {
                                console.log(err);
                                return
                            }
                            console.log('сохранен обьект')
                            res.render("index", {
                                USER: req.body.email,
                            })
                        })




            });

 })
app.post("/", jsonParser, (req, res) => {
    if(!req.body){
        console.log('400 form not found')
        return res.sendStatus(400);
    }
    mongoose.connect("mongodb://localhost:27017/", { useUnifiedTopology: true, useNewUrlParser: true });
    mongoClient.connect();
    const db = mongoClient.db('test');
    const user = mongoose.model("users",userScheme);
    const output = new Promise((resolve,reject)=>{
        let data = db.collection('users').findOne({"email": `${req.body.email}`});
        resolve(data)
    })
    output.then((data)=>{console.log(data);


        const User = new user({
            email: req.body.email,
            password: req.body.password,
            status: 'user',
        })

        User.save((err) => {
            mongoose.disconnect();
            if (err) {
                console.log(err);
                return
            }
            console.log('сохранен обьект')
            res.render("index", {
                USER: req.body.email,
            })
        })




    });

})
app.post('/login.ejs', jsonParser,(req,res)=>{
    mongoClient.connect();
    const db = mongoClient.db('test');
   mongoose.connect('mongodb://localhost:27017/',{useUnifiedTopology: true, useNewUrlParser: true});
   const user = mongoose.model('users',userScheme);
   const User = new user({
       email:req.body.email,
       password : req.body.password,
   })
    let check = new Promise( (resolve,reject)=> {
            const userCheck = db.collection('users').findOne({"email": `${req.body.email}`});
            if (!userCheck) {
                res.render('login.ejs',{
                    ERROR:'there is no such user'
                })
                reject();
                return;
            }
            resolve(userCheck);
    }
    )
        check.then((data)=>{
            console.log(data)
            console.log('fine')
            if(!data){
                return;
            }
            else if(data.email === req.body.email && data.password === req.body.password && data.status===true){
                res.render('index.ejs',{
                    USER: 'Admin'
                });
            }
            else if(data.email === req.body.email && data.password === req.body.password){
                res.render('index.ejs',{
                    USER: req.body.email,
                });
            }
            else{
              res.send('пользоватль не найден или неверный пароль');
            }
        })
})



//init gfs
const conn = mongoose.createConnection('mongodb://localhost:27017/');
let gfs;
conn.once('open', ()=>{
    gfs = Grid(conn.db, mongoose.mongo);
})

app.get('/admin_page.ejs', (req,res)=>{
    res.render('admin_page');
})









