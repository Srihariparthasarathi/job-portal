
// OM NAMASIVAYA
const jobCategories = {
    "Administrative & Office Support": [
      "Receptionist",
      "Administrative Assistant",
      "Office Manager",
      "Executive Assistant",
      "Data Entry Clerk"
    ],
    "Accounting & Finance": [
      "Accountant",
      "Financial Analyst",
      "Bookkeeper",
      "Auditor",
      "Tax Specialist",
      "Financial Planner"
    ],
    "Customer Service": [
      "Customer Support Representative",
      "Call Center Agent",
      "Help Desk Technician",
      "Customer Success Manager"
    ],
    "Healthcare": [
      "Doctor/Physician",
      "Nurse",
      "Pharmacist",
      "Medical Assistant",
      "Physical Therapist",
      "Healthcare Administrator"
    ],
    "Information Technology (IT)": [
      "Software Developer",
      "Systems Administrator",
      "Network Engineer",
      "IT Support Specialist",
      "Data Scientist",
      "Cybersecurity Specialist",
      "UI/UX Designer"
    ],
    "Sales & Marketing": [
      "Sales Representative",
      "Account Manager",
      "Marketing Manager",
      "Digital Marketing Specialist",
      "SEO Specialist",
      "Brand Manager",
      "Sales Executive"
    ],
    "Education & Training": [
      "Teacher/Instructor",
      "Professor",
      "Curriculum Developer",
      "Educational Consultant",
      "Corporate Trainer"
    ],
    "Engineering": [
      "Mechanical Engineer",
      "Electrical Engineer",
      "Civil Engineer",
      "Software Engineer",
      "Environmental Engineer",
      "Industrial Engineer"
    ],
    "Legal": [
      "Lawyer/Attorney",
      "Paralegal",
      "Legal Secretary",
      "Legal Consultant",
      "Compliance Officer"
    ],
    "Human Resources (HR)": [
      "HR Generalist",
      "HR Manager",
      "Recruiter",
      "Training and Development Specialist",
      "Compensation and Benefits Manager"
    ],
    "Manufacturing & Production": [
      "Production Manager",
      "Assembly Line Worker",
      "Quality Control Inspector",
      "Machine Operator",
      "Maintenance Technician"
    ],
    "Logistics & Supply Chain": [
      "Supply Chain Manager",
      "Logistics Coordinator",
      "Warehouse Manager",
      "Transportation Planner",
      "Inventory Control Specialist"
    ],
    "Arts, Design, & Media": [
      "Graphic Designer",
      "Video Editor",
      "Photographer",
      "Art Director",
      "Animator",
      "Copywriter",
      "Content Creator"
    ],
    "Construction & Skilled Trades": [
      "Construction Worker",
      "Carpenter",
      "Electrician",
      "Plumber",
      "Welder",
      "Construction Manager"
    ],
    "Hospitality & Tourism": [
      "Hotel Manager",
      "Travel Agent",
      "Tour Guide",
      "Chef/Cook",
      "Event Planner",
      "Restaurant Manager"
    ],
    "Science & Research": [
      "Research Scientist",
      "Biotechnologist",
      "Lab Technician",
      "Chemist",
      "Environmental Scientist"
    ],
    "Retail": [
      "Retail Sales Associate",
      "Store Manager",
      "Visual Merchandiser",
      "Cashier",
      "Inventory Specialist"
    ],
    "Transportation": [
      "Truck Driver",
      "Delivery Driver",
      "Pilot",
      "Train Operator",
      "Fleet Manager"
    ],
    "Real Estate": [
      "Real Estate Agent",
      "Property Manager",
      "Real Estate Broker",
      "Leasing Consultant",
      "Appraiser"
    ],
    "Government & Public Sector": [
      "Policy Analyst",
      "Public Administrator",
      "Diplomat",
      "Civil Service Officer",
      "Police Officer"
    ],
    "Environmental & Agriculture": [
      "Environmental Engineer",
      "Ecologist",
      "Farmer",
      "Agricultural Technician",
      "Sustainability Coordinator"
    ],
    "Nonprofit & Social Services": [
      "Social Worker",
      "Case Manager",
      "Fundraising Manager",
      "Volunteer Coordinator",
      "Community Outreach Coordinator"
    ],
    "Telecommunications": [
      "Network Technician",
      "Telecommunications Specialist",
      "Radio Operator",
      "Field Service Technician"
    ],
    "Energy & Utilities": [
      "Electrical Engineer",
      "Energy Consultant",
      "Power Plant Operator",
      "Renewable Energy Technician",
      "Oil and Gas Worker"
    ]
};


const jobCatagory = document.getElementById("jobCatagory");
const jobDesigination = document.getElementById("jobDesigination");
const updateForm = document.getElementById("updateForm");
const errContainer = document.getElementById("err-container");
//apply job
const applyJob = document.getElementById("apply-job");
const applyFormContainer = document.getElementById("application-form");
const innerContainer  = document.getElementById("inner-container");
const applyForm = document.getElementById("apply-form")

// edit, delete and applicant page
const applicationCountIcon = document.getElementById("applicant-count")
const updateJobIcon = document.getElementById("update-job")
const delectJobIcon = document.getElementById("delete-job")
const closeAppFormIcon = document.getElementById("close-app-form")
const closeAppList = document.getElementById("close-app-list")
const applicationList = document.getElementById("application-list")

//all job pages
const jobContainer = document.getElementById("jobs-container")
const jobPage = document.getElementById("all-jobs-main-container");

document.addEventListener("DOMContentLoaded", async ()=>{
  if(jobPage){
    const url ='/jobs'
    const jobs = await getAllJobs(url);
    if(!jobs) return console.log("err");
    renderJobs(jobs);
    
  }
})

