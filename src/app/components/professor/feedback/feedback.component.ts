/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';

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
  size = [];
  constructor(private alertController: AlertController) { }

  ngOnInit() {
     // Carregar feedbacks do serviço ou API
     this.carregarFeedbacks();
  }

  async carregarFeedbacks() {
    onAuthStateChanged(this.auth, async (user) => {

      this.uid = user.uid;
      const q = await query(collection(this.db, 'users', this.uid, 'feedbacks'), where('answered', '==', 'Aguardando Resposta'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.feedbacks = [];
        this.size = [];
        querySnapshot.forEach((doc)=>{
          this.size.push(querySnapshot.size);
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          this.feedbacks.push(doc.data());

          this.dataDoc = doc.data();
          console.log(this.dataDoc);

        });
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
   const docRef = doc(this.db, 'users', this.uid, 'feedbacks', this.dataDoc.idDoc);
    console.log('Resposta:', resposta);
    await updateDoc(docRef, {
      answer: resposta,
      answered: 'Respondido',
    });
   const docRefs = doc(this.db, 'users', this.dataDoc.pupil, 'feedbackPupil', this.dataDoc.idDocPupil);
    console.log('Resposta:', resposta);
    await updateDoc(docRefs, {
      answer: resposta,
      answered: 'Respondido',
    });

    // Atualizar a visualização do feedback com a resposta
    feedback.resposta = resposta;
    feedback.respondido = 'Respondido';

  }

  toggleCollapse(feedback: any) {
    feedback.collapsed = !feedback.collapsed;
  }
}
