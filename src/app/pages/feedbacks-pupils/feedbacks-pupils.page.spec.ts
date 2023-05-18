import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbacksPupilsPage } from './feedbacks-pupils.page';

describe('FeedbacksPupilsPage', () => {
  let component: FeedbacksPupilsPage;
  let fixture: ComponentFixture<FeedbacksPupilsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FeedbacksPupilsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
