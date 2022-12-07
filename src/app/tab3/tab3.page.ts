import { Chart, registerables} from 'chart.js';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
Chart.register(...registerables);
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  data = new Date();
  dia= String(this.data.getDate());
  mes= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
  ano= String(this.data.getFullYear());
  dataAtual= `${this.dia}/${this.mes}/${this.ano}`;
  dateForm;
  uid: string;
  list;
  id;
  listagem: void[];
  db = getFirestore();
  constructor(public storage: Storage,
    public navCtrl: NavController,
    // public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public formbuilder: FormBuilder,
    private alertController: AlertController) {}
    ngOnInit(){
      this.dateForm= this.formbuilder.group({
        date: [this.dataAtual]});

        const ctx = document.getElementById('charts') as HTMLCanvasElement;
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [20.3, 19.8, 19.7, 19.2, 19.4, 19.0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

  }
//   addTrainingRegister(){
//     this.storage.create();
//     this.storage.get('users')
//     .then((response)=>{
//      const uid=response;

// this.db.database.ref(`/history/${uid}/`).child(this.mes).push(this.dateForm.value);
// this.presentAlert();
//   }).catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   });
// }
async registerTraining(){
  const historico = doc(this.db, '/users/PKlUMPunNBMM0cuP7pOa/historico/musculacao', 'data');

// Set the "capital" field of the city 'DC'
await updateDoc(historico, {
data: '20/05/2022'
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

