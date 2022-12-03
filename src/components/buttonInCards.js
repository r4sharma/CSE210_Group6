import {getCurrentDate, findRadioSelectedValue} from './utils';

/**
* Creates a edit button of job card
* @param {HTMLElement} parent
*  @param {String} key
* */
export function addJobCardEditButton(parent, key) {
  const editButton = document.createElement('button');

  editButton.setAttribute('class', 'btn btn-outline-info btn-sm');
  editButton.setAttribute('type', 'submit');
  editButton.innerHTML = 'Edit';
  editButton.setAttribute('id', 'edit-app');
  addEditModal(editButton, key);
  parent.appendChild(editButton);
}

/**
* Creates a edit modal of job card
* @param {HTMLElement} editButton
* @param {int} key
*/
function addEditModal(editButton, key) {
  editButton.setAttribute('data-bs-toggle', 'modal');
  editButton.setAttribute('data-bs-target', '#updateApp');
  editButton.setAttribute('data-id', key);
  editButton.onclick = populateEditModal;
  const editButtonModal = document.querySelector('#editAppButton');
  editButtonModal.setAttribute('data-id', key);
  editButtonModal.onclick = editViaModal;
}

/**
 * Populate details of a particular record
 * @param {event} event
 */
function populateEditModal(event) {
  const key = Number(event.target.getAttribute('data-id'));
  console.log(key);
  database.getRecordByKey(key).then((value)=>{
    document.getElementById('edit-form').reset();
    console.log(value);
    document.getElementById('editJobid').setAttribute('value', value.jobID);
    document.getElementById('editCname')
        .setAttribute('value', value.companyName);
    document.getElementById('editJobtype').checked = value.jobType;
    document.getElementById('editApplicationStatus')
        .selected =value.applicationStatus;
    document.getElementById('editJobrole')
        .setAttribute('value', value.jobRole);
    document.getElementById('editDoa')
        .setAttribute('value', value.doa);
    document.getElementById('editDescription')
        .setAttribute('value', value.description);
  });
}

/**
 * Adds edit functionality to edit button in modal
 * @param {event} event
 */
function editViaModal(event) {
  event.preventDefault();
  const task = event.currentTarget.closest('.message');
  console.log(task);
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
  const application = {jobID: jobID,
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
        transaction.oncomplete = () => {
          showAppCards();
          console.log('updated');
        };
      })
      .catch((error) => console.log('error in updating the record.', error));
}

/**
* Creates a delete button of job card
* @param {HTMLElement} parent
* @param {int} key
* */
export function addJobCardDeleteButton(parent, key) {
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'btn btn-outline-danger btn-sm');
  deleteButton.setAttribute('type', 'submit');
  deleteButton.setAttribute('id', 'delete-app');
  deleteButton.innerHTML = 'Delete';

  addDelModal(deleteButton, key);
  parent.appendChild(deleteButton);
}

/**
* Creates a delete button of job card
* @param {HTMLElement} deleteButton
* @param {int} key
* */
function addDelModal(deleteButton, key) {
  deleteButton.setAttribute('data-bs-toggle', 'modal');
  deleteButton.setAttribute('data-bs-target', '#deleteApp');
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
  console.log(event.target);
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
        showAppCards();
        console.log(result);
      })
      .catch((error) => console.log('error in deleting record!', error));
}

