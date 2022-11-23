require('fake-indexeddb/auto');
const Database = require('./database');

test('Initialize DB', async () => {
  const database = new Database('testDB', 1);
  const indexedDB = await database.initialize('test_field');
  expect(indexedDB).toBeTruthy();
  expect(indexedDB.name).toBe('testDB');
  expect(indexedDB.version).toBe(1);
  expect(indexedDB.objectStoreNames[0]).toBe('testDB');
});

test('Add data in DB', async ()=> {
  const database = new Database('testDB', 1);
  const indexedDB = await database.initialize('company, role');
  const app = {company: 'testcompany', role: 'SDE'};
  const key = await database.save(app);
  const transaction = indexedDB.transaction('testDB', 'readwrite');
  const objectStore = transaction.objectStore('testDB');
  const request = await objectStore.get(key);
  request.onsuccess = () => {
    result = request.result;
    expect(result.company).toBe('testcompany');
    expect(result.role).toBe('SDE');
  };
});
