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
 * Function to export application records to csv
 * @param {Object} arr
 */
function convertToCSV(arr) {
  /**
   * Specifying exactly what column of csv to populate
   * values to avoid wrong values to fall in wrong columns
   * after update operation is performed.
   * */
  const csvString = [
    [
      'key',
      'jobID',
      'companyName',
      'jobType',
      'jobRole',
      'doa',
      'applicationStatus',
      'description',
      'lastUpdated',
    ],
    ...arr.map((item) => [
      item.key,
      item.jobID,
      item.companyName,
      item.jobType,
      item.jobRole,
      item.doa,
      item.applicationStatus,
      item.description,
      item.lastUpdated,
    ]),
  ].map((e) => e.join(','))
      .join('\n');


  // create a HTML element to download the csv link
  const element = document.createElement('a');
  element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
  element.target = '_blank';
  element.download = 'export.csv';
  element.click();
}

module.exports = {getCurrentDate, findRadioSelectedValue, convertToCSV};
