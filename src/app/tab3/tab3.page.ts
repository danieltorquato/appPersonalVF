import { HomePainelComponent } from './../components/professor/home-painel/home-painel.component';
import {LoginPage} from './../pages/login/login.page';
import '../components/home-painel-student/home-painel-student.component';
import { Chart, registerables} from 'chart.js';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { doc, updateDoc, getFirestore, setDoc, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  dataAtual= `${this.dia}-${this.mes}-${this.ano}`;
  dateForm;
  list;
  id;
  listagem: void[];
  uid: any;
  db = getFirestore();
  auth = getAuth();
  items;
  docRef: any;
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public formbuilder: FormBuilder,
    private alertController: AlertController,
    ) {}
    ngOnInit(){
      onAuthStateChanged(this.auth, (user) => {
        this.uid = user.uid;
        this.docRef = collection(this.db, 'history/');
      });
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

async registerTraining(){
  await setDoc(doc(this.db, 'history/', `${this.uid}/` + `${this.ano}/` + `${this.mes}/` + `${this.dia}/` + 'treinos'), {
  musculacao: 1,
  natacao: 0,
  });
  this.presentAlert();
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
