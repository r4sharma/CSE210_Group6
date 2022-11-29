import Database from './database/database';

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
  let appliedCount =0;
  let inProgressCount=0;
  let offerCount=0;
  let rejectCount=0;
  const database = new Database(name, version);
  database.initialize(fields).then(()=>showAppCards());
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
    const application = {jobID: jobID,
      companyName: companyName,
      jobType: jobType,
      jobRole: jobRole,
      doa: doa,
      applicationStatus: applicationStatus,
      description: description};
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
    if (data!==null && data.length>0) {
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
    createJobCardColumnOne(row, value);
    createJobCardColumnTwo(row, value.applicationStatus);
    createJobCardColumnThree(row, value.key);

    switch (value.applicationStatus) {
      case 'applied':
        appliedCount++;
        break;
      case 'inprogress':
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

    createCompanyNameElement(bodyOne, value.companyName);
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
    bodyTwo.setAttribute('class', 'card-body');
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
  * Creates a part of job card with edit, delete info
  * @param {HTMLElement} parent
  * @param {String} key
  * */
  function createJobCardColumnThree(parent, key) {
    const columnThree = document.createElement('div');
    columnThree.setAttribute('class', 'col-sm-1 btn-group-vertical btn-block');
    parent.appendChild(columnThree);

    addJobCardEditButton(columnThree, key);
    addJobCardDeleteButton(columnThree, key);
  }

  /**
 * Creates an entry for company title in job card
 * @param {HTMLElement} parent
 * @param {String} cname
 */
  function createCompanyNameElement(parent, cname) {
    const cardTitle = document.createElement('h5');
    cardTitle.innerHTML = cname; // cannot be null - form check added.
    parent.appendChild(cardTitle);
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
    regularTextOne.innerHTML = jobID!==undefined ? jobID : '';
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
    regularTextOne.innerHTML = jobType!==undefined ? jobType : '';
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
    regularTextTwo.innerHTML = jobRole!==undefined ? jobRole : '';
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
    regularTextTwo.innerHTML = desc!==undefined ? desc : '';
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
    regularTextTwo.innerHTML = doa!==undefined ? doa : '';
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
  * Creates a edit button of job card
  * @param {HTMLElement} parent
  *  @param {String} key
  * */
  function addJobCardEditButton(parent, key) {
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.setAttribute('class', 'btn btn-light');
    editButton.setAttribute('id', 'edit-app');
    parent.appendChild(editButton);

    const buttonText = document.createElement('p');
    buttonText.setAttribute('class', 'text-info');
    buttonText.innerHTML = 'edit';
    editButton.appendChild(buttonText);
  }

  /**
  * Creates a delete button of job card
  * @param {HTMLElement} parent
  * @param {String} key
  * */
  function addJobCardDeleteButton(parent, key) {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.setAttribute('class', 'btn btn-light');
    deleteButton.setAttribute('id', 'delete-app');
    deleteButton.addEventListener('click', function() {
      deleteApplication(key);
    });
    // deleteButton.onclick = deleteApplication(key);
    parent.appendChild(deleteButton);

    const buttonText = document.createElement('p');
    buttonText.setAttribute('class', 'text-danger');
    buttonText.innerHTML = 'del';
    deleteButton.appendChild(buttonText);
  }

  /**
 * To set bg color indicating status of application.
 * @param {String} status
 * @return {String}
 */
  function setStatusBackgroundColor(status) {
    if (status == 'applied') {
      return 'col-sm bg-warning';
    } else if (status == 'inProgress') {
      return 'col-sm bg-primary';
    } else if (status == 'offer') {
      return 'col-sm bg-success';
    } else if (status == 'reject') {
      return 'col-sm bg-danger';
    } else {
      return 'col-sm bg-muted';
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
