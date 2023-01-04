import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  dataArray = [];
auth = getAuth();
  uid: string;
  constructor() { }

  async ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.uid = user.uid;
    });
    const querySnapshot = await getDocs(collection(this.db, 'users', this.uid, 'pupils', this.id));
    // eslint-disable-next-line @typescript-eslint/no-shadow
    querySnapshot.forEach(async (docs) => {
      this.id = docs.id;
      console.log(`${docs.id}`);
      const docRef = doc(this.db, 'users', this.uid, 'pupils',this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());

      }
    });


const querySnapshots  = await getDocs(collection(this.db, 'users', this.uid, 'pupils', this.id));
// eslint-disable-next-line @typescript-eslint/no-shadow
querySnapshots.forEach((doc) => {

  // doc.data() is never undefined for query doc snapshots
  this.data = doc.data();
  if (this.data.img === null || this.data.img === '') {
    // eslint-disable-next-line max-len
    this.data.img = 'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg';
  }
if (this.data.shortName===null || this.data.shortName==='') {
this.data.shortName = this.data.name;
}else {
this.apelido = this.data.shortName;
}
  this.dataArray.push(this.data);

});
  }
}
