import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuscInformationsPage } from './musc-informations.page';

const routes: Routes = [
  {
    path: '',
    component: MuscInformationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuscInformationsPageRoutingModule {}
