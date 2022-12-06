/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/buttonInCards.js":
/*!*****************************************!*\
  !*** ./src/components/buttonInCards.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addJobCardDeleteButton\": () => (/* binding */ addJobCardDeleteButton),\n/* harmony export */   \"addJobCardEditButton\": () => (/* binding */ addJobCardEditButton)\n/* harmony export */ });\n/**\r\n* Creates a edit button of job card\r\n* @param {HTMLElement} parent\r\n*  @param {String} key\r\n* */\r\nfunction addJobCardEditButton(parent, key) {\r\n  const editButton = document.createElement('button');\r\n\r\n  editButton.setAttribute('class', 'btn btn-outline-info btn-sm');\r\n  editButton.setAttribute('type', 'submit');\r\n  editButton.innerHTML = 'Edit';\r\n  editButton.setAttribute('id', 'edit-app');\r\n  editButton.setAttribute('data-bs-toggle', 'modal');\r\n  editButton.setAttribute('data-bs-target', '#updateApp');\r\n  editButton.setAttribute('data-id', key);\r\n  parent.appendChild(editButton);\r\n}\r\n\r\n/**\r\n* Creates a delete button of job card\r\n* @param {HTMLElement} parent\r\n* @param {int} key\r\n* */\r\nfunction addJobCardDeleteButton(parent, key) {\r\n  const deleteButton = document.createElement('button');\r\n  deleteButton.classList.add('btn',\r\n      'btn-outline-danger',\r\n      'btn-sm');\r\n  deleteButton.setAttribute('type', 'submit');\r\n  deleteButton.setAttribute('id', 'delete-app');\r\n  deleteButton.innerHTML = 'Delete';\r\n  deleteButton.setAttribute('data-bs-toggle', 'modal');\r\n  deleteButton.setAttribute('data-bs-target', '#deleteApp');\r\n  deleteButton.setAttribute('data-id', key);\r\n  parent.appendChild(deleteButton);\r\n}\r\n\r\n// /**\r\n//    * Function to create modal for delete\r\n//    * @param {event} event\r\n//    */\r\n// function createDeleteModal(event) {\r\n//   const key = Number(event.target.getAttribute('data-id'));\r\n//   const deleteButtonModal = document.querySelector('#deleteAppButton');\r\n//   deleteButtonModal.setAttribute('data-id', key);\r\n//   deleteButtonModal.onclick = deleteViaModal;\r\n// }\r\n// /**\r\n//  * Adds delete functionality to delete button in modal\r\n//  * @param {event} event\r\n//  */\r\n// function deleteViaModal(event) {\r\n//   event.preventDefault();\r\n//   const key = Number(event.target.getAttribute('data-id'));\r\n//   deleteApplication(key);\r\n// }\r\n\r\n// /**\r\n//    * Function to succesfully delete the application.\r\n//    * @param {int} key\r\n//    */\r\n// function deleteApplication(key) {\r\n//   database.remove(key)\r\n//       .then((result) => {\r\n//         showAppCards();\r\n//         console.log(result);\r\n//       })\r\n//       .catch((error) => console.log('error in deleting record!', error));\r\n// }\r\n\n\n//# sourceURL=webpack://cse210_group6/./src/components/buttonInCards.js?");

/***/ }),

/***/ "./src/components/cards.js":
/*!*********************************!*\
  !*** ./src/components/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";


/***/ }),

/***/ "./src/components/utils.js":
/*!*********************************!*\
  !*** ./src/components/utils.js ***!
  \*********************************/
/***/ ((module) => {

eval("/**\r\n * Returns todays date in yyyy-mm-dd format\r\n * @return {String} today's date\r\n */\r\nfunction getCurrentDate() {\r\n  let today = new Date();\r\n  const dd = String(today.getDate()).padStart(2, '0');\r\n  const mm = String(today.getMonth() + 1).padStart(2, '0');\r\n  const yyyy = today.getFullYear();\r\n  today = yyyy + '-' + mm + '-' + dd;\r\n  return today;\r\n}\r\n\r\n/**\r\n       * find the value selected in Radio button\r\n       * @param {HTMLElement} elements\r\n       * @return {string}\r\n       */\r\nfunction findRadioSelectedValue(elements) {\r\n  let val = '';\r\n\r\n  for (let i = 0; i < elements.length; i++) {\r\n    if (elements[i].checked) {\r\n      val = elements[i].value;\r\n    }\r\n  }\r\n  return val;\r\n}\r\n\r\nmodule.exports = {getCurrentDate, findRadioSelectedValue};\r\n\n\n//# sourceURL=webpack://cse210_group6/./src/components/utils.js?");

/***/ }),

