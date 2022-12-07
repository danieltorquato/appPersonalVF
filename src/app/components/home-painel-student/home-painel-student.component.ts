/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { getAuth } from 'firebase/auth';
import { Component, OnInit } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
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
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    // private db: AngularFireDatabase
  ) {}
  async ngOnInit() {
    // this.storage.create();
    // this.storage.get('users').then((response) => {
    //   const uid = response;
    //   const listDB = this.db.database.ref('/users').child(uid);
    //   listDB.on('value', (snapshot) => {
    //     const items = snapshot.val();
    //     if (items) {
    //       this.list = Object.keys(items).map((i) => {
    //         return items[i];
    //       });
    //       console.log(this.list);
    //     }
    //   });
    // });

  }
  logout() {
    const auth = getAuth();
    this.storage.create();
    auth
      .signOut()
      .then((response) => {
        console.log(response);
        this.navCtrl.navigateRoot('login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
  confirmPassword(){

  }
}
