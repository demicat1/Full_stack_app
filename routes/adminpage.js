const express = require('express');
const User = require("../models/User");
const multer = require('multer');
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const bcrypt = require('bcryptjs');
const router = express.Router();
const fs = require('fs');
const offers = require('../models/offers')
const path = require('path')
const offer = require("../models/offers");
//pagination
router.get("/list",async(req,res,next)=>{
    const len = User.countDocuments();
    var pageNum = parseInt(req.query.pageNum);
    if(isNaN(pageNum)){
        pageNum = 1;
    }
    var size = 5;
    var query ={};
    if(pageNum <0 && size <0){
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
     let skip = size * (pageNum - 1);
    // if(skip < len){
    //     res.next={
    //         pageNum:  pageNum+1,
    //     }
    // }
    // if(skip > size){
    //     res.next={
    //         pageNum:pageNum-1,
    //     }
    // }
    let limit = size;
    const users = await User.find().limit(size).skip(skip).exec();
    res.send(users);
    })

//
//user editing
//multer

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

router.get("/edit-user",async(req,res)=>{
    const email = req.query.email;
    console.log(email)
    const user = await  User.findOne({email:email});

    res.render("useredit",{
        user:user,
    })
})
router.post("/edit-user",upload.single("file"),async(req,res,next)=>{
    // const file = req.file;
    // const img = fs.readFileSync(req.file.path);
    // const encode_img = img.toString("base64");
    // const avatar = {
    //     mimetype:req.file.mimetype,
    //     img:encode_img,
    // }
    const filter = {email:req.query.email};
    const update ={name:req.body.name, email:req.body.email, password:req.body.password };
    await User.findOneAndUpdate(filter,update,{
        returnOriginal:false,
    });
    res.send("dsad");
})




router.get('/btn',(req,res)=>{
    res.render("users");
})

router.get("/", async(req, res) => {
    res.render("admin_page")
})



router.get("/delete-user/:email", async(req, res) => {
    await User.deleteOne({ email: req.params.email });
    res.redirect("/adminpage");
})







router.get("/offersManaging",(req,res)=>{
    res.render('offersManag');
})
router.get('/offersManaging/pag' ,async(req,res)=>{
    var pageNum = req.query.pageNum;
    var size = 2;

    if(isNaN(pageNum)){
        pageNum = 1;
    }
    if(pageNum <0 && size <0){
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    var skip = (pageNum -1) *size;
    var offers = await offer.find({accepted:false}).limit(size).skip(skip).exec();
    res.send(offers);
})
router.get("/offersManaging/accept",async (req,res)=>{
    await offer.findOneAndUpdate({_id: req.query.id}, {accepted:true});
    res.redirect('/adminpage/offersManaging')
})
router.get("/offersManaging/reject", async(req,res)=>{
    await offer.deleteOne({_id:req.query.id});
    res.redirect('/adminpage/offersManaging')
})
router.get('/offersManaging/images',async(req,res)=>{
    const id = req.query.id;
    const ind = parseInt(req.query.ind);
    const Joffer =await offer.findOne({_id:id});
    res.contentType(Joffer.images[ind].filemimetype);
    res.send(Buffer.from(Joffer.images[ind].img, "base64"));
})
module.exports = router;