/**
 * Database module exposes all the APIs for performing CRUD operations on the
 * instance of the indexedDB database.
 */
class Database {
  /**
     * @param {string} name Database Name
     * @param {int} version Database Version
     */
  constructor(name, version) {
    this.name = name;
    this.version = version;
    this.indexedDB = {};
    this.database = indexedDB.open(name, version);
  }
  /**
   * Function to initialize or upgrade the database in indexedDB
   * @param {string} fields Fields of database instance
   * @return {Promise} promise
   */
  initialize(fields) {
    return new Promise((resolve, reject) => {
      this.database.onupgradeneeded = (event) => {
        const instance = event.target.result;
        const objectStore = instance.createObjectStore(this.name, {
          keyPath: 'key',
          autoIncrement: true,
        });

        if (typeof fields === 'string') {
          fields = fields.split(',');
        }
        for (const field of fields) objectStore.createIndex(field, field);
      };

      this.database.onsuccess = (event) => {
        this.indexedDB = this.database.result;
        resolve(this.indexedDB);
      };
      this.database.onerror = function(event) {
        reject(new Error(`error opening database ${event.target.errorCode}`));
      };
    });
  }

  /**
   * Function to save a record to the database
   * @param {Object} record Application object to be saved to the database
   * @return {Promise} Promise
   */
  save(record) {
    return new Promise((resolve, reject) => {
      if (typeof record === 'object') {
        // eslint-disable-next-line max-len
        const transaction = this.indexedDB.transaction([this.name], 'readwrite');
        const objectStore = transaction.objectStore(this.name);
        const request = objectStore.add(record);
        request.onsuccess = () => {
          resolve(transaction);
        };
        request.onerror = () => {
          reject(new Error('An object was expected.'));
        };
      }
    });
  }
  /**
   * Function to return a cursor that can be used to iterate over the database
   * @return {Cursor} Cursor
   */
  getCursor() {
    return new Promise((resolve, reject) => {
      const transaction = this.indexedDB.transaction([this.name], 'readonly');
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.openCursor();
      request.onsuccess = (e) => {
        resolve(request);
      };
      request.onerror = () => {
        reject(new Error('Could not get cursor'));
      };
    });
  }
  /**
   * Function to Get a Record from the database by Key
   * @param {int} key The key for which we want to search a record
   * @return {Object} The record corresponding to the key passed
   */
  getRecordByKey(key) {
    return new Promise((resolve, reject) => {
      if (typeof key === 'number') {
        const transaction = this.indexedDB.transaction([this.name], 'readonly');
        const objectStore = transaction.objectStore(this.name);
        const request = objectStore.get(key);
        request.onsuccess = () => {
          resolve(request.result);
        };
      } else {
        reject(new Error('Key expected to be a number.'));
      }
    });
  }
  /**
   * Function to fetch all records in the dataset and stores it as a list
   * @return {Promise}
   */
  getAllRecords() {
    return new Promise((resolve, reject) => {
      const transaction = this.indexedDB.transaction([this.name], 'readonly');
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.openCursor();
      const data = [];
      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        } else {
          resolve(data);
        }
      };
      request.onerror = () => {
        reject(new Error('Could not get records'));
      };
    });
  }
  /**
   * Function to update a record in the DB (by key in the record)
   * @param {Object} record New record for replacing the old record
   * @return {Promise} Promise
   */
  update(record) {
    return new Promise((resolve, reject) => {
      if (typeof record === 'object') {
        // eslint-disable-next-line max-len
        const transaction = this.indexedDB.transaction([this.name], 'readwrite');
        const objectStore = transaction.objectStore(this.name);
        const request = objectStore.put(record);
        request.onsuccess = () => {
          resolve(request.result);
        };
        request.onerror = () => {
          reject(new Error('Could not update'));
        };
      } else {
        reject(new Error('An object was expected'));
      }
    });
  }

  /**
   * Function to delete a record in database by key
   * @param {int} key Key for which the record in db needs to be deleted
   * @return {Promise} Promise
   */
  remove(key) {
    return new Promise((resolve, reject) => {
      if (typeof key === 'number') {
        // eslint-disable-next-line max-len
        const transaction = this.indexedDB.transaction([this.name], 'readwrite');
        const objectStore = transaction.objectStore(this.name);
        const request = objectStore.delete(key);
        request.onsuccess = () => {
          resolve(request.result);
        };
      } else {
        reject(new Error('key is not number'));
      }
    });
  }
}


module.exports = Database;
