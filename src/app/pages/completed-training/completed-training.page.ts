import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-training',
  templateUrl: './completed-training.page.html',
  styleUrls: ['./completed-training.page.scss'],
})
export class CompletedTrainingPage implements OnInit {
@Input() time: any;
@Input() timeM: any;
  constructor() { }

  ngOnInit() {
  }

}
