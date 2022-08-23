import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwimmingInformationsPage } from './swimming-informations.page';

const routes: Routes = [
  {
    path: '',
    component: SwimmingInformationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwimmingInformationsPageRoutingModule {}
