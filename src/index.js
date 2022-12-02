import Database from './database/database';

/**
@param {LoadDatabase} loadDB Run on page load/refresh
@listens LoadDatabase
     */
document.addEventListener('DOMContentLoaded', (loadDB) => {
  const name = 'Applications';
  const version = 1;
  const fields = 'jobID,' +
    'companyName,' +
    'jobType,' +
    'jobRole,' +
    'doa,' +
    'applicationStatus,' +
    'description';
  let appliedCount;
  let inProgressCount;
  let offerCount;
  let rejectCount;
  const database = new Database(name, version);
  database.initialize(fields).then(() => showAppCards());
  console.log(database);
  // save button to save application in database
  document.getElementById('save').onclick = addApplication;
  // show form to call function to display form
  document.getElementById('showForm').onclick = showApplicationForm;
  // getting the element containing all job cards
  const appCardContainer = document.querySelector('#app-card-container');
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
    const application = {
      jobID: jobID,
      companyName: companyName,
      jobType: jobType,
      jobRole: jobRole,
      doa: doa,
      applicationStatus: applicationStatus,
      description: description,
      lastUpdated: getCurrentDate(),
    };
    database.save(application)
      .then((transaction) => {
        document.getElementById('application-form').reset();
        transaction.oncomplete = () => {
          showAppCards();
          console.log('added');
        };
      })
      .catch((error) => console.log('error', error));
  }

  /**
    * Function to fetch and create all cards from db
    */
  function showAppCards() {
    // Leave the div for card container empty
    while (appCardContainer.firstChild) {
      appCardContainer.removeChild(appCardContainer.firstChild);
    }
    database.getAllRecords().then(
      (data) => {
        createAppCards(data);
        console.log(appliedCount, inProgressCount, offerCount, rejectCount);
      },
    ).catch((e) => console.log(e, 'error in fetching all records'));
  }

  /**
   * Create app cards for all records in db
   * @param {Array} data
   */
  function createAppCards(data) {
    if (data !== null && data.length > 0) {
      appliedCount = 0;
      inProgressCount = 0;
      offerCount = 0;
      rejectCount = 0;
      data.forEach(createJobCard);
    } else {
      createEmptyAppCard();
    }
  }
  /**
   * Function to create Empty card in case of no applications
   * @param {Object} value
   */
  function createJobCard(value) {
    // const {key,
    //   jobID,
    //   companyName,
    //   jobType,
    //   jobRole,
    //   doa,
    //   description,
    //   applicationStatus} = value;
    console.log(value);

    const card = document.createElement('div');
    card.setAttribute('class', 'card mb-3 mx-auto');
    card.style = 'max-width: 750px;';

    const row = document.createElement('div');
    row.setAttribute('class', 'row g-0');
    card.appendChild(row);

    createJobCardHeaderRow(row, value);
    createJobCardColumnOne(row, value);
    createJobCardColumnTwo(row, value.applicationStatus);
    switch (value.applicationStatus) {
      case 'applied':
        appliedCount++;
        break;
      case 'inProgress':
        inProgressCount++;
        break;
      case 'offer':
        offerCount++;
        break;
      case 'reject':
        rejectCount++;
        break;
    }
    appCardContainer.appendChild(card);
  }

  /**
* Creates a job card header with information populated
* @param {HTMLElement} parent
* @param {Object} value
* */
  function createJobCardHeaderRow(parent, value) {
    const headerRow = document.createElement('div');
    headerRow.setAttribute('class', 'row g-0');
    parent.appendChild(headerRow);

    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'rounded-top',
      'navbar-expand-lg', 'navbar-light', 'bg-light');
    headerRow.appendChild(navbar);

    const container = document.createElement('div');
    container.setAttribute('class', 'container-fluid');
    navbar.appendChild(container);

    createCompanyNameElement(container, value.companyName);

    const buttons = document.createElement('div');
    container.appendChild(buttons);

    addJobCardEditButton(buttons, value.key);
    addJobCardDeleteButton(buttons, value.key);
  }


  /**
  * Creates a job card with information populated
  * @param {HTMLElement} parent
  * @param {Object} value
  * */
  function createJobCardColumnOne(parent, value) {
    const columnOne = document.createElement('div');
    columnOne.setAttribute('class', 'col-md-8');
    parent.appendChild(columnOne);

    const bodyOne = document.createElement('div');
    bodyOne.setAttribute('class', 'card-body');
    columnOne.appendChild(bodyOne);

    createJobIDElement(bodyOne, value.jobID);
    createJobTypeElement(bodyOne, value.jobType);
    createJobRoleElement(bodyOne, value.jobRole);
    createDateAppliedElement(bodyOne, value.doa);
    createDescriptionElement(bodyOne, value.description);

    // createLastUpdatedElement(bodyOne, job)
  }

  /**
  * Creates a part of job card with status information
  * @param {HTMLElement} parent
  * @param {String} applicationStatus
  * */
  function createJobCardColumnTwo(parent, applicationStatus) {
    const columnTwo = document.createElement('div');
    columnTwo.setAttribute('class',
      setStatusBackgroundColor(applicationStatus));
    parent.appendChild(columnTwo);

    const bodyTwo = document.createElement('div');
    bodyTwo.setAttribute('class', 'card-body align-items-center');
    columnTwo.appendChild(bodyTwo);

    const coloredColumn = document.createElement('div');
    coloredColumn.setAttribute('class', 'd-flex justify-content-center');
    bodyTwo.appendChild(coloredColumn);

    const status = document.createElement('h5');
    status.setAttribute('class', 'text-light');
    status.innerHTML = applicationStatus;
    coloredColumn.appendChild(status);
  }

  /**
 * Creates an entry for company title in job card
 * @param {HTMLElement} parent
 * @param {String} cname
 */
  function createCompanyNameElement(parent, cname) {
    const jobTitle = document.createElement('a');
    jobTitle.setAttribute('class', 'navbar-brand');
    jobTitle.innerHTML = cname; // cannot be null - form check added.
    parent.appendChild(jobTitle);
  }

  /**
 * Creates an entry for jobType in job card
 * @param {HTMLElement} parent
 * @param {String} jobID
 */
  function createJobIDElement(parent, jobID) {
    const jobIDElement = document.createElement('p');
    jobIDElement.setAttribute('class', 'card-text');
    parent.appendChild(jobIDElement);

    const mutedTextOne = document.createElement('text');
    mutedTextOne.setAttribute('class', 'text-muted');
    mutedTextOne.innerHTML = 'Job ID: ';
    jobIDElement.appendChild(mutedTextOne);

    const regularTextOne = document.createElement('text');
    regularTextOne.innerHTML = jobID !== undefined ? jobID : '';
    jobIDElement.appendChild(regularTextOne);
  }

  /**
 * Creates an entry for jobType in job card
 * @param {HTMLElement} parent
 * @param {String} jobType
 */
  function createJobTypeElement(parent, jobType) {
    const jobTypeElement = document.createElement('p');
    jobTypeElement.setAttribute('class', 'card-text');
    parent.appendChild(jobTypeElement);

    const mutedTextOne = document.createElement('text');
    mutedTextOne.setAttribute('class', 'text-muted');
    mutedTextOne.innerHTML = 'Job Type: ';
    jobTypeElement.appendChild(mutedTextOne);

    const regularTextOne = document.createElement('text');
    regularTextOne.innerHTML = jobType !== undefined ? jobType : '';
    jobTypeElement.appendChild(regularTextOne);
  }

  /**
   * Creates an entry for jobRole in job card
   * @param {HTMLElement} parent
   * @param {String} jobRole
   */
  function createJobRoleElement(parent, jobRole) {
    const jobRoleElement = document.createElement('p');
    jobRoleElement.setAttribute('class', 'card-text');
    parent.appendChild(jobRoleElement);

    const mutedTextTwo = document.createElement('text');
    mutedTextTwo.setAttribute('class', 'text-muted');
    mutedTextTwo.innerHTML = 'Job Role: ';
    jobRoleElement.appendChild(mutedTextTwo);

    const regularTextTwo = document.createElement('text');
    regularTextTwo.innerHTML = jobRole !== undefined ? jobRole : '';
    jobRoleElement.appendChild(regularTextTwo);
  }
  /**
   * Creates an entry for description in job card
   * @param {HTMLElement} parent
   * @param {String} desc
   */
  function createDescriptionElement(parent, desc) {
    const descElement = document.createElement('p');
    descElement.setAttribute('class', 'card-text');
    parent.appendChild(descElement);

    const mutedTextTwo = document.createElement('text');
    mutedTextTwo.setAttribute('class', 'text-muted');
    mutedTextTwo.innerHTML = 'Description: ';
    descElement.appendChild(mutedTextTwo);

    const regularTextTwo = document.createElement('text');
    regularTextTwo.innerHTML = desc !== undefined ? desc : '';
    descElement.appendChild(regularTextTwo);
  }
  /**
 * Creates an entry for doa in job card
 * @param {HTMLElement} parent
 * @param {String} doa
 */
  function createDateAppliedElement(parent, doa) {
    const dateApplied = document.createElement('p');
    dateApplied.setAttribute('class', 'card-text');
    parent.appendChild(dateApplied);

    const mutedTextTwo = document.createElement('text');
    mutedTextTwo.setAttribute('class', 'text-muted');
    mutedTextTwo.innerHTML = 'Date Applied: ';
    dateApplied.appendChild(mutedTextTwo);

    const regularTextTwo = document.createElement('text');
    regularTextTwo.innerHTML = doa !== undefined ? doa : '';
    dateApplied.appendChild(regularTextTwo);
  }

  // TODO: for use later
  // function createLastUpdatedElement(parent, job) {
  //   const lastUpdated = document.createElement('p');
  //   lastUpdated.setAttribute('class', 'card-text');
  //   const lastUpdatedText = document.createElement('small');
  //   lastUpdatedText.setAttribute('class', 'text-muted');
  //   lastUpdatedText.innerHTML = 'Last updated 3 mins ago';

  //   lastUpdated.appendChild(lastUpdatedText);
  //   parent.appendChild(lastUpdated);
  // }

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
* Creates a edit button of job card
* @param {HTMLElement} parent
*  @param {int} key
* */
  function addJobCardEditButton(parent, key) {
    const editButton = document.createElement('button');

    editButton.setAttribute('class', 'btn btn-outline-info btn-sm');
    editButton.setAttribute('type', 'submit');
    editButton.innerHTML = 'Edit';
    editButton.setAttribute('id', 'edit-app');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#updateApp');
    parent.appendChild(editButton);
  }

  /**
  * Creates a delete button of job card
  * @param {HTMLElement} parent
  * @param {int} key
  * */
  function addJobCardDeleteButton(parent, key) {
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-outline-danger btn-sm');
    deleteButton.setAttribute('type', 'submit');
    deleteButton.setAttribute('id', 'delete-app');
    deleteButton.innerHTML = 'Delete';

    addDelModal(deleteButton, key);
    parent.appendChild(deleteButton);
  }

  /**
 * To set bg color indicating status of application.
 * @param {String} status
 * @return {String}
 */
  function setStatusBackgroundColor(status) {
    if (status == 'applied') {
      return 'col-sm rounded-bottom-right-1 bg-warning d-flex align-items-center';
    } else if (status == 'inProgress') {
      return 'col-sm rounded-bottom-right-1 bg-primary d-flex align-items-center';
    } else if (status == 'offer') {
      return 'col-sm rounded-bottom-right-1 bg-success d-flex align-items-center';
    } else if (status == 'reject') {
      return 'col-sm rounded-bottom-right-1 bg-danger d-flex align-items-center';
    } else {
      return 'col-sm rounded-bottom-right-1 bg-muted d-flex align-items-center';
    }
  }

  /**
   * Function to create Empty card in case of no applications
   */
  function createEmptyAppCard() {
    if (!appCardContainer.firstChild) {
      const text = document.createElement('p');
      text.textContent = 'No applications to show here!';
      appCardContainer.appendChild(text);
    }
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

  /**
   * find the value selected in Radio button
   * @param {HTMLElement} elements
   * @return {string}
   */
  function findRadioSelectedValue(elements) {
    let val = '';

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        val = elements[i].value;
      }
    }
    return val;
  }

  /**
   * Returns todays date in yyyy-mm-dd format
   * @return {String} today's date
   */
  function getCurrentDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
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
});

