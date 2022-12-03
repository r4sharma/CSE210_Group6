import Database from './database/database';
import {showAppCards, getCardContainer} from './components/cards';
import {getCurrentDate, findRadioSelectedValue} from './components/utils';

let database = null;

/**
* @param {LoadDatabase} loadDB Run on page load/refresh
* @listens LoadDatabase
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
* Add Application Function
* @param {event} event
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
* Show Application Form
* @param {event} event
*/
function showApplicationForm(event) {
  event.preventDefault();
  // enable the display of app form
  console.log('Application Form Has Been Activated');
  document.getElementById('application-form').style.display = '';
}

/**
* Add Listener to the delete button
*/
document.addEventListener('click', function(e) {
  const deleteBtn = e.target.closest('#delete-app'); // Or any other selector.
  if (deleteBtn) {
    createDeleteModal(e);
  }
});

/**
* Function to create modal for delete
* @param {event} event
*/
function createDeleteModal(event) {
  const key = Number(event.target.getAttribute('data-id'));
  const deleteButtonModal = document.querySelector('#deleteAppButton');
  deleteButtonModal.setAttribute('data-id', key);
  deleteButtonModal.onclick = deleteViaModal;
}

/**
 * Adds delete functionality to delete button in modal
 * @param {event} event
 */
function deleteViaModal(event) {
  event.preventDefault();
  const key = Number(event.target.getAttribute('data-id'));
  deleteApplication(key);
}

/**
 * Function to succesfully delete the application.
 * @param {int} key
 */
function deleteApplication(key) {
  database.remove(key)
      .then((result) => {
        dbShowAppCards();
        console.log(result);
      })
      .catch((error) => console.log('error in deleting record!', error));
}

/**
 * Add Listener to the edit button
 */
document.addEventListener('click', function(e) {
  const editBtn = e.target.closest(`#edit-app`);
  if (editBtn) {
    createEditModal(e);
  }
});

/**
 * Populate details of a particular record
 * @param {event} event
 */
function createEditModal(event) {
  const key = Number(event.target.getAttribute('data-id'));
  console.log(`Edit`);
  console.log(key);
  database.getRecordByKey(key).then((value)=>{
    document.getElementById('edit-form').reset();
    console.log(value);
    document.getElementById('editJobid').setAttribute('value', value.jobID);
    document.getElementById('editCname')
        .setAttribute('value', value.companyName);
    document.getElementById(value.jobType).checked = true;
    // eslint-disable-next-line max-len
    for (const option of document.getElementById('editApplicationStatus').options) {
      if (option.value === value.applicationStatus) {
        option.selected = true;
      }
    }
    document.getElementById('editJobrole')
        .setAttribute('value', value.jobRole);
    document.getElementById('editDoa')
        .setAttribute('value', value.doa);
    document.getElementById('editDescription')
        .innerHTML=value.description;
  });

  const editSaveButtonModal = document.querySelector('#editAppButton');
  editSaveButtonModal.setAttribute('data-id', key);
  editSaveButtonModal.onclick = editViaModal;
}

/**
 * Adds edit functionality to edit button in modal
 * @param {event} event
 */
function editViaModal(event) {
  event.preventDefault();
  const key = Number(event.target.getAttribute('data-id'));
  editApplication(key);
}

/**
 * Function to succesfully update the application.
 * @param {int} key
 */
function editApplication(key) {
  const jobID = document.getElementById('editJobid').value;
  const companyName = document.getElementById('editCname').value;
  const jobType =
  findRadioSelectedValue(document.getElementsByName('editJobtype'));
  const jobRole = document.getElementById('editJobrole').value;
  const doa = document.getElementById('editDoa').value;
  const applicationStatus =
    document.getElementById('editApplicationStatus').value;
  const description = document.getElementById('editDescription').value;
  // craeting record in db
  const application = {
    key: key,
    jobID: jobID,
    companyName: companyName,
    jobType: jobType,
    jobRole: jobRole,
    doa: doa,
    applicationStatus: applicationStatus,
    description: description,
    lastUpdated: getCurrentDate()};
  database.update(application)
      .then((transaction) => {
        document.getElementById('edit-form').reset();
        dbShowAppCards();
      })
      .catch((error) => console.log('error in updating the record.', error));
};
