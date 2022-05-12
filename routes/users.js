const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const {ensureAuthenticated}=require("../config/auth");
const fs = require('fs')
const passport = require('passport');
console.log(__dirname+'/styles');
const Cookie = require('cookies')
const bodyparser = require("body-parser");
const arr = require("../public/scripts/vakansyy/list.json");
app.use(cookieParser());
app.use(bodyparser.json());



app.set("view engine", "ejs");
router.get('/login', (req,res)=>{
    res.render('login',{
        ERROR:'',
    } );
})
router.get('/register', (req,res)=>{
    res.render('register',{
        ERREm:'',
        ERR:''
    });
})

router.post('/register',(req,res)=>{
    const {name,email,password,password2}= req.body;
    let errors= [];
    //validation
    if(!name || !email ||!password || !password2){
        errors.push({msg:'please fulfill all fields'});
    }
    if(password !== password2){
        errors.push({msg:'passwords are not the same'});
    }
    if(password.length<8){
        errors.push({msg:'password should be at least 8 characters'})
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
        })
        console.log(errors)
    }
    else{
        User.findOne({email:email})
            .then((user)=>{
                if(user){
                    errors.push({msg:'User Exists'});
                    res.render('register',{
                        errors,
                        name,
                        email,
                    })
                }
                else{
                    const newUser = new User({
                        name:name,
                        email:email,
                        password:password,
                    })
                    //hash passord
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(newUser.password,salt,(err,hash)=>{
                            if(err){
                                throw err;
                            }
                            else{
                                //hashing password
                                newUser.password = hash;
                                //saving user
                                newUser.save((err)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        req.flash('success_msg','You are registered, now to enter, login');
                                        res.redirect('/login');
                                        console.log('создали челика');
                                    }
                                })
                            }
                        });
                    });

                    // newUser.save((err)=>{
                    //     if(err){
                    //         console.log(err);
                    //     }
                    //     else{
                    //         console.log(`user ${email} has been saved to a database`)
                    //     }
                    // })
                    console.log(newUser);
                }
            })

    }
})

//login

router.post('/login',async(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:"true",
    })(req,res,next)
})


//logout
router.get('/logout',(req,res)=>{
    req.logout();
    alert('logout');
    res.redirect('/login')
})

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))
router.get('google/callback',
    passport.authenticate('google',{ failureRedirect:'/'}), (req,res)=>{
        res.redirect('/main');
    })


//Google authorization















module.exports= router;

