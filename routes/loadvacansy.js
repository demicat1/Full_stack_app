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

const ApplyJob = require("../models/JobApply");
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

    let Uerrors = [];
    if(!req.body.title
        || !req.body.salary
        || !req.body.city
        || !req.body.name
        ||!req.body.type
        ||!req.body.sphere ){
        Uerrors.push({msg:"please fullfill all fields"})

    }
    if(Uerrors.length!==0){
        res.render('upload',{
            Uerrors,
        })
        return;
    }
    let job = { title: req.body.title,name: req.body.name, details: req.body.text, sphere:req.body.sphere , type:req.body.type,city: req.body.city, salary:req.body.salary};
    if(job.city==="null" || job.sphere==="null" || job.type==="null"){
        Uerrors.push({msg:"please fullfill all fields"})
        res.render('upload',{
           Uerrors
         })
     }
    let newOffer = new ApplyJob({
        title:req.body.title,name: req.body.name, details: req.body.text, sphere:req.body.sphere , type:req.body.type,city: req.body.city, salary:req.body.salary
    })
    console.log("saving data....")
    newOffer.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("we added a job apply")
        }
    })
            try{
                const arr = require('../public/scripts/vakansyy/list.json');
                arr.unshift(job);
                fs.writeFile('./public/scripts/vakansyy/list.json',JSON.stringify(arr,null,2),err=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('мы написали в жсон');
                    }
                })
            }
            catch (err){
                console.log(err)
                return
            }
    res.redirect("/vacansyy")
        });


module.exports = router;