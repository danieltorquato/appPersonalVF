import { SharedModule } from './../../shared/shared.module';
import { FormBuilder } from '@angular/forms';

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
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { Camera} from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicStorageModule.forRoot(),
    // eslint-disable-next-line max-len
    IonicModule.forRoot(),  AngularFireModule.initializeApp(firebaseConfig), AppRoutingModule,  AngularFireStorageModule, SharedModule],
  providers: [AngularFireDatabase, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera, File, FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
