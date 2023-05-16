import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPupilsPageRoutingModule } from './history-pupils-routing.module';

import { HistoryPupilsPage } from './history-pupils.page';
import { HistoryPupilsCComponent } from 'src/app/components/professor/history-pupils-c/history-pupils-c.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPupilsPageRoutingModule
  ],
  declarations: [HistoryPupilsPage, HistoryPupilsCComponent]
})
export class HistoryPupilsPageModule {}
