import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { HistoryComponent } from 'src/app/components/history/history.component';
import { AccountEditComponent } from 'src/app/components/account-edit/account-edit.component';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
  ],
  providers:[
    AccountEditComponent,
    File
  ],
  declarations: [HistoryPage, HistoryComponent]
})
export class HistoryPageModule {}
