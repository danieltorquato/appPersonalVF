import { LoginPage } from './../../pages/login/login.page';
import { doc, getFirestore, setDoc, collection, addDoc } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';

import 'firebase/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUp: any;
  db = getFirestore();
  uid: string;
  constructor(
    private formbuilder: FormBuilder,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
   ) { }

  ngOnInit() {
    this.signUp = this.formbuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

  };
register(){
  return this.auth.createUserWithEmailAndPassword(this.signUp.value.email, this.signUp.value.password).then(async (response) => {
    this.uid = response.user.uid;
    console.log(this.uid);
    await setDoc(doc(this.db, 'users/' + this.uid), {
      name: this.signUp.value.name,
      email: this.signUp.value.email,
      img: '',
      shortName: '',
      isAdmin:false,
      isProfessor:false

  });

    });
    }catch(){

    }

}

