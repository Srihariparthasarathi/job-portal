// OM NAMASIVAYA
import JobsModel from "../models/jobs.model.js";

export default class JobsController{

    getJobPage(req, res){
        res.render("jobs-page");
    }

    getAllJobs(req, res){
        /**return all jobs */
        const jobs = JobsModel.get();
        res.status(200).send({jobs:jobs})
        // res.render("jobs-page", {jobs : jobs});
    }

    getRegisterjobForm(req, res){
        /** return registerForm */
        res.render("job-register-page", {errors: null});
    }

    getUpdateJobForm(req, res){
        /**return update Job Form */
        const job = JobsModel.getByID(req.params.id)
        if(!job) return res.send("404")
        res.render("job-update-page",  {errors: null, job: job})
    }

    postJob(req, res){
        /** create job */
        JobsModel.add(req.body, req.session.authorId);
        res.redirect("/jobs")  
    }

    getJobByID(req, res){
        /** return view detail page */
        const job = JobsModel.getByID(req.params.id);
        if(!job)  res.status(404).send("job not found")
        res.render("job-detail-page", {job})
    }

    putUpdateJobById(req, res){
        /** update job by ID */
        JobsModel.update(req.params.id, req.body)
        res.status(201).send("updated")
    }

    deleteJob(req, res){
        /** delete the job by id */
        const isdeleted = JobsModel.delete(req.params.id)
        if(isdeleted) return res.status(204).send("job deleted successfully");
        res.status(404).send("ID does not exist");
    }

}