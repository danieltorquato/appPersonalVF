import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
@Component({
  selector: 'app-pupils',
  templateUrl: './pupils.component.html',
  styleUrls: ['./pupils.component.scss'],
})
export class PupilsComponent implements OnInit {
  db=getFirestore();
  id;
    dados: any;
    data: any;
    apelido: any;
    dataArray = [];
    auth = getAuth();
  uid: string;
    constructor() { }

    async ngOnInit() {

      onAuthStateChanged(this.auth, async (user) => {
        this.uid = user.uid;
        console.log(this.uid);
        const queryL = await getDocs(collection(this.db, 'users'));
        // eslint-disable-next-line @typescript-eslint/no-shadow
        queryL.forEach(async (docs) => {
          this.id = docs.id;
          console.log(this.id);});
        const querySnapshot = await getDocs(collection(this.db, 'users',this.uid,'pupils'));
        // eslint-disable-next-line @typescript-eslint/no-shadow
        querySnapshot.forEach(async (docs) => {
          this.id = docs.id;
          console.log(this.id);
          const docRef = doc(this.db, 'users', this.uid, 'pupils', 'wvRYvxGHZcab2gyfSdGmNEsS52n2');
          this.data = await getDoc(docRef);
          if (this.data.exists()) {
            console.log('Document data:', this.data.data());
            if (this.data.img === null || this.data.img === '') {
              // eslint-disable-next-line max-len
              this.data.img = 'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg';
            }
          if (this.data.shortName===null || this.data.shortName==='') {
          this.data.shortName = this.data.name;
          }else {
          this.apelido = this.data.shortName;
          }
            this.dataArray.push(this.data.data());
          }
        });

      });


    }
}
