import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
cronometro;
time;
atual;
  cronometroM;
  timeM;
  constructor() { }

  ngOnInit() {
    this.time=0;
    this.timeM=0;

}
chronometerInit(){
  $('.timerInit').addClass('hideClass');
  this.cronometro = setInterval(() => {
   this.time++;
   console.log(this.time);
  }, 1000);
  this.cronometroM=setInterval(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.timeM++;
    console.log(this.time);
    while(this.timeM===99){
      this.timeM=0;
    }
   }, 10);
}
chronometerResume(){
  this.cronometro = setInterval(() => {
    this.time++;
   }, 1000);
   this.cronometroM=setInterval(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.timeM++;
    while(this.timeM===99){
      this.timeM=0;
    }
   }, 10);
  }
  chronometerPause(){
    clearInterval(this.cronometro);
    clearInterval(this.cronometroM);
  }
chronometerClear(){
  clearInterval(this.cronometro);
  clearInterval(this.cronometroM);
this.time=0;
this.timeM=0;
}
newTurn(){
  this.time=0;
  this.timeM=0;
}
}


