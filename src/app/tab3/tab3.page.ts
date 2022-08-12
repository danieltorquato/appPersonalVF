import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
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
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public formbuilder: FormBuilder,
    private alertController: AlertController) {}
    ngOnInit(){
      this.dateForm= this.formbuilder.group({
        date: [this.dataAtual]});
  }
  addTrainingRegister(){
    this.storage.create();
    this.storage.get('users')
    .then((response)=>{
     const uid=response;

this.db.database.ref(`/history/${uid}/`).child(this.mes).push(this.dateForm.value);
this.presentAlert();
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
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

