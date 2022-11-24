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

/***/ "./src/database/database.js":
/*!**********************************!*\
  !*** ./src/database/database.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\n * Database module\n */\nclass Database {\n  /**\n     * @param {string} name Database Name\n     * @param {int} version Database Version\n     */\n  constructor(name, version) {\n    this.name = name;\n    this.version = version;\n    this.indexedDB = {};\n    this.database = indexedDB.open(name, version);\n  }\n  /**\n   * Initialize DB\n   * @param {string} fields Fields of indexedDB instance\n   * @return {Promise} promise\n   */\n  initialize(fields) {\n    return new Promise((resolve, reject) => {\n      this.database.onupgradeneeded = (event) => {\n        const instance = event.target.result;\n        const objectStore = instance.createObjectStore(this.name, {\n          keyPath: 'key',\n          autoIncrement: true,\n        });\n\n        if (typeof fields === 'string') {\n          fields = fields.split(',');\n        }\n        for (const field of fields) objectStore.createIndex(field, field);\n      };\n\n      this.database.onsuccess = (event) => {\n        console.log(`Database ${this.name}: created successfully`);\n        this.indexedDB = this.database.result;\n        resolve(this.indexedDB);\n      };\n      this.database.onerror = function(event) {\n        reject(new Error(`error opening database ${event.target.errorCode}`));\n      };\n    });\n  }\n\n  /**\n   * Save a record to DB\n   * @param {Object} record Application object to be saved\n   * @return {Promise} promise\n   */\n  save(record) {\n    return new Promise((resolve, reject) => {\n      if (typeof record === 'object') {\n        // eslint-disable-next-line max-len\n        const transaction = this.indexedDB.transaction([this.name], 'readwrite');\n        const objectStore = transaction.objectStore(this.name);\n        const request = objectStore.add(record);\n        request.onsuccess = () => {\n          resolve(request.result);\n        };\n        request.onerror = () => {\n          reject(new Error('An object was expected.'));\n        };\n      }\n    });\n  }\n  /**\n   * getCursor\n   * @return {Cursor} Cursor\n   */\n  getCursor() {\n    return new Promise((resolve, reject) => {\n      const transaction = this.indexedDB.transaction([this.name], 'readonly');\n      const objectStore = transaction.objectStore(this.name);\n      const request = objectStore.openCursor();\n      request.onsuccess = (e) => {\n        resolve(request);\n      };\n      request.onerror = () => {\n        reject(new Error('Could not get cursor'));\n      };\n    });\n  }\n  /**\n   * Get Record By Key\n   * @param {int} key\n   * @return {Object} record\n   */\n  getRecordByKey(key) {\n    return new Promise((resolve, reject) => {\n      if (typeof key === 'number') {\n        const transaction = this.indexedDB.transaction([this.name], 'readonly');\n        const objectStore = transaction.objectStore(this.name);\n        const request = objectStore.get(key);\n        request.onsuccess = () => {\n          resolve(request.result);\n        };\n      } else {\n        reject(new Error('Key expected to be a number.'));\n      }\n    });\n  }\n}\n\nmodule.exports = Database;\n\n\n//# sourceURL=webpack://cse210_group6/./src/database/database.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Database = __webpack_require__(/*! ./database/database */ \"./src/database/database.js\");\n/**\n     * @param {LoadDatabase} loadDB Run on page load/refresh\n     * @listens LoadDatabase\n     */\ndocument.addEventListener('DOMContentLoaded', (loadDB) => {\n  const name = 'Applications';\n  const version = 1;\n  const fields = 'jobID,companyName';\n  const database = new Database(name, version);\n  database.initialize(fields);\n  console.log(database);\n  document.getElementById('addButton').onclick = saveTask;\n\n  /**\n   * Save Task Function\n   * @param {event} event\n   */\n  function saveTask(event) {\n    event.preventDefault();\n    const task = {jobID: '2', companyName: 'Amazon'};\n    const transaction = database.save(task);\n    transaction.oncomplete = () => {\n      console.log('Task added successfully!');\n      showTasks();\n    };\n  }\n});\n\n\n//# sourceURL=webpack://cse210_group6/./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;