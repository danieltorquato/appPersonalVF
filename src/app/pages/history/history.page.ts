import { getAuth } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  db = getFirestore();
uid: string;
list;
data= new Date();
dia= String(this.data.getDate());
mes= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
ano= String(this.data.getFullYear());
  dataAtual= `${this.dia}/${this.mes}/${this.ano}`;
  constructor(
   ) { }

  ngOnInit() {
    // this.storage.create();
    // this.storage.get('users')
    // .then((response)=>{

    //  const uid=response;
    //  console.log(response);
    //  const listDB = this.db.database.ref('/history').child(uid).child(this.mes);
    //  listDB.on('value', (snapshot)=>{
    //         const items = snapshot.val();
    //         console.log(items);
    //         if(items){
    //           this.list= Object.keys(items).map(i=> {
    //             console.log(i);
    //             return items[i];
    //           });
    //           console.log(this.list);
    //         }
    //       });
    //     });
  }

}
