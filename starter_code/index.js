/*jshint esversion: 6 */
const Elevator = require('./elevator.js');
const Person = require('./person.js');
const elevator = new Elevator();
const person1 = new Person("Cristian", 3, 10);
const person2 = new Person("Marco", 4, 6);
const person3 = new Person("Luis", 4, 6);

elevator.start();
elevator.call(person1);
elevator.call(person2);
elevator.call(person3);
