
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer=require('multer');
const gridFs = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({extended:true}));

const fs = require('fs');

//mongo//
const mongoURI = "mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//mongo connection
const conn = mongoose.createConnection(mongoURI);
//init gfs
let gfs
conn.once('open', () => {
    // Init stream
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('vakansii');
});

//creating storage
const crypto = require('crypto');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoClient = require("gridfs-stream/lib");

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'vakansii'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });







router.get('/',(req,res)=>{
    res.render('upload');
})





router.post('/',upload.single('file'),(req,res)=>{
    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
    mongoClient.connect(function(err, client){
        const db = client.db("test");
        const collection = db.collection("joblist");
        let job = {name: req.body.name, email: req.body.email, text: req.body.text, type:req.body.type , file:req.body.file,city:req.body.city};
        collection.insertOne(job, function(err, result){
            if(err){
                return console.log(err);
            }
            console.log(job);
            try{
                const arr = require('../collection_of_vacansi/list.json');
                arr.push(job);
                fs.writeFile('./collection_of_vacansi/list.json',JSON.stringify(arr,null,2),err=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('мы написали в жсон')
                    }
                })
            }
            catch (err){
                console.log(err)
                return
            }

            client.close();
        });
    });





    res.redirect('/upload')
});

module.exports = router;