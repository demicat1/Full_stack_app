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
    var cookies = new Cookie(req, res);
    res.cookie('user', JSON.stringify(req.user.email), {
        maxAge: 45545454,
        httpOnly: true,
        secure: true,
    });
    // fs.writeFile('./routes/USERSESSION.json', JSON.stringify(decodeURIComponent(cookies.get('user'))), (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("wrote cookie to json")
    //     }
    // })
    const user = await User.findOne({ email: req.user.email })
    res.render('index', {
        res: user,
    })

})


module.exports = router;