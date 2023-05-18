/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-pupil',
  templateUrl: './feedback-pupil.component.html',
  styleUrls: ['./feedback-pupil.component.scss'],
})
export class FeedbackPupilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  novoFeedback: any = {
    nomeAluno: '',
    conteudo: ''
  };

  enviarFeedback() {
    // Lógica para enviar o feedback ao professor
    console.log('Novo Feedback:', this.novoFeedback);

    // Limpar campos
    this.novoFeedback.nomeAluno = '';
    this.novoFeedback.conteudo = '';
  }
}
