import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PupilsPage } from './pupils.page';

const routes: Routes = [
  {
    path: '',
    component: PupilsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PupilsPageRoutingModule {}
