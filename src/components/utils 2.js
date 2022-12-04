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

module.exports = {getCurrentDate, findRadioSelectedValue};
