import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { getAuth } from 'firebase/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-painel-student',
  templateUrl: './home-painel-student.component.html',
  styleUrls: ['./home-painel-student.component.scss'],
})
export class HomePainelStudentComponent implements OnInit {

  constructor(
    private storage: Storage,
    private navCtrl: NavController
    ) {}

  ngOnInit() {}
  logout(){
    const auth=getAuth();
    this.storage.create();
    auth.signOut().then((response)=>{
      console.log(response);
      this.navCtrl.navigateRoot('login');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }
}
