import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwimmingInformationsPageRoutingModule } from './swimming-informations-routing.module';

import { SwimmingInformationsPage } from './swimming-informations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwimmingInformationsPageRoutingModule
  ],
  declarations: [SwimmingInformationsPage]
})
export class SwimmingInformationsPageModule {}
