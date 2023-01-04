import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PupilsPageRoutingModule } from './pupils-routing.module';

import { PupilsPage } from './pupils.page';
import { PupilsComponent } from 'src/app/components/professor/pupils/pupils.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PupilsPageRoutingModule
  ],
  declarations: [PupilsPage, PupilsComponent]
})
export class PupilsPageModule {}
