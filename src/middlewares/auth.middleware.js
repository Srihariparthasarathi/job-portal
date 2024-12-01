
export const checkUser = (req, res, next) =>{
    if (req.session.user) res.locals.user = true;
    next();
}

export const authorizer = (req, res, next) =>{
    if(!req.session.user){
        return res.redirect("/register")
    }
    next();
}

// export const checkAuthor = (req, res, next)=>{
//     // if(req.params.id == req.session.authorId)
//     console.log(req.params.id);
//     console.log(req.session.authorId);
    
    
    
// }