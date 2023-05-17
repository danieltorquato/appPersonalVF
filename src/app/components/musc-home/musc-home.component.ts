/* eslint-disable @typescript-eslint/no-shadow */
// this.dateForm= this.formbuilder.group({
//   date: [this.dataAtual]});

//   const ctx = document.getElementById('charts') as HTMLCanvasElement;
//   const myChart = new Chart(ctx, {
//       type: 'line',
//       data: {
//           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//           datasets: [{
//               label: '# of Votes',
//               data: [20.3, 19.8, 19.7, 19.2, 19.4, 19.0],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.2)',
//                   'rgba(54, 162, 235, 0.2)',
//                   'rgba(255, 206, 86, 0.2)',
//                   'rgba(75, 192, 192, 0.2)',
//                   'rgba(153, 102, 255, 0.2)',
//                   'rgba(255, 159, 64, 0.2)'
//               ],
//               borderColor: [
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 206, 86, 1)',
//                   'rgba(75, 192, 192, 1)',
//                   'rgba(153, 102, 255, 1)',
//                   'rgba(255, 159, 64, 1)'
//               ],
//               borderWidth: 1
//           }]
//       },
//       options: {
//           scales: {
//               y: {
//                   beginAtZero: false
//               }
//           }
//       }
//   });
import { Chart} from 'chart.js';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-musc-home',
  templateUrl: './musc-home.component.html',
  styleUrls: ['./musc-home.component.scss'],
})
export class MuscHomeComponent implements OnInit {
  data = new Date();
  day= String(this.data.getDate());
  month= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
  year= String(this.data.getFullYear());
  hour=String(this.data.getHours());
  minutes = String(this.data.getMinutes());
  horaAtual = `${this.hour}:${this.minutes}`;
  dataAtual= `${this.day}-${this.month}-${this.year}`;
  dateForm;
  list;
  id;
  listagem: void[];
  uid: any;
  db = getFirestore();
  auth = getAuth();
  items;
  docRef: any;
  docId: string;
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public formbuilder: FormBuilder,
    private alertController: AlertController,) { }

  ngOnInit() {

    if (this.day.length < 10) {
      this.day = String('0' + this.data.getDate()).slice(-2);
    }
    console.log(this.day);
    onAuthStateChanged(this.auth, (user) => {
      this.uid = user.uid;
      this.docRef = onSnapshot(doc(this.db, 'users', this.uid), (doc) => {
        this.items = doc.data();
        console.log('Current data: ', doc.data());
    });
    });

}

async registerTraining(){
const docRef = addDoc(collection(this.db, 'history', this.uid, this.year), {
day: this.day,
month:this.month,
year:this.year,
musc: 1,
swim: 0,
hour:this.horaAtual,
});
this.docId = (await docRef).id;
console.log(this.docId);
this.presentAlert();
const docRefT = setDoc(doc(this.db, 'users', this.items.professor,'pupils', this.uid, 'history', this.docId), {
  day: this.day,
  month:this.month,
  year:this.year,
  musc: 1,
  swim: 0,
  hour:this.horaAtual,
  });
}
async presentAlert() {
const alert = await this.alertController.create({
  header: 'Parabéns',
  subHeader: 'Treino Registrado',
  message: 'Consulte seu histórico',
  buttons: ['OK']
});

await alert.present();
}
  }


