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

    let user = await User.findOne({ email: req.session.userEmail });
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
    const user = await User.findOne({ email: req.session.userEmail });
    user.avatar.mimetype = req.file.mimetype;
    user.avatar.image = encode_img;

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



router.get('/image/:name', async(req, res) => {
    const name = req.params.name
    const user = await User.findOne({ name: name });
    if (!user.avatar.mimetype) {
        return
    }
    res.contentType(user.avatar.mimetype);
    res.send(Buffer.from(user.avatar.image, "base64"));

})






module.exports = router;