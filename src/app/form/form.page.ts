import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  signUp: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth
    ) {

   }

  ngOnInit() {
    this.signUp = this.formbuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

  };
  register(){
    const auth = getAuth();
createUserWithEmailAndPassword(auth, this.signUp.value.email, this.signUp.value.password)
  .then((userCredential) => {

    const user = userCredential.user;
    console.log('usuário criado');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

}
