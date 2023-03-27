import { AddpupilcComponent } from './../../../components/addpupilc/addpupilc.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpupilpPageRoutingModule } from './newpupilp-routing.module';

import { NewpupilpPage } from './newpupilp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewpupilpPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [NewpupilpPage, AddpupilcComponent]
})
export class NewpupilpPageModule {}
