/*
 * @author Alex Martakis <amartakis@ucsd.edu>
 */

console.log("scripts.js successfully loaded")

// onload calls this function
function defaultLoad(){
    showApplications()
    createJobApplicationsCardStack()
}

//applications, reminders, and statistics are loaded but only applications is shown
function showApplications(){
    console.log("applications is currently being displayed")
    document.getElementById("application-form").style.display = "none";
    document.getElementById("applications").style.display = "";
    document.getElementById("reminders").style.display = "none";
    document.getElementById("statistics").style.display = "none";
}

//applications, reminders, and statistics are loaded but only reminders is shown
function showReminders(){
    console.log("reminders is currently being displayed")
    document.getElementById("application-form").style.display = "none";
    document.getElementById("applications").style.display = "none";
    document.getElementById("reminders").style.display = "";
    document.getElementById("statistics").style.display = "none";
}

//applications, reminders, and statistics are loaded but only statistics is shown
function showStatistics(){
    console.log("statistics is currently being displayed")
    document.getElementById("application-form").style.display = "none";
    document.getElementById("applications").style.display = "none";
    document.getElementById("reminders").style.display = "none";
    document.getElementById("statistics").style.display = "";
}

function showApplicationForm(){
    console.log("Application Form Has Been Activated")
    document.getElementById("application-form").style.display = "";
}

//retrieves JSON Job Application object and creates a job card for each applied job
function createJobApplicationsCardStack(){

    json = getLocalJSONJobApplicationObject()

    jobApplications = json.jobApplications

    //creates a job application card for each job in job applications
    jobApplications.forEach(job => {
        createJobApplicationCard(job)
    });
}

// creates a job application card with elements for each attribute from the job object from the job application JSON object
function createJobApplicationCard(job){

    var card = document.createElement("article");
    card.setAttribute("id", job.jobID);
    card.setAttribute("class", "job-card")
    console.log(card)

    addJobCardElement("h3", "company", getCompanyTitle(job), card)
    addJobCardElement("p", "job-type", getEmploymentType(job), card)
    addJobCardElement("p", "job-role", getJobRole(job), card)
    addJobCardElement("p", "date-applied", getDateApplied(job), card)
    addStatusElement("p", "job-status", getStatus(job), card)

    var cardStack = document.getElementById("job-card-stack")
    cardStack.appendChild(card)

    console.log(cardStack)
}

// appends the element to the job card for each attribute from the job object
function addJobCardElement(elementTag, id, elementContent, card){
    var element = document.createElement(elementTag);
    element.setAttribute("id", id);
    element.setAttribute("class", id);
    element.appendChild(document.createTextNode(elementContent));
    card.appendChild(element)
}

function addStatusElement(elementTag, id, elementContent, card){
    var element = document.createElement(elementTag);
    element.setAttribute("id", id);
    element.setAttribute("class", id);
    element.appendChild(document.createTextNode(elementContent));
    setStatusBackgroundColor(element, elementContent)

    card.appendChild(element)
}

function setStatusBackgroundColor(element, elementContent){
    if (elementContent == "Applied"){
        element.setAttribute("style", "background-color: yellow;");
    } else if (elementContent == "In Progress"){
        element.setAttribute("style", "background-color: orange;");
    } else if (elementContent == "Offer"){
        element.setAttribute("style", "background-color: green;");
    } else if (elementContent == "Reject"){
        element.setAttribute("style", "background-color: red;");
    } else {
        element.setAttribute("style", "background-color: grey;");
    }
}

function getCompanyTitle(job){
    return job.company
}

function getEmploymentType(job){
    return job.employmentType

}

function getJobRole(job){
    return job.role
}

function getDateApplied(job){
    return job.dateApplied
}

function getStatus(job){
    return job.status
}

function getLocalJSONJobApplicationObject(){
    return {jobApplications: [
        {"jobID": "001", 
        "company": "Apple", 
        "employmentType": "Full-Time", 
        "role": "Software Engineer", 
        "dateApplied": "10/11/2022", 
        "status": "Applied"},
        {"jobID": "002", 
        "company": "Starbucks", 
        "employmentType": "Full-Time", 
        "role": "Software Engineer", 
        "dateApplied": "10/10/2022", 
        "status": "In Progress"},
        {"jobID": "003", 
        "company": "Domino's Pizza", 
        "employmentType": "Full-Time", 
        "role": "Software Engineer", 
        "dateApplied": "10/08/2022", 
        "status": "Offer"},
        {"jobID": "004", 
        "company": "Meta", 
        "employmentType": "Full-Time", 
        "role": "Product Manager", 
        "dateApplied": "10/08/2022", 
        "status": "Applied"},
        {"jobID": "005", 
        "company": "Google", 
        "employmentType": "Part-Time", 
        "role": "Research Assistant", 
        "dateApplied": "09/23/2022", 
        "status": "Reject"},
        {"jobID": "006", 
        "company": "Amazon", 
        "employmentType": "Full-Time", 
        "role": "Software Engineer", 
        "dateApplied": "09/23/2022", 
        "status": "In Progress"},
        {"jobID": "007", 
        "company": "Netflix", 
        "employmentType": "Full-Time", 
        "role": "Senior Software Engineer", 
        "dateApplied": "09/20/2022", 
        "status": "Reject"}
    ]}
}