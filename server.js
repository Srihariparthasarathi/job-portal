import express from "express"
import path from "path"
import expressEjsLayouts from "express-ejs-layouts"
import UsersControllers from "./src/controllers/users.controller.js"

//middleware
import {registerValidator, loginValidator} from "./src/middlewares/user-validator.middleware.js"
const server = express()
const userController = new UsersControllers()
server.use(express.static('public'))  //config static folder
server.use(express.urlencoded({ extended: true }))
// ejs config
server.set('view engine', 'ejs')
server.set('views', path.resolve("src", "views"))

server.use(expressEjsLayouts) //ejs layout


server.get('/', function (req, res) {
    res.render("dashboard")
})

server.get('/register', userController.getRegisterForm);
server.post('/register', registerValidator, userController.postRegisterUser);
server.get('/login', userController.getLoginForm);
server.post('/login', loginValidator, userController.postLoginUser);







export {server}