import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  handlerMessage = '';
  roleMessage = '';
  constructor(public alertControllerr: AlertController,
    public router: Router) { }

  ngOnInit() {
    this.time=0;
    this.timeM=0;

}
chronometerInit(){
  $('.timerInit').addClass('hideClass');
  $('.timerPause').removeClass('hideClass');
  $('.timerNewTurn').removeClass('hideClass');
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
  $('.timerResume').addClass('hideClass');
  $('.timerPause').removeClass('hideClass');
  $('.timerClear').addClass('hideClass');
  $('.timerNewTurn').removeClass('hideClass');

  this.cronometro = setInterval(() => {
    this.time++;
   }, 1000);
   this.cronometroM=setInterval(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.timeM++;
    while(this.timeM===99){
      this.timeM=0;
      this.time++;
    }
   }, 10);
  }
  chronometerPause(){
    $('.timerResume').removeClass('hideClass');
    $('.timerPause').addClass('hideClass');
    $('.timerClear').removeClass('hideClass');
    $('.timerNewTurn').addClass('hideClass');
    clearInterval(this.cronometro);
    clearInterval(this.cronometroM);
  }
chronometerClear(){
  $('.timerResume').addClass('hideClass');
  $('.timerInit').removeClass('hideClass');
  $('.timerClear').addClass('hideClass');
  clearInterval(this.cronometro);
  clearInterval(this.cronometroM);
this.time=0;
this.timeM=0;
}
newTurn(){
  $('.test').html(`<p>${this.time}:${this.timeM}</p>`);
  $('.clearTimes').removeClass('hideClass');
  this.chronometerClear();
  this.chronometerInit();

}
clearTimes(){
$('.test').empty();
}
async finishCicle(){
  this.chronometerPause();
  const alert = await this.alertControllerr.create({
    header: 'Alert!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.handlerMessage = 'Alert canceled';
          this.chronometerResume();
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.handlerMessage = 'Alert confirmed';
          this.chronometerClear();
          $('.clearTimes').addClass('hideClass');
          $('.test').addClass('hideClass');
       this.router.navigate(['/completed-training']);
        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  this.roleMessage = `Dismissed with role: ${role}`;
}
}


