import { LoginComponent } from './../../components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
    declarations: [LoginPage, LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        LoginPageRoutingModule,
        FormsModule,

    ]
})
export class LoginPageModule {}
