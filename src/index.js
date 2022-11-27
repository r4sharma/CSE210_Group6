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
          // showApplications(); // to be added
          transaction.oncomplete = () => {
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
        },
    ).catch(() => console.log('error in fetching all records')); ;
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
    const {key,
      jobID,
      companyName,
      jobType,
      jobRole,
      doa,
      description,
      applicationStatus} = value;
    console.log(value);
    const card = document.createElement('article');
    card.setAttribute('id', key);
    card.setAttribute('class', 'job-card');
    addJobCardElement('h3', 'job-id', jobID, card);
    addJobCardElement('h3', 'company', companyName, card);
    addJobCardElement('p', 'job-type', jobType, card);
    addJobCardElement('p', 'job-role', jobRole, card);
    addJobCardElement('p', 'date-applied', doa, card);
    addJobCardElement('p', 'description', description, card);
    addStatusElement('p', 'job-status', applicationStatus, card);

    appCardContainer.appendChild(card);
  }

  /**
  * Appends the element to the job card for each attribute from the job object
  * @param {String} elementTag
  * @param {String} id
  * @param {String} elementContent
  * @param {HTMLElement} card
  * */
  function addJobCardElement(elementTag, id, elementContent, card) {
    const element = document.createElement(elementTag);
    element.setAttribute('id', id);
    element.setAttribute('class', id);
    element.appendChild(document.createTextNode(elementContent));
    card.appendChild(element);
  }
  /**
  * Appends the status to the job card for each attribute from the job object
  * @param {String} elementTag
  * @param {String} id
  * @param {String} elementContent
  * @param {HTMLElement} card
  * */
  function addStatusElement(elementTag, id, elementContent, card) {
    const element = document.createElement(elementTag);
    element.setAttribute('id', id);
    element.setAttribute('class', id);
    element.appendChild(document.createTextNode(elementContent));
    setStatusBackgroundColor(element, elementContent);

    card.appendChild(element);
  }

  /**
 * To set bg color indicating status of application.
 * @param {String} element
 * @param {String} elementContent
 */
  function setStatusBackgroundColor(element, elementContent) {
    if (elementContent == 'Applied') {
      element.setAttribute('style', 'background-color: yellow;');
    } else if (elementContent == 'In Progress') {
      element.setAttribute('style', 'background-color: orange;');
    } else if (elementContent == 'Offer') {
      element.setAttribute('style', 'background-color: green;');
    } else if (elementContent == 'Reject') {
      element.setAttribute('style', 'background-color: red;');
    } else {
      element.setAttribute('style', 'background-color: grey;');
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
});
