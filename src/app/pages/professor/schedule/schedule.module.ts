import { AngularFireStorage } from '@angular/fire/compat/storage';
import { File } from '@ionic-native/file/ngx';
import { AddExerciseComponent } from '../../../components/professor/add-exercise/add-exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SchedulePage } from './schedule.page';
import { ScheduleCComponent } from 'src/app/components/professor/schedule-c/schedule-c.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
  ],
  providers:[
    AngularFireStorage,
    File
  ],
  declarations: [SchedulePage, ScheduleCComponent]
})
export class SchedulePageModule {}
