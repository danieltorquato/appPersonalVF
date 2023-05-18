import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbacksPageRoutingModule } from './feedbacks-routing.module';

import { FeedbacksPage } from './feedbacks.page';
import { FeedbackComponent } from 'src/app/components/professor/feedback/feedback.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbacksPageRoutingModule
  ],
  declarations: [FeedbacksPage, FeedbackComponent]
})
export class FeedbacksPageModule {}
