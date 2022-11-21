import database from './database';
require('fake-indexeddb/auto');

test('Initialize DB', async function() {
  await database.initialize('test_field');
});
