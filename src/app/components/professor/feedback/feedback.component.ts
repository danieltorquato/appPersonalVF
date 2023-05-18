/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent  implements OnInit {
  feedbacks: any[] = [];
  constructor(private alertController: AlertController) { }

  ngOnInit() {
     // Carregar feedbacks do serviço ou API
     this.carregarFeedbacks();
  }

  carregarFeedbacks() {
    // Simulação de carregamento de feedbacks
    this.feedbacks = [
      {
        nomeAluno: 'João',
        // eslint-disable-next-line max-len
        fotoAluno: 'https://firebasestorage.googleapis.com/v0/b/vitor-f-app.appspot.com/o/images%2Fs9JdEeNoP4OyjDgasZMdjnffwq03%2F17-maio-2023-jupiter.jpg?alt=media&token=1795e301-3cff-46bb-a9a0-cb80eb7b9cbf',
        dataCriacao: new Date(),
        conteudo:'asffffffffffflasffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccds fffffffffffffffffffffffscasac[cacfasfl',
        collapsed: true,
        respondido: true,
        resposta: 'Obrigado pelo seu feedback!'
      },
      {
        nomeAluno: 'Maria',
        // eslint-disable-next-line max-len
        fotoAluno: 'https://firebasestorage.googleapis.com/v0/b/vitor-f-app.appspot.com/o/images%2Fs9JdEeNoP4OyjDgasZMdjnffwq03%2F17-maio-2023-jupiter.jpg?alt=media&token=1795e301-3cff-46bb-a9a0-cb80eb7b9cbf',
        dataCriacao: new Date(),
        conteudo: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        collapsed: true,
        respondido: true,
        resposta: 'Obrigado pelo seu feedback!'
      }
    ];
  }
  async responderFeedback(feedback: any) {
    const alert = await this.alertController.create({
      header: 'Responder Feedback',
      inputs: [
        {
          name: 'resposta',
          type: 'textarea',
          placeholder: 'Digite sua resposta...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Responder',
          handler: (data) => {
            this.enviarResposta(feedback, data.resposta);
          }
        }
      ]
    });

    await alert.present();
  }

  enviarResposta(feedback: any, resposta: string) {
    // Lógica para enviar a resposta ao serviço ou API
    console.log('Feedback:', feedback);
    console.log('Resposta:', resposta);

    // Atualizar a visualização do feedback com a resposta
    feedback.resposta = resposta;
    feedback.respondido = true;

  }

  toggleCollapse(feedback: any) {
    feedback.collapsed = !feedback.collapsed;
  }
}
