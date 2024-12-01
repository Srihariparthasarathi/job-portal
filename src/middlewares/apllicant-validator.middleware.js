// OM NAMASIVAYA
import { body, validationResult } from 'express-validator';

export const applicationValidation =  async (req, res, next)=>{
    //rules
const rules = [body("name")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Username is required and cannot be empty.")
    .matches(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/)
    .withMessage("Username must start with a letter and be 3-20 characters, using only letters, numbers, _ or -."),
    body("email")
    .isEmail()
    .withMessage("Enter a valid email address."),
    body("phone")
    .isMobilePhone("any") // You can specify a specific locale, e.g., "en-US", "en-GB"
    .withMessage("Enter a valid phone number."),
    body("cv").optional()
    .custom((value, {req}) =>{
        if(!req.file) throw new Error("resume required")
        return true;
    })
]
  
  //run rules
 await Promise.all(rules.map((rule) => rule.run(req)))

 const errors = validationResult(req);
 if(!errors.isEmpty()){
    console.log(errors.array())
    return res.status(400).json({ errors: errors.array() });
 } 
 next();
}