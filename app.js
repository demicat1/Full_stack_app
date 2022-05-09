require('dotenv').config();
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path')
const jsonParser = express.json()
const ejsLint = require('ejs-lint');

app.use("/static", express.static('public'));
const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '--' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false)
            return cb(new Error("Only JPG,PNG,JPEG are allowed"))
        }
    }
})

const passport = require('passport');
require('./config/passport')(passport);
let arr = [];


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userScheme = new Schema({
    googleID: String,
    username: String,
});
userScheme.plugin(findOrCreate);
const User = new mongoose.model("Gusers", userScheme);

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 100,
    keys: [process.env.COOKIE_SECRET],
}))

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/login/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id, username: profile.displayName }, function(err, user) {
            return cb(err, user);
        });
    }
));
passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})



app.set("view engine", "ejs");
app.use(express.json())


app.use(cookieParser())

//bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//session
app.use(session({
    secret: 'seceret',
    resave: false,
    saveUninitialized: true,
}));

//passport
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());


//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.Urerror = req.flash('Uerror')
    next();
})




//база данных
const MongoClient = require('mongodb').MongoClient;
const mongoClient = new MongoClient("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/test?retryWrites=true&w=majority");

mongoose.connect("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log('mongodb connected');
    })
    .catch(err => console.log(err))





const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('running server on port 3000');
})

const loadRoute = require('./routes/loadvacansy')
app.use('/upload', loadRoute);
const main = require('./routes/main');
app.use('/', main)
const users = require('./routes/users');
app.use('/', users);
const listRoute = require('./routes/vakansiList');
app.use('/vakansyy', listRoute);
const search = require("./routes/searching")
app.use("/search", search);
const userpage = require('./routes/userpage');
app.use('/userpage', userpage);

app.get("/login/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
}))

app.get("/login/google/callback", passport.authenticate('google'), function(req, res) {
    res.cookie('user', JSON.stringify(profile.username), {
        maxAge: 5000,
        httpOnly: true,
    });
    res.redirect('/')
})
app.get('/login/logout', (req, res) => {
    req.logout();
    res.clearCookie()

    res.redirect('/login');
})








//Google auth
//     const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//     const GOOGLE_CLIENT_ID = '671478864388-2upvd52837aodttrg012v9pgqap3clch.apps.googleusercontent.com';
//     const GOOGLE_CLIENT_SECRET = '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';
// passport.use(new GoogleStrategy({
//         clientID: GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/login/google/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//         userProfile=profile;
//         return done(null, userProfile);
//     }
// ));
//
// app.get('/login/google',
//     passport.authenticate('google', { scope : ['profile', 'email'] }));
//
// app.get('/login/google/callback',
//     passport.authenticate('google', { failureRedirect: '/error' }),
//     function(req, res) {
//         // Successful authentication, redirect success.
//         res.render('index',{
//             USER:'google username'
//         })
//     });
//

//init gfs