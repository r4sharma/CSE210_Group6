const {add, subtract, divide, multiply} = require('./calculator');

/**
 * @file sample-index.js is the root file for this example app
 * @author 007s
 * @see <a href="https://github.com/r4sharma/CSE210_Group6">CSE 210 group 6</a>
 */

/**
 * Student Name - See {@tutorial coding-conventions}
 */
const studentName = 'John Doe';

console.log(studentName);

/**
 * Array of grades
 */
const grades = [98, 97.7, 76, 89];

console.log(grades);

/**
 * Todo object
 */
const todo = {
  id: '1',
  text: 'Hello',
};

console.log(todo);

/**
 * Calculate tax
 * @param {number} amount - Total amount
 * @param {number} tax - Tax percentage
 * @return {string} - Total with a dollar sign
 */
const calculateTax = (amount, tax) => {
  return `$${amount + tax * amount}`;
};

console.log(calculateTax(100, 0.1));

/**
 * A student
 * @property {number} id - Student ID
 * @property {string} name - Student name
 * @property {string|number} [age] - Student age (optional)
 * @property {boolean} isActive - Student is active
 */
const student = {
  id: 1,
  name: 'John Doe',
  age: 20,
  isActive: true,
};

console.log(student);

/**
 * Class to create a person object
 */
class Person {
  /**
   *
   * @param {Object} personInfo Information about the person
   */
  constructor(personInfo) {
    /**
     * @property {string} name Persons name
     */
    this.name = personInfo.name;
    /**
     * @property {string} age Persons age
     */
    this.age = personInfo.age;
  }

  /**
   * @property {Function} greet A greeting with the name and age
   */
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age}`);
  }
}

/**
 * Person one
 * See {@link Person}
 */
const person1 = new Person({
  name: 'John Doe',
  age: 30,
});

console.log(person1.greet());
console.log(add(20, 30));
console.log(subtract(30, 20));
console.log(multiply(30, 20));
console.log(divide(30, 20));
