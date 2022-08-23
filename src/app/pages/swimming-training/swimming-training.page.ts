import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-swimming-training',
  templateUrl: './swimming-training.page.html',
  styleUrls: ['./swimming-training.page.scss'],
})
export class SwimmingTrainingPage implements OnInit {
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  modal: IonModal;
  constructor() { }

  ngOnInit() {




}
}
