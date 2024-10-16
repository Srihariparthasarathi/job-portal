import { body, validationResult } from 'express-validator';
import UsersModel from '../models/users.model.js';

export const registerValidator = async (req, res, next)=>{
    /** to validate the information before registration */

    // rules    
    const rules = [body("username")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Username is required and cannot be empty.")
        .matches(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/)
        .withMessage("Username must start with a letter and be 3-20 characters, using only letters, numbers, _ or -."),
        body("email")
        .isEmail()
        .withMessage("Enter a valid email address.").custom((value, { req }) =>{
            if(!!req.body.email && UsersModel.findUserByEmail(req.body.email)) throw new Error('E mail already in use please signin');
            return true;
        }),
         body("password")
         .isLength({ min: 8, max: 20 })
         .withMessage("Password must be 8-20 characters.")
         .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
         .withMessage("Password must include at least one uppercase letter, one number, and one symbol.")];

    // run rules
    await Promise.all(rules.map((rule) => rule.run(req)))

    // validation
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()) return res.render('register-page', {errors: errors.array()});
    next(); 
}


export const loginValidator = async (req, res, next)=>{
    /** to validate the information before login */

    // rules    
    const rules = [
        body("email")
        .isEmail()
        .withMessage("Enter a valid email address."),
         body("password")
         .notEmpty()
         .withMessage("Password cannot be empty")
         ];

    // run rules
    await Promise.all(rules.map((rule) => rule.run(req)))

    // validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.render('login-page', {errors: errors.array()});
    next(); 
}
