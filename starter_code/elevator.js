/*jshint esversion: 6 */
const Person = require('./person.js');
const SECOND = 1000;
class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.waitingList = [];
    this.passengers = [];
    this.direction  = "up";
    this.limitTop   = 10;
    this.limitDown  = -1;
    this.startInterval = undefined;
  }

  start() {
    this.log();
    this.startInterval = setInterval(() => this.update(), SECOND);
  }

  stop() {
    if(this.requests.length === 0)
      clearInterval(this.startInterval);
  }

  update() {
    if(this.requests.length > 0){
      if(this.requests[0] > this.floor)
        this.floorUp();
      if(this.requests[0] < this.floor)
        this.floorDown();
      if(this.requests[0] === this.floor){
        this._passengersEnter(this.waitingList.shift());
        this.requests.shift();
      }
    }
    this.log();
  }

  _passengersEnter(person) {
    this.passengers.push(person);
    this.requests.push(person.destinationFloor);
    console.log('Passengers enter the elevator...');
 }

  _passengersLeave(person) {
    this.passengers.shift(person);
    this.requests.shift(person.destinationFloor);
  }

  floorUp() {
    if(this.floor < this.limitTop){
      this.floor ++;
      this.direction = 'up';
    }
  }

  floorDown() {
    if(this.floor > this.limitDown) {
      this.floor --;
      this.direction = 'down';
    }
  }

  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
   }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
    console.log('\n');
  }
}

module.exports = Elevator;
