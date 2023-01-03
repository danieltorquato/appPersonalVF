import { AccountEditComponent } from './../../components/account-edit/account-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { File } from '@ionic-native/file/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    AngularFireStorage,
    File
  ],
  declarations: [AccountPage, AccountEditComponent]
})
export class AccountPageModule {}
