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
  }

}
