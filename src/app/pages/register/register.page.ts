import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  signUp: FormGroup;
  uid: string;

  constructor(
    public formbuilder: FormBuilder,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public navCtrl: NavController
    ) {

   }

  ngOnInit() {
    this.signUp = this.formbuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      img: [null]
    });

  };
  register(){
    const auth = getAuth();
createUserWithEmailAndPassword(auth, this.signUp.value.email, this.signUp.value.password)


.then((credentialsUser) => {
  const uid=credentialsUser.user.uid;
  this.db.database.ref('/users').child(uid).push(this.signUp.value);
    console.log(this.signUp.value);

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

  });
  }

}
