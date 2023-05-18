import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbacksPupilsPage } from './feedbacks-pupils.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbacksPupilsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbacksPupilsPageRoutingModule {}
