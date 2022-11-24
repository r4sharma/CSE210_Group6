const Database = require('./database/database');
/**
@param {LoadDatabase} loadDB Run on page load/refresh
@listens LoadDatabase
     */
document.addEventListener('DOMContentLoaded', (loadDB) => {
  const name = 'Applications';
  const version = 1;
  const fields = 'jobID,companyName,jobType,jobRole,doa,applicationStatus,description';
  const database = new Database(name, version);
  database.initialize(fields);
  console.log(database);
  // save button to save application in database
  document.getElementById('save').onclick = addApplication;
  //show form to call function to display form
  document.getElementById('showForm').onclick = showApplicationForm;

  /**
    Add Application Function
    @param {event} event
   */
  function addApplication(event) {
    event.preventDefault();
    const jobID = document.getElementById('jobid').value;
    const companyName = document.getElementById('cname').value;
    const jobType = findRadioSelectedValue(document.getElementsByName('jobtype'));
    const jobRole = document.getElementById('jobrole').value;
    const doa = document.getElementById('doa').value;
    const applicationStatus = document.getElementById('status').value;
    const description = document.getElementById('desc').value;
    // craeting record in db
    const application = {jobID: jobID,
                         companyName: companyName, 
                         jobType : jobType,
                         jobRole : jobRole,
                         doa : doa,
                         applicationStatus: applicationStatus,
                         description: description};
    database.save(application)
        .then((transaction) => {
          // showApplications(); // to be added
          console.log('added');
        })
        .catch((transaction) => console.log('error'));
  }

  /**
    Show Application Form
    @param {event} event
   */
    function showApplicationForm(event) {
      event.preventDefault();
      // enable the display of app form
      console.log("Application Form Has Been Activated")
      document.getElementById("application-form").style.display = "";
    }

  /**
   * find the value selected in Radio button
   * @param {elements}
   * @return {val}
   */
  function findRadioSelectedValue(elements) {
    var val = '';
      
    for(i = 0; i < elements.length; i++) {
        if(elements[i].checked)
          val = elements[i].value;
    }
    return val;
  }

});


