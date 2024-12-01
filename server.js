import express from "express"
import path from "path"
import expressEjsLayouts from "express-ejs-layouts"
import session from "express-session"
import multer from "multer"

import UsersControllers from "./src/controllers/users.controller.js"
import JobsController from "./src/controllers/jobs.controller.js"
import ApplicantController from "./src/controllers/applicant.controller.js"

//middleware
import {registerValidator, loginValidator} from "./src/middlewares/user-validator.middleware.js"
import {jobFormValidation, jobUpdateFormValidation} from "./src/middlewares/jobs-validator.middleware.js"
import {checkUser, authorizer} from "./src/middlewares/auth.middleware.js"
import {uploadPdf} from "./src/middlewares/file-uplode.middleware.js"
import {applicationValidation} from "./src/middlewares/apllicant-validator.middleware.js"


const server = express()
const userController = new UsersControllers()
const jobsController = new JobsController()
const applicantController = new ApplicantController()

const uplode = multer()
server.use(express.static('public'))  //config static folder
server.use(express.urlencoded({ extended: true })) // to work with forms
server.use(express.json()); //to get json data in update form

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

// ejs config
server.set('view engine', 'ejs')
server.set('views', path.resolve("src", "views"))
server.use(expressEjsLayouts) //ejs layout


// dashboard
server.get('/',checkUser, function (req, res) {
    res.render("dashboard")
})

// users
server.get('/register', checkUser, userController.getRegisterForm);
server.post('/register', checkUser, registerValidator, userController.postRegisterUser);
server.get('/login', checkUser, userController.getLoginForm);
server.post('/login', checkUser, loginValidator, userController.postLoginUser);
server.get('/logout',authorizer, checkUser, userController.getLogout);

// jobs
server.get('/job-page', checkUser, jobsController.getJobPage)
server.get('/jobs', checkUser, jobsController.getAllJobs);
server.post('/jobs', checkUser,jobFormValidation, jobsController.postJob);
server.get("/post-job",authorizer,checkUser, jobsController.getRegisterjobForm)

server.get('/jobs/:id', checkUser, jobsController.getJobByID);
server.get('/update-jobs/:id',authorizer, checkUser, jobsController.getUpdateJobForm);

server.put('/jobs/:id',authorizer, checkUser, uplode.none(), jobUpdateFormValidation, jobsController.putUpdateJobById);
server.post('/apply-job', checkUser, uploadPdf,applicationValidation, applicantController.postApplicant); 

server.delete('/jobs/:id',authorizer, checkUser, jobsController.deleteJob)
export {server}