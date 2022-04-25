const LocalStrategy =require('passport-local').Strategy;
const passport = require('passport');
const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');


const User = require('../models/User');




module.exports = (passport)=> {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email})
            .then((user) => {
                if (!user) {
                    console.log('пользователя не существует');
                    flash('error','that email is not registered')
                    return done(null, false, {msg: 'that email is not registered'});
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err)
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            })
            .catch(err => console.log(err));
    }))
}
passport.serializeUser(function(user, done) {
    done(null,user.id)
});

passport.deserializeUser(function(id, done) {
    User.findById(id,function (err,user){
        done(err,user);
    })
});
