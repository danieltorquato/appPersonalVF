/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.page.html',
  styleUrls: ['./pupils.page.scss'],
})
export class PupilsPage implements OnInit {
  dados;
  id: string;
  db = getFirestore();
  size: number;
  apelido: any;
  constructor() { }

  async ngOnInit() {
    await getDocs(collection(this.db, 'users')).then(snap => {
      this.size = snap.size;// will return the collection size
      console.log(this.size);
      $('p').html(`Quantidade de alunos: ${this.size}`);
    });
    const querySnapshot = await getDocs(collection(this.db, 'users'));
    // eslint-disable-next-line @typescript-eslint/no-shadow
    querySnapshot.forEach(async (docs) => {
      this.id = docs.id;
      console.log(`${docs.id}`);
      const docRef = doc(this.db, 'users', this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        this.dados = docSnap.data();
        if(this.dados.situacao===true){
          this.dados.situacao = 'Ativo';
        }else if(this.dados.situacao===false){
          this.dados.situacao = 'Inativo';
        }
        if (this.dados.img === null || this.dados.img === '') {
          // eslint-disable-next-line max-len
          this.dados.img = 'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg';
        }
if (this.dados.shortName===null || this.dados.shortName==='') {
this.apelido = this.dados.name;
this.dados.name = 'Sem apelido';
}else {
  this.apelido = this.dados.shortName;
}
$('.view').append(`

<ion-card>
<ion-card-header>
  <ion-card-title>

  ${this.apelido}</ion-card-title>
  <ion-card-subtitle class="apelido">   ${this.dados.name} </ion-card-subtitle>
</ion-card-header>
</ion-card>
<img class="perfil_icon" src="${this.dados.img}">
`);
$('.style').html(`

<style>
*{
  text-align:center;
}
.perfil_icon{
  width: 100px;
  height: 100px;
  border-radius: 500px;
  position: relative;
bottom: 140px;
}
ion-card{
  margin-bottom: -30px;
  margin-top: 20px;
}
.view{
  position:relative;
  top: 80px;
}
</style>
`);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });
  }

}
