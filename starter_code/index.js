/*jshint esversion: 6 */
const Elevator = require('./elevator.js');
const Person = require('./person.js');
const elevator = new Elevator();
const person1 = new Person("Cristian", 3, 5);
const person2 = new Person("Marco", 4, 1);

elevator.start();
elevator.call(person1);
