const express = require("express");
const JobApply = require("../models/JobApply");
const fs = require("fs");
const router = express.Router();
let found;
router.get("/", (req, res) => {
    res.render('searchResults', {
        results: found,
    })
})


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