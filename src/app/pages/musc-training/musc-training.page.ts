import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-musc-training',
  templateUrl: './musc-training.page.html',
  styleUrls: ['./musc-training.page.scss'],
})
export class MuscTrainingPage implements OnInit {
@Input() list: any;
  constructor() { }

  ngOnInit() {
  }

}
