/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Component, OnInit } from '@angular/core';
import { getFirestore, onSnapshot } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
@Component({
  selector: 'app-home-painel-student',
  templateUrl: './home-painel-student.component.html',
  styleUrls: ['./home-painel-student.component.scss'],
})
export class HomePainelStudentComponent implements OnInit {
  list: any;
  db = getFirestore();
  id: string;
  uid: any;
  auth = getAuth();
  items: any;
  listArray;
  navCtrl = NavController;
  constructor(private storage: Storage ) {}
  async ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.uid = user.uid;
      // const docRef = doc(this.db, 'users/' + this.uid);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const docRef = onSnapshot(doc(this.db, 'users/', this.uid), (doc) => {

        // console.log('Current data: ', doc.data());
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
        // this.navCtrl.navigateRoot('login');
        window.localStorage.clear();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
  confirmPassword() {}
  getId(id){
    console.log(id);
  }
}
