// OM NAMASIVAYA
import applicantModel from "../models/applicant.model.js";
import JobsModel from "../models/jobs.model.js";

export default class ApplicantController{

    postApplicant(req, res){
        const {jobid, name, email, phone} = req.body;
        const newApplicant = {
            name,
            email,
            phone,
            filePath: `/resume/${req.file.filename}`,
        }
        console.log(req.body);
        
        const applicant = applicantModel.add(newApplicant);
        const job = JobsModel.addApplicant(parseInt(jobid), applicant);
        if(!job) return res.status(400).send({errors: [{ msg: `no such Job with id ${jobid}`}]});
        return res.status(201).send({ id : jobid });
    }

}