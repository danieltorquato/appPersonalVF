import { UserdadosService } from './../../services/userdados.service';
import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-addpupilc',
  templateUrl: './addpupilc.component.html',
  styleUrls: ['./addpupilc.component.scss'],
})
export class AddpupilcComponent implements OnInit {
  signUp: any;
  db = getFirestore();
  uid: string;
  auths = getAuth();
  id;
  idd;
  constructor( private formbuilder: FormBuilder,
    private auth: AngularFireAuth,
    private userdadosService: UserdadosService) {

   }

 ngOnInit() {
onAuthStateChanged(this.auths, ()=>{
  this.idd =  this.auths.currentUser.uid;

});

this.signUp = this.formbuilder.group({
  name: [null, [Validators.required, Validators.minLength(5)]],
  email: [, [Validators.required, Validators.minLength(5)]],
  password: [null, [Validators.required, Validators.minLength(6)]],
  shortName: [null]
});
setInterval( () => {
  this.userdadosService.guardarDados('id', this.idd);
this.id = this.userdadosService.pegarDados('id');
  console.log(this.id);}, 1000);
  }
  register(){
    return this.auth.createUserWithEmailAndPassword(this.signUp.value.email, this.signUp.value.password).then(async (response) => {
      console.log(this.id);
      await setDoc(doc(this.db, 'users/' + response.user.uid), {
        name: this.signUp.value.name,
        email: this.signUp.value.email,
        img: '',
        shortName: this.signUp.value.shortName,
        isAdmin:false,
        isProfessor:false,
        professor: this.id
    });

      });
      }
      catch(err){
        console.log(err);
      }

}
