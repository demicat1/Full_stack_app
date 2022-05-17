const express = require('express');
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
const fs = require('fs')
const User = require('../models/User')
const { ensureAuthenticated } = require('../config/auth');
const Cookie = require("cookies");
app.use(cookieParser());

router.get('/', ensureAuthenticated, async(req, res) => {

    console.log(req.session.userEmail);
    const user = await User.findOne({ email: req.session.userEmail })
    console.log("redering main"
    )
    res.render('index', {
        res: user,
    })

})


module.exports = router;