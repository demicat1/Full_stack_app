const express = require('express')
const router = express.Router();
const cookieParser = require('cookie-parser');
const Cookie = require('cookies')
const mongoose = require('mongoose');
const User = require('../models/User');

const { decode } = require("jsonwebtoken");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatars');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '--' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false)
            return cb(new Error("Only JPG,PNG,JPEG are allowed"))
        }
    }
})








const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const mongoClient = new MongoClient("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/test?retryWrites=true&w=majority");






router.get('/', async(req, res) => {
    // const getAppCookies =() => {
    //     // We extract the raw cookies from the request headers
    //     const rawCookies = req.headers.cookie.split('; ');
    //     // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']
    //
    //     const parsedCookies = {};
    //     rawCookies.forEach(rawCookie=>{
    //         const parsedCookie = rawCookie.split('=');
    //         // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
    //         parsedCookies[parsedCookie[0]] = parsedCookie[1];
    //     });
    //     return parsedCookies;
    // };
    let user = await User.findOne({ email: req.user.email });
    res.render('user_page', {
        res: user,
    })
});





router.post('/', upload.single("avatar"), async(req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = "You are not summiting something"
        error.statuscode = 400;
        return next(error);
    }
    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString('base64');
    const user = await User.findOne({ email: activeUser });
    user.avatar.mimetype = req.file.mimetype;
    user.avatar.image = encode_img;
    console.log(user)
    user.save((err) => {
        if (err) {
            err = "не можем сохрнаить аву";
            err.statuscode = 400;
            return next(err);
        }
        console.log("Твоя ава сохранена")
    });
    res.redirect('/userpage')
})



router.get('/image/:name', (req, res) => {
    new Promise(async(resolve, reject) => {
        const user = await User.findOne({ name: req.params.name });
        if (!user) {
            reject(user);
        } else {
            resolve(user);
        }
    }).then((user) => {
        res.contentType(user.avatar.mimetype);
        res.send(Buffer.from(user.avatar.image, "base64"));
    })
})






module.exports = router;