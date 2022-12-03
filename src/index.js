import Database from './database/database';
import {showAppCards, getCardContainer} from './components/cards';
import {getCurrentDate, findRadioSelectedValue} from './components/utils';

let database = null;

/**
@param {LoadDatabase} loadDB Run on page load/refresh
@listens LoadDatabase
     */
document.addEventListener('DOMContentLoaded', (loadDB) => {
  const name = 'Applications';
  const version = 1;
  const fields = 'jobID,'+
  'companyName,'+
  'jobType,'+
  'jobRole,'+
  'doa,'+
  'applicationStatus,'+
  'description';
  database = new Database(name, version);
  getCardContainer();
  // eslint-disable-next-line max-len
  database.initialize(fields).then(()=>dbShowAppCards());
  // save button to save application in database
  document.getElementById('save').onclick = addApplication;
  // show form to call function to display form
  document.getElementById('showForm').onclick = showApplicationForm;
});

/**
  Add Application Function
  @param {event} event
  */
function addApplication(event) {
  event.preventDefault();
  const jobID = document.getElementById('jobid').value;
  const companyName = document.getElementById('cname').value;
  const jobType =
      findRadioSelectedValue(document.getElementsByName('jobtype'));
  const jobRole = document.getElementById('jobrole').value;
  const doa = document.getElementById('doa').value;
  const applicationStatus = document.getElementById('status').value;
  const description = document.getElementById('desc').value;
  // craeting record in db
  const application = {jobID: jobID,
    companyName: companyName,
    jobType: jobType,
    jobRole: jobRole,
    doa: doa,
    applicationStatus: applicationStatus,
    description: description,
    lastUpdated: getCurrentDate()};
  database.save(application)
      .then((transaction) => {
        document.getElementById('application-form').reset();
        transaction.oncomplete = () => {
          dbShowAppCards();
        };
      })
      .catch((error) => console.log('error', error));
}

/**
 * Show application cards by reading database
 */
function dbShowAppCards() {
  database.getAllRecords().then((data) => {
    showAppCards(data);
    console.log('added');
  }).catch((e) => console.log(e, 'error in fetching all records'));
}
/**
Show Application Form
@param {event} event
*/
function showApplicationForm(event) {
  event.preventDefault();
  // enable the display of app form
  console.log('Application Form Has Been Activated');
  document.getElementById('application-form').style.display = '';
}

