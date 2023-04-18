import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AddExerciseComponent } from './../../../components/professor/add-exercise/add-exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AddExercisesPageRoutingModule } from './add-exercises-routing.module';

import { AddExercisesPage } from './add-exercises.page';
import 'simple-circular-progress';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExercisesPageRoutingModule,
  ],
  providers:[
    AngularFireStorage,
    File
  ],
  declarations: [AddExercisesPage, AddExerciseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddExercisesPageModule {}
