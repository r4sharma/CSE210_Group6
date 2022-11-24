const Database = require('./database/database');
/**
@param {LoadDatabase} loadDB Run on page load/refresh
@listens LoadDatabase
     */
document.addEventListener('DOMContentLoaded', (loadDB) => {
  const name = 'Applications';
  const version = 1;
  const fields = 'jobID,companyName';
  const database = new Database(name, version);
  database.initialize(fields);
  console.log(database);
  document.getElementById('addButton').onclick = addApplication;

  /**
    Add Application Function
    @param {event} event
   */
  function addApplication(event) {
    event.preventDefault();
    // add code to create an object from html components
    const application = {jobID: '2', companyName: 'Amazon'};
    database.save(application)
        .then((transaction) => {
          // showApplications(); // to be added
          console.log('added');
        })
        .catch((transaction) => console.log('error'));
  }
});


