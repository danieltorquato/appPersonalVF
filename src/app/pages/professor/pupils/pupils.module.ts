import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PupilsPageRoutingModule } from './pupils-routing.module';

import { PupilsPage } from './pupils.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PupilsPageRoutingModule
  ],
  declarations: [PupilsPage]
})
export class PupilsPageModule {}