/***/ "./src/database/database.js":
/*!**********************************!*\
  !*** ./src/database/database.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\r\n * Database module\r\n */\r\nclass Database {\r\n  /**\r\n     * @param {string} name Database Name\r\n     * @param {int} version Database Version\r\n     */\r\n  constructor(name, version) {\r\n    this.name = name;\r\n    this.version = version;\r\n    this.indexedDB = {};\r\n    this.database = indexedDB.open(name, version);\r\n  }\r\n  /**\r\n   * Initialize DB\r\n   * @param {string} fields Fields of indexedDB instance\r\n   * @return {Promise} promise\r\n   */\r\n  initialize(fields) {\r\n    return new Promise((resolve, reject) => {\r\n      this.database.onupgradeneeded = (event) => {\r\n        const instance = event.target.result;\r\n        const objectStore = instance.createObjectStore(this.name, {\r\n          keyPath: 'key',\r\n          autoIncrement: true,\r\n        });\r\n\r\n        if (typeof fields === 'string') {\r\n          fields = fields.split(',');\r\n        }\r\n        for (const field of fields) objectStore.createIndex(field, field);\r\n      };\r\n\r\n      this.database.onsuccess = (event) => {\r\n        console.log(`Database ${this.name}: created successfully`);\r\n        this.indexedDB = this.database.result;\r\n        resolve(this.indexedDB);\r\n      };\r\n      this.database.onerror = function(event) {\r\n        reject(new Error(`error opening database ${event.target.errorCode}`));\r\n      };\r\n    });\r\n  }\r\n\r\n  /**\r\n   * Save a record to DB\r\n   * @param {Object} record Application object to be saved\r\n   * @return {Promise} promise\r\n   */\r\n  save(record) {\r\n    return new Promise((resolve, reject) => {\r\n      if (typeof record === 'object') {\r\n        // eslint-disable-next-line max-len\r\n        const transaction = this.indexedDB.transaction([this.name], 'readwrite');\r\n        const objectStore = transaction.objectStore(this.name);\r\n        const request = objectStore.add(record);\r\n        request.onsuccess = () => {\r\n          resolve(transaction);\r\n        };\r\n        request.onerror = () => {\r\n          reject(new Error('An object was expected.'));\r\n        };\r\n      }\r\n    });\r\n  }\r\n  /**\r\n   * getCursor\r\n   * @return {Cursor} Cursor\r\n   */\r\n  getCursor() {\r\n    return new Promise((resolve, reject) => {\r\n      const transaction = this.indexedDB.transaction([this.name], 'readonly');\r\n      const objectStore = transaction.objectStore(this.name);\r\n      const request = objectStore.openCursor();\r\n      request.onsuccess = (e) => {\r\n        resolve(request);\r\n      };\r\n      request.onerror = () => {\r\n        reject(new Error('Could not get cursor'));\r\n      };\r\n    });\r\n  }\r\n  /**\r\n   * Get Record By Key\r\n   * @param {int} key\r\n   * @return {Object} record\r\n   */\r\n  getRecordByKey(key) {\r\n    return new Promise((resolve, reject) => {\r\n      if (typeof key === 'number') {\r\n        const transaction = this.indexedDB.transaction([this.name], 'readonly');\r\n        const objectStore = transaction.objectStore(this.name);\r\n        const request = objectStore.get(key);\r\n        request.onsuccess = () => {\r\n          resolve(request.result);\r\n        };\r\n      } else {\r\n        reject(new Error('Key expected to be a number.'));\r\n      }\r\n    });\r\n  }\r\n  /**\r\n   * get all records in db\r\n   * @return {Promise}\r\n   */\r\n  getAllRecords() {\r\n    return new Promise((resolve, reject) => {\r\n      const transaction = this.indexedDB.transaction([this.name], 'readonly');\r\n      const objectStore = transaction.objectStore(this.name);\r\n      const request = objectStore.openCursor();\r\n      const data = [];\r\n      request.onsuccess = (e) => {\r\n        const cursor = e.target.result;\r\n        if (cursor) {\r\n          data.push(cursor.value);\r\n          cursor.continue();\r\n        } else {\r\n          resolve(data);\r\n        }\r\n      };\r\n      request.onerror = () => {\r\n        reject(new Error('Could not get records'));\r\n      };\r\n    });\r\n  }\r\n  /**\r\n   * Updates a record in DB\r\n   * @param {Object} record\r\n   * @return {Promise} promise\r\n   */\r\n  update(record) {\r\n    return new Promise((resolve, reject) => {\r\n      if (typeof record === 'object') {\r\n        // eslint-disable-next-line max-len\r\n        const transaction = this.indexedDB.transaction([this.name], 'readwrite');\r\n        const objectStore = transaction.objectStore(this.name);\r\n        const request = objectStore.put(record);\r\n        console.log('Update type', typeof(request));\r\n        request.onsuccess = () => {\r\n          resolve(request.result);\r\n        };\r\n        request.onerror = () => {\r\n          reject(new Error('Could not update'));\r\n        };\r\n      } else {\r\n        reject(new Error('An object was expected'));\r\n      }\r\n    });\r\n  }\r\n\r\n  /**\r\n   * Delete Record by Key\r\n   * @param {int} key\r\n   * @return {Promise} promise\r\n   */\r\n  remove(key) {\r\n    return new Promise((resolve, reject) => {\r\n      if (typeof key === 'number') {\r\n        // eslint-disable-next-line max-len\r\n        const transaction = this.indexedDB.transaction([this.name], 'readwrite');\r\n        const objectStore = transaction.objectStore(this.name);\r\n        const request = objectStore.delete(key);\r\n        request.onsuccess = () => {\r\n          resolve(request.result);\r\n        };\r\n      } else {\r\n        reject(new Error('key is not number'));\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\n\r\nmodule.exports = Database;\r\n\n\n//# sourceURL=webpack://cse210_group6/./src/database/database.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database/database */ \"./src/database/database.js\");\n/* harmony import */ var _database_database__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_database_database__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/cards */ \"./src/components/cards.js\");\n/* harmony import */ var _components_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/utils */ \"./src/components/utils.js\");\n/* harmony import */ var _components_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_utils__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\nlet database = null;\r\n\r\n/**\r\n* @param {LoadDatabase} loadDB Run on page load/refresh\r\n* @listens LoadDatabase\r\n*/\r\ndocument.addEventListener('DOMContentLoaded', (loadDB) => {\r\n  const name = 'Applications';\r\n  const version = 1;\r\n  const fields = 'jobID,'+\r\n  'companyName,'+\r\n  'jobType,'+\r\n  'jobRole,'+\r\n  'doa,'+\r\n  'applicationStatus,'+\r\n  'description';\r\n  database = new (_database_database__WEBPACK_IMPORTED_MODULE_0___default())(name, version);\r\n  (0,_components_cards__WEBPACK_IMPORTED_MODULE_1__.getCardContainer)();\r\n  // eslint-disable-next-line max-len\r\n  database.initialize(fields).then(()=>dbShowAppCards());\r\n  // save button to save application in database\r\n  document.getElementById('save').onclick = addApplication;\r\n  // show form to call function to display form\r\n  document.getElementById('showForm').onclick = showApplicationForm;\r\n});\r\n\r\n/**\r\n* Add Application Function\r\n* @param {event} event\r\n*/\r\nfunction addApplication(event) {\r\n  event.preventDefault();\r\n  const jobID = document.getElementById('jobid').value;\r\n  const companyName = document.getElementById('cname').value;\r\n  const jobType =\r\n      (0,_components_utils__WEBPACK_IMPORTED_MODULE_2__.findRadioSelectedValue)(document.getElementsByName('jobtype'));\r\n  const jobRole = document.getElementById('jobrole').value;\r\n  const doa = document.getElementById('doa').value;\r\n  const applicationStatus = document.getElementById('status').value;\r\n  const description = document.getElementById('desc').value;\r\n  // craeting record in db\r\n  const application = {jobID: jobID,\r\n    companyName: companyName,\r\n    jobType: jobType,\r\n    jobRole: jobRole,\r\n    doa: doa,\r\n    applicationStatus: applicationStatus,\r\n    description: description,\r\n    lastUpdated: (0,_components_utils__WEBPACK_IMPORTED_MODULE_2__.getCurrentDate)()};\r\n  database.save(application)\r\n      .then((transaction) => {\r\n        document.getElementById('application-form').reset();\r\n        transaction.oncomplete = () => {\r\n          dbShowAppCards();\r\n        };\r\n      })\r\n      .catch((error) => console.log('error', error));\r\n}\r\n\r\n/**\r\n * Show application cards by reading database\r\n */\r\nfunction dbShowAppCards() {\r\n  database.getAllRecords().then((data) => {\r\n    (0,_components_cards__WEBPACK_IMPORTED_MODULE_1__.showAppCards)(data);\r\n    console.log('added');\r\n  }).catch((e) => console.log(e, 'error in fetching all records'));\r\n}\r\n/**\r\n* Show Application Form\r\n* @param {event} event\r\n*/\r\nfunction showApplicationForm(event) {\r\n  event.preventDefault();\r\n  // enable the display of app form\r\n  console.log('Application Form Has Been Activated');\r\n  document.getElementById('application-form').style.display = '';\r\n}\r\n\r\n/**\r\n* Add Listener to the delete button\r\n*/\r\ndocument.addEventListener('click', function(e) {\r\n  const deleteBtn = e.target.closest('#delete-app'); // Or any other selector.\r\n  if (deleteBtn) {\r\n    createDeleteModal(e);\r\n  }\r\n});\r\n\r\n/**\r\n* Function to create modal for delete\r\n* @param {event} event\r\n*/\r\nfunction createDeleteModal(event) {\r\n  const key = Number(event.target.getAttribute('data-id'));\r\n  const deleteButtonModal = document.querySelector('#deleteAppButton');\r\n  deleteButtonModal.setAttribute('data-id', key);\r\n  deleteButtonModal.onclick = deleteViaModal;\r\n}\r\n\r\n/**\r\n * Adds delete functionality to delete button in modal\r\n * @param {event} event\r\n */\r\nfunction deleteViaModal(event) {\r\n  event.preventDefault();\r\n  const key = Number(event.target.getAttribute('data-id'));\r\n  deleteApplication(key);\r\n}\r\n\r\n/**\r\n * Function to succesfully delete the application.\r\n * @param {int} key\r\n */\r\nfunction deleteApplication(key) {\r\n  database.remove(key)\r\n      .then((result) => {\r\n        dbShowAppCards();\r\n        console.log(result);\r\n      })\r\n      .catch((error) => console.log('error in deleting record!', error));\r\n}\r\n\r\n/**\r\n * Add Listener to the edit button\r\n */\r\ndocument.addEventListener('click', function(e) {\r\n  const editBtn = e.target.closest(`#edit-app`);\r\n  if (editBtn) {\r\n    createEditModal(e);\r\n  }\r\n});\r\n\r\n/**\r\n * Populate details of a particular record\r\n * @param {event} event\r\n */\r\nfunction createEditModal(event) {\r\n  const key = Number(event.target.getAttribute('data-id'));\r\n  console.log(`Edit`);\r\n  console.log(key);\r\n  database.getRecordByKey(key).then((value)=>{\r\n    document.getElementById('edit-form').reset();\r\n    console.log(value);\r\n    document.getElementById('editJobid').setAttribute('value', value.jobID);\r\n    document.getElementById('editCname')\r\n        .setAttribute('value', value.companyName);\r\n    document.getElementById(value.jobType).checked = true;\r\n    // eslint-disable-next-line max-len\r\n    for (const option of document.getElementById('editApplicationStatus').options) {\r\n      if (option.value === value.applicationStatus) {\r\n        option.selected = true;\r\n      }\r\n    }\r\n    document.getElementById('editJobrole')\r\n        .setAttribute('value', value.jobRole);\r\n    document.getElementById('editDoa')\r\n        .setAttribute('value', value.doa);\r\n    document.getElementById('editDescription')\r\n        .innerHTML=value.description;\r\n  });\r\n\r\n  const editSaveButtonModal = document.querySelector('#editAppButton');\r\n  editSaveButtonModal.setAttribute('data-id', key);\r\n  editSaveButtonModal.onclick = editViaModal;\r\n}\r\n\r\n/**\r\n * Adds edit functionality to edit button in modal\r\n * @param {event} event\r\n */\r\nfunction editViaModal(event) {\r\n  event.preventDefault();\r\n  const key = Number(event.target.getAttribute('data-id'));\r\n  editApplication(key);\r\n}\r\n\r\n/**\r\n * Function to succesfully update the application.\r\n * @param {int} key\r\n */\r\nfunction editApplication(key) {\r\n  const jobID = document.getElementById('editJobid').value;\r\n  const companyName = document.getElementById('editCname').value;\r\n  const jobType =\r\n  (0,_components_utils__WEBPACK_IMPORTED_MODULE_2__.findRadioSelectedValue)(document.getElementsByName('editJobtype'));\r\n  const jobRole = document.getElementById('editJobrole').value;\r\n  const doa = document.getElementById('editDoa').value;\r\n  const applicationStatus =\r\n    document.getElementById('editApplicationStatus').value;\r\n  const description = document.getElementById('editDescription').value;\r\n  // craeting record in db\r\n  const application = {\r\n    key: key,\r\n    jobID: jobID,\r\n    companyName: companyName,\r\n    jobType: jobType,\r\n    jobRole: jobRole,\r\n    doa: doa,\r\n    applicationStatus: applicationStatus,\r\n    description: description,\r\n    lastUpdated: (0,_components_utils__WEBPACK_IMPORTED_MODULE_2__.getCurrentDate)()};\r\n  database.update(application)\r\n      .then((transaction) => {\r\n        document.getElementById('edit-form').reset();\r\n        dbShowAppCards();\r\n      })\r\n      .catch((error) => console.log('error in updating the record.', error));\r\n};\r\n\n\n//# sourceURL=webpack://cse210_group6/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;