/* eslint-disable @typescript-eslint/no-shadow */
import { AlertController } from '@ionic/angular';
// core version + navigation, pagination modules:
import { Component, OnInit, ViewChild } from '@angular/core';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit {
  db = getFirestore();
  auth = getAuth();
  exercises = [];
  uid: string;
  dataUser;
  docRef: any;
  message: any;
  dataExercise;
  nomeExercicio: any;
  docRefs: any;
  idDocs: any;
  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.getData();
    this.getIdCard(this.nomeExercicio);
  }

  async getData() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.exercises = [];
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
        const querySnapshot = await getDocs(
          collection(this.db, 'users', this.uid, 'treino')
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          this.exercises.push(doc.data());
          this.dataExercise = doc.data();
          console.log(this.exercises);
        });
        const queryUser = await getDoc(doc(this.db, 'users', this.uid));
        // ...
        if (queryUser.exists()) {
          console.log('Document data:', queryUser.data());
          this.dataUser = queryUser.data();
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No such document!');
        }

      } else {
        // User is signed out
        // ...
      }
    });
  }
  async sendFeedback(){
    this.docRef = await addDoc(collection(this.db, 'users', this.dataUser.professor, 'feedbacks'), {
      pupil: this.uid,
      idDocPupil: '',
      answer: '',
      answered: 'Aguardando Resposta',
      collapsed: false,
      createDate: '',
      img: this.dataUser.img,
      name: this.dataUser.name,
      shortName: this.dataUser.shortName,
      text: this.message,
      exercise:   this.nomeExercicio,
      idDoc: ''
    });
    await updateDoc(this.docRef, {
      idDoc: this.docRef.id,
    });
    this.docRefs = await addDoc(collection(this.db, 'users', this.uid, 'feedbackPupil'), {
      answer: '',
      answered: 'Aguardando Resposta',
      collapsed: false,
      createDate: '',
      text: this.message,
      exercise:   this.nomeExercicio,
      idDoc: ''
    });
    console.log('Document written with ID: ', this.docRefs.id);
    await updateDoc(this.docRefs, {
      idDoc: this.docRefs.id
    });
    await updateDoc(this.docRef, {
      idDocPupil: this.docRefs.id,
    });
  }
  async abrirAlert(exercicio) {
    const alert = await this.alertController.create({
      header: 'Enviar Feedback',
      inputs: [
        {
          name: 'mensagem',
          type: 'textarea',
          placeholder: 'Digite sua mensagem',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            this.message = data.mensagem;
            // Lógica para enviar o feedback ao professor
            console.log('Mensagem:', this.message);
           this.sendFeedback();
          },
        },
      ],
    });

    await alert.present();
  }
  getIdCard(id){
    this.nomeExercicio = id;
console.log(id);
  }
}
