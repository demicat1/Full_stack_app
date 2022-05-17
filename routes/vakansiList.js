const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const url = "mongodb://localhost:27017/";
const JobApply = require('../models/JobApply');
const offer = require("../models/offers");
const fs = require("fs");
const User = require("../models/User");
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
const mongoosePag = require('mongoose-paginate-v2');



mongoose.connect("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log('mongodb connected');
    })
    .catch(err => console.log(err))
router.get("/search",async(req,res)=>{
    var query = req.query.searchquery;
    query = query.toLowerCase();
     res.json(await offer.find({title:{$regex:query} }));
})
router.get('/',async(req,res)=>{
    var city = req.query.City;
    var privateness = req.query.privateness;
    var search = req.query.search;
    var pageNum = parseInt(req.query.pageNum);
    if(!req.query.pageNum){
        pageNum = 1;
    }

        if(isNaN(pageNum)){
            pageNum = 1;
        }
        const filter ={
            city:city,
            privateness :privateness,
            search:search,
        }


    for(key in filter){
        if(filter[key] ==='all' || filter[key] ==='dontcare' || filter[key]===undefined || filter[key]==='' || !filter[key])    {
           delete filter[key]
        }
    }

    var size = 8;
    if(pageNum <= 0 && size <0){
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    var offers = await offer.paginate();
    // async function getNextDocs(no_of_docs_required, last_doc_id) {
    //     let docs
    //     if (!last_doc_id) {
    //         // get first 5 docs
    //         docs = await offer.find().sort({ _id: -1 }).limit(no_of_docs_required)
    //         last_doc_id = docs[docs.length-1];
    //     }
    //     else {
    //         // get next 5 docs according to that last document id
    //         docs = await offer.find({_id: {$lt: last_doc_id}})
    //             .sort({ _id: -1 }).limit(no_of_docs_required)
    //     }
    //     return docs
    // }


    // var offers = await offer.find(filter).limit(size).skip(skip).exec();
    res.send(offers)
    // res.render("vakansuu",{
    //     offers:offers,
    //     selected__pr : req.query.privateness,
    //     selected__city:req.query.City,
    //     pageNum:req.query.pageNum,
    // });
})




module.exports = router;