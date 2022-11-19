const subtraction = require('./subtraction');
test('subtracts 5 - 2 to equal 3', () => {
  expect(subtraction(5, 2)).toBe(3);
});
