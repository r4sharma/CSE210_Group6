import {addJobCardEditButton, addJobCardDeleteButton} from './buttonInCards';

let appliedCount;
let inProgressCount;
let offerCount;
let rejectCount;
let appCardContainer = null;

const ApplicationStatus = {
  Applied: 'Applied',
  InProgress: 'In Progress',
  Offer: 'Offer',
  Reject: 'Reject',
};

/**
  * Function to get the element containing all job cards
  */
export function getCardContainer() {
  appCardContainer = document.querySelector('#app-card-container');
}

/**
  * Function to fetch and create all cards from db
  * @param {Array} data
  */
export function showAppCards(data) {
// Leave the div for card container empty
  while (appCardContainer.firstChild) {
    appCardContainer.removeChild(appCardContainer.firstChild);
  }
  createAppCards(data);
  updateStatsCard();
};

/**
 * Function to create app cards for all records in db
 * @param {Array} data
 */
function createAppCards(data) {
  appliedCount = 0;
  inProgressCount = 0;
  offerCount = 0;
  rejectCount = 0;
  if (data !== null && data.length>0) {
    displayTitle();
    data.forEach(createJobCard);
  } else {
    createEmptyAppCard();
  }
}

/**
 * Function to create a single job card
 * @param {Object} value
 */
function createJobCard(value) {
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
    case ApplicationStatus.Applied:
      appliedCount++;
      break;
    case ApplicationStatus.InProgress:
      inProgressCount++;
      break;
    case ApplicationStatus.Offer:
      offerCount++;
      break;
    case ApplicationStatus.Reject:
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
  * Function to creates a job card with information populated
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
  createLastUpdatedElement(bodyOne, value.lastUpdated);
}

/**
* Function to create a part of job card with status information
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
  status.setAttribute('class', 'text');
  status.innerHTML = applicationStatus;
  coloredColumn.appendChild(status);
}

/**
 * Function to create an entry for company title in job card
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
 * Function to create an entry for jobType in job card
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
 * Function to create an entry for jobType in job card
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
   * Function to create an entry for jobRole in job card
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

/** Function to create an entry for description in job card
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
* Function to create an entry for date of application in job card
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

/**
* Function To set background color indicating status of application.
* @param {String} status
* @return {String}
*/
function setStatusBackgroundColor(status) {
  if (status == ApplicationStatus.InProgress) {
    // eslint-disable-next-line max-len
    return 'col-sm rounded-bottom-right-1 bg-warning-custom-status d-flex align-items-center';
  } else if (status == ApplicationStatus.Applied) {
    // eslint-disable-next-line max-len
    return 'col-sm rounded-bottom-right-1 bg-primary-custom-status d-flex align-items-center';
  } else if (status == ApplicationStatus.Offer) {
    // eslint-disable-next-line max-len
    return 'col-sm rounded-bottom-right-1 bg-success-custom-status d-flex align-items-center';
  } else if (status == ApplicationStatus.Reject) {
    // eslint-disable-next-line max-len
    return 'col-sm rounded-bottom-right-1 bg-danger-custom-status d-flex align-items-center';
  } else {
    return 'col-sm rounded-bottom-right-1 bg-muted d-flex align-items-center';
  }
}

/**
* Function to display title
*/
function displayTitle() {
  // const card = document.createElement('div');
  const text = document.createElement('h4');
  text.setAttribute('class', 'mb-3 text-center');
  text.textContent = 'Job Applications';
  appCardContainer.appendChild(text);
}

/**
* Function to create Empty card in case of no applications
*/
function createEmptyAppCard() {
  if (!appCardContainer.firstChild) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card mb-3 mx-auto');
    card.setAttribute('id', 'noApplications');
    card.style = 'max-width: 750px;';
    const text = document.createElement('p');
    // eslint-disable-next-line max-len
    text.textContent = 'Looks like you do not have any applications to track! Get started by clicking on the Add Applications button above.';
    appCardContainer.appendChild(card);
    card.appendChild(text);
  }
}

/**
 * Function to get counts of each status type and updates the statsbar
 *  at the top of the dashboard
 */
function updateStatsCard() {
  document.getElementById('appliedCount').innerHTML = appliedCount;
  document.getElementById('inProgressCount').innerHTML = inProgressCount;
  document.getElementById('offerCount').innerHTML = offerCount;
  document.getElementById('rejectCount').innerHTML = rejectCount;
}

/**
 * Function to create an entry for last updated date in job card
 * @param {HTMLElement} parent
  * @param {String} lastUpdated
*/
function createLastUpdatedElement(parent, lastUpdated) {
  const lastUpdatedElem = document.createElement('p');
  lastUpdatedElem.setAttribute('class', 'card-text');
  parent.appendChild(lastUpdatedElem);

  const mutedTextTwo = document.createElement('sub');
  mutedTextTwo.setAttribute('class', 'text-muted');
  mutedTextTwo.innerHTML = 'Last Updated: ';
  lastUpdatedElem.appendChild(mutedTextTwo);

  const regularTextTwo = document.createElement('sub');
  regularTextTwo.setAttribute('class', 'text-muted');
  regularTextTwo.innerHTML = lastUpdated !== undefined ? lastUpdated : '';
  lastUpdatedElem.appendChild(regularTextTwo);
}

