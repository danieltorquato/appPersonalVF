import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryPupilsPage } from './history-pupils.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryPupilsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryPupilsPageRoutingModule {}
