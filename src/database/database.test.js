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

test('Get Cursor', async ()=> {
  const database = new Database('testDB', 1);
  await database.initialize('company,role');
  return database.getCursor().then((request) => {
    expect(request).toBeTruthy();
  });
});

test('Get Record By Key Passed - Key Found', async ()=> {
  console.log('Get Record By Key Passed - Key Found');
  const database = new Database('testDB', 1);
  await database.initialize('company,role');
  const request = await database.getRecordByKey(1);
  await expect(request.key).toBe(1);
  await expect(request.company).toBe('testcompany');
});

test('Get Record By Key Passed Non Integer', async ()=> {
  console.log('Get Record By Key Non Integer');
  const database = new Database('getRecord', 1);
  await database.initialize('company,role');
  const request = database.getRecordByKey('key');
  // eslint-disable-next-line max-len
  await expect(request).rejects.toEqual(new Error('Key expected to be a number.'));
});

test('Get Record By Key - Does not exist', async ()=> {
  console.log('Get Record By Key');
  const database = new Database('testDB', 1);
  await database.initialize('company,role');
  const request = await database.getRecordByKey(5);
  await expect(request).toBe(undefined);
});


