/**
 * Sample test for calculator module
 */
const calculator = require('./sample-calculator-module');
test('subtracts 5 - 2 to equal 3', () => {
  expect(calculator.subtract(5, 2)).toBe(3);
});
