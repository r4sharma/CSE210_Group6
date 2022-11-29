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

    var card = document.createElement("div");
    card.setAttribute("class", "card mb-3 mx-auto")
    card.style = "max-width: 750px;"

    var row = document.createElement("div");
    row.setAttribute("class", "row g-0")
    card.appendChild(row)

    createJobCardColumnOne(row, job)
    createJobCardColumnTwo(row, job)
    createJobCardColumnThree(row)

    var cardStack = document.getElementById("job-card-stack")
    cardStack.setAttribute("class", "card-text")
    cardStack.appendChild(card)
}

function createJobCardColumnOne(parent, job){
    var column_1 = document.createElement("div");
    column_1.setAttribute("class", "col-md-8")
    parent.appendChild(column_1)

    var bodyOne = document.createElement("div");
    bodyOne.setAttribute("class", "card-body")
    column_1.appendChild(bodyOne)

    createJobTitleElement(bodyOne, job)
    createJobTypeElement(bodyOne, job)
    createJobRoleElement(bodyOne, job)
    createDateAppliedElement(bodyOne, job)
    // createLastUpdatedElement(bodyOne, job)
}

function createJobCardColumnTwo(parent, job){
    var columnTwo = document.createElement("div");
    columnTwo.setAttribute("class", setBootstrapStatusBackgroundColor(job.status))
    parent.appendChild(columnTwo)

    var bodyTwo = document.createElement("div");
    bodyTwo.setAttribute("class", "card-body")
    columnTwo.appendChild(bodyTwo)

    var coloredColumn = document.createElement("div");
    coloredColumn.setAttribute("class", "d-flex justify-content-center")
    bodyTwo.appendChild(coloredColumn)

    var status = document.createElement("h5")
    status.setAttribute("class", "text-light")
    status.innerHTML = getStatus(job)
    coloredColumn.appendChild(status)
}

function createJobCardColumnThree(parent){
    var columnThree = document.createElement("div");
    columnThree.setAttribute("class", "col-sm-1 btn-group-vertical btn-block")
    parent.appendChild(columnThree)

    addJobCardEditButton(columnThree)
    addJobCardDeleteButton(columnThree)
}

function createJobTitleElement(parent, job){
    var cardTitle = document.createElement("h5");
    cardTitle.innerHTML = getCompanyTitle(job)
    parent.appendChild(cardTitle)
}

function createJobTypeElement(parent, job){
    var jobType = document.createElement("p");
    jobType.setAttribute("class", "card-text")
    parent.appendChild(jobType)

    var mutedTextOne = document.createElement("text");
    mutedTextOne.setAttribute("class", "text-muted")
    mutedTextOne.innerHTML = "Job Type: "
    jobType.appendChild(mutedTextOne)

    var regularTextOne = document.createElement("text");
    regularTextOne.innerHTML = "Full Time"
    jobType.appendChild(regularTextOne)
}

function createJobRoleElement(parent, job){
    var jobRole = document.createElement("p");
    jobRole.setAttribute("class", "card-text")
    parent.appendChild(jobRole)

    var mutedTextTwo = document.createElement("text");
    mutedTextTwo.setAttribute("class", "text-muted")
    mutedTextTwo.innerHTML = "Job Role: "
    jobRole.appendChild(mutedTextTwo)

    var regularTextTwo = document.createElement("text");
    regularTextTwo.innerHTML = getJobRole(job)
    jobRole.appendChild(regularTextTwo)
}

function createDateAppliedElement(parent, job){
    var dateApplied = document.createElement("p");
    dateApplied.setAttribute("class", "card-text")
    parent.appendChild(dateApplied)

    var mutedTextTwo = document.createElement("text");
    mutedTextTwo.setAttribute("class", "text-muted")
    mutedTextTwo.innerHTML = "Date Applied: "
    dateApplied.appendChild(mutedTextTwo)

    var regularTextTwo = document.createElement("text");
    regularTextTwo.innerHTML = getDateApplied(job)
    dateApplied.appendChild(regularTextTwo)
}

function createLastUpdatedElement(parent, job){
    var lastUpdated = document.createElement("p");
    lastUpdated.setAttribute("class", "card-text")
    var lastUpdatedText = document.createElement("small");
    lastUpdatedText.setAttribute("class", "text-muted")
    lastUpdatedText.innerHTML = "Last updated 3 mins ago"

    lastUpdated.appendChild(lastUpdatedText)
    parent.appendChild(lastUpdated)
}

function addJobCardEditButton(parent){
    var editButton = document.createElement("button");
    editButton.type = "button"
    editButton.setAttribute("class", "btn btn-light")
    parent.appendChild(editButton)

    var buttonText = document.createElement("p")
    buttonText.setAttribute("class", "text-info")
    buttonText.innerHTML = "edit"
    editButton.appendChild(buttonText)
}

function addJobCardDeleteButton(parent){
    var deleteButton = document.createElement("button");
    deleteButton.type = "button"
    deleteButton.setAttribute("class", "btn btn-light")
    parent.appendChild(deleteButton)

    var buttonText = document.createElement("p")
    buttonText.setAttribute("class", "text-danger")
    buttonText.innerHTML = "del"
    deleteButton.appendChild(buttonText)

    console.log("Delete button has been created")
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

function setBootstrapStatusBackgroundColor(status){
    if (status == "Applied"){
        return "col-sm bg-warning"
    } else if (status == "In Progress"){
        return "col-sm bg-primary"
    } else if (status == "Offer"){
        return "col-sm bg-success"
    } else if (status == "Reject"){
        return "col-sm bg-danger"
    } else {
        return "col-sm bg-muted"
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