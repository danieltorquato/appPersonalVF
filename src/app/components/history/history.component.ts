/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { doc, updateDoc, getFirestore, onSnapshot, collection, getDocs, getDoc, query } from 'firebase/firestore';
import { Validators } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  db = getFirestore();
uid: string;
list;
data= new Date();
dia= String(this.data.getDate());
mes= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
ano= String(this.data.getFullYear());
  dataAtual= `${this.dia}/${this.mes}/${this.ano}`;
  items: any;
  listArray = [];
  auth = getAuth();
  listRef: any;
  docRef: any;
  querySnapshot: any;
  userData: any;
  formbuilder: any;

  constructor() { }

 ngOnInit() {
    //Captura usuário atual
    onAuthStateChanged(this.auth, async (user) => {
      this.uid = user.uid;
      const querySnapshots  = await getDocs(collection(this.db, 'users', this.uid, 'history'));
    // eslint-disable-next-line @typescript-eslint/no-shadow
    querySnapshots.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots
      this.list = doc.data();
      this.listArray.push(this.list);
      console.log(this.listArray);
  });
    });


}
onIonInfinite(ev) {
  setTimeout(() => {
    (ev as InfiniteScrollCustomEvent).target.complete();
  }, 500);
}
}
