// OM NAMASIVAYA
import { body, validationResult } from "express-validator";

//rules
const rules = [
  body('companyname')
  .notEmpty().withMessage('Name cannot be empty')
  .trim().matches(/^[a-zA-Z\s\.\&\'\-]{1,30}$/).withMessage('Name must be between 1 to 30 characters and contain only valid characters'),
  body('jobCatagory').notEmpty().withMessage("job catagory cannot be empty"),
  body('jobDesigination').notEmpty().withMessage("job catagory cannot be empty"),
  body('location')
  .notEmpty().withMessage('Location cannot be empty')
  .trim().matches(/^[a-zA-Z\s\.\,\-\']{1,50}$/).withMessage('Location must be between 1 to 50 characters and contain only valid characters'),
  body('opennings')
  .notEmpty().withMessage("Provide opening details")
  .isNumeric().withMessage('Only numeric values are accepted')
  .custom((value) => value > 0).withMessage('Only positive values are accepted'),
  body('min')
  .notEmpty().withMessage('Minimum salary is required')
  .isNumeric().withMessage('Minimum salary must be a numeric value')
  .custom((value) =>{
      if(Number(value) > 200 && Number(value) < 0) throw new Error("only accept in range of 1Lpa to 199Lpa in minimum salary")
      
      return true;
  }),
  body('max')
  .notEmpty().withMessage('Maximum salary is required')
  .isNumeric().withMessage('Maximum salary must be a numeric value')
  .custom((value) =>{
      if(Number(value) > 200 && Number(value) < 0) throw new Error("only accept in range of 1Lpa to 199Lpa in minimum salary")
      return true;
  }),
  body('min').custom((value, { req }) => {
      const maxSalary = req.body['max'];
      if (Number(value) > Number(maxSalary)) {
        throw new Error('Minimum salary cannot be greater than maximum salary');
      }
      return true;
    }),
    body('applyBy')
    .notEmpty().withMessage('Apply by date is required')
    .isISO8601().withMessage('Apply by date must be a valid date format (YYYY-MM-DD)')
    .custom((value) => {
      const today = new Date();
      const applyByDate = new Date(value);
  
      // Set time to midnight for comparison
      today.setHours(0, 0, 0, 0);
      applyByDate.setHours(0, 0, 0, 0);
  
      if (applyByDate < today) {
        throw new Error('Apply by date must be today or a future date');
      }
      return true; 
    }),
  body('skills').notEmpty().withMessage('skills are required')
  .custom((value) =>{
      const skillsArr = value.split(',').map((skill)=> skill.trim());

      skillsArr.forEach((skill) =>{
          if (!/^[a-zA-Z0-9\s\-\.]+$/.test(skill)) throw new Error(`Invalid skill: "${skill}". Only letters, numbers, spaces, hyphens, and periods are allowed.`);

          if (skill.length < 1 || skill.length > 30) throw new Error(`Skill "${skill}" must be between 1 and 30 characters long.`);
          
      })
      return true;
  })
];


export const jobFormValidation = async (req, res, next) =>{
    /**to validate the register job form data before post the job object */

    //run rule and add if any error add error in req.error list
    await Promise.all(rules.map((rule) => rule.run(req)));

    //error validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('job-register-page', {errors: errors.array()})
    }

    next();
}


export const jobUpdateFormValidation = async (req, res, next) =>{
  /**to validate the update job form data before post the job object */

  //run rule and add if any error add error in req.error list
  await Promise.all(rules.map((rule) => rule.run(req)));

  //error validation
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      // return res.render('job-register-page', {job: req.body, errors: errors.array()})
      return res.status(422).json({ errors: errors.array() });
  }

  next();
}

async function runRules(req, res){
  
}