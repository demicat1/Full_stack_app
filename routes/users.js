const express = require('express');
const app = express();
const router = express.Router();
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
    if(password !==password2){
        errors.push({mas:'passwords are not the sanme'});
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
    }
    else if(errors.length ===0){
        console.log(errors.length);
        console.log(errors)
        res.send('pass');
    }
})
module.exports = router;