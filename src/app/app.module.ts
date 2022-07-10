
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './../environments/environment';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicStorageModule.forRoot(),
    IonicModule.forRoot(),  AngularFireModule.initializeApp(firebaseConfig), AppRoutingModule],
  providers: [AngularFireDatabase, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
