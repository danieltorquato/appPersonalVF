import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwimTrainingPage } from './swim-training.page';

describe('SwimTrainingPage', () => {
  let component: SwimTrainingPage;
  let fixture: ComponentFixture<SwimTrainingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SwimTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
