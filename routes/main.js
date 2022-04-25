const express = require('express');
const router = express.Router();
const app = express();
const { ensureAuth } =require('../config/auth');


router.get('/',(req,res)=> {
    res.render('index', {
        USER:req.user.email,
    })
}
)


module.exports = router;