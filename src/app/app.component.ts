import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  uid: string;
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,) {}
ngOnInit() {
  this.storage.create();
    this.storage.get('users')
    .then((response)=>{
      if(response.user==null){
        this.navCtrl.navigateRoot('login');


      }
    });
}

}
