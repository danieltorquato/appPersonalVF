import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalPageRoutingModule } from './personal-routing.module';

import { PersonalPage } from './personal.page';
import { PersonalInfoComponent } from 'src/app/components/personal-info/personal-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalPageRoutingModule
  ],
  declarations: [PersonalPage, PersonalInfoComponent]
})
export class PersonalPageModule {}
