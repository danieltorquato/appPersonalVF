/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  db = getFirestore();
  user: string;

  constructor(
    // public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public navCtrl: NavController,
    public formbuilder: FormBuilder,
    public storage: Storage )
    {

}

   ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

 {

}

  }
 login(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginForm.value.email, this.loginForm.value.password)
      .then(async (response) => {
      this.user = response.user.uid;
      console.log(this.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

}
