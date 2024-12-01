// OM NAMASIVAYA
export default class applicantModel{
    constructor(id, name, email, phone, filePath){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.filePath = filePath;
    }

    static add(appObj){
        const lastApplicantValue = applicants[applicants.length - 1];
        const applicantid = (!lastApplicantValue) ? applicants.length + 1 : lastApplicantValue.id + 1;

        const newApplicant = {
            id:applicantid,
            ...appObj
        }
        applicants.push(newApplicant);
        return newApplicant;
    }
}

const applicants = [];