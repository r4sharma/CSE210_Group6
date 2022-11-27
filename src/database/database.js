/**
 * Database module
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
   * Initialize DB
   * @param {string} fields Fields of indexedDB instance
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
        console.log(`Database ${this.name}: created successfully`);
        this.indexedDB = this.database.result;
        resolve(this.indexedDB);
      };
      this.database.onerror = function(event) {
        reject(new Error(`error opening database ${event.target.errorCode}`));
      };
    });
  }

  /**
   * Save a record to DB
   * @param {Object} record Application object to be saved
   * @return {Promise} promise
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
   * getCursor
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
   * Get Record By Key
   * @param {int} key
   * @return {Object} record
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
   * get all records in db
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
   * Updates a record in DB
   * @param {Object} record
   * @return {Promise} promise
   */
  update(record) {
    return new Promise((resolve, reject) => {
      if (typeof record === 'object') {
        // eslint-disable-next-line max-len
        const transaction = this.indexedDB.transaction([this.name], 'readwrite');
        const objectStore = transaction.objectStore(this.name);
        const request = objectStore.put(record);
        console.log('Update type', typeof(request));
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
   * Delete Record by Key
   * @param {int} key
   * @return {Promise} promise
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
