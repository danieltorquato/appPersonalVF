import { ExercisesComponent } from './../src/app/components/exercises/exercises.component';
import { IonicModule } from '@ionic/angular';
import { TimerComponent } from './../src/app/components/timer/timer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[TimerComponent, ExercisesComponent],
  declarations: [SharedComponent, TimerComponent, ExercisesComponent]
})
export class SharedModule { }