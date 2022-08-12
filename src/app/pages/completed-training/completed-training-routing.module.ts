import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedTrainingPage } from './completed-training.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedTrainingPageRoutingModule {}
