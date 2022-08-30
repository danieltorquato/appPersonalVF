import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentTrainingVPage } from './student-training-v.page';

const routes: Routes = [
  {
    path: '',
    component: StudentTrainingVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentTrainingVPageRoutingModule {}
