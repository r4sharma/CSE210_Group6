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
    const application = {jobID: '2', companyName: 'Amazon'};
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


});


