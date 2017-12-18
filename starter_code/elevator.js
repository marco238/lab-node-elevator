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
    clearInterval(this.startInterval);
    console.log('Elevator stops...');
  }

  update() {
    if(this.requests.length > 0){
      if(this.requests[0] > this.floor)
        this.floorUp();
      if(this.requests[0] < this.floor)
        this.floorDown();

      if(this.waitingList.length > 0){
        for(let person of this.waitingList){
          if(person.originFloor == this.floor){
            this._passengersEnter(person);
            this.requests.splice(this.requests.indexOf(person.originFloor), 1);
            this.waitingList.splice(this.waitingList.indexOf(person),1);
          }
        }
      }
      if(this.passengers.length > 0){
        for(let person of this.passengers){
          if(person.destinationFloor == this.floor){
            this._passengersLeave(person);
            this.requests.splice(this.requests.indexOf(person.destinationFloor), 1);
          }
        }
      }
      this.log();
      console.log(this.requests[0]);
      console.log(this.requests[1]);
    } else this.stop();
  }

  _passengersEnter(person) {
    this.passengers.push(person);
    this.requests.push(person.destinationFloor);
    console.log(`Passenger ${person.name} enters the elevator at ${person.originFloor} floor`);
 }

  _passengersLeave(person) {
    this.passengers.splice(this.passengers.indexOf(person), 1);
    this.requests.splice(person.destinationFloor, 1);
    console.log(`Passenger ${person.name} leaves the elevator at ${person.destinationFloor} floor`);
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
  }
}

module.exports = Elevator;
