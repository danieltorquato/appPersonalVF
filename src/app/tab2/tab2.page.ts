import { FormBuilder, Validators } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public storage: Storage,
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public auth: AngularFireAuth,
    public formbuilder: FormBuilder,
    ) {}
    ngOnInit(){
      }

}
