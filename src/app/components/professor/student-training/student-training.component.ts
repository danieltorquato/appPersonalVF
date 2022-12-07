import { Component, OnInit } from '@angular/core';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-student-training',
  templateUrl: './student-training.component.html',
  styleUrls: ['./student-training.component.scss'],
})
export class StudentTrainingComponent implements OnInit {
db=getFirestore();
id;
  dados: any;
  data: any;
  apelido: any;
  constructor() { }

  async ngOnInit() {
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
      }
    });

    const q = query(collection(this.db, 'users'), where('situacao', '==', true));

const querySnapshots  = await getDocs(q);
// eslint-disable-next-line @typescript-eslint/no-shadow
querySnapshots.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, ' => ', doc.data());
  this.data = doc.data();
  console.log(this.data.name);
  if (this.data.img === null || this.data.img === '') {
    // eslint-disable-next-line max-len
    this.data.img = 'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg';
  }
if (this.data.shortName===null || this.data.shortName==='') {
this.apelido = this.data.name;
this.data.name = 'Sem apelido';
}else {
this.apelido = this.data.shortName;
}
  $('.view').append(`
<ion-card>
<ion-card-header>
  <ion-card-title>

  ${this.apelido}</ion-card-title>
  <ion-card-subtitle class="apelido">   ${this.data.name} </ion-card-subtitle>
</ion-card-header>
</ion-card>
<img class="perfil_icon" src="${this.data.img}">
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
});
  }
}
