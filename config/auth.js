module.exports={
    ensureAuthenticated:function (req,res,next){
        try{
            if(req.isAuthenticated() || req.user.email){
                return next();
            }
            res.redirect('/login')
        }
        catch (err){
            res.redirect('/login');
        }

    }
}