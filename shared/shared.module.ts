import { HomePainelStudentComponent } from './../src/app/components/home-painel-student/home-painel-student.component';
import { ExercisesComponent } from './../src/app/components/exercises/exercises.component';
import { IonicModule } from '@ionic/angular';
import { TimerComponent } from './../src/app/components/timer/timer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { PupilsComponent } from 'src/app/components/professor/pupils/pupils.component';
import { SafePipe } from 'src/app/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[TimerComponent, HomePainelStudentComponent, SharedComponent],
  declarations: [SharedComponent, TimerComponent, HomePainelStudentComponent]
})
export class SharedModule { }
