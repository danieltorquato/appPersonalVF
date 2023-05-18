import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbacksPupilsPageRoutingModule } from './feedbacks-pupils-routing.module';

import { FeedbacksPupilsPage } from './feedbacks-pupils.page';
import { FeedbackPupilComponent } from 'src/app/components/feedback-pupil/feedback-pupil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbacksPupilsPageRoutingModule
  ],
  declarations: [FeedbacksPupilsPage, FeedbackPupilComponent]
})
export class FeedbacksPupilsPageModule {}
