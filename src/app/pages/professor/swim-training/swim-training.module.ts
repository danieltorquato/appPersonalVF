import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwimTrainingPageRoutingModule } from './swim-training-routing.module';

import { SwimTrainingPage } from './swim-training.page';
import { AddSwimTrainingComponent } from 'src/app/components/professor/add-swim-training/add-swim-training.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwimTrainingPageRoutingModule
  ],
  declarations: [SwimTrainingPage, AddSwimTrainingComponent]
})
export class SwimTrainingPageModule {}
