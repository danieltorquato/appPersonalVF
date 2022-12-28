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
  selector: 'app-login-comp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  db = getFirestore();
  user: string;

  constructor(
    // public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public navCtrl: NavController,
    public formbuilder: FormBuilder,
    public storage: Storage
  ) {}

  ngOnInit() {
    this.user;
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

    {
    }
  }
  public login() {
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then(async (response) => {
        this.user = response.user.uid;
        console.log(this.user);
        this.navCtrl.navigateRoot('/tabs/tab2');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
}
