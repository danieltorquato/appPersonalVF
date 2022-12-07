import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistersPageRoutingModule } from './registers-routing.module';

import { RegistersPage } from './registers.page';
import { RegisterComponent } from 'src/app/components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistersPage, RegisterComponent]
})
export class RegistersPageModule {}
