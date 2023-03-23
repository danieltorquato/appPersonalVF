// core version + navigation, pagination modules:
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
@ViewChild('slides',{static:false}) slides: IonSlides;
  constructor() {}

  ngOnInit() {
  }
  ionSlideDidChange(event){
    this.slides.getActiveIndex().then(index=>{
      console.log(index);
    });
    // console.log(event);
  }
  ionSlideReachEnd(event){
    console.log(event);
  }
}
