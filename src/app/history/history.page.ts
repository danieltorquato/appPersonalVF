import { getAuth } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
uid: string;
list;
data= new Date();
dia= String(this.data.getDate());
mes= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
ano= String(this.data.getFullYear());
  dataAtual= `${this.dia}/${this.mes}/${this.ano}`;
  constructor( public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public storage: Storage,
   ) { }

  ngOnInit() {
    this.storage.get('users')
    .then((response)=>{

     const uid=response;
     console.log(response);
          const listDB = this.db.database.ref('/history').child(uid).child(this.mes);
          listDB.on('value', (snapshot)=>{
            const items = snapshot.val();
            console.log(items);
            if(items){
              this.list= Object.keys(items).map(i=>items[i]);
              console.log(this.list);
            }
          });
        });
  }

}
