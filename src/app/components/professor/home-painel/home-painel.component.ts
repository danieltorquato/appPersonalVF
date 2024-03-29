/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home-painel',
  templateUrl: './home-painel.component.html',
  styleUrls: ['./home-painel.component.scss'],
})
export class HomePainelComponent implements OnInit {
  list: any;
  db = getFirestore();
  id: string;
  uid: any;
  auth = getAuth();
  items: any;
  listArray;
  feedbacks = [];
  size = [];
  dataDoc: any;
  constructor(
    private storage: Storage, private navCtrl: NavController) { }

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      this.uid = user.uid;
      const q = await query(collection(this.db, 'users', this.uid, 'feedbacks'), where('answered', '==', 'Aguardando Resposta'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.feedbacks = [];
        this.size = [];
        querySnapshot.forEach((doc)=>{
          this.size.push(querySnapshot.size);
          // doc.data() is never undefined for query doc snapshots
        console.log(this.size);

        });
      });
      // const docRef = doc(this.db, 'users/' + this.uid);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const docRef = onSnapshot(doc(this.db, 'users/', this.uid), (doc) => {

        console.log('Current data: ', doc.data());
        this.items = doc.data();
        this.listArray = [doc.data()];
        console.log(this.listArray);
      });
    });
  }
  logout() {
    this.auth;
    this.storage.create();
    this.storage.clear();
    this.auth
      .signOut()
      .then((response) => {
        console.log(response);
        this.navCtrl.navigateRoot('login');
        window.localStorage.clear();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
  pegaId(id){
    console.log(id);
  }
}
