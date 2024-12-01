// OM NAMASIVAYA

export default class JobsModel{
    constructor(id, jobCatagory, jobDesigination, location, companyname, salary, applyBy, opennings, skills,authorId, applications = []){
        this.id = id;
        this.jobCatagory = jobCatagory;
        this.jobDesigination = jobDesigination;
        this.location = location;
        this.companyname = companyname;
        this.salary = salary;
        this.applyBy = applyBy;
        this.opennings = opennings;
        this.jobPosted = this.#jobPostedDate();
        this.skills = skills;
        this.applications = applications;
        this.authorId = authorId;
    }

    #jobPostedDate(){
         const currentDate = new Date()
         return currentDate.toISOString();
    }

    static get(){
        /**return all job */
        return jobs;
    }

    static getByID(id){
        /** return job by id */
        return jobs.find((job) => job.id == id);
    }

    static add(jobObj, authorId){
        /** create job instance */
        const lastJobValue = jobs[jobs.length - 1];
        const newJobId = (!lastJobValue) ? jobs.length + 1 : lastJobValue.id + 1;
        console.log(authorId);
        const newJob = new JobsModel(
            newJobId,
            jobObj.jobCatagory,
            jobObj.jobDesigination,
            jobObj.location,
            jobObj.companyname,
            `${jobObj.min}-${jobObj.max}`,
            jobObj.applyBy,
            jobObj.opennings,
            jobObj.skills.split(',').map((skill)=> skill.trim()),
            authorId
        )

        jobs.push(newJob)
    }

    static update(id, jobObj){
        const jobIndex = jobs.findIndex((job) => job.id == id);
        const updatedJob = new JobsModel(
            id,
            jobObj.jobCatagory,
            jobObj.jobDesigination,
            jobObj.location,
            jobObj.companyname,
            `${jobObj.min}-${jobObj.max}`,
            jobObj.applyBy,
            jobObj.opennings,
            jobObj.skills.split(',').map((skill)=> skill.trim())
        )
        
        jobs.splice(jobIndex, 1, updatedJob )
    }

    static addApplicant(id, applicant){
       const job = jobs.find((job) => job.id == id);
       if(!job) return null;
       job.applications.push(applicant);
       return job;
    }

    static delete(id){
        const jobIndex = jobs.findIndex((job) => job.id == id);
        if(jobIndex == -1) return false;
        jobs.splice(jobIndex, 1)
        return true;
    }
}

const jobs = [
    new JobsModel(1,"tech", "fullstack developer", "Coimbatore",  "Trisula", "24-44", "2025-10-24", 2, ['react', 'express', 'django', 'python', 'javascript', 'express', 'node', 'core frontend']),
    new JobsModel(2,"tech", "fullstack developer", "Coimbatore",  "Trisula", "24-44", "2024-10-24", 2, ['react', 'express', 'django', 'python', 'javascript', 'express', 'node', 'core frontend'])
]

