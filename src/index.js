const Database = require('./database/database');
/**
     * @param {LoadDatabase} loadDB Run on page load/refresh
     * @listens LoadDatabase
     */
document.addEventListener('DOMContentLoaded', (loadDB) => {
  const name = 'Applications';
  const version = 1;
  const fields = 'jobID,companyName,fullTime,doa,status,desc';
  const database = new Database(name, version);
  database.initialize(fields);
  console.log(database);
});
