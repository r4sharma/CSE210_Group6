const Database = require('./database/database');
/**
     * @param {LoadDatabase} loadDB Run on page load/refresh
     * @listens LoadDatabase
     */
document.addEventListener('DOMContentLoaded', (loadDB) => {
  const name = 'Applications';
  const version = 1;
  const fields = 'jobID,companyName';
  const database = new Database(name, version);
  database.initialize(fields);
  console.log(database);
  document.getElementById('addButton').onclick = saveTask;

  /**
   * Save Task Function
   * @param {event} event
   */
  function saveTask(event) {
    event.preventDefault();
    const task = {jobID: '2', companyName: 'Amazon'};
    const transaction = database.save(task);
    transaction.oncomplete = () => {
      console.log('Task added successfully!');
      showTasks();
    };
  }
});