async function getAllJobs(url){
  try{
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const dataObj = await response.json();

    if(!dataObj.jobs.length > 0) return null;
    return dataObj.jobs;

  }catch(err){
    console.log(err);
  }
}

function renderJobs(jobs){
  jobContainer.textContent ="";

  jobs.forEach((job) => {
    // Create job item container
    const jobItemEl = document.createElement("div");
    jobItemEl.classList.add("jobs-items");

    // Company name and job details
    const jobInfoDiv = document.createElement("div");
    jobInfoDiv.innerHTML = `
        <h2>${job.companyname}</h2>
        <p>${job.jobCatagory} <span>${job.jobDesigination}</span></p>
    `;

    // Location section
    const locationDiv = document.createElement("div");
    locationDiv.classList.add("location");
    locationDiv.innerHTML = `
        <i class="fa-solid fa-location-dot"></i>
        <p>${job.location}</p>
    `;

    // Salary range section
    const salaryDiv = document.createElement("div");
    salaryDiv.classList.add("salary-range");
    salaryDiv.innerHTML = `
        <i class="fa-solid fa-indian-rupee-sign"></i>
        <p>${job.salary} lpa</p>
    `;

    // Skills section
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("skills");
    if (job.skills.length > 0) {
        job.skills.forEach((skill) => {
            const paraEl = document.createElement("p");
            paraEl.textContent = skill;
            skillDiv.append(paraEl);
        });
    } else {
        const noSkillEl = document.createElement("p");
        noSkillEl.textContent = "No specific skills listed";
        skillDiv.append(noSkillEl);
    }

    // Link to job details
    const jobLink = document.createElement("a");
    jobLink.href = `/jobs/${job.id}`;
    jobLink.textContent = "View Details";

    // Append all sections to job item container
    jobItemEl.append(jobInfoDiv, locationDiv, salaryDiv, skillDiv, jobLink);

    // Append job item container to the main container
    jobContainer.appendChild(jobItemEl);
  });  
}




if(jobCatagory){
  // add job catagory in select tag
  createOptions(Object.keys(jobCategories), jobCatagory)
  // change dynamic option based of the job catagory
  jobCatagory.addEventListener("change", (event) =>{
    jobDesigination.innerHTML = ""
    createOptions(jobCategories[event.target.value], jobDesigination)
  })

}


function createOptions(datas, element){
    /**implement DRY principal to create options */
    datas.forEach(data => {
        const options = document.createElement('option');
        options.innerText = data;
        options.setAttribute("value", data)
        element.appendChild(options);
        });
}


//send put request 
if(updateForm){
  updateForm.addEventListener("submit",  async (event) =>{
    event.preventDefault();
    //from data
    let formData = new FormData(event.target);
    const isConform = window.confirm("plese conform to update");
    if(!isConform){
      window.location.href = `/update-jobs/${jobId}`
      return null;
    }
  
    //to make url
    const jobId = updateForm.getAttribute("data-job-id")
    const url = `/jobs/${jobId}`
  
    try{
      const response = await fetch(url, {method: "put",body: formData})
  
      if (!response.ok) {
        if(response.status == 422){
        const errors = await response.json();
        // html element 
            errContainer.innerText ="";
            errContainer.innerHTML = `<p>
            <span>${errors.errors[0].msg}</span>
            </p>`;
        }
  
        throw new Error(`Response status: ${response.status}`);
      }
  
      //navigate to job page after successfully updating
      window.location.href = `/jobs/${jobId}`
  
    }catch(err){
      console.log(err.message)
    }
  })
  
}

//apply-job button wizerd code
if(applyJob){
  applyJob.addEventListener("click", ()=>{
    applyFormContainer.setAttribute("style", "display : block")
    innerContainer.setAttribute("style", "opacity: .2")
  })

  applicationCountIcon.addEventListener("click",()=>{
    applicationList.setAttribute("style", "display : block")
    innerContainer.setAttribute("style", "opacity: .2")
  })

  if(applicationList){
    closeAppList.addEventListener("click", ()=>{
      applicationList.setAttribute("style", "display : none")
      innerContainer.setAttribute("style", "opacity: 1")
    })
  }

  delectJobIcon.addEventListener("click", async (event)=>{
    const jobId = event.target.closest("[data-job-id]").getAttribute("data-job-id");
    const url = `/jobs/${jobId}`;
    const isConform = window.confirm("plese conform to delete");
    if(!isConform) return null;

    try{
      const response = await fetch(url, {method: "delete"});
      if(!response.ok) throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      window.location.href = `/jobs`;

    }catch(err){
      console.log(err);
    }
 
  })

}

if(applyFormContainer){
  applyForm.addEventListener("submit",async (event) =>{
    event.preventDefault();
    //from data
    let formData = new FormData(event.target);
    const url = `/apply-job`
  
    try{
      const response = await fetch(url, {method: "post",body: formData})
  
      if (!response.ok) {
        if(response.status == 400){
        const errors = await response.json();
        // html element 
            errContainer.innerText ="";
            errContainer.innerHTML = `<p>
            <span>${errors.errors[0].msg}</span>
            </p>`;
        }
  
        throw new Error(`Response status: ${response.status}`);
      }
  
      //navigate to job page after successfully updating
      const data = await response.json();
      applyFormContainer.setAttribute("style", "display : none")
      innerContainer.setAttribute("style", "opacity: 1;")    
      window.location.href =`/jobs/${data.id}`
  
    }catch(err){
      console.log(err.message)
    }
  })

  closeAppFormIcon.addEventListener("click",()=>{
    applyFormContainer.setAttribute("style", "display : none")
    innerContainer.setAttribute("style", "opacity: 1;")    
  })
}


