import { StudentTrainingComponent } from './../../../components/professor/student-training/student-training.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentTrainingVPageRoutingModule } from './student-training-v-routing.module';

import { StudentTrainingVPage } from './student-training-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentTrainingVPageRoutingModule
  ],
  declarations: [StudentTrainingVPage, StudentTrainingComponent]
})
export class StudentTrainingVPageModule {}
