import { ExercisesComponent } from './../../components/exercises/exercises.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuscTrainingPageRoutingModule } from './musc-training-routing.module';

import { MuscTrainingPage } from './musc-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuscTrainingPageRoutingModule,
  ],
  declarations: [MuscTrainingPage, ExercisesComponent]
})
export class MuscTrainingPageModule {}
