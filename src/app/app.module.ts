import { UserdadosService } from './services/userdados.service';
import { HomePainelStudentComponent } from './components/home-painel-student/home-painel-student.component';
import { SharedModule } from './../../shared/shared.module';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './../environments/environment';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { IonicStorageModule } from '@ionic/storage-angular';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/compat/storage';
import { Camera} from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { NgChartsModule } from 'ng2-charts';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicStorageModule.forRoot(),
    // eslint-disable-next-line max-len
    IonicModule.forRoot(),  AngularFireModule.initializeApp(firebaseConfig), AppRoutingModule,  AngularFireStorageModule, SharedModule, FormsModule, IonicModule, NgChartsModule, RouterModule.forRoot([
      {path: 'personal/:info', component: PersonalInfoComponent}
  ])],
  // eslint-disable-next-line max-len
  providers: [AngularFireDatabase, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera, File, FormBuilder, AngularFireStorage, UserdadosService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
