import { Storage } from '@ionic/storage-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit {
uid;
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
