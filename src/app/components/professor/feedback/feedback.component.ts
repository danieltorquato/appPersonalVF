/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent  implements OnInit {
  feedbacks = [];
  db = getFirestore();
  uid: string;
  auth = getAuth();
  idDoc: any;
  dataDoc: any;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
     // Carregar feedbacks do serviço ou API
     this.carregarFeedbacks();
  }

  async carregarFeedbacks() {
    onAuthStateChanged(this.auth, async (user) => {
      this.feedbacks = [];
      this.uid = user.uid;
      const querySnapshot = await getDocs(collection(this.db, 'users', this.uid, 'feedbacks'));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        this.feedbacks.push(doc.data());
        this.idDoc = doc.data().idDoc;
        this.dataDoc = doc.data();
      });
    });
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

  async enviarResposta(feedback: any, resposta: string) {
    // Lógica para enviar a resposta ao serviço ou API
   const docRef = doc(this.db, 'users', this.uid, 'feedbacks', this.idDoc);
    console.log('Resposta:', resposta);
    await updateDoc(docRef, {
      answer: resposta,
      answered: true,
    });

    // Atualizar a visualização do feedback com a resposta
    feedback.resposta = resposta;
    feedback.respondido = true;

  }

  toggleCollapse(feedback: any) {
    feedback.collapsed = !feedback.collapsed;
  }
}
