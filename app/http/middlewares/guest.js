function guest(req,res,next){
    
    if(!req.isAuthenticated()){
        
        return next()
    }
    // console.log(user);
    return res.redirect('/')
}

module.exports=guest;