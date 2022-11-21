/**
 * Database module
 */
export default class Database {
  /**
     * @param {string} name Database Name
     * @param {int} version Database Version
     */
  constructor(name, version) {
    this.name = name;
    this.version = version;
    this.indexedDB = {};
    this.database = window.indexedDB.open(name, version);
  }
  /**
   * Initialize
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
        resolve();
      };
      this.database.onerror = function(event) {
        reject(new Error(`error opening database ${event.target.errorCode}`));
      };
    });
  }
}
