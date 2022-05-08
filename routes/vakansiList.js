const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const url = "mongodb://localhost:27017/";
const JobApply = require('../models/JobApply');
const fs = require("fs");
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
router.get('/', (req, res) => {
    res.render('vakansuu')
        // mongoClient.connect(function (err, client) {
        //     const db = client.db("test");
        //     const collection = db.collection("joblist");
        //
        //     if (err) return console.log(err);
        //     collection.find()
        //     console.log(db.collection('joblist').find())
        //     fs.writeFile('/collection_of_vacansi/list.json', JSON.stringify(db.collection('joblist').find()) , err=>{
        //         if(err){
        //             console.log(err)
        //         }
        //         else {
        //             console.log('мы написали в файл')
        //         }
        //     })
        // })
});
// res.render('vakansuu.ejs');

mongoose.connect("mongodb+srv://nurlan:admin@backendclust.0rgr0.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log('mongodb connected');
    })
    .catch(err => console.log(err))




router.post('/', async(req, res) => {
    let p = req.body.SearchQuery;
    p = p.toLowerCase();
    p = p.split(" ");
    let allQueries = [];
    p.forEach(item => {
        allQueries.push({ title: { $regex: String(item), $options: 'i' } })
    });
    found = await JobApply.find({ $or: allQueries });
    if (!found) {
        res.status(404).send({ error: "NO FOUNDINGS" })
    }
    fs.writeFile('./public/scripts/vakansyy/searchRES.json', JSON.stringify(found, null, 1), (err) => {
        if (err) {
            console.log('failed to search');
            return;
        }
        console.log('FOUND@!')
    })
    res.render('searchResults', {
        results: found,
    });


})


module.exports = router;