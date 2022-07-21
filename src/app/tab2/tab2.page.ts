import { FormBuilder, Validators } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  data = new Date();
  dia= String(this.data.getDate());
  mes= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
  ano= String(this.data.getFullYear());
  dataAtual= `${this.dia}/${this.mes}/${this.ano}`;
  dateAtual;
  uid: string;
  list;
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public formbuilder: FormBuilder,
    ) {}
    ngOnInit(){
      this.dateAtual=this.formbuilder.group({
        date: [this.dataAtual]});
        if(this.dateAtual.value){
          console.log(this.dateAtual.value);
        }
      }


logout(){
  const auth=getAuth();
  this.storage.create();
  auth.signOut().then((response)=>{
    console.log(response);
    this.navCtrl.navigateRoot('login');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });

}
}
