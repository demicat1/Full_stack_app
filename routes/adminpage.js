const express = require('express');
const User = require("../models/User");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const router = express.Router();


//pagination
// const db = require('../models/Users-pagination-v2');
// db.mongoose
//     .connect(db.url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("Connected to the database!");
//     })
//     .catch(err => {
//         console.log("Cannot connect to the database!", err);
//         process.exit();
//     });








router.get("/", async(req, res) => {
    res.render("admin_page", {
        users: await User.find()
    })
})



router.get("/delete-user/:email", async(req, res) => {
    await User.deleteOne({ email: req.params.email });
    res.redirect("/adminpage");
})

module.exports = router;