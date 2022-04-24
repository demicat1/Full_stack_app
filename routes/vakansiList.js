const express = require('express')
const router = express.Router();
const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url);



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





module.exports = router;