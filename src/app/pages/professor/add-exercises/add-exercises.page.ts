import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-add-exercises',
  templateUrl: './add-exercises.page.html',
  styleUrls: ['./add-exercises.page.scss'],
})
export class AddExercisesPage implements OnInit {
  public chartType = 'doughnut';
  public chartData = [300, 50, 100];
  public chartLabels = ['Red', 'Yellow', 'Blue'];
  constructor() { }

  ngOnInit() {
  }

}
