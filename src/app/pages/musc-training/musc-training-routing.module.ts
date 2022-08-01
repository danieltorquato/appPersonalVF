import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MuscTrainingPage } from './musc-training.page';

const routes: Routes = [
  {
    path: '',
    component: MuscTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MuscTrainingPageRoutingModule {}
