import UsersModel from "../models/users.model.js"

export default class UsersControllers{

    getRegisterForm(req, res){
        /**This request handler return the register page */
        res.render("register-page", {errors: null}); 
    }

    postRegisterUser(req, res){
        /**this request handler user to sign-up user */
        UsersModel.add(req.body);
        return res.redirect('/')
        
    }

    getLoginForm(req, res){
        /**This request handler return the login page */
        res.render("login-page", {errors: null});
    }
    postLoginUser(req, res){
        /**this request handler use to check the email and password is match and login user*/
        const user = UsersModel.checkUser(req.body);
        if(!user)  return res.render("login-page", {errors: [{"invalid": "incorrect email or password"}]});//incorrect password or email 
        res.redirect('/')
    }

}