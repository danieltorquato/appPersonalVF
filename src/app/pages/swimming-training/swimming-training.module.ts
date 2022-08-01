import { TimerComponent } from './../../components/timer/timer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwimmingTrainingPageRoutingModule } from './swimming-training-routing.module';

import { SwimmingTrainingPage } from './swimming-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwimmingTrainingPageRoutingModule,

  ],
  declarations: [SwimmingTrainingPage,TimerComponent]
})
export class SwimmingTrainingPageModule {}
