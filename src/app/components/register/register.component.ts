import { getFirestore } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { collection, addDoc } from 'firebase/firestore';
import 'firebase/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUp: any;
  db = getFirestore();
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
  return this.auth.createUserWithEmailAndPassword(this.signUp.value.email, this.signUp.value.password).then(async () => {
    const docRef = addDoc(collection(this.db, 'users'), {
      name: this.signUp.value.name,
      email: this.signUp.value.email,
      password: this.signUp.value.password,
      img: '',
      shortName: '',
      isAdmin:false

  });
  console.log('Document written with ID: ', (await docRef).id);

    });
    }

}

