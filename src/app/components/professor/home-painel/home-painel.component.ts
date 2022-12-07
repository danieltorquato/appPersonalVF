import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home-painel',
  templateUrl: './home-painel.component.html',
  styleUrls: ['./home-painel.component.scss'],
})
export class HomePainelComponent implements OnInit {
  uid;
list;
  constructor(public db: AngularFireDatabase,
    public storage: Storage,
    public auth: AngularFireAuth) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get('users').then((response)=>{
this.uid=response;
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
