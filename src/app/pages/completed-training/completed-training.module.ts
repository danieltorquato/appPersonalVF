import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedTrainingPageRoutingModule } from './completed-training-routing.module';

import { CompletedTrainingPage } from './completed-training.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedTrainingPageRoutingModule,
    SharedModule
  ],
  declarations: [CompletedTrainingPage]
})
export class CompletedTrainingPageModule {}
