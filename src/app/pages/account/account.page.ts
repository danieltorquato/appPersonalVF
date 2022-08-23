import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Storage } from '@ionic/storage-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
uid: string;
list;
  constructor(public db: AngularFireDatabase,
    public storage: Storage,
    public auth: AngularFireAuth) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get('users').then((response)=>{
this.uid=response;
if(this.uid == null){
$('.code').html('Você não está logado');
}
    const listDB = this.db.database.ref('/users').child(this.uid);
    listDB.on('value', (snapshot)=>{
      const items = snapshot.val();
      console.log(this.list);
      if(items){
        this.list= Object.keys(items).map(i=>items[i]);
        console.log(this.list);
      }
    });
  });
  }

}
