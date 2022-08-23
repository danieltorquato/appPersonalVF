import { ExercisesComponent } from './../../components/exercises/exercises.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MuscInformationsPageRoutingModule } from './musc-informations-routing.module';

import { MuscInformationsPage } from './musc-informations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MuscInformationsPageRoutingModule
  ],
  declarations: [MuscInformationsPage, ExercisesComponent]
})
export class MuscInformationsPageModule {}
