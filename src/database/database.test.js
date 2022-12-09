require('fake-indexeddb/auto');
const Database = require('./database');

test('Initialize DB', async () => {
  const database = new Database('testDB', 1);
  return database.initialize('test_field')
      .then((indexedDB) => {
        expect(indexedDB).toBeTruthy();
        expect(indexedDB.name).toBe('testDB');
        expect(indexedDB.version).toBe(1);
        expect(indexedDB.objectStoreNames[0]).toBe('testDB');
      });
});

test('Add data in DB', async ()=> {
  const database = new Database('testDB', 1);
  await database.initialize('company, role');
  const app = {key: 1, company: 'testcompany', role: 'SDE'};
  return await database.save(app)
      .then((transaction) =>{
        const objectStore = transaction.objectStore('testDB');
        const request = objectStore.get(1);
        request.onsuccess = () => {
          result = request.result;
          expect(result.key).toBe(1);
          expect(result.company).toBe('testcompany');
          expect(result.role).toBe('SDE');
        };
      });
});

test('Get Cursor', async ()=> {
  const database = new Database('testDB', 1);
  await database.initialize('company,role');
  return database.getCursor().
      then((request) => {
        expect(request.result).toBeTruthy();
      });
});

test('Get Record By Key Passed - Key Found', async ()=> {
  console.log('Get Record By Key Passed - Key Found');
  const database = new Database('testDB', 1);
  await database.initialize('company,role');
  return database.getRecordByKey(1)
      .then((request) => {
        expect(request.key).toBe(1);
        expect(request.company).toBe('testcompany');
      });
});

test('Get Record By Key Passed Non Integer', async ()=> {
  console.log('Get Record By Key Non Integer');
  const database = new Database('getRecord', 1);
  await database.initialize('company,role');
  return database.getRecordByKey('key')
      // eslint-disable-next-line max-len
      .catch((request) => expect(request).toEqual(new Error('Key expected to be a number.')));
});

test('Get Record By Key - Does not exist', async ()=> {
  console.log('Get Record By Key - Does not exist');
  const database = new Database('testDB', 1);
  await database.initialize('company,role');
  return database.getRecordByKey(500)
      .then((request) => expect(request).toBe(undefined));
});

test('Update data in DB', async ()=> {
  const database = new Database('testDB', 1);
  await database.initialize('company, role');
  const app = {company: 'testcompany', role: 'ML', key: 1};
  return database.update(app)
      .then((key) => {
        expect(key).toBe(1);
      });
});

test('Delete data from DB', async ()=> {
  const database = new Database('testDB', 1);
  await database.initialize('company, role');
  return database.remove(1)
      .then((result) => {
        expect(result).toBe(undefined);
      });
});

test('Delete data from DB Non Integer Key', async ()=> {
  const database = new Database('testDB', 1);
  await database.initialize('company, role');
  return database.remove('one')
      .catch((e) => {
        expect(e).toEqual(new Error('key is not number'));
      });
});

test('Get All records from DB', async ()=> {
  const database = new Database('testDB', 1);
  await database.initialize('company, role');
  return database.getAllRecords().then(
      (data)=>expect(Array.isArray(data)).toBeTruthy());
});


