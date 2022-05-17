const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const gridFs = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const OfferImg = require("../models/offers_images")
const methodOverride = require('method-override');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(methodOverride('_method'))
app.use(bodyparser.urlencoded({ extended: true }));
const fs = require('fs');
const JobOffer = require("../models/offers");

const ApplyJob = require("../models/JobApply");
const { nextTick } = require('process');
//mongo//
const mongoURI = "mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//mongo connection
const conn = mongoose.createConnection(mongoURI);
//init gfs





const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now + path.extname(file.originalname));
    }
})

const uploadImgs = multer({ storage: storage });


router.get('/', (req, res) => {
    res.render('upload');
})

const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';



router.post('/', uploadImgs.array("files"), (req, res) => {
    let filesArr = [];

    function getRandomCharFromAlphabet(alphabet) {
        return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    function generateId(idDesiredLength, alphabet) {
        return Array.from({length: idDesiredLength}).map(() => {
            return getRandomCharFromAlphabet(alphabet);
        }).join('');
    }

    let id = generateId(8,DEFAULT_ALPHABET);


    req.files.forEach(element => {
        const img = fs.readFileSync(element.path);
        const encode_img = img.toString('base64');

        let file = {
            filemimetype: element.mimetype,
            img: encode_img,
        }
        filesArr.push(file);
    })



    let Uerrors = [];
    if (!req.body.title ||
        !req.body.salary ||
        !req.body.city ||
        !req.body.name ||
        !req.body.type ||
        !req.body.sphere) {
        Uerrors.push({ msg: "please fullfill all fields" })
    }
    if (Uerrors.length !== 0) {
        res.render('upload', {
            Uerrors,
        })
        return;
    }

    let job = { title: req.body.title, name: req.body.name, details: req.body.text, sphere: req.body.sphere, type: req.body.type, city: req.body.city, salary: req.body.salary };
    if (job.city === "null" || job.sphere === "null" || job.type === "null") {
        Uerrors.push({ msg: "please fullfill all fields" })
        res.render('upload', {
            Uerrors
        })
    }

    let newOfferImg = new OfferImg({
        id:id,
        images: filesArr,
    })
        newOfferImg.save((err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("saved image")
            }
        })
    let newOffer = new JobOffer({
        id:id,
        title: req.body.title,
        name_of_comp: req.body.name,
        details: req.body.text,
        sphere: req.body.sphere,
        privateness: req.body.type,
        city: req.body.city,
        salary: req.body.salary,
        accepted:false,
    })
    console.log("saving data....")
    newOffer.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("we added a job apply")
        }
    })
    res.redirect("/vakansyy")
});


module.exports = router;