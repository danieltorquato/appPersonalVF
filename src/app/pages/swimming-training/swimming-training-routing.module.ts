import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwimmingTrainingPage } from './swimming-training.page';

const routes: Routes = [
  {
    path: '',
    component: SwimmingTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwimmingTrainingPageRoutingModule {}
