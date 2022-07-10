import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    public db: AngularFireDatabase,
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
this.storage.create();
  }
  login(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginForm.value.email, this.loginForm.value.password)
      .then((response) => {


        this.storage.set('users', response.user.uid)
        .then(()=>{
          this.navCtrl.navigateRoot('/tabs/tab2');
          console.log(response.user);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }

}
